const sgMail = require('@sendgrid/mail')
const Filter = require('bad-words')
const filter = new Filter()

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    if (filter.isProfane(message) || filter.isProfane(name)) {
        return res.status(400).json({ message: 'Profanity detected' })
    }

    // If SendGrid key is present, send email
    if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: process.env.CONTACT_EMAIL || 'divy@example.com', // Replace with actual email or env var
            from: 'portfolio@divysharma.com', // Must be a verified sender
            subject: `New Message from ${name} via Portfolio`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><br><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}`
        }

        try {
            await sgMail.send(msg)
            return res.status(200).json({ message: 'Message sent successfully' })
        } catch (error) {
            console.error('SendGrid Error:', error)
            return res.status(500).json({ message: 'Failed to send email' })
        }
    } else {
        // Dev mode or no key configured
        console.log('Contact form submitted (Simulated):', { name, email, message })
        return res.status(200).json({ message: 'Message received (Simulation)' })
    }
}
