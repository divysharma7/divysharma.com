// Using native fetch (Node 18+) and URLSearchParams — no extra imports needed

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

// Helper for fetch with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)
	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal
		})
		clearTimeout(id)
		return response
	} catch (error) {
		clearTimeout(id)
		throw error
	}
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
	console.log('Fetching Spotify Access Token...')
	if (!client_id || !client_secret || !refresh_token) {
		throw new Error('Missing Spotify environment variables')
	}

	const response = await fetchWithTimeout(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token
		}).toString()
	})

	if (!response.ok) {
		const text = await response.text()
		console.error(`Spotify Token Error: ${response.status} ${text}`)
		throw new Error(`Spotify token fetch failed: ${response.status}`)
	}

	return response.json()
}

// Get now-playing and recently-played in parallel using a single token fetch
export const getNowPlayingAndRecent = async () => {
	console.log('Getting Now Playing and Recent tracks...')
	const { access_token } = await getAccessToken()
	console.log('Access Token obtained.')

	const headers = { Authorization: `Bearer ${access_token}` }

	console.log('Fetching Spotify player data...')
	const [nowPlaying, recentlyPlayed] = await Promise.all([
		fetchWithTimeout(NOW_PLAYING_ENDPOINT, { headers }),
		fetchWithTimeout(RECENTLY_PLAYED_ENDPOINT, { headers })
	])

	console.log('Spotify data fetched successfully.')
	return { nowPlaying, recentlyPlayed }
}

