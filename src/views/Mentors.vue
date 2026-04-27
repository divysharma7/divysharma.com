<template>
	<main class="mentors-page">

		<!-- Header -->
		<PageHero
			:icon="Users"
			title="Mentors"
			:accent-from="1"
			subtitle="People who taught me how to think."
		/>

		<!-- Filters -->
		<nav class="filters" aria-label="Filter mentors by category">
			<span class="filter-label">Filter</span>
			<button
				v-for="f in filterOptions"
				:key="f.key"
				class="filter-btn"
				:class="{ active: activeFilter === f.key }"
				@click="[activeFilter = f.key, showAll = false, gtmPush('mentors:filter', { category: f.key })]"
			>{{ f.label }} {{ f.count }}</button>
		</nav>

		<!-- Featured mentor -->
		<article v-if="featuredMentor" class="featured-card">
			<header class="fc-header">
				<div class="avatar avatar--lg" :class="'avatar--' + featuredMentor.avatarColor">
					{{ featuredMentor.initials }}
					<span class="company-badge" :style="{ background: featuredMentor.companyBadgeColor || '#0F0F0E' }">{{ featuredMentor.companyBadge }}</span>
				</div>
				<div class="fc-info">
					<div class="fc-name-row">
						<h3 class="fc-name">{{ featuredMentor.name }}</h3>
						<span class="fc-category-label">{{ featuredMentor.categoryLabel }}</span>
					</div>
					<p class="fc-role">{{ featuredMentor.role }} at <strong>{{ featuredMentor.company }}</strong></p>
					<p class="fc-duration">{{ featuredMentor.duration }}</p>
				</div>
				<a :href="featuredMentor.linkedin" target="_blank" rel="noopener" class="linkedin-link linkedin-link--sm">LinkedIn ↗</a>
			</header>

			<div class="tags-row">
				<span v-for="t in featuredMentor.tags" :key="t.label" class="tag" :class="'tag--' + t.color">{{ t.label }}</span>
			</div>

			<div class="lesson-box">
				<p class="lesson-eyebrow">The one thing I carry from him</p>
				<p class="lesson-text">{{ featuredMentor.lesson }}</p>
			</div>

			<p class="fc-desc">{{ featuredMentor.description }}</p>

			<div v-if="featuredMentor.latestLesson" class="latest-lesson">
				<span class="latest-label">Latest · {{ featuredMentor.latestLesson.date }}</span>
				<span class="latest-text">"{{ featuredMentor.latestLesson.text }}"</span>
			</div>
		</article>

		<!-- Mentor grid -->
		<div class="mentor-grid" v-if="visibleOthers.length">
			<article
				v-for="m in visibleOthers"
				:key="m.id"
				class="mentor-card"
			>
				<span class="card-arrow" aria-hidden="true">→</span>

				<header class="mc-header">
					<div class="avatar" :class="'avatar--' + m.avatarColor">
						{{ m.initials }}
						<span class="company-badge" :style="{ background: m.companyBadgeColor || '#0F0F0E' }">{{ m.companyBadge }}</span>
					</div>
					<div class="mc-info">
						<h3 class="mc-name">{{ m.name }}</h3>
						<p class="mc-role">{{ m.role }} at <strong>{{ m.company }}</strong></p>
						<p class="mc-meta">{{ m.categoryLabel }} · {{ m.duration }}</p>
					</div>
				</header>

				<div class="tags-row">
					<span v-for="t in m.tags" :key="t.label" class="tag" :class="'tag--' + t.color">{{ t.label }}</span>
				</div>

				<p class="lesson-eyebrow">The lesson</p>
				<p class="mc-lesson">{{ m.lesson }}</p>

				<p class="mc-desc">{{ m.description }}</p>

				<a :href="m.linkedin" target="_blank" rel="noopener" class="linkedin-link">LinkedIn ↗</a>
			</article>
		</div>

		<!-- Show more -->
		<div class="show-more-wrap" v-if="!showAll && hiddenCount > 0">
			<button class="show-more-btn" @click="[showAll = true, gtmPush('mentors:show_more', { hidden_count: hiddenCount })]">
				Show {{ hiddenCount }} more {{ hiddenCount === 1 ? 'mentor' : 'mentors' }}
			</button>
		</div>

		<!-- Empty state -->
		<p class="empty" v-if="filtered.length === 0">No mentors in this category.</p>
	</main>
</template>

<script>
function gtmPush(event, params) {
	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({ event, ...params })
}

