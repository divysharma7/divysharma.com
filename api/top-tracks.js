import { getTopTracks } from '../lib/top-tracks.js'

const TOP_TRACKS_CACHE_TTL_MS = 60_000
let cachedResponse = null
let cachedResponseExpiresAt = 0

const jsonResponse = (data, cacheSecs = 3600) => {
	return Response.json(data, {
		headers: {
			'Cache-Control': `public, max-age=${Math.min(300, cacheSecs)}, s-maxage=${cacheSecs}, stale-while-revalidate=${cacheSecs}`
		}
	})
}

export const config = {
	runtime: 'edge'
}

export default async (_) => {
	if (process.env.ENABLE_SPOTIFY !== 'true') {
		return jsonResponse({
			tracks: [],
			rateLimited: true,
			message: 'Top tracks temporarily unavailable (Rate Limited)'
		}, 3600)
	}

	if (Date.now() < cachedResponseExpiresAt && cachedResponse) {
		return jsonResponse(cachedResponse)
	}

	try {
		const response = await getTopTracks()

		if (!response.ok) {
			const body = await response.text()
			console.error(`[api/top-tracks] Spotify API ${response.status}: ${body}`)

			let retryAfter = 300
			if (response.status === 429) {
				const headerVal = response.headers?.get?.('retry-after') || response.headers?.get?.('Retry-After') || '120'
				retryAfter = parseInt(headerVal, 10)
				console.log(`[api/top-tracks] 429 Rate Limit. Retry-After header: ${headerVal} -> parsed: ${retryAfter}s`)
			}

			if (cachedResponse) {
				cachedResponseExpiresAt = Date.now() + retryAfter * 1000
				return jsonResponse({
					...cachedResponse,
					stale: true,
					rateLimited: response.status === 429
				}, retryAfter)
			}

			const data = {
				tracks: [],
				rateLimited: response.status === 429,
				message: 'Top tracks temporarily unavailable'
			}
			cachedResponse = data
			cachedResponseExpiresAt = Date.now() + retryAfter * 1000

			return jsonResponse(data, retryAfter)
		}

		const payload = await response.json().catch(() => null)
		const items = Array.isArray(payload?.items) ? payload.items : []

		const tracks = items.slice(0, 10).map((track) => ({
			artist: track?.artists?.map((_artist) => _artist.name).join(', ') || 'Unknown',
			songUrl: track?.external_urls?.spotify || '',
			title: track?.name || '',
			albumArt: track?.album?.images?.[0]?.url || '',
			cleanTitle: track?.name || ''
		}))

		const data = { tracks }
		cachedResponse = data
		cachedResponseExpiresAt = Date.now() + TOP_TRACKS_CACHE_TTL_MS

		return jsonResponse(data)
	} catch (error) {
		console.error('[api/top-tracks] Unexpected error:', error)

		if (cachedResponse) {
			return jsonResponse({ ...cachedResponse, stale: true }, 60)
		}

		const data = {
			tracks: [],
			message: 'Top tracks temporarily unavailable'
		}
		cachedResponse = data
		cachedResponseExpiresAt = Date.now() + TOP_TRACKS_CACHE_TTL_MS

		return jsonResponse(data, 60)
	}
}
