import { upsertText } from '../lib/rag/upstashVector.js'

export const config = { runtime: 'edge' }

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    try {
        const body = await req.json()
        const { id, text, metadata } = body || {}

        if (!text || typeof text !== 'string') {
            return new Response(JSON.stringify({ error: 'Missing "text" (string).' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const result = await upsertText({
            resourceId: id,
            text,
            metadata: metadata || {},
        })

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Ingest failed', details: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
