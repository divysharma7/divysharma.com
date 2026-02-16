<template>
	<div class="cert-page">
		<div class="cert-container">
			<!-- Header -->
			<div class="cert-header">
				<h1 class="cert-title">Certificates & Achievements</h1>
				<p class="cert-subtitle">Awards, hackathons, competitions, and proof that I occasionally finish things.</p>
			</div>

			<div class="cert-divider"></div>

			<!-- Section Title -->
			<div class="cert-section-header">
				<h2 class="cert-section-title">
					All Achievements
					<span class="cert-section-count">({{ achievements.length }})</span>
				</h2>
			</div>

			<!-- Achievement List -->
			<div class="cert-list">
				<AchievementCard
					v-for="achievement in achievements"
					:key="achievement.title + '-' + achievement.date"
					:achievement="achievement"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import AchievementCard from '../components/achievements/AchievementCard.vue';
import { achievements } from '../data/achievements.js';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Certificates & Achievements',
  meta: [
    { name: 'description', content: 'Awards, hackathon wins, and certifications I\'ve earned during my journey.' },
    { property: 'og:title', content: 'Certificates & Achievements | Divy Sharma' },
    { property: 'og:description', content: 'Proof of work: Hackathons, competitions, and awards.' }
  ]
})
</script>

<style scoped>
.cert-page {
	padding: 72px 24px;
	min-height: 100vh;
}

.cert-container {
	max-width: var(--container-max);
	margin: 0 auto;
}

/* ── Header ── */
.cert-header {
	text-align: center;
	margin-bottom: 0;
}

.cert-title {
	font-size: var(--h1);
	font-weight: 400;
	color: var(--heading-color);
	margin: 0;
	letter-spacing: -0.02em;
	line-height: 1.1;
	font-family: var(--font-sans);
}

.cert-subtitle {
	font-size: var(--text-lg);
	color: var(--text-muted);
	margin: 16px auto 0;
	max-width: 540px;
	line-height: 1.5;
	font-weight: 400;
}

/* ── Divider ── */
.cert-divider {
	height: 1px;
	background: var(--border);
	margin: 40px 0;
}

/* ── Section Header ── */
.cert-section-header {
	margin-bottom: 24px;
}

.cert-section-title {
	font-size: var(--h2);
	font-weight: 800;
	color: var(--heading-color);
	margin: 0;
	letter-spacing: -0.01em;
	font-family: var(--font-sans);
}

.cert-section-count {
	font-size: var(--text-base);
	font-weight: 400;
	color: var(--text-muted);
	margin-left: 4px;
}

/* ── List ── */
.cert-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

@media (max-width: 768px) {
	.cert-page {
		padding: 48px 16px;
	}

	.cert-section-title {
		font-size: 1.4rem;
	}
}
</style>
