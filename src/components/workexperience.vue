<template>
	<div class="we-page">
		<div class="we-container">
			<!-- Header -->
			<div class="we-header">
				<h1 class="we-title">Work Experience</h1>
				<p class="we-subtitle">My work experiences across different companies and roles.</p>
			</div>

			<div class="we-divider"></div>

			<!-- Section Title -->
			<div class="we-section-header">
				<h2 class="we-section-title">
					All Experiences
					<span v-if="experiences.length > 0" class="we-section-count">
						({{ experiences.length }} {{ experiences.length === 1 ? 'experience' : 'experiences' }})
					</span>
				</h2>
			</div>

			<!-- Experience List -->
			<div class="we-list">
				<DetailedExperienceCard
					v-for="(experience, index) in experiences"
					:key="experience.company + '-' + experience.role"
					:experience="experience"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import DetailedExperienceCard from './experience/DetailedExperienceCard.vue';
import { allWorkExperiences as experiences } from '../data/experience.js';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Work Experience',
  meta: [
    { name: 'description', content: 'My professional journey as a Product Manager. Roles, companies, and impact delivered across various organizations.' },
    { property: 'og:title', content: 'Work Experience | Divy Sharma' },
    { property: 'og:description', content: 'From engineering to product management — my professional timeline.' }
  ]
})
</script>

<style scoped>
.we-page {
	padding: 72px 24px;
	min-height: 100vh;
}

.we-container {
	max-width: var(--container-max);
	margin: 0 auto;
}

/* ── Header ── */
.we-header {
	text-align: center;
	margin-bottom: 0;
}

.we-title {
	font-size: var(--h1);
	font-weight: 400;
	color: var(--heading-color);
	margin: 0;
	letter-spacing: -0.02em;
	line-height: 1.1;
	font-family: var(--font-sans);
}

.we-subtitle {
	font-size: var(--text-lg);
	color: var(--text-muted);
	margin: 16px auto 0;
	max-width: 500px;
	line-height: 1.5;
	font-weight: 400;
}

/* ── Divider ── */
.we-divider {
	height: 1px;
	background: var(--border);
	margin: 40px 0;
}

/* ── Section Header ── */
.we-section-header {
	margin-bottom: 32px;
}

.we-section-title {
	font-size: var(--h2);
	font-weight: 800;
	color: var(--heading-color);
	margin: 0;
	letter-spacing: -0.01em;
	font-family: var(--font-sans);
}

.we-section-count {
	font-size: var(--text-base);
	font-weight: 400;
	color: var(--text-muted);
	margin-left: 4px;
}

/* ── List ── */
.we-list {
	display: flex;
	flex-direction: column;
}

@media (max-width: 768px) {
	.we-page {
		padding: 48px 16px;
	}

	.we-section-title {
		font-size: 1.4rem;
	}
}
</style>
