<template>
	<div class="project-card">
		<div class="content">
			<h3 class="title">
				<router-link :to="`/projects/${project.slug}`">{{ project.title }}</router-link>
			</h3>
			<p class="summary">{{ project.shortSummary }}</p>
			<div class="tags">
				<span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
			</div>
			<router-link :to="`/projects/${project.slug}`" class="link-text">View Case Study &rarr;</router-link>
		</div>
	</div>
</template>

<script setup>
defineProps({
	project: {
		type: Object,
		required: true
	}
})
</script>

<style scoped lang="scss">
.project-card {
	border: 1px solid #eee;
	border-radius: 8px;
	padding: 1.5rem;
	transition: border-color 0.2s, box-shadow 0.2s;
	background: #fff;

	&:hover {
		border-color: #ddd;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.title {
		margin: 0 0 0.5rem;
		font-size: 1.25rem;
		
		a {
			text-decoration: none;
			color: #111;
			
			&:hover {
				color: #000;
			}
		}
	}

	.summary {
		color: #666;
		font-size: 0.95rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;

		.tag {
			background: #f5f5f5;
			color: #444;
			font-size: 0.75rem;
			padding: 0.25rem 0.5rem;
			border-radius: 4px;
			font-weight: 500;
		}
	}

	.link-text {
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		color: #111;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
