<template>
	<div class="blog-page">

		<!-- ── Hero ── -->
		<PageHero
			:icon="Notebook"
			title="Essays"
			subtitle="Essays on product management, career, and shipping software people actually use."
		>
			<!-- Search -->
			<div class="blog-search">
				<svg class="blog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
				</svg>
				<input
					v-model="searchQuery"
					placeholder="Search..."
					aria-label="Search posts"
					class="blog-search-input"
				/>
			</div>
		</PageHero>

		<!-- ── Content: Posts + Sidebar ── -->
		<div class="blog-container">
			<div class="blog-layout">

				<!-- Left: Post list -->
				<div class="post-list">
					<router-link
						v-for="(post, index) in filteredPosts"
						:key="post.slug"
						:to="`/blog/${post.slug}`"
						class="post-row"
						@click="gtmPush('click:blog_post', { post_title: post.title, post_slug: post.slug, position: index + 1 })"
					>
						<img
							v-if="post.heroImage"
							:src="post.heroImage"
							:alt="post.heroAlt || post.title"
							class="post-row-hero"
							loading="lazy"
						/>
						<div class="post-row-content">
							<div class="post-row-body">
								<span class="post-row-date">{{ formatDate(post.publishedAt) }}</span>
								<h2 class="post-row-title">{{ post.title }}</h2>
								<p class="post-row-excerpt">{{ post.excerpt }}</p>
								<div class="post-row-meta">
									<span class="post-row-stat"><Clock :size="12" /> {{ readTime(post) }} min read</span>
								</div>
							</div>
							<span class="post-row-tag" v-if="post.tags[0]">{{ post.tags[0] }}</span>
						</div>
					</router-link>

					<!-- Empty state -->
					<div class="empty-state" v-if="filteredPosts.length === 0">
						<p>No posts found{{ searchQuery ? ` for "${searchQuery}"` : '' }}. Try a different search or browse all posts.</p>
					</div>
				</div>

				<!-- Right: Sidebar -->
				<aside class="blog-sidebar">
					<div class="sidebar-section">
						<h3 class="sidebar-heading">Choose topics</h3>
						<div class="sidebar-tags">
							<button
								class="sidebar-tag"
								:class="{ active: !selectedTag }"
								@click="selectTag(null)"
							>all</button>
							<button
								v-for="tag in tagsByCount"
								:key="tag"
								class="sidebar-tag"
								:class="{ active: selectedTag === tag }"
								@click="selectTag(tag)"
							>{{ tag.toLowerCase() }}</button>
						</div>
					</div>
				</aside>

			</div>
		</div>

		<!-- ── Book a Call ── -->
		<div class="blog-container">
			<CTA />
		</div>

	</div>
</template>

<script>
import { posts } from '@/data/posts'
import CTA from '@/components/CTA.vue'
import PageHero from '@/components/PageHero.vue'
import { Notebook, Clock } from 'lucide-vue-next'

export default {
	name: 'Blog',
	components: { CTA, PageHero },
	data() {
		return {
			allPosts: [],
			selectedTag: null,
			searchQuery: '',
		}
	},
	computed: {
		sortedPosts() {
			return [...this.allPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
		},
		tagsByCount() {
			const counts = {}
			this.allPosts.forEach(p => p.tags.forEach(t => { counts[t] = (counts[t] || 0) + 1 }))
			return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([t]) => t)
		},
		filteredPosts() {
			let pool = this.sortedPosts
			if (this.searchQuery.trim()) {
				const q = this.searchQuery.toLowerCase()
				pool = pool.filter(p =>
					p.title.toLowerCase().includes(q) ||
					p.excerpt.toLowerCase().includes(q)
				)
			} else if (this.selectedTag) {
				pool = pool.filter(p => p.tags.includes(this.selectedTag))
			}
			return pool
		}
	},
	methods: {
		gtmPush(event, params) {
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({ event, ...params })
		},
		selectTag(tag) {
			this.gtmPush('blog:filter_tag', { tag_name: tag || 'all' })
			this.selectedTag = tag
			this.searchQuery = ''
			if (tag) {
				this.$router.replace({ path: '/blog', query: { tag } })
			} else {
				this.$router.replace({ path: '/blog' })
			}
		},
		formatDate(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric', month: 'long', day: 'numeric'
			})
		},
		readTime(post) {
			const words = (post.content || '').trim().split(/\s+/).length
			return Math.max(1, Math.ceil(words / 225))
		}
	},
	mounted() {
		this.allPosts = posts.filter(p => !p.draft)
		if (this.$route.query.tag) this.selectedTag = this.$route.query.tag
	},
	watch: {
		'$route.query.tag'(tag) {
			this.selectedTag = tag || null
		},
		searchQuery(val) {
			clearTimeout(this._searchTimer)
			if (val.length >= 2) {
				this._searchTimer = setTimeout(() => {
					this.gtmPush('blog:search', { search_query: val })
				}, 500)
			}
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
	title: 'Essays',
	meta: [
		{ name: 'description', content: 'Essays on product management, career, and shipping software people actually use.' },
		{ property: 'og:title', content: "Essays | Divy Sharma" },
		{ property: 'og:description', content: 'Essays on product, career, and shipping software.' }
	]
})
</script>

