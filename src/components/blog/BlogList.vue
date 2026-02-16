<template>
	<div class="blog-list">
		<div v-if="posts.length === 0" class="empty-state">
			<p>No blog posts found.</p>
		</div>
		<div v-else class="blog-grid">
			<BlogCard 
				v-for="post in posts" 
				:key="post.slug" 
				:post="post" 
			/>
		</div>
	</div>
</template>

<script>
import BlogCard from './BlogCard.vue'

export default {
	name: 'BlogList',
	components: {
		BlogCard
	},
	props: {
		posts: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped lang="scss">
.blog-list {
	width: 100%;
}

.blog-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 2rem;
}

.empty-state {
	text-align: center;
	padding: 4rem 2rem;
	color: #999;
	font-size: 1.1rem;
}

@media (max-width: 768px) {
	.blog-grid {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
}
</style>
