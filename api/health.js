export default async (_) => {
    return Response.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        node: process.version,
        spotify: !!process.env.ENABLE_SPOTIFY
    })
}
