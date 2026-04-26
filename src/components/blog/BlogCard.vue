<template>
	<router-link :to="`/blog/${post.slug}`" class="post-card">
		<!-- Hero -->
		<div class="post-card__hero">
			<span class="post-card__category">{{ primaryTag }}</span>
			<h2 class="post-card__title">{{ post.title }}</h2>
			<div class="post-card__byline">
				<div class="post-card__avatar" aria-hidden="true">D</div>
				<div class="post-card__byline-text">
					<div class="post-card__author">Divy</div>
					<div class="post-card__role">Associate Product Manager · ASBL</div>
				</div>
			</div>
		</div>

		<!-- Body -->
		<div class="post-card__body">
			<p class="post-card__excerpt">{{ post.excerpt }}</p>
			<div class="post-card__meta">
				<div class="post-card__meta-left">
					<span>{{ formatDate(post.publishedAt) }}</span>
					<span aria-hidden="true">·</span>
					<span>{{ readTime }} min read</span>
				</div>
				<span class="post-card__cta">Read article <span aria-hidden="true">→</span></span>
			</div>
			<div class="post-card__tags">
				<span
					v-for="tag in post.tags"
					:key="tag"
					class="post-card__tag"
					@click.prevent="handleTagClick(tag)"
				>{{ tag }}</span>
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'BlogCard',
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	computed: {
		primaryTag() {
			return this.post.tags?.[0] || ''
		},
		readTime() {
			const words = (this.post.content || '').trim().split(/\s+/).length
			return Math.max(1, Math.ceil(words / 225))
		}
	},
	methods: {
		formatDate(dateString) {
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		},
		handleTagClick(tag) {
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({ event: 'blog:tag_click', tag_name: tag, source: 'blog_card' })
			this.$router.push({ path: '/blog', query: { tag } })
		}
	}
}
</script>

<style scoped lang="scss">
.post-card {
	display: flex;
	flex-direction: column;
	background: #ffffff;
	border: 0.5px solid rgba(15, 23, 42, 0.08);
	border-radius: 12px;
	overflow: hidden;
	text-decoration: none;
	color: inherit;
	height: 100%;
	font-family: var(--font-sans);
	transition: transform 160ms ease, border-color 160ms ease;

	&:hover {
		transform: translateY(-2px);
		border-color: rgba(15, 23, 42, 0.16);

		.post-card__cta {
			letter-spacing: 0.01em;
		}
	}
}

/* ── Hero ── */
.post-card__hero {
	background: #0f172a;
	padding: 30px 28px 26px;
	flex-shrink: 0;
}

.post-card__category {
	display: inline-block;
	font-size: 11px;
	font-weight: 500;
	color: #a5b4fc;
	background: rgba(165, 180, 252, 0.12);
	padding: 4px 10px;
	border-radius: 999px;
	margin-bottom: 18px;
}

.post-card__title {
	font-family: var(--font-display);
	font-size: 26px;
	font-weight: 500;
	color: #f8fafc;
	line-height: 1.25;
	letter-spacing: -0.01em;
	margin: 0 0 22px;
}

.post-card__byline {
	display: flex;
	align-items: center;
	gap: 10px;
}

.post-card__avatar {
	width: 34px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 50%;
	background: #a5b4fc;
	color: #1e1b4b;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 13px;
}

.post-card__byline-text {
	line-height: 1.35;
}

.post-card__author {
	color: #f8fafc;
	font-weight: 500;
	font-size: 13px;
}

.post-card__role {
	color: #94a3b8;
	font-size: 12px;
}

/* ── Body ── */
.post-card__body {
	padding: 22px 28px 20px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.post-card__excerpt {
	font-size: 15px;
	color: #475569;
	line-height: 1.6;
	margin: 0 0 18px;
	flex-grow: 1;
}

.post-card__meta {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 16px;
	border-top: 0.5px solid rgba(15, 23, 42, 0.08);
	gap: 1rem;
}

.post-card__meta-left {
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 12px;
	color: #94a3b8;
	white-space: nowrap;
}

.post-card__cta {
	font-size: 13px;
	font-weight: 500;
	color: #0f172a;
	white-space: nowrap;
	transition: letter-spacing 160ms ease;
}

.post-card__tags {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
	margin-top: 14px;
}

.post-card__tag {
	font-size: 11px;
	padding: 4px 10px;
	border-radius: 999px;
	background: #f1f5f9;
	color: #475569;
	cursor: pointer;
	transition: background 160ms ease, color 160ms ease;

	&:hover {
		background: #0f172a;
		color: #fff;
	}
}

/* ── Responsive ── */
@media (max-width: 480px) {
	.post-card__hero {
		padding: 24px 20px;
	}

	.post-card__title {
		font-size: 22px;
	}

	.post-card__body {
		padding: 18px 20px;
	}
}
</style>
