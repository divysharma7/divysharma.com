export default async (_) => {
    const start = Date.now()

    // Test 1: Can we reach Spotify at all?
    let spotifyReachable = false
    let tokenStatus = null
    let tokenError = null

    try {
        const {
            SPOTIFY_CLIENT_ID: client_id,
            SPOTIFY_CLIENT_SECRET: client_secret,
            SPOTIFY_REFRESH_TOKEN: refresh_token
        } = process.env

        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

        const tokenResp = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token }).toString(),
            signal: AbortSignal.timeout(8000) // 8s timeout
        })

        tokenStatus = tokenResp.status
        const data = await tokenResp.json()
        spotifyReachable = !!data.access_token
        if (data.error) tokenError = `${data.error}: ${data.error_description}`
    } catch (e) {
        tokenError = e.message
    }

    return Response.json({
        ok: true,
        env: {
            hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
            hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
            hasRefreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN,
            enableSpotify: process.env.ENABLE_SPOTIFY
        },
        spotify: {
            reachable: spotifyReachable,
            tokenStatus,
            tokenError
        },
        elapsed: `${Date.now() - start}ms`
    })
}
