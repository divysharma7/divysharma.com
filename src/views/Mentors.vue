<template>
	<div class="mentors-page">
		<div class="mentors-container">
			<!-- Header -->
			<div class="mentors-header">
				<h1 class="mentors-title">Gurus & Mentors</h1>
				<p class="mentors-subtitle">The incredible people who guided me, believed in my potential, and helped shape my journey.</p>
			</div>

			<div class="mentors-divider"></div>

			<!-- Section Title -->
			<div class="mentors-section-header">
				<h2 class="mentors-section-title">
					All Mentors
					<span class="mentors-section-count">({{ mentors.length }})</span>
				</h2>
			</div>

			<!-- Mentor Grid -->
			<div class="mentor-grid">
				<MentorCard 
					v-for="mentor in mentors" 
					:key="mentor.name" 
					:mentor="mentor" 
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import MentorCard from '../components/achievements/MentorCard.vue';
import { mentors } from '../data/mentors.js';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Gurus & Mentors',
  meta: [
    { name: 'description', content: 'The mentors who guided me along the way.' },
    { property: 'og:title', content: 'Gurus & Mentors | Divy Sharma' },
    { property: 'og:description', content: 'Proof of work: The people who helped me.' }
  ]
})
</script>

<style scoped>
.mentors-page {
	padding: 80px 24px;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	padding-bottom: 200px;
}

.mentors-container {
	width: 100%;
	max-width: 900px;
	display: flex;
	flex-direction: column;
}

.mentors-header {
	text-align: center;
	margin-bottom: 24px;
}

.mentors-title {
	font-size: var(--h1);
	font-weight: 800;
	margin: 0;
	letter-spacing: -0.03em;
	line-height: 1.1;
	font-family: var(--font-sans);
	/* Premium text gradient */
	background: linear-gradient(135deg, var(--heading-color, #111) 0%, #777 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
    padding-bottom: 4px;
}

.mentors-subtitle {
	font-size: 1.15rem;
	color: var(--text-muted);
	margin: 16px auto 0;
	max-width: 580px;
	line-height: 1.6;
	font-weight: 400;
}

.mentors-divider {
	height: 1px;
	background: var(--border);
	margin: 48px 0;
    opacity: 0.6;
}

.mentors-section-header {
	margin-bottom: 32px;
}

.mentors-section-title {
	font-size: 1.8rem;
	font-weight: 700;
	margin: 0;
	color: var(--heading-color, #111);
	letter-spacing: -0.01em;
    display: flex;
    align-items: center;
}

.mentors-section-count {
	font-size: 1rem;
	font-weight: 600;
	color: var(--text-muted);
	margin-left: 8px;
    background: var(--border, #eee);
    padding: 2px 10px;
    border-radius: 999px;
    display: inline-block;
    transform: translateY(-2px);
}

/* ── Mentor Grid ── */
.mentor-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;
	margin-top: 16px;
}

@media (min-width: 768px) {
	.mentor-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 1024px) {
	.mentor-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (max-width: 768px) {
	.mentors-page {
		padding: 48px 16px;
	}

	.mentors-section-title {
		font-size: 1.4rem;
	}
}
</style>
