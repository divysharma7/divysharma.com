<template>
	<div class="project-page">
		<!-- Not found -->
		<div v-if="!project" class="not-found">
			<router-link to="/projects" class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
				Back to Projects
			</router-link>
			<h1>Project not found</h1>
			<p>This project doesn't exist or may have been moved.</p>
		</div>

		<template v-else>
			<div class="project-layout">
				<!-- Content (comes first in DOM for mobile and SEO) -->
				<div class="project-content">
					<router-link to="/projects" class="back-link">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
						Back to Projects
					</router-link>

					<img
						v-if="project.heroImage"
						:src="project.heroImage"
						:alt="project.title"
						class="project-hero"
						data-aos="fade-up"
					/>

					<h1 class="project-title" data-aos="fade-up" data-aos-delay="100">{{ project.title }}</h1>
					<p class="project-dek" data-aos="fade-up" data-aos-delay="150">{{ project.shortDescription }}</p>

					<div class="project-meta" data-aos="fade-up" data-aos-delay="200">
						<div class="meta-chips">
							<span class="meta-chip" v-if="project.role">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
								{{ project.role }}
							</span>
							<span class="meta-chip" v-if="project.domain">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
								{{ project.domain }}
							</span>
						</div>
						<div class="meta-tags" v-if="project.tags?.length">
							<span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
						</div>
					</div>

					<hr class="project-rule" />

					<!-- Section-based content -->
					<div class="project-sections">
						<component
							v-for="(section, i) in project.sections"
							:key="i"
							:is="sectionComponent(section.type)"
							:data="section"
						/>
					</div>
				</div>

				<!-- Explorer Sidebar (right side, desktop only) -->
				<aside class="explorer-sidebar">
					<div class="explorer-body">
						<div class="explorer-header-label">Explorer</div>
						<nav class="explorer-list">
							<router-link
								v-for="p in allProjects"
								:key="p.slug"
								:to="`/p/${p.slug}`"
								class="explorer-item"
								:class="{ 'explorer-item--active': p.slug === project.slug }"
								@click.native="trackExplorerSwitch(p.slug)"
							>
								<span class="explorer-bullet">+</span>
								<span class="explorer-item-text">{{ p.title }}</span>
							</router-link>
						</nav>
						<div class="explorer-toc" v-if="tocItems.length">
							<p class="explorer-toc-label">On this page</p>
							<a
								v-for="item in tocItems"
								:key="item.id"
								:href="'#' + item.id"
								class="explorer-toc-item"
								:class="{
									'explorer-toc-item--active': activeSection === item.id,
									'explorer-toc-item--h3': item.level === 3
								}"
								:aria-current="activeSection === item.id ? 'true' : undefined"
								@click.prevent="handleTocClick(item.id)"
							>{{ item.text }}</a>
						</div>
					</div>
				</aside>
			</div>

			<!-- Bottom section bar (mobile) -->
			<transition name="bar-slide">
				<div
					class="section-bar"
					v-if="tocItems.length && progress > 2"
					role="button"
					tabindex="0"
					:aria-label="`Currently reading: ${activeSectionName}. Click to open table of contents.`"
					@keydown.enter="showToc = true"
					@click="showToc = true"
				>
					<div class="section-bar-inner">
						<span class="section-dot">●</span>
						<span class="section-label">{{ activeSectionName }}</span>
						<svg class="progress-ring" width="28" height="28" viewBox="0 0 36 36">
							<circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2.5" />
							<circle cx="18" cy="18" r="14" fill="none" stroke="#fff" stroke-width="2.5"
								stroke-linecap="round"
								:stroke-dasharray="circumference"
								:stroke-dashoffset="circumference * (1 - progress / 100)"
								transform="rotate(-90 18 18)" />
						</svg>
					</div>
				</div>
			</transition>

			<!-- TOC overlay (mobile) -->
			<transition name="toc-fade">
				<div v-if="showToc" class="toc-overlay" @click.self="showToc = false">
					<transition name="toc-slide">
						<div v-if="showToc" class="toc-panel">
							<p class="toc-heading">TABLE OF CONTENTS</p>
							<nav class="toc-nav">
								<a
									v-for="item in tocItems"
									:key="item.id"
									:href="'#' + item.id"
									class="toc-item"
									:class="{
										active: activeSection === item.id,
										'toc-item--h3': item.level === 3
									}"
									@click="handleTocClick(item.id)"
								>
									<span class="toc-item-text">{{ item.text }}</span>
									<span v-if="activeSection === item.id" class="toc-item-dot">●</span>
								</a>
							</nav>
							<div class="toc-bottom-bar">
								<span class="section-dot">●</span>
								<span class="section-label">{{ activeSectionName }}</span>
								<svg class="progress-ring" width="28" height="28" viewBox="0 0 36 36">
									<circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2.5" />
									<circle cx="18" cy="18" r="14" fill="none" stroke="#fff" stroke-width="2.5"
										stroke-linecap="round"
										:stroke-dasharray="circumference"
										:stroke-dashoffset="circumference * (1 - progress / 100)"
										transform="rotate(-90 18 18)" />
								</svg>
							</div>
						</div>
					</transition>
				</div>
			</transition>
		</template>
	</div>
