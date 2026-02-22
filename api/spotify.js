import { getNowPlaying, getRecentlyPlayed } from '../lib/spotify.js'
import { Filter } from 'bad-words'
const filter = new Filter()

export default async (_) => {
	if (process.env.ENABLE_SPOTIFY == 'true') {
		const response = await getNowPlaying()
		let isPlaying = false
		let song = null

		if (response.status === 204 || response.status > 400) {
			isPlaying = false
		} else {
			try {
				song = await response.json()
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
			const cleanTitle = filter.clean(song?.item.name || '')
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
			console.log('No song playing, checking recently played...')
			const recentlyPlayed = await getRecentlyPlayed()
			console.log('Recently played status:', recentlyPlayed.status)

			if (recentlyPlayed.status === 204 || recentlyPlayed.status > 400) {
				console.error('Error or no content from recently played endpoint')
				return Response.json({ isPlaying: false })
			}

			const data = await recentlyPlayed.json()
			console.log('Recently played data:', JSON.stringify(data))

			if (data && data.items && data.items.length > 0) {
				const recentSong = data.items[0].track

				const title = recentSong.name
				const artist = recentSong.artists
					.map((_artist) => _artist.name)
					.join(', ')
				const album = recentSong.album.name
				const cleanTitle = filter.clean(recentSong.name || '')
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
				console.log('No recently played history found')
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
