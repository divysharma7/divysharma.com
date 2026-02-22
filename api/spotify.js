import { getNowPlayingAndRecent } from '../lib/spotify.js'

export default async (_) => {
	if (process.env.ENABLE_SPOTIFY == 'true') {
		// Fetch now-playing and recently-played in parallel (single token call)
		const { nowPlaying, recentlyPlayed } = await getNowPlayingAndRecent()

		let isPlaying = false
		let song = null

		if (nowPlaying.status !== 204 && nowPlaying.status <= 400) {
			try {
				song = await nowPlaying.json()
				isPlaying = song?.is_playing
			} catch (e) {
				isPlaying = false
			}
		}

		if (isPlaying) {
			var albumImageUrl = ''
			var songUrl = ''
			const title = song?.item.name
			const artist = song?.item.artists.map((_artist) => _artist.name).join(', ')
			const album = song?.item.album.name
			const cleanTitle = title
			if (song?.item.album.images.length > 0) {
				albumImageUrl = song?.item?.album?.images[0]?.url
			}
			if (song?.item.external_urls) {
				songUrl = song?.item?.external_urls?.spotify
			}

			return Response.json({
				album,
				albumImageUrl,
				artist,
				isPlaying,
				songUrl,
				title,
				cleanTitle
			})
		} else {
			// Use the already-fetched recentlyPlayed response
			if (recentlyPlayed.status === 204 || recentlyPlayed.status > 400) {
				return Response.json({ isPlaying: false })
			}

			const data = await recentlyPlayed.json()

			if (data && data.items && data.items.length > 0) {
				const recentSong = data.items[0].track

				const title = recentSong.name
				const artist = recentSong.artists.map((_artist) => _artist.name).join(', ')
				const album = recentSong.album.name
				const cleanTitle = title
				const albumImageUrl = recentSong.album.images[0]?.url
				const songUrl = recentSong.external_urls.spotify

				return Response.json({
					album,
					albumImageUrl,
					artist,
					isPlaying: false,
					songUrl,
					title,
					cleanTitle,
					lastPlayed: true
				})
			} else {
				return Response.json({
					isPlaying: false,
					message: 'No song playing currently and no history found'
				})
			}
		}
	} else {
		return Response.json({
			isPlaying: false,
			message: 'Spotify feature is disabled (check the ENABLE_SPOTIFY environment variable)'
		})
	}
}
