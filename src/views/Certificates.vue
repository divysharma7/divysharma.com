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
import { useHead } from '@vueuse/head';

useHead({
  title: 'Certificates & Achievements',
  meta: [
    { name: 'description', content: 'Awards, hackathon wins, and the mentors who guided me along the way.' },
    { property: 'og:title', content: 'Certificates & Achievements | Divy Sharma' },
    { property: 'og:description', content: 'Proof of work: Hackathons, competitions, and the people who helped me.' }
  ]
})
</script>

<style scoped>
.cert-page {
	padding: 3rem var(--container-padding);
	min-height: 100vh;
}

.cert-container {
	max-width: var(--container);
	margin: 0 auto;
}

/* ── Header ── */
.cert-header {
	text-align: center;
	margin-bottom: 0;
}

.cert-title {
	font-size: var(--h1);
	font-weight: 600;
	margin: 0;
	letter-spacing: -0.02em;
	line-height: var(--leading-tight);
	font-family: var(--font-sans);
	color: var(--color-heading);
}

.cert-subtitle {
	font-size: var(--text-lg);
	color: var(--color-muted);
	margin: 16px auto 0;
	max-width: 580px;
	line-height: var(--leading-normal);
	font-weight: 400;
}

/* ── Divider ── */
.cert-divider {
	height: 1px;
	background: var(--color-border);
	margin: 2.5rem 0;
}

/* ── Section Header ── */
.cert-section-header {
	margin-bottom: 32px;
}

.cert-section-title {
	font-size: var(--h3);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	margin: 0;
	letter-spacing: -0.01em;
	font-family: var(--font-sans);
}

.cert-section-count {
	font-size: var(--text-base);
	font-weight: 600;
	color: var(--color-muted);
	margin-left: 8px;
    background: var(--border, #eee);
    padding: 2px 10px;
    border-radius: var(--radius-pill);
    display: inline-block;
    transform: translateY(-2px);
}

/* ── List ── */
.cert-list {
	display: flex;
	flex-direction: column;
	gap: 32px;
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
