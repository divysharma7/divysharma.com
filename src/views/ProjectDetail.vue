<template>
	<article class="project-detail" v-if="project" aria-labelledby="project-title">
		<header class="project-header">
			<div class="container">
				<router-link 
					to="/projects" 
					class="back-link" 
					aria-label="Back to all projects"
				>
					&larr; Back to Projects
				</router-link>
				<h1 id="project-title" class="title">{{ project.title }}</h1>
				<p class="summary">{{ project.shortSummary }}</p>
				<div class="meta" aria-label="Project Meta Information">
					<div class="meta-item">
						<span class="label">Role</span>
						<span class="value">{{ project.role }}</span>
					</div>
					<div class="meta-item">
						<span class="label">Tags</span>
						<div class="tags">
							<span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
						</div>
					</div>
				</div>
			</div>
		</header>

		<section class="content" aria-label="Project Content">
			<div class="container">
				<div class="content-block" v-if="project.context">
					<h2>Context</h2>
					<p>{{ project.context }}</p>
				</div>

				<div class="content-block" v-if="project.problem">
					<h2>The Problem</h2>
					<p>{{ project.problem }}</p>
				</div>

				<div class="content-block" v-if="project.constraints">
					<h2>Constraints</h2>
					<p>{{ project.constraints }}</p>
				</div>

				<div class="content-block" v-if="project.approach && project.approach.length">
					<h2>Approach</h2>
					<ul>
						<li v-for="(step, index) in project.approach" :key="index">{{ step }}</li>
					</ul>
				</div>

				<div class="content-block highlight" v-if="project.outcome">
					<h2>Outcome</h2>
					<p>{{ project.outcome }}</p>
				</div>

				<div class="content-block" v-if="project.whatNext">
					<h2>What Next?</h2>
					<p>{{ project.whatNext }}</p>
				</div>

				<div class="links-section" v-if="project.links">
					<a
						v-if="project.links.liveDemo"
						:href="project.links.liveDemo"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-primary"
						aria-label="View live demo of this project (opens in new tab)"
					>
						View Live Demo
					</a>
					<a
						v-if="project.links.github"
						:href="project.links.github"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-secondary"
						aria-label="View source code on GitHub (opens in new tab)"
					>
						View on GitHub
					</a>
				</div>
			</div>
		</section>
	</article>
	
	<div v-else class="not-found container" role="alert">
		<div class="not-found-content">
			<h1>Project Not Found</h1>
			<p>We couldn't find the case study you're looking for. It may have been moved or deleted.</p>
			<router-link to="/projects" class="btn btn-primary">Browse All Projects</router-link>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { projects } from '../data/projects'

const route = useRoute()
const slug = computed(() => {
	const param = route.params.slug
	if (Array.isArray(param)) return param[0]
	return param
})
const project = computed(() => projects.find((p) => p.slug === slug.value))

const seoData = computed(() => {
	if (!project.value) {
		return {
			title: 'Project not found – Divy Sharma',
			meta: [{ name: 'robots', content: 'noindex' }]
		}
	}

	const p = project.value
	const title = `${p.title} – Case Study – Divy Sharma`
	const description = p.shortSummary
	const url = `https://divysharma.com/projects/${p.slug}`
	const imageUrl = p.image
	const tags = Array.isArray(p.tags) ? p.tags : []

	return {
		title,
		meta: [
			{ name: 'description', content: description },
			// Open Graph
			{ property: 'og:title', content: p.title },
			{ property: 'og:description', content: description },
			{ property: 'og:type', content: 'article' },
			{ property: 'og:url', content: url },
			...(imageUrl ? [{ property: 'og:image', content: imageUrl }] : []),
			// Twitter
			{ name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' },
			{ name: 'twitter:title', content: p.title },
			{ name: 'twitter:description', content: description },
			...(imageUrl ? [{ name: 'twitter:image', content: imageUrl }] : [])
		],
		link: [{ rel: 'canonical', href: url }],
		script: [
			{
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'CreativeWork',
					name: p.title,
					headline: p.title,
					description,
					url,
					...(imageUrl ? { image: [imageUrl] } : {}),
					...(tags.length ? { keywords: tags.join(', ') } : {}),
					author: {
						'@type': 'Person',
						name: 'Divy Sharma',
						url: 'https://divysharma.com'
					},
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': url
					}
				})
			}
		]
	}
})

useHead(seoData)
</script>

<style scoped lang="scss">
.project-header {
	padding: 4rem 0 3rem;
	background: #fafafa;
	border-bottom: 1px solid #eee;

	.back-link {
		display: inline-block;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
		color: #666;
		text-decoration: none;

		&:hover {
			color: #000;
		}
	}

	.title {
		font-size: 2.5rem;
		margin: 0 0 1rem;
	}

	.summary {
		font-size: 1.2rem;
		color: #555;
		max-width: 700px;
		margin: 0 0 2rem;
	}

	.meta {
		display: flex;
		gap: 3rem;

		.meta-item {
			.label {
				display: block;
				font-size: 0.8rem;
				text-transform: uppercase;
				color: #888;
				margin-bottom: 0.5rem;
				font-weight: 600;
			}

			.value {
				font-weight: 500;
			}

			.tags {
				display: flex;
				gap: 0.5rem;

				.tag {
					background: #eee;
					padding: 0.2rem 0.5rem;
					border-radius: 4px;
					font-size: 0.85rem;
				}
			}
		}
	}
}

.content {
	padding: 4rem 0;

	.content-block {
		margin-bottom: 3rem;
		max-width: 700px;

		h2 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		p, li {
			font-size: 1.1rem;
			color: #333;
			line-height: 1.7;
		}

		ul {
			padding-left: 1.5rem;
		}

		&.highlight {
			background: #f0f7ff;
			padding: 2rem;
			border-radius: 8px;
			border-left: 4px solid #0070f3;
		}
	}

	.links-section {
		margin-top: 4rem;
		display: flex;
		gap: 1rem;
		padding-top: 2rem;
		border-top: 1px solid #eee;
	}
}

.btn {
	display: inline-block;
	padding: 0.75rem 1.5rem;
	border-radius: 6px;
	font-weight: 600;
	text-decoration: none;
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-1px);
	}

	&.btn-primary {
		background: #000;
		color: #fff;
	}

	&.btn-secondary {
		background: #fff;
		color: #000;
		border: 1px solid #ddd;
	}
}

.not-found {
	padding: 8rem 1.5rem;
	text-align: center;
	min-height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.not-found-content {
		max-width: 500px;
		
		h1 {
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		p {
			font-size: 1.1rem;
			color: #666;
			margin-bottom: 2rem;
		}
	}
}
</style>
