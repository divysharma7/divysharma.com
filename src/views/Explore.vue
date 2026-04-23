<template>
	<div class="cont">
		<div class="page-header">
			<h1 class="page-title">Explore</h1>
			<p class="page-subtitle">More about me — designs, achievements, and interests.</p>
		</div>

		<div class="card-grid">
			<a rel="noopener noreferrer" href="https://www.behance.net/divysharma3" target="_blank" class="explore-card explore-card--blue">
				<div class="explore-card-head">
					<h2>Design</h2>
					<bx-bx-link-external class="explore-icon" />
				</div>
				<p>I'm mostly interested in building products and managing teams but I enjoy doing design research too.</p>
			</a>

			<a rel="noopener noreferrer" href="https://www.linkedin.com/posts/divy-sharma-243748216_startupjourney-gratitude-bitsabrpilani-activity-7168917217009496064-UFhB?utm_source=share&utm_medium=member_desktop" target="_blank" class="explore-card explore-card--teal">
				<div class="explore-card-head">
					<h2>Achievements</h2>
					<bx-bx-link-external class="explore-icon" />
				</div>
				<p>I've participated in startup competitions, hackathons, ideathons, designathons, and B-plans. Check out some of my wins.</p>
			</a>

			<a rel="noopener noreferrer" href="https://drive.google.com/file/d/1DxcRgUE_-V8B23Yz4L-Padn3t07I2xwp/view?usp=sharing" target="_blank" class="explore-card explore-card--purple" @click="trackEvent('resume:download', { location: 'explore' })">
				<div class="explore-card-head">
					<h2>Resume</h2>
					<bx-bx-link-external class="explore-icon" />
				</div>
				<p>Check out my work, the teams I've been a part of, and the impact I've delivered.</p>
			</a>

			<a rel="noopener noreferrer" href="https://teamconatus.com/" target="_blank" class="explore-card explore-card--green">
				<div class="explore-card-head">
					<h2>Events</h2>
					<bx-bx-link-external class="explore-icon" />
				</div>
				<p>Over the last few years I've been part of the core team of Team Conatus (technical society). Check out some events I organized.</p>
			</a>

			<a rel="noopener noreferrer" href="https://buymeacoffee.com/divy.sharma6" target="_blank" class="explore-card explore-card--amber">
				<div class="explore-card-head">
					<h2>Support</h2>
					<bx-bx-link-external class="explore-icon" />
				</div>
				<p><strong>Buy me a coffee</strong> to support my journey in building delightful product experiences.</p>
			</a>
		</div>

		<Top class="top-section" />

		<Website />

		<Contact class="contact-section" />
	</div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import Top from '../components/top.vue'
import Website from "../components/website.vue"
import Contact from "../components/ContactForm.vue"
import { trackEvent, trackOutbound } from '@/analytics/umami'

useHead({
  title: 'Explore',
  meta: [
    { name: 'description', content: 'More about me — designs, achievements, events, and other interests.' },
    { property: 'og:title', content: 'Explore | Divy Sharma' },
    { property: 'og:description', content: 'Designs, achievements, events, and interests.' }
  ]
})
</script>

<style scoped lang="scss">
/* ── Page Header ── */
.page-header {
	text-align: left;
	margin-bottom: 2rem;
}

.page-title {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	margin: 0;
}

.page-subtitle {
	font-size: var(--text-sm);
	color: var(--color-body);
	margin: 0.5rem 0 0;
	max-width: 500px;
	line-height: var(--leading-normal);
}

/* ── Card Grid ── */
.card-grid {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 3rem;
}

.explore-card {
	display: block;
	padding: 1.25rem 1.5rem;
	border-radius: var(--radius-md);
	transition: background-color var(--duration-fast) ease;
	text-decoration: none;
	color: var(--color-heading);

	h2 {
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0 0.5rem 0 0;
		line-height: var(--leading-tight);
	}

	p {
		font-size: var(--text-sm);
		color: var(--color-body);
		line-height: var(--leading-normal);
		margin: 0.35rem 0 0;
	}
}

.explore-card-head {
	display: flex;
	align-items: center;
}

.explore-icon {
	color: var(--color-muted);
	font-size: var(--text-sm);
}

/* ── Card Color Variants ── */
.explore-card--blue {
	background: rgba(146, 184, 250, 0.15);
	h2 { color: #2b559e; }
	&:hover { background: rgba(146, 184, 250, 0.25); }
}

.explore-card--teal {
	background: rgba(146, 250, 245, 0.15);
	h2 { color: #088048; }
	&:hover { background: rgba(146, 250, 245, 0.25); }
}

.explore-card--purple {
	background: rgba(197, 116, 235, 0.1);
	h2 { color: #881a8b; }
	&:hover { background: rgba(197, 116, 235, 0.18); }
}

.explore-card--green {
	background: rgba(180, 230, 190, 0.2);
	h2 { color: #036a37; }
	&:hover { background: rgba(180, 230, 190, 0.35); }
}

.explore-card--amber {
	background: rgba(240, 227, 82, 0.12);
	h2 { color: #ad850e; }
	&:hover { background: rgba(240, 227, 82, 0.2); }
}

/* ── Sections ── */
.top-section {
	margin-bottom: 3rem;
}

.contact-section {
	margin-top: 3rem;
}
</style>
