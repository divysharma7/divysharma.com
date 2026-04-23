<template>
	<div class="ach-card">
		<!-- Left: Content Area (45%) -->
		<div class="ach-content-panel">
			<!-- Header -->
			<div class="ach-header">
				<div class="ach-org-row">
					<div class="ach-monogram">
						{{ (achievement.issuer || 'X').charAt(0).toUpperCase() }}
					</div>
					<span class="ach-org-name">{{ achievement.issuer }}</span>
					<div class="ach-meta-dots">
						<span class="dot">•</span>
						<span>{{ achievement.date }}</span>
						<span v-if="achievement.level" class="dot">•</span>
						<span class="ach-level-text" v-if="achievement.level">{{ achievement.level }}</span>
					</div>
				</div>

				<h3 class="ach-title">{{ achievement.title }}</h3>

				<!-- Highlight Chips -->
				<div class="ach-chips" v-if="achievement.metrics && achievement.metrics.length">
					<span class="ach-chip" v-for="metric in achievement.metrics" :key="metric">
						{{ metric }}
					</span>
				</div>
			</div>

			<!-- Scannable Bullets -->
			<div class="ach-bullets" v-if="achievement.details">
				<div class="ach-bullet" v-if="achievement.details.problem">
					<span class="bullet-label">Problem:</span>
					<span class="bullet-text">{{ achievement.details.problem }}</span>
				</div>
				<div class="ach-bullet" v-if="achievement.details.approach">
					<span class="bullet-label">Approach:</span>
					<span class="bullet-text">{{ achievement.details.approach }}</span>
				</div>
				<div class="ach-bullet" v-if="achievement.details.solution">
					<span class="bullet-label">Solution:</span>
					<span class="bullet-text">{{ achievement.details.solution }}</span>
				</div>
				<div class="ach-bullet outcome-bullet" v-if="achievement.details.outcome">
					<span class="bullet-label">Outcome:</span>
					<span class="bullet-text">{{ achievement.details.outcome }}</span>
				</div>
			</div>

			<!-- Role & Skills Strip -->
			<div class="ach-role-strip" v-if="achievement.role || (achievement.skills && achievement.skills.length)">
				<div class="ach-role" v-if="achievement.role">
					<strong>Role:</strong> {{ achievement.role }}
				</div>
				<div class="ach-skills" v-if="achievement.skills && achievement.skills.length">
					<span class="ach-skill-tag" v-for="skill in achievement.skills" :key="skill">
						{{ skill }}
					</span>
				</div>
			</div>

			<!-- CTAs -->
			<div class="ach-actions" v-if="achievement.links && achievement.links.length">
				<a v-for="(link, index) in achievement.links" :key="index" :href="link.url" target="_blank"
					rel="noopener noreferrer" class="ach-btn" :class="{ 'btn-primary': link.primary, 'btn-secondary': !link.primary }">
					{{ link.text }} ↗
				</a>
			</div>
		</div>

		<!-- Right: Media Container (55%) -->
		<div class="ach-media-panel" v-if="achievement.asset || showPlaceholder">
			<div class="ach-media-frame">
				<a v-if="achievement.asset && achievement.asset.type === 'image'" class="ach-image-link"
					:href="achievement.asset.url" target="_blank" rel="noopener noreferrer">
					<img :src="achievement.asset.url" :alt="achievement.title + ' certificate'" loading="lazy" />
					<div class="media-hover-overlay">
						<div class="zoom-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
						</div>
					</div>
				</a>

                <a v-else-if="achievement.asset && achievement.asset.type === 'link'" class="ach-image-link fallback-card"
					:href="achievement.asset.url" target="_blank" rel="noopener noreferrer">
                    <div class="fallback-icon">🔗</div>
					<div class="fallback-text">{{ achievement.asset.label || 'View Proof' }}</div>
				</a>

				<div v-else class="ach-placeholder">
					No certificate image available
				</div>
			</div>
			<!-- Caption -->
			<div class="ach-media-caption" v-if="achievement.asset && achievement.asset.label">
				{{ achievement.asset.label }}
			</div>
		</div>
	</div>
</template>

<script setup>
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
</script>

