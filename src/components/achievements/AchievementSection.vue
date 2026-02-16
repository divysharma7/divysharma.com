<template>
	<div class="ach-section">
		<div class="ach-section-header">
			<h2 class="ach-section-title">
				Certificates & Achievements
				<span class="ach-section-count">({{ achievements.length }})</span>
			</h2>
			<p class="ach-section-subtitle">
				Awards, hackathons, competitions, and proof that I occasionally finish things.
			</p>
		</div>

		<div class="ach-list">
			<AchievementCard
				v-for="achievement in achievements"
				:key="achievement.title + '-' + achievement.date"
				:achievement="achievement"
			/>
		</div>
	</div>
</template>

<script setup>
import AchievementCard from './AchievementCard.vue';
import { achievements } from '../../data/achievements.js';
</script>

<style scoped>
.ach-section {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.ach-section-header {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.ach-section-title {
	margin: 0;
	font-size: 1.75rem;
	font-weight: 800;
	color: #111;
	letter-spacing: -0.01em;
	font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.ach-section-count {
	font-size: 1rem;
	font-weight: 400;
	color: #999;
	margin-left: 4px;
}

.ach-section-subtitle {
	margin: 0;
	color: #7a7a7a;
	font-size: 1.05rem;
	line-height: 1.55;
	max-width: 600px;
}

.ach-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
</style>
