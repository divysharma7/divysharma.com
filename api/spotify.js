import { getNowPlayingAndRecent } from '../lib/spotify.js'

const SPOTIFY_CACHE_TTL_MS = 60_000
let cachedResponse = null
let cachedResponseExpiresAt = 0

const jsonResponse = (data, cacheSecs = 60) => {
	return Response.json(data, {
		headers: {
			'Cache-Control': `public, max-age=${Math.min(120, cacheSecs)}, s-maxage=${cacheSecs}, stale-while-revalidate=${cacheSecs}`
		}
	})
}

const setCachedResponse = (data, ttlMs = SPOTIFY_CACHE_TTL_MS) => {
	cachedResponse = data
	cachedResponseExpiresAt = Date.now() + ttlMs
	return data
}

const getSafeJson = async (response) => {
	try {
		return await response.json()
	} catch (_) {
		return null
	}
}

const mapNowPlayingSong = (song) => {
	const title = song?.item?.name || ''
	return {
		album: song?.item?.album?.name || '',
		albumImageUrl: song?.item?.album?.images?.[0]?.url || '',
		artist: song?.item?.artists?.map((_artist) => _artist.name).join(', ') || 'Unknown',
		isPlaying: true,
		songUrl: song?.item?.external_urls?.spotify || '',
		title,
		cleanTitle: title
	}
}

const mapRecentlyPlayedSong = (recentSong) => {
	const title = recentSong?.name || ''
	return {
		album: recentSong?.album?.name || '',
		albumImageUrl: recentSong?.album?.images?.[0]?.url || '',
		artist: recentSong?.artists?.map((_artist) => _artist.name).join(', ') || 'Unknown',
		isPlaying: false,
		songUrl: recentSong?.external_urls?.spotify || '',
		title,
		cleanTitle: title,
		lastPlayed: true
	}
}

export const config = {
	runtime: 'edge'
}

export default async (_) => {
	if (process.env.ENABLE_SPOTIFY !== 'true') {
		return jsonResponse({
			isPlaying: false,
			message: 'Spotify feature is disabled (check the ENABLE_SPOTIFY environment variable)'
		}, 3600)
	}

	if (Date.now() < cachedResponseExpiresAt && cachedResponse) {
		return jsonResponse(cachedResponse)
	}

	try {
		console.log('[api/spotify.js] Calling getNowPlayingAndRecent()')
		const { nowPlaying, recentlyPlayed } = await getNowPlayingAndRecent()
		console.log('[api/spotify.js] Successfully got response from getNowPlayingAndRecent()')

		if (nowPlaying.ok && nowPlaying.status !== 204) {
			const song = await getSafeJson(nowPlaying)
			if (song?.is_playing) {
				return jsonResponse(setCachedResponse(mapNowPlayingSong(song)))
			}
		}

		if (recentlyPlayed.ok) {
			const recentData = await getSafeJson(recentlyPlayed)
			const recentSong = recentData?.items?.[0]?.track

			if (recentSong) {
				return jsonResponse(setCachedResponse(mapRecentlyPlayedSong(recentSong)))
			}
		}

		if (nowPlaying.status === 429 || recentlyPlayed.status === 429) {
			const delay1 = parseInt(nowPlaying.headers?.get?.('retry-after') || nowPlaying.headers?.get?.('Retry-After') || '120', 10)
			const delay2 = parseInt(recentlyPlayed.headers?.get?.('retry-after') || recentlyPlayed.headers?.get?.('Retry-After') || '120', 10)
			const retryAfter = Math.max(delay1, delay2)

			console.log(`[api/spotify] 429 Rate Limit. Parsed Retry-After: delay1=${delay1}s, delay2=${delay2}s. Combined: ${retryAfter}s`)

			if (cachedResponse) {
				return jsonResponse(
					setCachedResponse({
						...cachedResponse,
						stale: true,
						rateLimited: true
					}, retryAfter * 1000),
					retryAfter
				)
			}

			return jsonResponse(
				setCachedResponse({
					isPlaying: false,
					rateLimited: true,
					message: 'Spotify API rate limit reached. Please retry shortly.'
				}, retryAfter * 1000),
				retryAfter
			)
		}

		return jsonResponse(
			setCachedResponse({
				isPlaying: false,
				message: 'No song playing currently and no history found'
			})
		)
	} catch (error) {
		console.error('[api/spotify.js] Unexpected error:', error)

		if (cachedResponse) {
			return jsonResponse({
				...cachedResponse,
				stale: true
			})
		}

		return jsonResponse({
			isPlaying: false,
			message: 'Unable to fetch Spotify data right now'
		})
	}
}
