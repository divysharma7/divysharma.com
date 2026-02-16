<template>
	<router-link :to="`/blog/${post.slug}`" class="blog-card">
		<div class="card-image" v-if="post.coverImageUrl">
			<img :src="post.coverImageUrl" :alt="post.title" />
		</div>
		<div class="card-content">
			<h3 class="card-title">{{ post.title }}</h3>
			<p class="card-excerpt">{{ post.excerpt }}</p>
			<div class="card-meta">
				<div class="card-tags">
					<span 
						v-for="tag in post.tags" 
						:key="tag" 
						class="tag"
						@click.prevent="handleTagClick(tag)"
					>
						{{ tag }}
					</span>
				</div>
				<span class="card-date">{{ formatDate(post.publishedAt) }}</span>
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
			this.$router.push({ path: '/blog', query: { tag } })
		}
	}
}
</script>

<style scoped lang="scss">

.blog-card {
	display: flex;
	flex-direction: column;
	background: #fff;
	border: 1px solid #e0d8cc;
	border-radius: 16px;
	overflow: hidden;
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	text-decoration: none;
	color: inherit;
	height: 100%;
	font-family: var(--fontSans), sans-serif;

	&:hover {
		transform: translateY(-6px);
		box-shadow: 0 12px 24px rgba(6, 12, 23, 0.08);
		border-color: #d0c8be;

		.card-title {
			color: #000;
		}

		.card-image img {
			transform: scale(1.05);
		}
	}
}

.card-image {
	width: 100%;
	height: 220px;
	overflow: hidden;
	background: #f0ebe4;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
}

.card-content {
	padding: 1.75rem;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.card-title {
	font-size: 1.35rem;
	font-weight: 700;
	margin: 0 0 0.75rem 0;
	color: #060c17;
	line-height: 1.3;
	transition: color 0.2s;
}

.card-excerpt {
	font-size: 0.95rem;
	color: var(--red-text, #6a788c);
	line-height: 1.6;
	margin: 0 0 1.5rem 0;
	flex-grow: 1;
	opacity: 0.9;
}

.card-meta {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 1rem;
	margin-top: auto;
	padding-top: 1.25rem;
	border-top: 1px solid #f0ebe4;
}

.card-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
}

.tag {
	display: inline-block;
	padding: 0.25rem 0.65rem;
	background: #f8f9fa;
	border: 1px solid #e0d8cc;
	border-radius: 50px;
	font-size: 0.65rem;
	font-weight: 600;
	letter-spacing: 0.3px;
	text-transform: uppercase;
	color: var(--red-text, #6a788c);
	transition: all 0.2s;
	cursor: pointer;

	&:hover {
		background: #060c17;
		color: #fff;
		border-color: #060c17;
	}
}

.card-date {
	font-size: 0.8rem;
	color: #999;
	white-space: nowrap;
	font-weight: 500;
}

@media (max-width: 768px) {
	.card-image {
		height: 200px;
	}

	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-size: 1.2rem;
	}
}
</style>
