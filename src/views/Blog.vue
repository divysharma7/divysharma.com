<template>
	<div class="blog-page">
		<div class="container">
			<!-- Header -->
			<div class="blog-header">
				<h1>Blog</h1>
				<p class="subtitle">Thoughts on product, growth, and engineering.</p>
			</div>

			<div class="separator"></div>

			<!-- Tags Section -->
			<div class="tags-section" v-if="allTags.length > 0">
				<div class="tags-header">
					<h2>Popular Tags</h2>
					<button 
						v-if="selectedTag" 
						@click="clearFilter" 
						class="clear-btn"
					>
						Clear filter
					</button>
				</div>
				<div class="tags-list">
					<button
						v-for="tag in allTags"
						:key="tag"
						@click="handleTagClick(tag)"
						class="tag-chip"
						:class="{ active: selectedTag === tag }"
					>
						{{ tag }} ({{ getTagCount(tag) }})
					</button>
				</div>
			</div>

			<!-- Blog Posts -->
			<div class="posts-section">
				<h2 class="posts-title">
					{{ selectedTag ? `Posts tagged "${selectedTag}"` : 'Latest Posts' }}
					<span class="post-count" v-if="filteredPosts.length > 0">
						({{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }})
					</span>
				</h2>
				<BlogList :posts="filteredPosts" />
			</div>
		</div>
	</div>
</template>

<script>
import { posts } from '@/data/posts'
import BlogList from '@/components/blog/BlogList.vue'

export default {
	name: 'Blog',
	components: {
		BlogList
	},
	data() {
		return {
			selectedTag: null,
			allPosts: []
		}
	},
	computed: {
		sortedPosts() {
			return [...this.allPosts].sort((a, b) => {
				return new Date(b.publishedAt) - new Date(a.publishedAt)
			})
		},
		filteredPosts() {
			if (!this.selectedTag) return this.sortedPosts
			return this.sortedPosts.filter(post =>
				post.tags.includes(this.selectedTag)
			)
		},
		allTags() {
			const tagCounts = {}
			this.allPosts.forEach(post => {
				post.tags.forEach(tag => {
					tagCounts[tag] = (tagCounts[tag] || 0) + 1
				})
			})
			return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
		}
	},
	methods: {
		handleTagClick(tag) {
			if (this.selectedTag === tag) {
				this.clearFilter()
			} else {
				this.selectedTag = tag
				this.$router.replace({ path: '/blog', query: { tag } })
			}
		},
		clearFilter() {
			this.selectedTag = null
			this.$router.replace({ path: '/blog' })
		},
		getTagCount(tag) {
			return this.allPosts.filter(post => post.tags.includes(tag)).length
		}
	},
	mounted() {
		this.allPosts = posts
		// Read tag from URL query
		if (this.$route.query.tag) {
			this.selectedTag = this.$route.query.tag
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Thoughts, essays, and articles on product management, growth, and software engineering.' },
    { property: 'og:title', content: 'Blog | Divy Sharma' },
    { property: 'og:description', content: 'Writing about product, tech, and building things.' }
  ]
})
</script>

<style scoped lang="scss">
.blog-page {
	padding: 4rem 0;
	min-height: 80vh;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
}

.blog-header {
	text-align: center;
	margin-bottom: 2rem;

	h1 {
		font-size: var(--h1);
		font-weight: 400;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
		letter-spacing: -0.02em;
		line-height: 1.1;
		font-family: var(--font-sans);
	}

	.subtitle {
		font-size: 1.1rem;
		color: #666;
		max-width: 600px;
		margin: 0 auto;
	}
}

.separator {
	height: 1px;
	background: #eee;
	margin: 3rem 0;
}

.tags-section {
	margin-bottom: 3rem;
}

.tags-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 1.5rem;
	gap: 0.5rem;

	h2 {
		font-size: var(--h3);
		font-weight: 600;
		margin: 0;
		color: var(--heading-color);
	}

	.clear-btn {
		background: none;
		border: none;
		color: #666;
		text-decoration: underline;
		font-size: 0.9rem;
		cursor: pointer;
		transition: color 0.2s;

		&:hover {
			color: #000;
		}
	}
}

.tags-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	justify-content: center; /* Center align tags */
}

.tag-chip {
	padding: 1rem 1.75rem; /* Larger padding as requested */
	background: #f8f9fa;
	border: 1px solid #e9ecef;
	border-radius: 50px; /* Pill shape */
	font-size: 0.95rem;
	color: #495057;
	cursor: pointer;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100px; /* Ensure minimum width for better look */
	text-align: center;

	&:hover {
		background: #e9ecef;
		color: #212529;
		border-color: #dee2e6;
	}

	&.active {
		background: #212529;
		color: #fff;
		border-color: #212529;
	}
}

.posts-section {
	.posts-title {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0 0 2rem 0;
		color: #111;

		.post-count {
			font-size: 1rem;
			font-weight: 400;
			color: #999;
			margin-left: 0.5rem;
		}
	}
}

@media (max-width: 768px) {
	.blog-page {
		padding: 2rem 0;
	}

	.container {
		padding: 0 1.5rem;
	}

	.blog-header {
		h1 {
			font-size: var(--h1);
		}

		.subtitle {
			font-size: 1rem;
		}
	}

	.tags-header {
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.tags-list {
		gap: 0.5rem;
		padding: 0 1rem;
	}

	.tag-chip {
		padding: 0.75rem 1.25rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		min-width: unset;
		width: auto;
		flex: 0 0 auto;
	}

	.posts-section .posts-title {
		font-size: 1.5rem;
	}
}
</style>