</template>

<script>
import { projects } from '@/data/projects'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AOS from 'aos'
import { slugify } from '@/components/sections/utils'
import posthog from 'posthog-js'
import { useScrollDepth } from '@/composables/useScrollDepth'
import { useTimeSpent } from '@/composables/useTimeSpent'

import SectionText from '@/components/sections/SectionText.vue'
import SectionStats from '@/components/sections/SectionStats.vue'
import SectionProcess from '@/components/sections/SectionProcess.vue'
import SectionGallery from '@/components/sections/SectionGallery.vue'
import SectionImageText from '@/components/sections/SectionImageText.vue'
import SectionVideo from '@/components/sections/SectionVideo.vue'
import SectionTeam from '@/components/sections/SectionTeam.vue'
import SectionAwards from '@/components/sections/SectionAwards.vue'
import SectionFullImage from '@/components/sections/SectionFullImage.vue'
import SectionCallout from '@/components/sections/SectionCallout.vue'
import SectionFeatureGrid from '@/components/sections/SectionFeatureGrid.vue'

import WaterLossStats from '@/components/aqua-alert/WaterLossStats.vue'
import SurveyResults from '@/components/aqua-alert/SurveyResults.vue'
import EmpathyMap from '@/components/aqua-alert/EmpathyMap.vue'
import SystemArchitecture from '@/components/aqua-alert/SystemArchitecture.vue'
import AppScreens from '@/components/aqua-alert/AppScreens.vue'
import SdgStrip from '@/components/aqua-alert/SdgStrip.vue'
import AwardsGrid from '@/components/aqua-alert/AwardsGrid.vue'

const componentMap = {
	'text': SectionText,
	'stats': SectionStats,
	'process': SectionProcess,
	'gallery': SectionGallery,
	'image-text': SectionImageText,
	'video': SectionVideo,
	'team': SectionTeam,
	'awards': SectionAwards,
	'full-image': SectionFullImage,
	'callout': SectionCallout,
	'feature-grid': SectionFeatureGrid,
	'water-loss-stats': WaterLossStats,
	'survey-results': SurveyResults,
	'empathy-map': EmpathyMap,
	'system-architecture': SystemArchitecture,
	'app-screens': AppScreens,
	'sdg-strip': SdgStrip,
	'awards-grid': AwardsGrid,
}

