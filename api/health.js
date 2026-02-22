// Simple health check — NO network calls, just confirm env vars and routing work
export default async (_) => {
    return Response.json({
        ok: true,
        routing: 'serverless function reached',
        env: {
            hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
            clientIdPrefix: (process.env.SPOTIFY_CLIENT_ID || '').substring(0, 8),
            hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
            hasRefreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN,
            refreshTokenPrefix: (process.env.SPOTIFY_REFRESH_TOKEN || '').substring(0, 8),
            enableSpotify: process.env.ENABLE_SPOTIFY,
            nodeVersion: process.version
        }
    })
}
