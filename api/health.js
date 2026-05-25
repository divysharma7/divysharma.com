export default async (_) => {
    return Response.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    })
}
