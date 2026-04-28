import { createMistral } from '@ai-sdk/mistral'
import { streamText } from 'ai'
import { retrieve } from '../lib/rag/upstashVector.js'
import { kb } from '../src/data/kb.js'
import { about } from '../src/data/profile.js'
import { initOtel } from './_otel.js'

initOtel()

// Uses MISTRAL_API_KEY from env by default
const mistral = createMistral()

export const config = { runtime: 'edge' }

/* ── Rate limiting ─────────────────────────────────────────────── */
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10

/** @type {Map<string, number[]>} IP -> array of request timestamps */
const ipRequestMap = new Map()

// Purge stale entries every 5 minutes to prevent unbounded growth
setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of ipRequestMap) {
        const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
        if (recent.length === 0) {
            ipRequestMap.delete(ip)
        } else {
            ipRequestMap.set(ip, recent)
        }
    }
}, 5 * 60_000)

function isRateLimited(ip) {
    const now = Date.now()
    const timestamps = (ipRequestMap.get(ip) || []).filter(
        t => now - t < RATE_LIMIT_WINDOW_MS,
    )
    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
        ipRequestMap.set(ip, timestamps)
        return true
    }
    timestamps.push(now)
    ipRequestMap.set(ip, timestamps)
    return false
}

/* ── Message validation ────────────────────────────────────────── */
const MAX_MESSAGES = 50
const MAX_TOTAL_CONTENT_LENGTH = 10_000

function validateMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) {
        return 'Request must include a non-empty "messages" array.'
    }
    if (messages.length > MAX_MESSAGES) {
        return `Too many messages. Maximum is ${MAX_MESSAGES}.`
    }

    let totalContentLength = 0

    for (let i = 0; i < messages.length; i++) {
        const msg = messages[i]
        if (typeof msg?.role !== 'string' || typeof msg?.content !== 'string') {
            return `Each message must have a "role" (string) and "content" (string). Problem at index ${i}.`
        }
        totalContentLength += msg.content.length
    }

    if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
        return `Total message content is too long. Maximum is ${MAX_TOTAL_CONTENT_LENGTH} characters.`
    }

    return null // valid
}

/* ── System prompt ─────────────────────────────────────────────── */
const BASE_SYSTEM = `
You are Divy Sharma's portfolio assistant.
Speak in first person (I/me).
Be concise, structured, and skeptical of vague questions.
If something is not in the provided context, say you don't know and suggest checking the portfolio.
For work inquiries: divysharma029@gmail.com
`.trim()

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (isRateLimited(ip)) {
        return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } },
        )
    }

    try {
        const payload = await req.json()
        const messages = payload?.messages

        // Validate messages
        const validationError = validateMessages(messages)
        if (validationError) {
            return new Response(JSON.stringify({ error: validationError }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const lastUserMsg = [...messages].reverse().find(m => m?.role === 'user')
        const question = typeof lastUserMsg?.content === 'string'
            ? lastUserMsg.content
            : Array.isArray(lastUserMsg?.content)
                ? lastUserMsg.content.map(x => x?.text || '').join(' ')
                : ''

        const hits = await retrieve({ query: question, topK: 6 })
        const context = (hits?.length ? hits : [])
            .map((h, i) => {
                const c = h?.metadata?.content || ''
                const src = h?.metadata?.source || h?.metadata?.resourceId || 'kb'
                return `(${i + 1}) [${src}] ${c}`
            })
            .join('\n')

        const kbContent = kb.map(item => `Q: ${item.q}\nA: ${item.a}`).join('\n\n')

        const system = `${BASE_SYSTEM}

CONTEXT (authoritative KB snippets):
${context || '(no relevant context found)'}

FAQ KNOWLEDGE:
${kbContent}

RESPONSE RULES:
- Keep responses under 100 words
- Use markdown formatting for better readability
- Make all links clickable using markdown link syntax [text](url)
- Use **bold** for emphasis when needed
- Use bullet points (-) for lists when appropriate
- Be conversational and helpful
- Focus on ${about.name}'s expertise and projects
- For work inquiries, direct to email: [${about.email}](mailto:${about.email})
- Answer questions about technical skills, experience, and projects
- If unsure about details, suggest visiting the portfolio sections
- You are not a bot, you are a human. you are ${about.name}. you talk in first person.
- Refer ${about.name} as "Me" or "I"
- Use CONTEXT and FAQ KNOWLEDGE for factual claims about Divy.
- If context is missing, say you don’t know instead of guessing.

Your goal: Help visitors learn about your work in a friendly, concise way.`.trim()

        const result = streamText({
            model: mistral('mistral-large-latest'),
            system,
            messages,
            temperature: 0.3,
            experimental_telemetry: {
                isEnabled: true,
                functionId: 'portfolio-chat',
            },
        })

        return result.toTextStreamResponse()
    } catch (e) {
        console.error('Chat handler error:', e)
        return new Response(JSON.stringify({ error: 'Something went wrong. Please try again later.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