<style scoped>
.ach-card {
	background: var(--card-bg, #ffffff);
	border: 1px solid var(--border, #eaeaea);
	border-radius: var(--radius-md);
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

@media (min-width: 900px) {
	.ach-card {
		flex-direction: row;
		padding: 2rem;
		gap: 2.5rem;
	}
}

.ach-card:hover {
	border-color: var(--border-hover, #ccc);
	box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
	transform: translateY(-2px);
}

/* ── Left Content Panel (40-45%) ── */
.ach-content-panel {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}

@media (min-width: 900px) {
	.ach-content-panel {
		flex: 0 0 42%;
        max-width: 450px;
	}
}

/* Header styling */
.ach-header {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.ach-org-row {
	display: flex;
	align-items: center;
	gap: 0.5rem;
    flex-wrap: wrap;
}

.ach-monogram {
	width: 20px;
	height: 20px;
	border-radius: var(--radius-sm);
	background: #111;
	color: #fff;
	display: grid;
	place-items: center;
	font-size: 11px;
	font-weight: 800;
}

.ach-org-name {
	font-size: 0.8rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: #444;
}

.ach-meta-dots {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	font-size: 0.8rem;
	color: var(--color-muted);
	font-weight: 500;
}

.dot {
	font-size: var(--text-xs);
	opacity: 0.5;
}

.ach-level-text {
    font-weight: 600;
    color: var(--color-heading);
}

.ach-title {
	margin: 0;
	font-size: var(--text-base);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	letter-spacing: -0.02em;
}

/* Chips */
.ach-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.125rem;
}

.ach-chip {
	font-size: 0.75rem;
	font-weight: 600;
	padding: 0.25rem 0.625rem;
	border-radius: var(--radius-sm);
	background: #f1f5f9;
	color: #334155;
	border: 1px solid #e2e8f0;
}

/* Bullets */
.ach-bullets {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
    margin-top: 0.25rem;
}

.ach-bullet {
	font-size: 0.9rem;
	line-height: 1.5;
	color: #444;
}

.bullet-label {
	font-weight: 700;
	color: var(--color-heading);
	margin-right: 0.25rem;
}

.outcome-bullet {
    margin-top: 0.25rem;
    padding-left: 0.625rem;
    border-left: 2px solid #22c55e;
}

.outcome-bullet .bullet-label {
    color: #166534;
}

/* Role & Skills */
.ach-role-strip {
	background: var(--color-bg-subtle);
	border: 1px solid #eee;
	border-radius: var(--radius-md);
	padding: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
    margin-top: 0.25rem;
}

.ach-role {
	font-size: 0.85rem;
	color: var(--color-heading);
}

.ach-skills {
	display: flex;
	flex-wrap: wrap;
	gap: 0.375rem;
}

.ach-skill-tag {
	font-size: var(--text-xs);
	font-weight: 600;
	background: #fff;
	border: 1px solid #ddd;
	padding: 0.125rem 0.5rem;
	border-radius: var(--radius-sm);
	color: var(--color-body);
}

/* Actions */
.ach-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-top: auto;
    padding-top: 0.375rem;
}

.ach-btn {
	text-decoration: none;
	font-size: 0.85rem;
	font-weight: 600;
	padding: 0.5rem 1rem;
	border-radius: var(--radius-sm);
	transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.btn-primary {
	background: #111;
	color: #fff;
	border: 1px solid #111;
}

.btn-primary:hover {
	background: #333;
	border-color: #333;
    transform: translateY(-1px);
}

.btn-secondary {
	background: transparent;
	color: var(--color-heading);
	border: 1px solid #ddd;
}

.btn-secondary:hover {
	background: var(--color-border);
	border-color: #ccc;
}

/* ── Right Media Panel (55-60%) ── */
.ach-media-panel {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
    min-width: 0;
}

.ach-media-frame {
	position: relative;
	width: 100%;
	aspect-ratio: 4 / 3;
	background: #f8f9fa;
	border: 1px solid #e5e5e5;
	border-radius: var(--radius-md);
	overflow: hidden;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
}

@media (min-width: 900px) {
    .ach-media-frame {
        height: 100%;
        max-height: 480px;
        aspect-ratio: unset;
    }
}

.ach-image-link {
	display: block;
	width: 100%;
	height: 100%;
	text-decoration: none;
    position: relative;
}

.ach-image-link img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	object-position: center;
	transition: transform 0.4s ease;
    padding: 1rem;
    box-sizing: border-box;
    background: #fff;
}

.ach-card:hover .ach-image-link img {
	transform: scale(1.02);
}

.media-hover-overlay {
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.05);
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
}

.ach-card:hover .media-hover-overlay {
	opacity: 1;
}

.zoom-icon {
    width: 48px;
    height: 48px;
    background: rgba(255,255,255,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-heading);
    transform: scale(0.8);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.ach-card:hover .zoom-icon {
    transform: scale(1);
}

.ach-media-caption {
	font-size: 0.75rem;
	color: var(--color-muted);
	text-align: center;
	font-weight: 500;
}

/* Fallbacks */
.fallback-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: var(--color-bg-subtle);
    color: #444;
}

.fallback-card:hover {
    background: var(--color-border);
}

.fallback-icon {
    font-size: var(--text-xl);
}

.fallback-text {
    font-weight: 600;
    font-size: 0.9rem;
}

.ach-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-muted);
    font-size: 0.85rem;
}

@media (max-width: 899px) {
	.ach-card {
		padding: 1.25rem;
	}
	.ach-title {
		font-size: 1.4rem;
	}
    .ach-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
