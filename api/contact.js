import sgMail from '@sendgrid/mail'
import Filter from 'bad-words'
const filter = new Filter()

// --- Rate limiting (in-memory) ---
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 3

function isRateLimited(ip) {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (!entry) {
        rateLimitMap.set(ip, { timestamps: [now] })
        return false
    }

    // Prune timestamps outside the window
    entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)

    if (entry.timestamps.length >= RATE_LIMIT_MAX) {
        return true
    }

    entry.timestamps.push(now)
    return false
}

// --- HTML escaping ---
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// --- Email format validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Rate limiting by IP
    const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
    if (isRateLimited(ip)) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' })
    }

    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    // Content-length limits
    if (typeof name === 'string' && name.length > 200) {
        return res.status(400).json({ message: 'Name is too long (max 200 characters)' })
    }
    if (typeof message === 'string' && message.length > 5000) {
        return res.status(400).json({ message: 'Message is too long (max 5000 characters)' })
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }

    if (filter.isProfane(message) || filter.isProfane(name)) {
        return res.status(400).json({ message: 'Profanity detected' })
    }

    // Escape user inputs for safe HTML embedding
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    if (!process.env.SENDGRID_API_KEY) {
        return res.status(200).json({ message: 'Message received' })
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: process.env.CONTACT_EMAIL || 'divysharma029@gmail.com',
        from: 'portfolio@divysharma.com',
        subject: `New Message from ${safeName} via Portfolio`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}<br><br><strong>Message:</strong><br>${safeMessage.replace(/\n/g, '<br>')}`
    }

    try {
        await sgMail.send(msg)
        return res.status(200).json({ message: 'Message sent successfully' })
    } catch (error) {
        console.error('Failed to send contact form email')
        return res.status(500).json({ message: 'Failed to send email' })
    }
}
