import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createHtmlPlugin } from 'vite-plugin-html'
import localApi from './scripts/local-api.js'

export default defineConfig({
	define: {
		__VERCEL__: JSON.stringify(!!process.env.VERCEL)
	},
	plugins: [
		localApi(),
		vue({
			include: [/\.vue$/, /\.md$/]
		}),
		createHtmlPlugin({
			minify: true
		}),

		Components({
			resolvers: IconsResolver({
				componentPrefix: ''
			}),
			dts: false,
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
		}),
		Icons()
	],
	resolve: {
		alias: {
			'@': new URL('./src', import.meta.url).pathname
		}
	},
	build: {
		sourcemap: false,
		target: 'es2022',
		cssCodeSplit: true,
		modulePreload: { polyfill: false },
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('vue')) return 'vue'
						if (id.includes('lucide')) return 'icons'
						if (id.includes('posthog')) return 'posthog'
						if (id.includes('pdfjs-dist')) return 'pdfjs'
						if (id.includes('markdown-it')) return 'markdown'
						if (id.includes('dompurify')) return 'dompurify'
					}
				}
			}
		}
	},
	esbuild: { legalComments: 'none' },
	server: {
		open: true,
		warmup: {
			clientFiles: ['./src/main.js', './src/views/Home.vue']
		},
		fs: {
			allow: ['..']
		}
	}
})
