import { Index } from '@upstash/vector'
import { embed, embedMany } from 'ai'
import { mistral } from '@ai-sdk/mistral'

const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
})

// Mistral embeddings model (1024-dim)
const embeddingModel = mistral.embedding('mistral-embed')

function chunkText(text, maxChars = 800) {
    const clean = (text || '').replace(/\s+/g, ' ').trim()
    if (!clean) return []

    // naive sentence chunking, then pack into ~maxChars
    const sentences = clean.split(/(?<=[.!?])\s+/)
    const chunks = []
    let buf = ''

    for (const s of sentences) {
        if ((buf + ' ' + s).trim().length > maxChars) {
            if (buf.trim()) chunks.push(buf.trim())
            buf = s
        } else {
            buf = (buf + ' ' + s).trim()
        }
    }
    if (buf.trim()) chunks.push(buf.trim())
    return chunks
}

export async function upsertText({ resourceId, text, metadata = {} }) {
    if (!resourceId) resourceId = crypto.randomUUID()
    const chunks = chunkText(text)

    if (chunks.length === 0) {
        return { resourceId, upserted: 0 }
    }

    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: chunks,
    })

    const vectors = embeddings.map((vector, i) => ({
        id: `${resourceId}-${i}`,
        vector,
        metadata: {
            resourceId,
            chunkIndex: i,
            content: chunks[i],
            ...metadata,
        },
    }))

    await index.upsert(vectors)
    return { resourceId, upserted: vectors.length }
}

export async function retrieve({ query, topK = 6, filter = undefined }) {
    const q = (query || '').trim()
    if (!q) return []

    const { embedding } = await embed({
        model: embeddingModel,
        value: q,
    })

    const res = await index.query({
        vector: embedding,
        topK,
        includeMetadata: true,
        filter, // optional Upstash filter
    })

    return res || []
}
