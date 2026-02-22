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
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const TOKEN_EXPIRY_BUFFER_MS = 60_000

let cachedAccessToken = null
let cachedAccessTokenExpiresAt = 0

const getAccessToken = async () => {
	if (!client_id || !client_secret || !refresh_token) {
		throw new Error('Missing Spotify environment variables')
	}

	const now = Date.now()
	if (cachedAccessToken && now < cachedAccessTokenExpiresAt) {
		return { access_token: cachedAccessToken }
	}

	console.log('[top-tracks] Fetching Spotify Access Token...')
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
		console.error(`[top-tracks] Spotify Token Error: ${response.status} ${text}`)
		throw new Error(`Spotify token fetch failed: ${response.status}`)
	}

	const tokenPayload = await response.json()
	const expiresInMs = Number(tokenPayload?.expires_in || 3600) * 1000

	if (!tokenPayload?.access_token) {
		throw new Error('Spotify token response missing access_token')
	}

	cachedAccessToken = tokenPayload.access_token
	cachedAccessTokenExpiresAt = now + Math.max(0, expiresInMs - TOKEN_EXPIRY_BUFFER_MS)

	return tokenPayload
}

export const getTopTracks = async () => {
	console.log('[top-tracks] Getting Top Tracks...')
	const { access_token } = await getAccessToken()
	console.log('[top-tracks] Access Token obtained.')

	return fetchWithTimeout(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})
}
