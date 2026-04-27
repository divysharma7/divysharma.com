<template>
	<div class="experience-item">
		<div class="exp-row">
			<!-- Left: Logo -->
			<div class="exp-logo-wrapper">
				<img
					v-if="experience.logo"
					:src="experience.logo"
					:alt="experience.company"
					class="exp-logo"
					loading="lazy"
					width="48"
					height="48"
				/>
				<div v-else class="exp-logo-placeholder">
					{{ experience.company[0] }}
				</div>
			</div>

			<!-- Middle: Main Content -->
			<div class="exp-main">
				<div class="exp-header">
					<div class="exp-header-top">
						<h3 class="company-name">{{ experience.company }}</h3>
						
						<!-- Links -->
						<div class="exp-links" v-if="experience.links">
							<a v-if="experience.links.website && experience.links.website !== '#'" 
							   :href="experience.links.website" target="_blank" rel="noopener noreferrer" aria-label="Website">
								<GlobeIcon class="icon" />
							</a>
						</div>

						<!-- Working Badge -->
						<span v-if="experience.current" class="badge-working">
							<span class="dot"></span> Working
						</span>
					</div>

					<div class="exp-header-meta-mobile">
						<span class="date">{{ experience.startDate }} - {{ experience.endDate }}</span>
						<span class="location">{{ experience.location }}</span>
					</div>

					<div class="role-title">{{ experience.role }}</div>
				</div>

				<!-- Tech Pills -->
				<div class="tech-stack" v-if="experience.technologies && experience.technologies.length">
					<span class="tech-label">Technologies & Tools</span>
					<div class="pills">
						<span v-for="tech in experience.technologies" :key="tech.name" class="pill">
							<img v-if="tech.icon && getIconUrl(tech.icon)" :src="getIconUrl(tech.icon)" alt="" aria-hidden="true" class="pill-icon" />
							{{ tech.name }}
						</span>
					</div>
				</div>

				<!-- Description -->
				<div class="description" v-if="experience.description">
					<p v-for="(item, i) in experience.description" :key="i" class="desc-item">
						<span class="bullet">•</span> {{ item }}
					</p>
				</div>
			</div>

			<!-- Right: Date & Location (Desktop) -->
			<div class="exp-meta-desktop">
				<div class="date">{{ experience.startDate }} - {{ experience.endDate }}</div>
				<div class="location">{{ experience.location }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { GlobeIcon } from 'lucide-vue-next';

defineProps({
	experience: {
		type: Object,
		required: true
	}
});

const brandIcons = import.meta.glob('@/assets/brands/*.svg', { eager: true, query: '?url', import: 'default' });

function getBrandUrl(name) {
	const match = Object.entries(brandIcons).find(([k]) => k.includes(`/${name}.svg`));
	return match ? match[1] : null;
}

const iconMap = {
	metabase: getBrandUrl('metabase'),
	posthog: getBrandUrl('posthog'),
	figma: getBrandUrl('figma'),
	jira: getBrandUrl('jira'),
	postgresql: getBrandUrl('postgresql'),
	googleanalytics: getBrandUrl('googleanalytics'),
	notion: getBrandUrl('notion'),
};

function getIconUrl(icon) {
	if (!icon) return null;
	return iconMap[icon.toLowerCase()] || null;
}
</script>

<style scoped>
.experience-item {
	padding: 2rem 0;
	border-bottom: 1px solid #f0f0f0;
}

.experience-item:last-child {
	border-bottom: none;
}

.exp-row {
	display: flex;
	gap: 1.5rem;
}

/* Logo */
.exp-logo-wrapper {
	flex-shrink: 0;
	width: 48px;
	height: 48px;
}

.exp-logo {
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: var(--radius-sm);
	border: 1px solid #eaeaea;
}

.exp-logo-placeholder {
	width: 100%;
	height: 100%;
	border-radius: var(--radius-sm);
	background: var(--color-border);
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: var(--color-body);
}

/* Main Content */
.exp-main {
	flex: 1;
	min-width: 0; /* Prevent flex blowout */
}

.exp-header-top {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;
	margin-bottom: 0.25rem;
}

.company-name {
	font-size: 1.1rem;
	font-weight: 700;
	color: var(--color-heading);
	margin: 0;
}

.exp-links {
	display: flex;
	align-items: center;
}

.exp-links a {
	color: var(--color-muted);
	display: flex;
	transition: color 0.2s;
}

.exp-links a:hover {
	color: var(--color-heading);
}

.icon {
	width: 14px;
	height: 14px;
}

.badge-working {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 2px 8px;
	background: #e8f5e9;
	color: #2e7d32;
	border-radius: var(--radius-md);
	font-size: 0.75rem;
	font-weight: 600;
}

.dot {
	width: 6px;
	height: 6px;
	background: #43a047;
	border-radius: 50%;
}

.role-title {
	font-size: 0.95rem;
	color: var(--color-body);
	font-weight: 500;
	margin-bottom: 1rem;
}

/* Metadata */
.exp-meta-desktop {
	text-align: right;
	flex-shrink: 0;
}

.exp-header-meta-mobile {
	display: none;
	font-size: 0.9rem;
	color: var(--color-body);
	margin-bottom: 0.5rem;
}

.date {
	font-size: 0.95rem;
	color: var(--color-body);
	font-weight: 500;
	margin-bottom: 0.25rem;
}

.location {
	font-size: 0.85rem;
	color: var(--color-muted);
}

/* Tech Stack */
.tech-stack {
	margin-bottom: 1rem;
}

.tech-label {
	display: block;
	font-size: 0.85rem;
	font-weight: 700;
	color: var(--color-heading);
	margin-bottom: 0.5rem;
}

.pills {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.pill {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 4px 10px;
	background: #f9fafb;
	border: 1px dashed rgba(0,0,0,0.15); /* Dashed border like Ramx */
	border-radius: var(--radius-sm);
	font-size: 0.85rem;
	color: #444;
	font-weight: 500;
}

.pill-icon {
	width: 14px;
	height: 14px;
}

/* Description */
.description {
	color: var(--color-body);
	font-size: 0.95rem;
	line-height: 1.6;
}

.desc-item {
	margin-bottom: 0.35rem;
	display: flex;
	gap: 0.5rem;
}

.bullet {
	color: var(--color-muted);
	font-size: 0.8rem;
	line-height: 1.8;
}

/* Mobile */
@media (max-width: 768px) {
	.exp-row {
		flex-direction: column;
		gap: 1rem;
	}
	
	.exp-meta-desktop {
		display: none; /* Hide desktop meta */
	}

	.exp-header-meta-mobile {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.exp-logo-wrapper {
		margin-bottom: 0.5rem;
	}
}
</style>