export default {
	name: 'ProjectDetail',
	setup() {
		const route = useRoute()
		const project = computed(() => projects.find(p => p.slug === route.params.id) || null)

		const getProjectProps = () => project.value
			? { slug: project.value.slug, title: project.value.title }
			: {}
		useScrollDepth('project:scroll_depth', getProjectProps)
		useTimeSpent('project:time_spent', getProjectProps)

		useHead(computed(() => {
			if (!project.value) return { title: 'Project not found' }
			const url = `https://divysharma-com.vercel.app/p/${project.value.slug}`
			const image = project.value.heroImage || 'https://divysharma-com.vercel.app/og-image.png'
			return {
				title: project.value.title,
				meta: [
					{ name: 'description', content: project.value.shortDescription },
					{ property: 'og:title', content: `${project.value.title} | Divy Sharma` },
					{ property: 'og:description', content: project.value.shortDescription },
					{ property: 'og:type', content: 'article' },
					{ property: 'og:url', content: url },
					{ property: 'og:image', content: image },
					{ name: 'twitter:card', content: 'summary_large_image' },
					{ name: 'twitter:title', content: `${project.value.title} | Divy Sharma` },
					{ name: 'twitter:description', content: project.value.shortDescription },
					{ name: 'twitter:image', content: image },
				]
			}
		}))
	},
	data() {
		return {
			project: null,
			allProjects: projects,
			explorerOpen: true,
			progress: 0,
			activeSection: '',
			showToc: false,
		}
	},
	computed: {
		circumference() {
			return 2 * Math.PI * 14
		},
		tocItems() {
			if (!this.project?.sections) return []
			return this.project.sections
				.filter(s => s.title && s.level)
				.map(s => ({ id: slugify(s.title), text: s.title, level: s.level }))
		},
		activeSectionName() {
			const item = this.tocItems.find(i => i.id === this.activeSection)
			return item?.text || (this.tocItems[0]?.text ?? '')
		}
	},
	methods: {
		sectionComponent(type) {
			return componentMap[type] || SectionText
		},
		loadProject() {
			this.project = projects.find(p => p.slug === this.$route.params.id) || null
			this.progress = 0
			this.activeSection = ''
			this.showToc = false
			if (this.project) {
				posthog.capture('project:viewed', { project_slug: this.project.slug, project_title: this.project.title })
			}
		},
		onScroll() {
			const docHeight = document.body.scrollHeight - window.innerHeight
			this.progress = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
			this.updateActiveSection()
		},
		updateActiveSection() {
			if (!this.project || !this.$el) return
			const sections = this.$el.querySelectorAll('section[id]')
			if (!sections.length) return
			let active = sections[0].id
			for (const s of sections) {
				if (s.getBoundingClientRect().top <= 120) active = s.id
			}
			if (active !== this.activeSection) {
				this.activeSection = active
				if (!this._firedSections) this._firedSections = new Set()
				if (this.project && !this._firedSections.has(active)) {
					this._firedSections.add(active)
					posthog.capture('project:section_viewed', { slug: this.project.slug, section_id: active })
				}
			}
		},
		trackExplorerSwitch(toSlug) {
			posthog.capture('explorer:project_switch', { from_slug: this.project?.slug, to_slug: toSlug })
		},
		handleTocClick(id) {
			this.showToc = false
			posthog.capture('project:toc_click', { slug: this.project?.slug, section_id: id })
			this.$nextTick(() => {
				const el = document.getElementById(id)
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					setTimeout(() => { this.activeSection = id }, 350)
				}
			})
		}
	},
	mounted() {
		this.loadProject()
		window.addEventListener('scroll', this.onScroll)
		this.$nextTick(() => this.updateActiveSection())
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	},
	watch: {
		'$route.params.id'() {
			this.loadProject()
			window.scrollTo(0, 0)
			this.$nextTick(() => {
				this.updateActiveSection()
				AOS.refresh()
			})
		},
		project() {
			this.$nextTick(() => {
				this.updateActiveSection()
				AOS.refresh()
			})
		},
		showToc(open) {
			document.body.style.overflow = open ? 'hidden' : ''
		}
	}
}
</script>

<style scoped lang="scss">
button {
	text-transform: none;
	letter-spacing: normal;
	height: auto;
	line-height: normal;
	font-family: inherit;
	font-size: inherit;
	background: none;
	border: none;
	cursor: pointer;
}

/* ── Page ── */
.project-page {
	min-height: 100vh;
	font-family: var(--font-sans);
	padding-bottom: 5rem;
}

.not-found {
	max-width: var(--container);
	margin: 0 auto;
	padding: 3rem 2rem;
	h1 { font-size: 1.5rem; font-weight: 600; color: var(--color-heading); margin: 1rem 0 0.5rem; }
	p { color: var(--color-muted); }
}

.back-link {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: var(--text-sm);
	font-weight: 500;
	color: var(--color-heading);
	text-decoration: none;
	margin-bottom: 2rem;
	transition: opacity 0.15s;
	&:hover { opacity: 0.6; }
}

