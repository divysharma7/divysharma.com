import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const bindHandler = (server, route, modulePath) => {
	const resolvedModuleUrl = new URL(modulePath, import.meta.url).href

	server.middlewares.use(route, async (req, res) => {
		try {
			const { default: handler } = await import(resolvedModuleUrl)
			const response = await handler(req)

			if (!(response instanceof Response)) {
				throw new Error(`Expected a Response from ${modulePath}`)
			}

			res.statusCode = response.status
			response.headers.forEach((value, key) => {
				res.setHeader(key, value)
			})

			const body = await response.text()
			res.end(body)
		} catch (error) {
			res.statusCode = 500
			res.setHeader('Content-Type', 'application/json')
			res.end(
				JSON.stringify({
					error: 'Local API middleware error',
					message: error?.message || String(error)
				})
			)
		}
	})
}

export default function localApi() {
	return {
		name: 'local-api',
		configureServer(server) {
			bindHandler(server, '/api/spotify', '../api/spotify.js')
			bindHandler(server, '/api/top-tracks', '../api/top-tracks.js')
			bindHandler(server, '/api/health', '../api/health.js')
		}
	}
}
