import { getNowPlayingAndRecent } from '../lib/spotify.js'

const SPOTIFY_CACHE_TTL_MS = 15_000
let cachedResponse = null
let cachedResponseExpiresAt = 0

const setCachedResponse = (data) => {
	cachedResponse = data
	cachedResponseExpiresAt = Date.now() + SPOTIFY_CACHE_TTL_MS
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

export default async (_) => {
	if (process.env.ENABLE_SPOTIFY !== 'true') {
		return Response.json({
			isPlaying: false,
			message: 'Spotify feature is disabled (check the ENABLE_SPOTIFY environment variable)'
		})
	}

	if (Date.now() < cachedResponseExpiresAt && cachedResponse) {
		return Response.json(cachedResponse)
	}

	try {
		console.log('[api/spotify.js] Calling getNowPlayingAndRecent()')
		const { nowPlaying, recentlyPlayed } = await getNowPlayingAndRecent()
		console.log('[api/spotify.js] Successfully got response from getNowPlayingAndRecent()')

		if (nowPlaying.ok && nowPlaying.status !== 204) {
			const song = await getSafeJson(nowPlaying)
			if (song?.is_playing) {
				return Response.json(setCachedResponse(mapNowPlayingSong(song)))
			}
		}

		if (recentlyPlayed.ok) {
			const recentData = await getSafeJson(recentlyPlayed)
			const recentSong = recentData?.items?.[0]?.track

			if (recentSong) {
				return Response.json(setCachedResponse(mapRecentlyPlayedSong(recentSong)))
			}
		}

		if (nowPlaying.status === 429 || recentlyPlayed.status === 429) {
			if (cachedResponse) {
				return Response.json({
					...cachedResponse,
					stale: true,
					rateLimited: true
				})
			}

			return Response.json(
				setCachedResponse({
					isPlaying: false,
					rateLimited: true,
					message: 'Spotify API rate limit reached. Please retry shortly.'
				})
			)
		}

		return Response.json(
			setCachedResponse({
				isPlaying: false,
				message: 'No song playing currently and no history found'
			})
		)
	} catch (error) {
		console.error('[api/spotify.js] Unexpected error:', error)

		if (cachedResponse) {
			return Response.json({
				...cachedResponse,
				stale: true
			})
		}

		return Response.json({
			isPlaying: false,
			message: 'Unable to fetch Spotify data right now'
		})
	}
}