<style scoped lang="scss">
button {
	text-transform: none;
	letter-spacing: normal;
	height: auto;
	line-height: normal;
	font-family: var(--font-sans);
	font-size: inherit;
	background-color: transparent;
	border: none;
	cursor: pointer;
}

.blog-page {
	min-height: 100vh;
	font-family: var(--font-sans);
}

/* ── Search ── */
.blog-search {
	position: relative;
	max-width: 420px;
	margin: 0 auto;
}

.blog-search-icon {
	position: absolute;
	left: 0.875rem;
	top: 50%;
	transform: translateY(-50%);
	color: var(--color-muted);
	pointer-events: none;
}

.blog-search-input {
	width: 100%;
	padding: 0.625rem 1rem 0.625rem 2.5rem;
	font-size: var(--text-sm);
	font-family: var(--font-sans);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	color: var(--color-heading);
	background: var(--color-bg);
	box-sizing: border-box;
	transition: border-color var(--duration-fast);

	&::placeholder { color: var(--color-muted); }
	&:focus { border-color: var(--color-faint); }
}

/* ── Layout ── */
.blog-container {
	max-width: var(--container-wide);
	margin: 0 auto;
	padding: 0 2rem 4rem;
}

.blog-layout {
	display: grid;
	grid-template-columns: 1fr 240px;
	gap: 3rem;
	align-items: start;
}

/* ── Post list ── */
.post-list {
	display: flex;
	flex-direction: column;
}

.post-row {
	display: flex;
	flex-direction: column;
	gap: 0;
	padding: 1.5rem 0;
	border-top: 1px solid var(--color-border);
	text-decoration: none;
	transition: opacity var(--duration-fast);

	&:last-child { border-bottom: 1px solid var(--color-border); }
	&:hover { opacity: 0.7; }
}

.post-row-hero {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	border-radius: var(--radius-sm);
	margin-bottom: 1rem;
}

.post-row-content {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1.5rem;
}

.post-row-body {
	flex: 1;
	min-width: 0;
}

.post-row-date {
	display: block;
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin-bottom: 0.25rem;
}

.post-row-title {
	font-size: var(--text-base);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-snug);
	margin: 0 0 0.25rem;
}

.post-row-excerpt {
	font-size: var(--text-sm);
	color: var(--color-body);
	line-height: var(--leading-normal);
	margin: 0 0 0.5rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.post-row-meta {
	display: flex;
	gap: 1rem;
}

.post-row-stat {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	font-size: var(--text-xs);
	color: var(--color-muted);
	i { font-size: var(--text-xs); }
}

.post-row-tag {
	font-size: var(--text-xs);
	color: var(--color-muted);
	white-space: nowrap;
	flex-shrink: 0;
	align-self: center;
}

/* ── Sidebar ── */
.blog-sidebar {
	position: sticky;
	top: 5rem;
}

.sidebar-section {
	margin-bottom: 2rem;
}

.sidebar-heading {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.75rem;
}

.sidebar-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.375rem;
}

.sidebar-tag {
	font-size: var(--text-xs);
	padding: 0.25rem 0.625rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	color: var(--color-body);
	background: transparent;
	cursor: pointer;
	transition: border-color var(--duration-fast), color var(--duration-fast);

	&:hover {
		border-color: var(--color-faint);
		color: var(--color-heading);
	}

	&.active {
		background: var(--color-heading);
		color: #fff;
		border-color: var(--color-heading);
	}
}

/* ── Empty state ── */
.empty-state {
	text-align: center;
	padding: 3rem 0;
	color: var(--color-muted);
	font-size: var(--text-sm);
}

/* ── Responsive ── */
@media (max-width: 768px) {
	.blog-layout {
		grid-template-columns: 1fr;
	}

	.blog-sidebar {
		position: static;
		border-top: 1px solid var(--color-border);
		padding-top: 1.5rem;
	}

	.blog-container { padding: 0 1.25rem 3rem; }
}
</style>
