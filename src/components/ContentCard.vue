<template>
	<div class="content-card">
		<div class="meta">
			<span class="type" v-if="type">{{ type }}</span>
			<span class="date" v-if="date">{{ formatDate(date) }}</span>
		</div>
		<h3 class="title">
			<router-link :to="link">{{ title }}</router-link>
		</h3>
		<p class="excerpt">{{ excerpt }}</p>
		<div class="tags" v-if="tags && tags.length">
			<span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: String,
	excerpt: String,
	date: String,
	type: String,
	tags: Array,
	link: {
		type: String,
		required: true
	}
})

const formatDate = (dateString) => {
	if (!dateString) return ''
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}
</script>

<style scoped lang="scss">
.content-card {
	padding: 1.5rem 0;
	border-bottom: 1px solid #eee;

	&:last-child {
		border-bottom: none;
	}

	.meta {
		display: flex;
		gap: 0.75rem;
		font-size: 0.8rem;
		color: #888;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 500;
	}

	.title {
		margin: 0 0 0.5rem;
		font-size: 1.2rem;
		
		a {
			text-decoration: none;
			color: #111;
			
			&:hover {
				color: #000;
				text-decoration: underline;
			}
		}
	}

	.excerpt {
		color: #555;
		font-size: 0.95rem;
		margin: 0 0 0.75rem;
		line-height: 1.5;
	}

	.tags {
		display: flex;
		gap: 0.75rem;

		.tag {
			color: #888;
			font-size: 0.8rem;
		}
	}
}
</style>
