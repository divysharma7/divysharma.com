import { upsertText } from '../lib/rag/upstashVector.js'

export const config = { runtime: 'edge' }

const MAX_TEXT_LENGTH = 50_000
const MAX_ID_LENGTH = 200

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })
}

export default async function handler(req) {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    // --- Auth check ---
    const authHeader = req.headers.get('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    const expectedKey = process.env.INGEST_API_KEY

    if (!expectedKey || token !== expectedKey) {
        return jsonResponse({ error: 'Unauthorized' }, 401)
    }

    // --- Parse body ---
    let body
    try {
        body = await req.json()
    } catch {
        return jsonResponse({ error: 'Invalid JSON body.' }, 400)
    }

    const { id, text, metadata } = body || {}

    // --- Input validation ---
    if (typeof text !== 'string' || text.trim().length === 0) {
        return jsonResponse({ error: '"text" is required and must be a non-empty string.' }, 400)
    }

    if (text.length > MAX_TEXT_LENGTH) {
        return jsonResponse({ error: `"text" must not exceed ${MAX_TEXT_LENGTH} characters.` }, 400)
    }

    if (id !== undefined) {
        if (typeof id !== 'string' || id.length > MAX_ID_LENGTH) {
            return jsonResponse({ error: `"id" must be a string of at most ${MAX_ID_LENGTH} characters.` }, 400)
        }
    }

    if (metadata !== undefined) {
        if (
            typeof metadata !== 'object' ||
            metadata === null ||
            Array.isArray(metadata)
        ) {
            return jsonResponse({ error: '"metadata" must be a plain object.' }, 400)
        }
    }

    // --- Upsert ---
    try {
        const result = await upsertText({
            resourceId: id,
            text,
            metadata: metadata || {},
        })

        return jsonResponse(result)
    } catch (e) {
        console.error('Ingest failed:', e)
        return jsonResponse({ error: 'Ingest failed.' }, 500)
    }
}
