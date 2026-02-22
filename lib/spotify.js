// Using native fetch (Node 18+) and URLSearchParams — no extra imports needed

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
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
	return response.json()
}

// Get now-playing and recently-played in parallel using a single token fetch
export const getNowPlayingAndRecent = async () => {
	const { access_token } = await getAccessToken()
	const headers = { Authorization: `Bearer ${access_token}` }

	const [nowPlaying, recentlyPlayed] = await Promise.all([
		fetch(NOW_PLAYING_ENDPOINT, { headers }),
		fetch(RECENTLY_PLAYED_ENDPOINT, { headers })
	])

	return { nowPlaying, recentlyPlayed }
}

