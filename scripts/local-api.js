import dotenv from 'dotenv'
import { Readable } from 'stream'
import bodyParser from 'body-parser'
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env.local' })

const bindHandler = (server, route, modulePath) => {
	const resolvedModuleUrl = new URL(modulePath, import.meta.url).href

	server.middlewares.use(route, async (req, res) => {
		try {
			// Polyfill Web Request API for local mock
			if (!req.json) {
				req.json = async () => {
					if (req.body) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
					return new Promise((resolve, reject) => {
						let body = ''
						req.on('data', chunk => { body += chunk.toString() })
						req.on('end', () => {
							try { resolve(body ? JSON.parse(body) : {}) }
							catch (e) { reject(e) }
						})
					})
				}
			}

			const { default: handler } = await import(resolvedModuleUrl)
			const response = await handler(req)

			if (!(response instanceof Response)) {
				throw new Error(`Expected a Response from ${modulePath}`)
			}

			res.statusCode = response.status
			response.headers.forEach((value, key) => {
				res.setHeader(key, value)
			})

			if (response.body) {
				const nodeStream = Readable.fromWeb(response.body)
				nodeStream.on('error', (err) => console.error('[local-api] Stream Error:', err))
				nodeStream.pipe(res)
			} else {
				const body = await response.text()
				res.end(body)
			}
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
			server.middlewares.use(bodyParser.json())
			bindHandler(server, '/api/spotify', '../api/spotify.js')
			bindHandler(server, '/api/top-tracks', '../api/top-tracks.js')
			bindHandler(server, '/api/health', '../api/health.js')
			bindHandler(server, '/api/chat', '../api/chat.js')
			bindHandler(server, '/api/ingest', '../api/ingest.js')
		}
	}
}
