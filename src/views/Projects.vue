
<template>
	<div class="cont" @mouseleave="hover = false">
		<div class="page-header">
			<h1 class="page-title">Projects</h1>
			<p class="page-subtitle">
				Okay, enough seriousness. Let's dive into the good stuff – the projects that make me tick! Think delightful user experiences and a sprinkle of creative chaos.
			</p>
		</div>
		<div class="bigproj">
			<Project
				name="Techno Conclave"
				description="Where Design, Tech, and Entreprenurship collide"
				link="/p/techno"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710387635/Slide_16_9_-_22_nknflj.png"
				data-aos-delay="200"
				intlink
			/>

			<Project
				name="VR Rescue X"
				description="VR Based Gaming Simulator for NDRF."
				link="/p/virtual"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710388865/WhatsApp_Image_2023-12-19_at_19.17_foz6od.png"
				data-aos-delay="100"
				intlink
			/>
			<Project
				name="kalam"
				description="Innovation for Writer's Comfort."
				link="/p/kalam"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710703057/Slide_16_9_-_24_tfylda.png"
				data-aos-delay="100"
				intlink
			/>
			<Project
				name="Aqua-Alert"
				description="Smart Water Monitoring Solution."
				link="/p/aqua"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1749733310/Aqua_l4dwoe.png"
				data-aos-delay="100"
				intlink
			/>

			
		</div>

		<hr />

			<div class="row">
				<div class="eight columns">
					<p class="zero">
						You can check out my
						<a
							rel="noopener noreferrer"
							href="https://www.behance.net/divysharma3"
							target="_blank"
							>behance</a
						>
						for more. Most of my projects are available on it.
					</p>
				</div>
				<div class="u-cf"></div>
			</div>
		</div>
</template>

<script>
import SmlProj from '../assets/data/smlproj.js'
import Project from '../components/project.vue'

export default {
	components: {
		Project
	},
	data() {
		return {
			hover: false,
			smlProjects: SmlProj.projects
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: 'Explore my portfolio of projects in product management, development, and design. See what I\'ve built and shipped.' },
    { property: 'og:title', content: 'Projects | Divy Sharma' },
    { property: 'og:description', content: 'Showcase of my product and engineering projects.' }
  ]
})
</script>

<style scoped>
.othsmlproj {
	font-size: 1.75em;
}

/* ── Page Title ── */
.page-header {
	text-align: center;
	margin-bottom: 2rem;
}

.page-title {
	font-size: var(--h1);
	font-weight: 400;
	color: var(--heading-color);
	margin: 0;
	letter-spacing: -0.02em;
	line-height: 1.1;
	font-family: var(--font-sans);
}

.page-subtitle {
	font-size: var(--text-lg);
	color: var(--text-muted);
	margin: 16px auto 0;
	max-width: 500px;
	line-height: 1.6;
	text-align: center;
}
.others {
	margin-top: 3em;
	margin-bottom: 3em;
}
.bigproj {
	margin-top: 2em;
}
.proj .sml {
	font-weight: 300;
	font-size: 1.2em;
	margin-bottom: 0.2em;
}
@media (min-width: 768px) {
	.active {
		opacity: 0.5;
		transition: 0.2s;
	}
}
.proj {
	transition: 0.3s;
}
.proj:hover {
	opacity: 1 !important;
}
.proj * {
	transition: 0.2s;
}
.grid {
	display: grid;
	grid-gap: 2em;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 3em;
	margin-bottom: 3em;
}
@media (max-width: 768px) {
	.grid {
		display: grid;
		grid-gap: 1.5em;
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