const mentors = [
	{
		id: 'anant', name: 'Anant Chaturvedi', initials: 'AC',
		role: 'Growth Head', company: 'ASBL India',
		companyBadge: 'AS', companyBadgeColor: null,
		category: 'growth', categoryLabel: 'Current manager',
		duration: 'Worked together 2 years · In touch weekly',
		tags: [
			{ label: 'Product thinking', color: 'blue' },
			{ label: 'Growth strategy', color: 'purple' },
			{ label: 'Ownership', color: 'coral' },
		],
		lesson: 'Ask strategy-level questions before tactical ones — then lead through culture, not authority.',
		description: 'My first professional-life mentor. He taught me how to take real ownership, think in growth use cases, and sharpen the questions I bring to any problem.',
		latestLesson: { date: '2 weeks ago', text: "Don't confuse motion with progress." },
		linkedin: 'https://www.linkedin.com/in/anant-chaturvedi/',
		featured: true, avatarColor: 'teal',
	},
	{
		id: 'tushar', name: 'Tushar Chaturvedi', initials: 'TC',
		role: 'Senior PM', company: 'ASBL',
		companyBadge: 'AS', companyBadgeColor: null,
		category: 'leadership', categoryLabel: 'Skip-level mentor',
		duration: '18 months',
		tags: [
			{ label: 'Business sense', color: 'blue' },
			{ label: 'First principles', color: 'gray' },
		],
		lesson: 'Reason from first principles — especially when the room agrees with you.',
		description: 'The person in the office who genuinely teaches business use cases and supports both personal and professional navigation.',
		linkedin: 'https://www.linkedin.com/in/thetusharchaturvedi/',
		avatarColor: 'blue',
	},
	{
		id: 'anisha', name: 'Anisha Absolom', initials: 'AA',
		role: 'Designer', company: 'YouTube, Google',
		companyBadge: 'YT', companyBadgeColor: '#FF0000',
		category: 'design', categoryLabel: 'External mentor',
		duration: '2 years',
		tags: [
			{ label: 'UX research', color: 'purple' },
			{ label: 'Figma craft', color: 'purple' },
		],
		lesson: 'Design starts with a research question, not a canvas.',
		description: 'Two years of portfolio guidance. Taught me UX research, user flows, and building prototypes that answer real questions.',
		linkedin: 'https://www.linkedin.com/in/anisha-absolom/',
		avatarColor: 'purple',
	},
	{
		id: 'axat', name: 'Axat Srivastava', initials: 'AS',
		role: 'Product Designer', company: 'American Express',
		companyBadge: 'AE', companyBadgeColor: '#006FCF',
		category: 'product', categoryLabel: 'Design mentor',
		duration: '1 year',
		tags: [
			{ label: 'Design systems', color: 'coral' },
			{ label: 'Product craft', color: 'blue' },
		],
		lesson: 'Systems thinking beats pixel polish, every time.',
		description: 'Taught me how design systems scale, and why consistency compounds faster than creativity.',
		linkedin: 'https://www.linkedin.com/in/designer-axat/',
		avatarColor: 'coral',
	},
	{
		id: 'sayantan', name: 'Sayantan Ghosh', initials: 'SG',
		role: 'Product Lead', company: 'Snabbit',
		companyBadge: 'SN', companyBadgeColor: null,
		category: 'product', categoryLabel: 'Industry mentor',
		duration: '8 months',
		tags: [
			{ label: '0 → 1', color: 'amber' },
			{ label: 'User research', color: 'purple' },
		],
		lesson: 'The riskiest assumption is the one you forgot to question.',
		description: 'Helped me navigate 0 → 1 product work and how to run research that actually changes decisions.',
		linkedin: 'https://www.linkedin.com/in/sayantan-gh/',
		avatarColor: 'amber',
	},
	{
		id: 'sparsh', name: 'Sparsh Gupta', initials: 'SG',
		role: 'Designer', company: 'Adobe',
		companyBadge: 'Ad', companyBadgeColor: '#FA0F00',
		category: 'design', categoryLabel: 'Craft mentor',
		duration: '1 year',
		tags: [
			{ label: 'Visual craft', color: 'purple' },
			{ label: 'Prototyping', color: 'teal' },
		],
		lesson: 'Taste is just pattern recognition with a conscience.',
		description: 'Pushed my visual craft and taught me to pay attention to the 5% that makes interfaces feel considered.',
		linkedin: 'https://www.linkedin.com/in/sparsh-gupta-for-work/',
		avatarColor: 'gray',
	},
]

