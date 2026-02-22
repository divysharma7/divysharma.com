<template>
	<div class="ach-card">
		<!-- Top Row: Icon + Info -->
		<div class="ach-top">
			<div class="ach-icon">
				<span class="ach-monogram">{{ (achievement.issuer || 'A').charAt(0).toUpperCase() }}</span>
			</div>

			<div class="ach-main">
				<div class="ach-title-row">
					<h3 class="ach-title">{{ achievement.title }}</h3>
					<span v-if="achievement.level" class="ach-pill" :class="pillClass">
						<span class="ach-pill-dot" :class="pillDotClass"></span>
						{{ achievement.level }}
					</span>
				</div>

				<div class="ach-meta">
					<span class="ach-issuer">{{ achievement.issuer }}</span>
					<span class="ach-dot-sep">•</span>
					<span class="ach-date">{{ achievement.date }}</span>
				</div>

				<p v-if="achievement.description" class="ach-desc">{{ achievement.description }}</p>
			</div>
		</div>

		<!-- Asset Area -->
		<div class="ach-asset" v-if="achievement.asset || showPlaceholder">
			<!-- Image asset -->
			<a v-if="achievement.asset && achievement.asset.type === 'image'"
				class="ach-asset-link" :href="achievement.asset.url" target="_blank" rel="noopener noreferrer">
				<div class="ach-thumb">
					<img :src="achievement.asset.url" :alt="achievement.title + ' certificate'" />
				</div>
			</a>

			<!-- PDF asset -->
			<a v-else-if="achievement.asset && achievement.asset.type === 'pdf'"
				class="ach-asset-link" :href="achievement.asset.url" target="_blank" rel="noopener noreferrer">
				<div class="ach-pdf-box">
					<div class="ach-pdf-label">PDF</div>
					<div class="ach-pdf-text">{{ achievement.asset.label || 'View Certificate PDF' }}</div>
				</div>
			</a>

			<!-- Link asset -->
			<a v-else-if="achievement.asset && achievement.asset.type === 'link'"
				class="ach-asset-link" :href="achievement.asset.url" target="_blank" rel="noopener noreferrer">
				<div class="ach-link-box">
					{{ achievement.asset.label || 'View Proof' }}
				</div>
			</a>

			<!-- Placeholder -->
			<div v-else class="ach-placeholder">
				<div class="ach-placeholder-title">Certificate asset placeholder</div>
				<div class="ach-placeholder-text">Add image/PDF URL in config to show the certificate here.</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	achievement: {
		type: Object,
		required: true
	},
	showPlaceholder: {
		type: Boolean,
		default: true
	}
});

const pillClass = computed(() => {
	const level = (props.achievement.level || '').toLowerCase();
	if (level.includes('winner') || level === 'award winner') return 'pill-gold';
	if (level.includes('finalist') || level.includes('top')) return 'pill-blue';
	if (level.includes('runner')) return 'pill-purple';
	return 'pill-green';
});

const pillDotClass = computed(() => {
	const level = (props.achievement.level || '').toLowerCase();
	if (level.includes('winner') || level === 'award winner') return 'dot-gold';
	if (level.includes('finalist') || level.includes('top')) return 'dot-blue';
	if (level.includes('runner')) return 'dot-purple';
	return 'dot-green';
});
</script>

<style scoped>
.ach-card {
	background: #fff;
	border: 1px solid #eee;
	border-radius: 18px;
	padding: 22px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ach-card:hover {
	border-color: #ddd;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* ── Top Row ── */
.ach-top {
	display: flex;
	gap: 14px;
	min-width: 0;
}

.ach-icon {
	width: 48px;
	height: 48px;
	border-radius: 12px;
	background: #111;
	display: grid;
	place-items: center;
	flex-shrink: 0;
}

.ach-monogram {
	color: #fff;
	font-weight: 800;
	font-size: 17px;
	line-height: 1;
}

.ach-main {
	display: flex;
	flex-direction: column;
	gap: 6px;
	min-width: 0;
}

.ach-title-row {
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.ach-title {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 700;
	color: #111;
	line-height: 1.25;
}

.ach-meta {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #7a7a7a;
	font-size: 0.9rem;
	font-weight: 500;
}

.ach-dot-sep {
	opacity: 0.5;
}

.ach-desc {
	margin: 2px 0 0;
	color: #9a9a9a;
	font-size: 0.95rem;
	line-height: 1.6;
}

/* ── Level Pills ── */
.ach-pill {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	border-radius: 999px;
	padding: 4px 12px;
	font-size: 0.78rem;
	font-weight: 700;
	white-space: nowrap;
	flex-shrink: 0;
}

.ach-pill-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

/* Color variants */
.pill-gold {
	background: #fef9e7;
	color: #b7791f;
}
.dot-gold {
	background: #d69e2e;
}

.pill-green {
	background: #e8f5e9;
	color: #1f7a3a;
}
.dot-green {
	background: #34c759;
}

.pill-blue {
	background: #e8f0fe;
	color: #1a56db;
}
.dot-blue {
	background: #3b82f6;
}

.pill-purple {
	background: #f0e8fe;
	color: #6b21a8;
}
.dot-purple {
	background: #8b5cf6;
}

/* ── Asset Area ── */
.ach-asset-link {
	text-decoration: none;
	color: inherit;
	display: block;
}

.ach-thumb {
	width: 100%;
	height: auto;
	aspect-ratio: 4 / 3;
	border-radius: 14px;
	overflow: hidden;
	border: 1px solid #eee;
	background: #fafafa;
}

.ach-thumb img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.ach-pdf-box,
.ach-link-box {
	border-radius: 14px;
	border: 1px dashed #d8d8d8;
	background: #f8f8f8;
	padding: 14px 16px;
	display: flex;
	align-items: center;
	gap: 12px;
	transition: background 0.15s ease;
}

.ach-pdf-box:hover,
.ach-link-box:hover {
	background: #f0f0f0;
}

.ach-pdf-label {
	font-weight: 900;
	color: #111;
	background: #fff;
	border: 1px solid #eee;
	border-radius: 8px;
	padding: 4px 10px;
	font-size: 0.75rem;
	letter-spacing: 0.02em;
}

.ach-pdf-text {
	font-size: 0.9rem;
	font-weight: 700;
	color: #111;
}

.ach-link-box {
	font-size: 0.9rem;
	font-weight: 700;
	color: #111;
}

.ach-placeholder {
	border-radius: 14px;
	border: 1px dashed #d8d8d8;
	background: #fbfbfb;
	padding: 14px 16px;
}

.ach-placeholder-title {
	font-size: 0.9rem;
	font-weight: 700;
	color: #111;
	margin-bottom: 4px;
}

.ach-placeholder-text {
	font-size: 0.82rem;
	color: #999;
	line-height: 1.5;
}

@media (max-width: 640px) {
	.ach-card {
		padding: 16px;
	}

	.ach-icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}

	.ach-monogram {
		font-size: 15px;
	}

	.ach-title {
		font-size: 1rem;
	}

	.ach-thumb {
		height: 120px;
	}
}
</style>
