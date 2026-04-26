<template>
	<div class="we-page">
		<div class="we-container">
			<!-- Header -->
			<PageHero
				icon="ph-briefcase"
				title="Experience"
				subtitle="My work experiences across different companies and roles."
			/>

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
import PageHero from '@/components/PageHero.vue';
import DetailedExperienceCard from './experience/DetailedExperienceCard.vue';
import { allWorkExperiences as experiences } from '../data/experience.js';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Experience',
  meta: [
    { name: 'description', content: 'My professional journey as a Product Manager. Roles, companies, and impact delivered across various organizations.' },
    { property: 'og:title', content: 'Experience | Divy Sharma' },
    { property: 'og:description', content: 'From engineering to product management — my professional timeline.' }
  ]
})
</script>

<style scoped>
.we-page {
	padding: 3rem var(--container-padding);
	min-height: 100vh;
}

.we-container {
	max-width: var(--container);
	margin: 0 auto;
}

/* ── Divider ── */
.we-divider {
	height: 1px;
	background: var(--color-border);
	margin: 40px 0;
}

/* ── Section Header ── */
.we-section-header {
	margin-bottom: 32px;
}

.we-section-title {
	font-size: var(--h3);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	margin: 0;
	letter-spacing: -0.01em;
	font-family: var(--font-sans);
}

.we-section-count {
	font-size: var(--text-base);
	font-weight: 400;
	color: var(--color-muted);
	margin-left: 4px;
}

/* ── List ── */
.we-list {
	display: flex;
	flex-direction: column;
}

@media (max-width: 768px) {
	.we-page {
		padding: 2rem 1rem;
	}

	.we-section-title {
		font-size: 1.4rem;
	}
}
</style>