const INITIAL_COUNT = 2

export default {
	name: 'Mentors',
	data() {
		return {
			allMentors: mentors,
			activeFilter: 'all',
			showAll: false,
		}
	},
	computed: {
		filterOptions() {
			const counts = { all: this.allMentors.length }
			for (const m of this.allMentors) {
				counts[m.category] = (counts[m.category] || 0) + 1
			}
			return [
				{ key: 'all', label: 'All', count: counts.all },
				{ key: 'product', label: 'Product', count: counts.product || 0 },
				{ key: 'design', label: 'Design', count: counts.design || 0 },
				{ key: 'growth', label: 'Growth', count: counts.growth || 0 },
				{ key: 'leadership', label: 'Leadership', count: counts.leadership || 0 },
			].filter(f => f.key === 'all' || f.count > 0)
		},
		filtered() {
			if (this.activeFilter === 'all') return this.allMentors
			return this.allMentors.filter(m => m.category === this.activeFilter)
		},
		featuredMentor() {
			return this.filtered.find(m => m.featured) || null
		},
		others() {
			return this.filtered.filter(m => !m.featured)
		},
		visibleOthers() {
			return this.showAll ? this.others : this.others.slice(0, INITIAL_COUNT)
		},
		hiddenCount() {
			return this.others.length - INITIAL_COUNT
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
import PageHero from '@/components/PageHero.vue'
import { Users } from 'lucide-vue-next'
useHead({
	title: 'Gurus & Mentors',
	meta: [
		{ name: 'description', content: 'Six mentors across product, growth, design, and leadership.' },
		{ property: 'og:title', content: 'Mentors | Divy Sharma' },
		{ property: 'og:description', content: 'Mentors across product, growth, design, and leadership — and the single most useful thing each one taught me.' },
	]
})
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

.mentors-page {
	max-width: var(--container);
	margin: 0 auto;
	padding: 3rem 1.5rem 5rem;
	font-family: var(--font-sans);
	color: var(--color-heading);
}

/* ── Filters ── */
.filters {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	margin: 2rem 0 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid var(--color-border);
	flex-wrap: wrap;
}

.filter-label {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin-right: 0.25rem;
}

.filter-btn {
	padding: 0.25rem 0.625rem;
	font-size: var(--text-xs);
	color: var(--color-body);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	transition: all 0.15s;

	&:hover { border-color: var(--color-muted); }

	&.active {
		background: var(--color-heading);
		color: #fff;
		border-color: var(--color-heading);
		font-weight: 500;
	}
}

/* ── Avatar ── */
.avatar {
	position: relative;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: var(--text-sm);
	font-weight: 500;
	flex-shrink: 0;

	&--lg { width: 52px; height: 52px; font-size: var(--text-base); }
	&--teal,
	&--blue,
	&--purple,
	&--coral,
	&--amber,
	&--gray   { background: var(--color-border); color: var(--color-heading); }
}

.company-badge {
	position: absolute;
	bottom: -2px;
	right: -2px;
	width: 18px;
	height: 18px;
	border-radius: var(--radius-sm);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: var(--text-xs);
	font-weight: 500;
	color: #fff;
	border: 2px solid #fff;

	.avatar--lg & {
		width: 22px;
		height: 22px;
		font-size: var(--text-xs);
	}

	.featured-card & {
		border-color: var(--color-bg-subtle);
	}
}

/* ── Tags ── */
.tags-row {
	display: flex;
	gap: 0.375rem;
	flex-wrap: wrap;
	margin-bottom: 0.875rem;
}

.tag {
	display: inline-block;
	font-size: var(--text-xs);
	line-height: var(--leading-snug);
	padding: 0.25rem 0.5rem;
	border-radius: var(--radius-sm);

	&--blue,
	&--purple,
	&--coral,
	&--teal,
	&--amber,
	&--gray   { background: var(--color-bg-subtle); color: var(--color-heading); border: 1px solid var(--color-border); }
}

/* ── LinkedIn link ── */
.linkedin-link {
	font-size: var(--text-xs);
	color: var(--color-body);
	text-decoration: none;
	transition: color 0.15s;
	align-self: flex-start;

	&:hover { color: var(--color-heading); }

	&--sm { flex-shrink: 0; }
}

/* ── Featured card ── */
.featured-card {
	background: var(--color-bg-subtle);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	padding: 1.5rem;
	margin-bottom: 0.75rem;
}

.fc-header {
	display: flex;
	gap: 0.875rem;
	align-items: flex-start;
	margin-bottom: 0.875rem;
}

.fc-info { flex: 1; min-width: 0; }

.fc-name-row {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-bottom: 0.25rem;
}

.fc-name {
	font-size: var(--text-base);
	font-weight: 500;
	margin: 0;
}

.fc-category-label {
	font-size: var(--text-xs);
	font-weight: 500;
	color: var(--color-heading);
	background: var(--color-border);
	padding: 0.125rem 0.375rem;
	border-radius: var(--radius-sm);
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

.fc-role {
	font-size: var(--text-sm);
	color: var(--color-body);
	margin: 0 0 0.25rem;

	strong { color: var(--color-heading); }
}

.fc-duration {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin: 0;
}

.lesson-box {
	background: var(--color-bg);
	border-radius: var(--radius-sm);
	padding: 0.875rem 1rem;
	margin-bottom: 0.875rem;
}

.lesson-eyebrow {
	font-size: var(--text-xs);
	font-weight: 500;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--color-muted);
	margin: 0 0 0.375rem;
}

.lesson-text {
	font-family: var(--font-sans);
	font-size: var(--text-base);
	font-style: italic;
	font-weight: 400;
	line-height: var(--leading-normal);
	color: var(--color-heading);
	margin: 0;
}

.fc-desc {
	font-size: var(--text-sm);
	line-height: var(--leading-normal);
	color: var(--color-body);
	margin: 0 0 1rem;
}

.latest-lesson {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	flex-wrap: wrap;
	background: var(--color-bg-subtle);
	padding: 0.625rem 0.875rem;
	border-radius: var(--radius-sm);
}

.latest-label {
	font-size: var(--text-xs);
	font-weight: 500;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--color-muted);
}

.latest-text {
	flex: 1;
	min-width: 180px;
	font-family: var(--font-sans);
	font-size: var(--text-sm);
	font-style: italic;
	color: var(--color-heading);
}

/* ── Mentor card grid ── */
.mentor-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.75rem;
}

.mentor-card {
	position: relative;
	background: var(--color-bg);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	transition: border-color 0.15s;

	&:hover {
		border-color: var(--color-muted);
		.card-arrow { color: var(--color-heading); }
	}
}

.card-arrow {
	position: absolute;
	top: 16px;
	right: 16px;
	font-size: var(--text-sm);
	color: var(--color-muted);
	transition: color 0.15s;
}

.mc-header {
	display: flex;
	gap: 0.625rem;
	align-items: flex-start;
	margin-bottom: 0.875rem;
	padding-right: 1.25rem;
}

.mc-info { flex: 1; min-width: 0; }

.mc-name {
	font-size: var(--text-sm);
	font-weight: 500;
	margin: 0 0 0.125rem;
}

.mc-role {
	font-size: var(--text-xs);
	color: var(--color-body);
	margin: 0 0 0.25rem;

	strong { color: var(--color-heading); }
}

.mc-meta {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin: 0;
}

.mc-lesson {
	font-family: var(--font-sans);
	font-size: var(--text-sm);
	font-style: italic;
	font-weight: 400;
	line-height: var(--leading-normal);
	color: var(--color-heading);
	margin: 0 0 0.625rem;
}

.mc-desc {
	font-size: var(--text-sm);
	line-height: 1.55;
	color: var(--color-body);
	margin: 0 0 0.875rem;
	flex: 1;
}

/* ── Show more ── */
.show-more-wrap {
	text-align: center;
	margin-top: 1.25rem;
}

.show-more-btn {
	padding: 0.5rem 1.125rem;
	font-size: var(--text-sm);
	color: var(--color-heading);
	border: 1px solid #d6d3d1;
	border-radius: var(--radius-sm);
	transition: border-color 0.15s;

	&:hover { border-color: var(--color-body); }
}

/* ── Empty ── */
.empty {
	text-align: center;
	padding: 3rem 0;
	font-size: var(--text-sm);
	color: var(--color-body);
}

/* ── Responsive ── */
@media (max-width: 640px) {
	.mentors-page { padding: 2rem 1.25rem 4rem; }

	.mentor-grid { grid-template-columns: 1fr; }

	.fc-header { flex-wrap: wrap; }

	.linkedin-link--sm { display: none; }

	.latest-lesson { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
}
</style>
