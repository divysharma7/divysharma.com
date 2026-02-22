import { getTopTracks } from '../lib/top-tracks.js'

const TOP_TRACKS_CACHE_TTL_MS = 60_000
let cachedResponse = null
let cachedResponseExpiresAt = 0

export default async (_) => {
	if (Date.now() < cachedResponseExpiresAt && cachedResponse) {
		return Response.json(cachedResponse)
	}

	try {
		const response = await getTopTracks()

		if (!response.ok) {
			const body = await response.text()
			console.error(`[api/top-tracks] Spotify API ${response.status}: ${body}`)

			if (cachedResponse) {
				return Response.json({
					...cachedResponse,
					stale: true,
					rateLimited: response.status === 429
				})
			}

			const data = {
				tracks: [],
				rateLimited: response.status === 429,
				message: 'Top tracks temporarily unavailable'
			}
			cachedResponse = data
			cachedResponseExpiresAt = Date.now() + TOP_TRACKS_CACHE_TTL_MS

			return Response.json(data)
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

		return Response.json(data)
	} catch (error) {
		console.error('[api/top-tracks] Unexpected error:', error)

		if (cachedResponse) {
			return Response.json({ ...cachedResponse, stale: true })
		}

		const data = {
			tracks: [],
			message: 'Top tracks temporarily unavailable'
		}
		cachedResponse = data
		cachedResponseExpiresAt = Date.now() + TOP_TRACKS_CACHE_TTL_MS

		return Response.json(data)
	}
}
