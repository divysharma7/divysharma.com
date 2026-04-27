<script setup lang="ts">
import { NotionRenderer, getPageBlocks } from 'vue3-notion'
import { projects } from './aaprojects.js'
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Fourerr from '../NotFound.vue'
import Notionloader from '../../components/notionloader.vue'
import { trackOutbound } from '@/analytics/umami'

const route = useRoute()
const data = ref()
const error = ref<string | null>(null)

let clickHandler: ((e: Event) => void) | null = null
let notionContainer: Element | null = null

onUnmounted(() => {
	if (notionContainer && clickHandler) {
		notionContainer.removeEventListener('click', clickHandler)
	}
})

// Delegate click events once Notion content renders
watch(data, async (newData) => {
	if (!newData) return
	await nextTick()
	notionContainer = document.querySelector('.notionblog')
	if (!notionContainer) return
	clickHandler = (e: Event) => {
		const target = e.target as Element
		const link = target?.closest('a')
		if (link && link.href) {
			if (link.href.startsWith('http') && !link.href.includes(window.location.host)) {
				trackOutbound('project_outbound', link.href, { project_id: route.params.id })
				window.dataLayer = window.dataLayer || []
				window.dataLayer.push({ event: 'click:project_outbound', project_id: route.params.id, link_href: link.href })
			}
		}
	}
	notionContainer.addEventListener('click', clickHandler)
}, { once: true })

const notionId = projects.find((x) => x.id === route.params.id)?.notion

if (!notionId) {
	error.value = 'project_not_found'
} else {
	getPageBlocks(notionId)
		.then((blocks) => { data.value = blocks })
		.catch((err) => {
			error.value = err instanceof Error ? err.message : 'fetch_failed'
			console.error('[ProjectDetail] getPageBlocks failed:', err)
		})
}
</script>

<template>
	<main>
		<!-- Error state -->
		<div v-if="error" class="errnotion">
			<Fourerr nosocials />
		</div>

		<!-- Success state -->
		<div v-else-if="data" class="cont notionblog">
			<NotionRenderer :blockMap="data" fullPage prism katex />
			<br />
		</div>

		<!-- Loading state -->
		<div v-else class="cont">
			<Notionloader />
		</div>
	</main>
</template>

<style>
/* override notion styles */
ul.notion-list {
	padding-inline-start: 0;
	list-style-position: outside;
}

img {
	-webkit-user-drag: none;
	-khtml-user-drag: none;
	-moz-user-drag: none;
	-o-user-drag: none;
	user-drag: none;
}

.notion-callout .notion-emoji {
	font-size: 1.5rem;
	line-height: 1.235em;
}

.notionblog p a:hover {
	background-color: none !important;
	/* color: aqua !important; */
}

.notion-title {
	margin-bottom: 0.2rem;
}

.notion-h1 {
	margin-bottom: 0.3rem !important;
}

.notion-text em {
	font-style: italic;
}

.notion-hr {
	border: none !important;
	width: 100%;
	height: 0.05rem;
	background-color: #222;
	opacity: 0.3;
}

.notion-blank {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.notion-image-inset {
	border-radius: 0.25rem;
}

.errnotion {
	margin-top: -5rem;
	margin-bottom: 11rem;
}

@media (max-width: 750px) {
	.errnotion {
		margin-top: -3rem;
		margin-bottom: 12rem;
	}
}
</style>