/* ── Layout ── */
.project-layout {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 220px;
	gap: 0;
	max-width: 1120px;
	margin: 0 auto;
	padding: 0 2rem;
	overflow-x: hidden;
}

/* ── Explorer Sidebar (right) ── */
.explorer-sidebar {
	position: sticky;
	top: 5rem;
	max-height: calc(100vh - 6rem);
	overflow-y: auto;
	min-width: 0;
	padding: 2rem 0 2rem 1.25rem;
	border-left: 1px solid var(--color-border);
	grid-column: 2;
}

.explorer-header-label {
	font-size: var(--text-lg);
	font-weight: 700;
	color: var(--color-heading);
	letter-spacing: -0.01em;
	padding: 0 0.5rem 0.75rem;
}

.explorer-body { padding-top: 0; }

.explorer-list {
	display: flex;
	flex-direction: column;
	padding: 0 0.5rem;
}

.explorer-item {
	display: flex;
	align-items: baseline;
	gap: 0.625rem;
	padding: 0.5rem 0.75rem;
	border-radius: var(--radius-sm);
	font-size: var(--text-sm);
	color: var(--color-body);
	text-decoration: none;
	transition: color var(--duration-fast), background var(--duration-fast);
	line-height: var(--leading-snug);

	&:hover {
		color: var(--color-heading);
		background: var(--color-bg-subtle);
	}
}

.explorer-item--active {
	color: #7c9a82;
	font-weight: 600;
	.explorer-bullet { color: #7c9a82; }
}

.explorer-bullet {
	font-size: var(--text-base);
	color: var(--color-muted);
	flex-shrink: 0;
	line-height: 1;
}

.explorer-toc {
	margin-top: 1.5rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-border);
	padding-left: 1rem;
	padding-right: 0.5rem;
}

.explorer-toc-label {
	font-size: var(--text-xs);
	font-weight: 600;
	color: var(--color-muted);
	letter-spacing: 0.05em;
	text-transform: uppercase;
	margin: 0 0 0.75rem;
}

.explorer-toc-item {
	display: block;
	font-size: var(--text-xs);
	color: var(--color-muted);
	text-decoration: none;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	line-height: var(--leading-snug);
	transition: color var(--duration-fast);

	&:hover { color: var(--color-heading); }
	&--active { color: var(--color-heading); font-weight: 600; }
	&--h3 { padding-left: 1.25rem; }
}


/* ── Content ── */
.project-content {
	max-width: 780px;
	min-width: 0;
	padding: 3rem 2rem 4rem 3rem;
	overflow-x: hidden;
}

/* Constrain all images and SVGs inside project content */
.project-content :deep(img) {
	max-width: 100%;
	height: auto;
}

.project-content :deep(svg) {
	max-width: 100%;
}

.project-sections {
	min-width: 0;
}

.project-hero {
	width: 100%;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	border-radius: var(--radius-md);
	margin-bottom: 2rem;
}

.project-title {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	letter-spacing: -0.025em;
	text-wrap: balance;
	margin: 0 0 0.75rem;
}

.project-dek {
	font-size: var(--text-lg);
	color: var(--color-muted);
	line-height: var(--leading-normal);
	margin: 0 0 1.5rem;
}

.project-meta { margin-bottom: 1rem; }

.meta-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-bottom: 0.75rem;
}

.meta-chip {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: var(--text-sm);
	color: var(--color-muted);
	svg { color: var(--color-muted); flex-shrink: 0; }
}

.meta-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.375rem;
}

.tag {
	display: inline-block;
	font-size: var(--text-xs);
	color: var(--color-body);
	background: var(--color-bg-subtle);
	border: 1px solid var(--color-border);
	padding: 0.1875rem 0.625rem;
	border-radius: var(--radius-pill);
}

.project-rule {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 1.5rem 0 2.5rem;
}

/* ── Bottom section bar ── */
.section-bar {
	position: fixed;
	bottom: 1.5rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: var(--z-sticky);
	cursor: pointer;
	display: none;
}

