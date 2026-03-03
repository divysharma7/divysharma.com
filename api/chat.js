import { createMistral } from '@ai-sdk/mistral'
import { streamText } from 'ai'
import { retrieve } from '../lib/rag/upstashVector.js'
import { kb } from '../src/data/kb.js'
import { about } from '../src/data/profile.js'

// Uses MISTRAL_API_KEY from env by default
const mistral = createMistral()

export const config = { runtime: 'edge' }

const BASE_SYSTEM = `
You are Divy Sharma's portfolio assistant.
Speak in first person (I/me).
Be concise, structured, and skeptical of vague questions.
If something is not in the provided context, say you don't know and suggest checking the portfolio.
For work inquiries: divysharma029@gmail.com
`.trim()

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    try {
        const payload = await req.json()
        const messages = payload?.messages
        if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Missing "messages" array' }), {
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
        })

        return result.toTextStreamResponse()
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Chat failed', details: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
