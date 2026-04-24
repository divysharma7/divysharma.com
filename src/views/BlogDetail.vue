<template>
	<div class="reading-page">
		<!-- Not found -->
		<div v-if="!post" class="not-found">
			<router-link to="/blog" class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
				Back to posts
			</router-link>
			<h1>Post not found</h1>
			<p>This post doesn't exist or may have been moved.</p>
		</div>

		<template v-else>
			<div class="container">
				<router-link to="/blog" class="back-link">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
					Back to posts
				</router-link>

				<h1 class="post-title">{{ post.title }}</h1>
				<p class="post-dek">{{ post.excerpt }}</p>

				<div class="meta-row">
					<div class="meta-date">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
						<span>{{ formatDateLong(post.publishedAt) }}</span>
					</div>
					<button class="share-trigger" @click="showShareModal = true">Share</button>
				</div>

				<!-- Stats bar -->
				<div class="stats-bar">
					<span class="stat"><i class="ph-bold ph-clock"></i> {{ readTime }} min read</span>
				</div>

				<hr class="post-rule" />

				<!-- Article + Sidebar TOC -->
				<div class="article-layout">
					<div class="post-body" v-html="formattedContent"></div>

					<aside class="toc-sidebar" v-if="tocItems.length">
						<nav class="toc-sidebar-nav">
							<a
								v-for="item in tocItems"
								:key="item.id"
								:href="'#' + item.id"
								class="toc-sidebar-item"
								:class="{
									'toc-sidebar-item--active': activeSection === item.id,
									'toc-sidebar-item--h3': item.level === 3
								}"
								@click.prevent="handleTocClick(item.id)"
							>{{ item.text }}</a>
						</nav>
					</aside>
				</div>

				<!-- Related posts -->
				<section class="related" v-if="relatedPosts.length">
					<h2 class="related-heading">Other posts you might like</h2>
					<div class="related-list">
						<router-link v-for="p in relatedPosts" :key="p.slug" :to="`/blog/${p.slug}`" class="related-item">
							<div class="related-content">
								<span class="related-date">{{ formatDateLong(p.publishedAt) }}</span>
								<p class="related-title">{{ p.title }}</p>
								<p class="related-desc">{{ p.excerpt }}</p>
								<span class="related-meta"><i class="ph-bold ph-clock"></i> {{ getReadTime(p) }} min read</span>
							</div>
						</router-link>
					</div>
					<div class="view-all-wrap">
						<router-link to="/blog" class="view-all-btn">← Back to blog</router-link>
					</div>
				</section>
			</div>

			<!-- ── Bottom section bar (click → TOC) ── -->
			<transition name="bar-slide">
				<div class="section-bar" v-if="tocItems.length && progress > 2" role="button" tabindex="0" @keydown.enter="showToc = true" @click="showToc = true">
					<div class="section-bar-inner">
						<span class="section-dot">●</span>
						<span class="section-label">{{ activeSectionName }}</span>
						<svg class="progress-ring" width="28" height="28" viewBox="0 0 36 36">
							<circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2.5" />
							<circle cx="18" cy="18" r="14" fill="none" stroke="#fff" stroke-width="2.5"
								stroke-linecap="round"
								:stroke-dasharray="circumference"
								:stroke-dashoffset="circumference * (1 - progress / 100)"
								transform="rotate(-90 18 18)" />
						</svg>
					</div>
				</div>
			</transition>

			<!-- ── TOC overlay ── -->
			<transition name="toc-fade">
				<div v-if="showToc" class="toc-overlay" @click.self="showToc = false">
					<transition name="toc-slide">
						<div v-if="showToc" class="toc-panel">
							<p class="toc-heading">TABLE OF CONTENTS</p>
							<nav class="toc-nav">
								<a
									v-for="item in tocItems"
									:key="item.id"
									:href="'#' + item.id"
									class="toc-item"
									:class="{
										active: activeSection === item.id,
										'toc-item--h3': item.level === 3
									}"
									@click="handleTocClick(item.id)"
								>
									<span class="toc-item-text">{{ item.text }}</span>
									<span v-if="activeSection === item.id" class="toc-item-dot">●</span>
								</a>
							</nav>

							<!-- Bottom bar mirror inside overlay -->
							<div class="toc-bottom-bar">
								<span class="section-dot">●</span>
								<span class="section-label">{{ activeSectionName }}</span>
								<svg class="progress-ring" width="28" height="28" viewBox="0 0 36 36">
									<circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2.5" />
									<circle cx="18" cy="18" r="14" fill="none" stroke="#fff" stroke-width="2.5"
										stroke-linecap="round"
										:stroke-dasharray="circumference"
										:stroke-dashoffset="circumference * (1 - progress / 100)"
										transform="rotate(-90 18 18)" />
								</svg>
							</div>
						</div>
					</transition>
				</div>
			</transition>

			<!-- ── Share modal ── -->
			<transition name="modal-fade">
				<div v-if="showShareModal" class="share-overlay" @click.self="showShareModal = false">
					<div class="share-modal">
						<button class="share-close" @click="showShareModal = false">✕</button>
						<h3 class="share-modal-heading">Share this post</h3>
						<p class="share-modal-title">"{{ post.title }}"</p>
						<div class="share-copy-section">
							<p class="share-section-label">Copy link</p>
							<div class="share-copy-row">
								<input :value="currentUrl" readonly class="share-url-input" />
								<button @click="doCopyLink" class="share-copy-btn" :title="linkCopied ? 'Copied!' : 'Copy'">
									<svg v-if="!linkCopied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
									<svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
								</button>
							</div>
						</div>
						<div class="share-on-section">
							<p class="share-section-label">Share on</p>
							<div class="share-on-btns">
								<button @click="shareX" class="share-platform-btn">
									<span class="platform-icon">𝕏</span> X / Twitter
								</button>
								<button @click="shareLinkedIn" class="share-platform-btn">
									<span class="platform-icon">in</span> LinkedIn
								</button>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</template>
	</div>