.section-bar-inner {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	background: #1a1a1a;
	color: #fff;
	padding: 0.625rem 1.25rem;
	border-radius: var(--radius-pill);
	font-size: var(--text-sm);
	font-weight: 500;
	box-shadow: 0 4px 24px rgba(0,0,0,0.18);
	max-width: 320px;
	transition: background 0.15s, box-shadow 0.15s;
}

.section-bar:hover .section-bar-inner {
	background: #2a2a2a;
	box-shadow: 0 6px 32px rgba(0,0,0,0.25);
}

.section-dot { font-size: 8px; flex-shrink: 0; }
.section-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.progress-ring { flex-shrink: 0; margin-left: auto; }

.bar-slide-enter-active { transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s; }
.bar-slide-leave-active { transition: transform 0.2s ease, opacity 0.15s; }
.bar-slide-enter-from { transform: translateX(-50%) translateY(60px); opacity: 0; }
.bar-slide-leave-to { transform: translateX(-50%) translateY(40px); opacity: 0; }

/* ── TOC overlay ── */
.toc-overlay {
	position: fixed;
	inset: 0;
	z-index: var(--z-modal);
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 1rem;
}

.toc-panel {
	width: 100%;
	max-width: 520px;
	max-height: 80vh;
	background: #1a1a1a;
	border-radius: var(--radius-md);
	padding: 2rem 1.75rem 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	margin-bottom: 0.5rem;
}

.toc-heading {
	font-size: var(--text-xs);
	font-weight: 600;
	color: rgba(255,255,255,0.4);
	letter-spacing: 0.12em;
	text-transform: uppercase;
	margin: 0 0 1.25rem;
	padding: 0 0.5rem;
}

.toc-nav {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	flex: 1;
	padding-bottom: 1rem;
	-webkit-overflow-scrolling: touch;
}

.toc-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.875rem 1rem;
	border-radius: var(--radius-md);
	font-size: var(--text-base);
	font-weight: 400;
	color: rgba(255,255,255,0.5);
	text-decoration: none;
	transition: background 0.15s, color 0.15s;
	gap: 0.75rem;

	&:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.75); }
	&.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 500; }
}

.toc-item--h3 { padding-left: 2.25rem; font-size: var(--text-sm); }
.toc-item-text { flex: 1; min-width: 0; }
.toc-item-dot { font-size: 8px; color: #fff; flex-shrink: 0; }

.toc-bottom-bar {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	padding: 0.875rem 1rem;
	margin: 0 -1.75rem;
	border-top: 1px solid rgba(255,255,255,0.08);
	background: #1a1a1a;
	font-size: var(--text-sm);
	font-weight: 500;
	color: #fff;
	border-radius: 0 0 20px 20px;
}

.toc-fade-enter-active { transition: opacity 0.25s; }
.toc-fade-leave-active { transition: opacity 0.2s; }
.toc-fade-enter-from, .toc-fade-leave-to { opacity: 0; }

.toc-slide-enter-active { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s; }
.toc-slide-leave-active { transition: transform 0.2s ease, opacity 0.15s; }
.toc-slide-enter-from { transform: translateY(60px); opacity: 0; }
.toc-slide-leave-to { transform: translateY(40px); opacity: 0; }

/* ── Responsive ── */
@media (max-width: 1024px) {
	.project-layout {
		grid-template-columns: minmax(0, 1fr);
		padding: 0;
	}

	.explorer-sidebar {
		display: none;
	}

	.project-content {
		padding: 2rem 1.25rem 4rem;
		max-width: none;
		min-width: 0;
	}

	.section-bar { display: block; }
}

@media (max-width: 640px) {
	.project-title { font-size: var(--h2); }
	.project-dek { font-size: var(--text-base); }
	.section-bar-inner { max-width: 260px; font-size: var(--text-xs); padding: 0.5625rem 1rem; }
	.toc-panel { max-width: 100%; border-radius: var(--radius-md) var(--radius-md) 0 0; margin-bottom: 0; }
	.toc-item { font-size: var(--text-sm); padding: 0.75rem 0.875rem; }
	.toc-item--h3 { padding-left: 1.875rem; }
	.meta-chips { flex-direction: column; gap: 0.375rem; }
}

</style>