</template>

<script>
import { posts } from '@/data/posts'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

function sanitizeUrl(url) {
	try {
		const parsed = new URL(url, window.location.origin)
		if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) return url
		return '#'
	} catch {
		return '#'
	}
}

function escapeHtml(str) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export default {
	name: 'BlogDetail',
	setup() {
		const route = useRoute()
		const post = computed(() => posts.find(p => p.slug === route.params.slug) || null)

		useHead(computed(() => {
			if (!post.value) return { title: 'Post not found' }
			return {
				title: post.value.title,
				meta: [
					{ name: 'description', content: post.value.excerpt },
					{ property: 'og:title', content: `${post.value.title} | Divy Sharma` },
					{ property: 'og:description', content: post.value.excerpt },
					{ property: 'og:type', content: 'article' },
					{ name: 'twitter:card', content: 'summary_large_image' },
				]
			}
		}))
	},
	data() {
		return {
			post: null,
			progress: 0,
			activeSection: '',
			showShareModal: false,
			showToc: false,
			linkCopied: false,
		}
	},
	computed: {
		circumference() {
			return 2 * Math.PI * 14
		},
		currentUrl() {
			if (typeof window === 'undefined') return ''
			return `${window.location.origin}${window.location.pathname}?utm_source=copy_link&utm_medium=social&utm_campaign=blog_share`
		},
		readTime() {
			const words = (this.post?.content || '').trim().split(/\s+/).length
			return Math.max(1, Math.ceil(words / 225))
		},
		tocItems() {
			if (!this.post) return []
			const slugify = t => t.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
			const items = []
			for (const line of this.post.content.split('\n')) {
				const m = line.match(/^(#{2,3}) (.+)$/)
				if (m) items.push({ id: slugify(m[2]), text: m[2].trim(), level: m[1].length })
			}
			return items
		},
		activeSectionName() {
			const item = this.tocItems.find(i => i.id === this.activeSection)
			return item?.text || (this.tocItems[0]?.text ?? '')
		},
		formattedContent() {
			if (!this.post) return ''
			const slugify = t => t.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
			let html = this.post.content
			html = html.replace(/^---$/gim, '<hr>')
			html = html.replace(/^### (.*$)/gim, (_, t) => `<h3 id="${slugify(t)}">${t.trim()}</h3>`)
			html = html.replace(/^## (.*$)/gim, (_, t) => `<h2 id="${slugify(t)}">${t.trim()}</h2>`)
			html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
			html = html.replace(/((<li>[^\n]*<\/li>\n?)+)/g, m => '<ul>' + m.replace(/\n/g, '') + '</ul>')
			html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			html = html.replace(/==([^=\n]+)==/g, '<mark>$1</mark>')
			html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
				`<img src="${sanitizeUrl(src)}" alt="${escapeHtml(alt)}" class="blog-image" loading="lazy" />`)
			html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) =>
				`<a href="${sanitizeUrl(href)}" target="_blank" rel="noopener">${escapeHtml(text)}</a>`)
			html = html.replace(/\n\n/g, '</p><p>')
			html = html.replace(/\n/g, '<br>')
			return `<p>${html}</p>`
		},
		relatedPosts() {
			if (!this.post) return []
			const related = posts.filter(p =>
				p.slug !== this.post.slug &&
				p.tags.some(t => this.post.tags.includes(t))
			)
			return (related.length ? related : posts.filter(p => p.slug !== this.post.slug)).slice(0, 3)
		}
	},
	methods: {
		formatDateLong(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric', month: 'long', day: 'numeric'
			})
		},
		loadPost() {
			this.post = posts.find(p => p.slug === this.$route.params.slug) || null
			this.progress = 0
			this.activeSection = ''
			this.showShareModal = false
			this.showToc = false
			this.linkCopied = false
		},
		onScroll() {
			const docHeight = document.body.scrollHeight - window.innerHeight
			this.progress = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
			this.updateActiveSection()
		},
		updateActiveSection() {
			if (!this.post || !this.$el) return
			const headings = this.$el.querySelectorAll('h2[id], h3[id]')
			if (!headings.length) return
			let active = headings[0].id
			for (const h of headings) {
				if (h.getBoundingClientRect().top <= 120) active = h.id
			}
			this.activeSection = active
		},
		handleTocClick(id) {
			this.showToc = false
			this.$nextTick(() => {
				const el = document.getElementById(id)
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					setTimeout(() => { this.activeSection = id }, 350)
				}
			})
		},
		shareUrl(source) {
			const base = window.location.origin + window.location.pathname
			return `${base}?utm_source=${source}&utm_medium=social&utm_campaign=blog_share`
		},
		doCopyLink() {
			navigator.clipboard?.writeText(this.shareUrl('copy_link'))
			this.linkCopied = true
			setTimeout(() => { this.linkCopied = false }, 2000)
		},
		shareX() {
			const url = this.shareUrl('twitter')
			window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(this.post.title)}`, '_blank')
			this.showShareModal = false
		},
		getReadTime(post) {
			const words = (post?.content || '').trim().split(/\s+/).length
			return Math.max(1, Math.ceil(words / 225))
		},
		shareLinkedIn() {
			const url = this.shareUrl('linkedin')
			window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
			this.showShareModal = false
		}
	},
	mounted() {
		this.loadPost()
		window.addEventListener('scroll', this.onScroll)
		this.$nextTick(() => this.updateActiveSection())
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	},
	watch: {
		'$route.params.slug'() {
			this.loadPost()
			this.$nextTick(() => this.updateActiveSection())
		},
		post() {
			this.$nextTick(() => this.updateActiveSection())
		},
		showToc(open) {
			document.body.style.overflow = open ? 'hidden' : ''
		}
	}
}
</script>

<style scoped lang="scss">
/* ── skeleton.css reset ── */
button {
	text-transform: none;
	letter-spacing: normal;
	height: auto;
	line-height: normal;
	font-family: inherit;
	font-size: inherit;
	background: none;
	border: none;
	cursor: pointer;
}

/* ── Layout ── */
.reading-page {
	min-height: 100vh;
	font-family: var(--font-sans);
	padding-bottom: 5rem;
}

.container {
	max-width: var(--container-wide);
	margin: 0 auto;
	padding: 3rem 2rem 4rem;
}

.not-found {
	max-width: var(--container);
	margin: 0 auto;
	padding: 3rem 2rem;
	h1 { font-size: 1.5rem; font-weight: 600; color: var(--color-heading); margin: 1rem 0 0.5rem; }
	p { color: var(--color-muted); }
}

.back-link {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: var(--text-sm);
	font-weight: 500;
	color: var(--color-heading);
	text-decoration: none;
	margin-bottom: 2.5rem;
	transition: opacity 0.15s;
	&:hover { opacity: 0.6; }
}

.post-title {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	letter-spacing: -0.025em;
	text-wrap: balance;
	margin: 0 0 1.25rem;
}

.post-dek {
	font-size: var(--text-lg);
	color: var(--color-muted);
	line-height: var(--leading-normal);
	margin: 0 0 1.75rem;
}

.meta-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.25rem;
}

.meta-date {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: var(--text-sm);
	color: var(--color-muted);
	svg { color: var(--color-muted); }
}

.share-trigger {
	padding: 0.4375rem 1.25rem;
	font-size: var(--text-sm);
	color: var(--color-body);
	border: 1px solid var(--color-faint);
	border-radius: var(--radius-sm);
	transition: border-color 0.15s;
	&:hover { border-color: var(--color-muted); }
}

/* ── Stats bar ── */
.stats-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.stat {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: var(--text-sm);
	color: var(--color-muted);

	i { font-size: var(--text-sm); }
}

.post-rule {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 0 0 2.5rem;
}

/* ── Article + Sidebar layout ── */
.article-layout {
	display: grid;
	grid-template-columns: 1fr 220px;
	gap: 3rem;
	align-items: start;
}

/* ── Sticky TOC Sidebar ── */
.toc-sidebar {
	position: sticky;
	top: 5rem;
	max-height: calc(100vh - 6rem);
	overflow-y: auto;
	padding: 1rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
}

.toc-sidebar-nav {
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
}

.toc-sidebar-item {
	font-size: var(--text-xs);
	color: var(--color-muted);
	text-decoration: none;
	padding: 0.25rem 0.5rem;
	border-radius: var(--radius-sm);
	line-height: var(--leading-snug);
	transition: color var(--duration-fast), background var(--duration-fast);

	&:hover {
		color: var(--color-heading);
	}

	&--active {
		color: var(--color-heading);
		font-weight: 600;
	}

	&--h3 {
		padding-left: 1.25rem;
	}
}

/* ── Article body ── */
.post-body {
	font-size: var(--text-base);
	line-height: var(--leading-relaxed);
	color: var(--color-body);

	:deep(h2) {
		font-size: 26px;
		font-weight: 700;
		color: var(--color-heading);
		line-height: 1.3;
		margin: 2.5em 0 0.75em;
	}

	:deep(h3) {
		font-size: 20px;
		font-weight: 600;
		color: var(--color-heading);
		line-height: var(--leading-snug);
		margin: 2em 0 0.6em;
	}

	:deep(p) { margin-bottom: 1.5em; }

	:deep(strong) { font-weight: 600; color: var(--color-heading); }

	:deep(a) {
		color: var(--color-heading);
		text-decoration: underline;
		text-decoration-color: var(--color-faint);
		text-underline-offset: 3px;
		transition: text-decoration-color 0.15s;
		&:hover { text-decoration-color: var(--color-heading); }
	}

	:deep(blockquote) {
		font-style: italic;
		font-size: var(--text-lg);
		line-height: var(--leading-normal);
		color: var(--color-body);
		border-left: 3px solid var(--color-faint);
		margin: 2em 0;
		padding: 0.2em 0 0.2em 1.25em;
	}

	:deep(ul) { margin: 1.5em 0; padding-left: 1.25em; }

	:deep(li) {
		margin-bottom: 0.65em;
		line-height: var(--leading-relaxed);
		padding-left: 0.5em;
	}

	:deep(mark) {
		background: linear-gradient(transparent 40%, rgba(253, 184, 73, 0.35) 40%);
		color: inherit;
		padding: 0 0.125rem;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}

	:deep(.blog-image) {
		width: 100%;
		max-width: 100%;
		height: auto;
		border-radius: var(--radius-sm);
		margin: 2em 0;
		display: block;
		object-fit: contain;
	}

	:deep(hr) {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: 2.5em 0;
	}
}

/* ── Related posts ── */
.related { margin-top: 4rem; }

.related-heading {
	font-family: var(--font-sans);
	font-size: var(--h3);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	margin: 0 0 1.5rem;
}

.related-list {
	display: flex;
	flex-direction: column;
}

.related-item {
	display: block;
	padding: 1.5rem 0;
	text-decoration: none;
	border-top: 1px solid var(--color-border);
	transition: opacity 0.15s;
	&:hover { opacity: 0.7; }
	&:last-child { border-bottom: 1px solid var(--color-border); }
}

.related-content { min-width: 0; }

.related-date {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin-bottom: 0.25rem;
	display: block;
}

.related-title {
	font-size: var(--text-base);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-snug);
	margin: 0 0 0.25rem;
}

.related-desc {
	font-size: var(--text-sm);
	color: var(--color-body);
	line-height: var(--leading-normal);
	margin: 0 0 0.5rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.related-meta {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	font-size: var(--text-xs);
	color: var(--color-muted);
	i { font-size: var(--text-xs); }
}

.related-cta {
	font-size: var(--text-sm);
	color: var(--color-muted);
	white-space: nowrap;
	flex-shrink: 0;
	margin-top: 0.25rem;
	transition: color 0.15s;
}

.related-item:hover .related-cta { color: var(--color-body); }

.related-rule {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 2.5rem 0;
}

.view-all-wrap { text-align: center; padding-bottom: 1rem; }

.view-all-btn {
	display: inline-block;
	padding: 0.75rem 1.75rem;
	font-size: var(--text-sm);
	font-weight: 500;
	color: #fff;
	background: #111;
	border-radius: var(--radius-sm);
	text-decoration: none;
	transition: background 0.15s;
	&:hover { background: #333; }
}

/* ── Bottom section bar ── */
.section-bar {
	position: fixed;
	bottom: 1.5rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 100;
	cursor: pointer;
}

.section-bar-inner {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	background: #1a1a1a;
	color: #fff;
	padding: 0.625rem 1.25rem;
	border-radius: var(--radius-pill);
	font-size: var(--text-sm);
	font-weight: 500;
	box-shadow: 0 4px 24px rgba(0,0,0,0.18);
	max-width: 320px;
	transition: background 0.15s, box-shadow 0.15s;
}

.section-bar:hover .section-bar-inner {
	background: #2a2a2a;
	box-shadow: 0 6px 32px rgba(0,0,0,0.25);
}

.section-dot { font-size: 8px; flex-shrink: 0; }

.section-label {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.progress-ring { flex-shrink: 0; margin-left: auto; }

.bar-slide-enter-active { transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s; }
.bar-slide-leave-active { transition: transform 0.2s ease, opacity 0.15s; }
.bar-slide-enter-from { transform: translateX(-50%) translateY(60px); opacity: 0; }
.bar-slide-leave-to { transform: translateX(-50%) translateY(40px); opacity: 0; }

/* ── TOC overlay ── */
.toc-overlay {
	position: fixed;
	inset: 0;
	z-index: 1200;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 1rem;
}

.toc-panel {
	width: 100%;
	max-width: 520px;
	max-height: 80vh;
	background: #1a1a1a;
	border-radius: var(--radius-md);
	padding: 2rem 1.75rem 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	margin-bottom: 0.5rem;
}

.toc-heading {
	font-size: var(--text-xs);
	font-weight: 600;
	color: rgba(255,255,255,0.4);
	letter-spacing: 0.12em;
	text-transform: uppercase;
	margin: 0 0 1.25rem;
	padding: 0 0.5rem;
}

.toc-nav {
	display: flex;
	flex-direction: column;
	gap: 0;
	overflow-y: auto;
	flex: 1;
	padding-bottom: 1rem;
	-webkit-overflow-scrolling: touch;
}

.toc-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.875rem 1rem;
	border-radius: var(--radius-md);
	font-size: var(--text-base);
	font-weight: 400;
	color: rgba(255,255,255,0.5);
	text-decoration: none;
	transition: background 0.15s, color 0.15s;
	gap: 0.75rem;

	&:hover {
		background: rgba(255,255,255,0.06);
		color: rgba(255,255,255,0.75);
	}

	&.active {
		background: rgba(255,255,255,0.1);
		color: #fff;
		font-weight: 500;
	}
}

.toc-item--h3 {
	padding-left: 2.25rem;
	font-size: var(--text-sm);
}

.toc-item-text {
	flex: 1;
	min-width: 0;
}

.toc-item-dot {
	font-size: 8px;
	color: #fff;
	flex-shrink: 0;
}

.toc-bottom-bar {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	padding: 0.875rem 1rem;
	margin: 0 -1.75rem;
	border-top: 1px solid rgba(255,255,255,0.08);
	background: #1a1a1a;
	font-size: var(--text-sm);
	font-weight: 500;
	color: #fff;
	border-radius: 0 0 20px 20px;
}

/* TOC transitions */
.toc-fade-enter-active { transition: opacity 0.25s; }
.toc-fade-leave-active { transition: opacity 0.2s; }
.toc-fade-enter-from, .toc-fade-leave-to { opacity: 0; }

.toc-slide-enter-active { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s; }
.toc-slide-leave-active { transition: transform 0.2s ease, opacity 0.15s; }
.toc-slide-enter-from { transform: translateY(60px); opacity: 0; }
.toc-slide-leave-to { transform: translateY(40px); opacity: 0; }

/* ── Share modal ── */
.share-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0,0,0,0.25);
	backdrop-filter: blur(2px);
	z-index: 1100;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
}

.share-modal {
	background: #fff;
	border-radius: var(--radius-md);
	padding: 2rem 2rem 1.75rem;
	max-width: 440px;
	width: 100%;
	position: relative;
	box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.share-close {
	position: absolute;
	top: 1rem;
	right: 1rem;
	font-size: var(--text-lg);
	color: var(--color-muted);
	padding: 0.25rem;
	transition: color 0.15s;
	&:hover { color: var(--color-body); }
}

.share-modal-heading {
	font-size: var(--text-lg);
	font-weight: 700;
	color: var(--color-heading);
	margin: 0 0 0.375rem;
}

.share-modal-title {
	font-size: var(--text-sm);
	color: var(--color-muted);
	margin: 0 0 1.5rem;
	font-style: italic;
}

.share-section-label {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.5rem;
}

.share-copy-row {
	display: flex;
	gap: 0;
	margin-bottom: 1.5rem;
}

.share-url-input {
	flex: 1;
	height: auto;
	padding: 0.5625rem 0.75rem;
	font-size: var(--text-sm);
	color: var(--color-body);
	border: 1px solid var(--color-faint);
	border-right: none;
	border-radius: 8px 0 0 8px;
	background: var(--color-bg-subtle);
	font-family: inherit;
	min-width: 0;
	box-sizing: border-box;
}

.share-copy-btn {
	padding: 0.5625rem 0.875rem;
	border: 1px solid var(--color-faint);
	border-radius: 0 8px 8px 0;
	color: var(--color-body);
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.15s;
	&:hover { background: var(--color-border); }
}

.share-on-btns { display: flex; gap: 0.5rem; }

.share-platform-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5625rem 1.125rem;
	font-size: var(--text-sm);
	color: var(--color-body);
	border: 1px solid var(--color-faint);
	border-radius: var(--radius-sm);
	transition: border-color 0.15s;
	&:hover { border-color: var(--color-muted); }
}

.platform-icon { font-weight: 700; font-size: var(--text-sm); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 900px) {
	.article-layout {
		grid-template-columns: 1fr;
	}

	.toc-sidebar { display: none; }
}

@media (max-width: 640px) {
	.container { padding: 2rem 1.25rem 4rem; }
	.post-title { font-size: var(--h2); }
	.post-dek { font-size: var(--text-base); }
	.related-heading { font-size: var(--text-xl); }
	.section-bar-inner { max-width: 260px; font-size: var(--text-xs); padding: 0.5625rem 1rem; }
	.toc-panel { max-width: 100%; border-radius: var(--radius-md) var(--radius-md) 0 0; margin-bottom: 0; }
	.toc-item { font-size: var(--text-sm); padding: 0.75rem 0.875rem; }
	.toc-item--h3 { padding-left: 1.875rem; font-size: var(--text-sm); }
}
</style>
