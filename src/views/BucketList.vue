<template>
	<div class="bucket-page">
		<PageHero
			:icon="Target"
			title="Bucket List"
			:accent-from="1"
			subtitle="Things I want to do, become, and build — and a few I already have."
		/>

		<!-- Progress bar -->
		<div class="progress-section">
			<div class="progress-bar">
				<div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
			</div>
			<p class="progress-text">{{ doneCount }} of {{ total }} completed</p>
		</div>

		<!-- Year filter -->
		<div class="filter-row">
			<button
				v-for="y in yearOptions"
				:key="y.value"
				class="year-chip"
				:class="{ active: activeYear === y.value }"
				@click="setYear(y.value)"
			>
				{{ y.label }}
				<span class="chip-count">{{ y.count }}</span>
			</button>
		</div>

		<!-- Items grouped -->
		<div class="bucket-groups">
			<!-- Completed section (only in "All" view) -->
			<div v-if="completedItems.length" class="bucket-group">
				<h2 class="group-title group-title--done">Completed</h2>
				<ul class="bucket-list">
					<li
						v-for="item in completedItems"
						:key="item.title"
						class="bucket-item bucket-item--done"
					>
						<span class="check-icon">&#10003;</span>
						<div class="item-body">
							<span class="item-title">{{ item.title }}</span>
							<span v-if="item.completedDate" class="item-date">{{ formatDate(item.completedDate) }}</span>
							<p v-if="item.note" class="item-note">{{ item.note }}</p>
						</div>
						<span class="item-tag" :class="'tag--' + item.category">{{ categoryLabel(item.category) }}</span>
					</li>
				</ul>
			</div>

			<!-- Pending section -->
			<div v-if="pendingItems.length" class="bucket-group">
				<h2 class="group-title group-title--pending">
					{{ activeYear === 'all' ? 'Still on the list' : activeYear === 'someday' ? 'Someday' : activeYear }}
				</h2>
				<ul class="bucket-list">
					<li
						v-for="item in pendingItems"
						:key="item.title"
						class="bucket-item"
					>
						<span class="check-icon check-icon--empty"></span>
						<div class="item-body">
							<span class="item-title">{{ item.title }}</span>
							<span v-if="item.targetYear && activeYear === 'all'" class="item-date">Target {{ item.targetYear }}</span>
							<p v-if="item.note" class="item-note">{{ item.note }}</p>
						</div>
						<span class="item-tag" :class="'tag--' + item.category">{{ categoryLabel(item.category) }}</span>
					</li>
				</ul>
			</div>

			<!-- Empty state -->
			<div v-if="!completedItems.length && !pendingItems.length" class="empty-state">
				<p>Nothing here yet for this filter.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { Target } from 'lucide-vue-next'
import { bucketList } from '@/data/bucketlist.js'
import posthog from 'posthog-js'

useHead({
	title: 'Bucket List',
	meta: [
		{ name: 'description', content: 'Things I want to do, become, and build — and a few I already have.' },
		{ property: 'og:title', content: 'Bucket List | Divy Sharma' },
		{ property: 'og:description', content: 'Things I want to do, become, and build — and a few I already have.' },
	]
})

const activeYear = ref('all')

const years = [...new Set(bucketList.filter(i => i.targetYear).map(i => i.targetYear))].sort()
const hasSomeday = bucketList.some(i => !i.targetYear)

const yearOptions = computed(() => {
	const opts = [{ value: 'all', label: 'All', count: bucketList.length }]
	years.forEach(y => {
		opts.push({ value: y, label: String(y), count: bucketList.filter(i => i.targetYear === y).length })
	})
	if (hasSomeday) {
		opts.push({ value: 'someday', label: 'Someday', count: bucketList.filter(i => !i.targetYear).length })
	}
	return opts
})

const filtered = computed(() => {
	if (activeYear.value === 'all') return bucketList
	if (activeYear.value === 'someday') return bucketList.filter(i => !i.targetYear)
	return bucketList.filter(i => i.targetYear === activeYear.value)
})

const completedItems = computed(() => filtered.value.filter(i => i.done))
const pendingItems = computed(() => filtered.value.filter(i => !i.done))
const doneCount = computed(() => bucketList.filter(i => i.done).length)
const total = bucketList.length
const progressPercent = computed(() => Math.round((doneCount.value / total) * 100))

function setYear(y) {
	activeYear.value = y
	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({ event: 'bucketlist:filter', year: y })
	posthog.capture('bucketlist:filter', { year: y })
}

function formatDate(dateStr) {
	const [y, m] = dateStr.split('-')
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	return `${months[parseInt(m) - 1]} ${y}`
}

function categoryLabel(cat) {
	const map = { career: 'Career', life: 'Life', create: 'Create', learn: 'Learn', 'give-back': 'Give Back' }
	return map[cat] || cat
}
</script>

<style scoped lang="scss">
.bucket-page {
	max-width: 720px;
	margin: 0 auto;
	padding: 0 var(--space-md);
}

// ── Progress ──
.progress-section {
	margin-bottom: var(--space-lg);
}

.progress-bar {
	height: 6px;
	background: var(--color-border);
	border-radius: var(--radius-pill);
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: var(--color-heading);
	border-radius: var(--radius-pill);
	transition: width 0.4s ease;
}

.progress-text {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin-top: var(--space-xs);
}

// ── Year filter ──
.filter-row {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: var(--space-xl);
}

.year-chip {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	padding: 0.375rem 0.75rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-pill);
	background: var(--color-bg);
	color: var(--color-body);
	font-size: var(--text-xs);
	font-family: var(--font-sans);
	font-weight: 500;
	cursor: pointer;
	transition: border-color var(--duration-fast), color var(--duration-fast);

	&:hover {
		border-color: var(--color-heading);
		color: var(--color-heading);
	}

	&.active {
		background: var(--color-heading);
		border-color: var(--color-heading);
		color: #fff;

		.chip-count {
			background: rgba(255, 255, 255, 0.2);
			color: #fff;
		}
	}
}

.chip-count {
	font-size: 0.625rem;
	background: var(--color-border);
	color: var(--color-muted);
	padding: 0.1rem 0.4rem;
	border-radius: var(--radius-pill);
	font-weight: 600;
	line-height: 1.3;
}

// ── Groups ──
.bucket-groups {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
	padding-bottom: var(--space-2xl);
}

.group-title {
	font-size: var(--text-sm);
	font-weight: 600;
	font-family: var(--font-sans);
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: var(--space-sm);
	padding-bottom: var(--space-xs);
	border-bottom: 1px solid var(--color-border);

	&--done { color: #16a34a; }
	&--pending { color: var(--color-heading); }
}

// ── List ──
.bucket-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 0;
}

.bucket-item {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 0.875rem 0;
	border-bottom: 1px solid var(--color-border);

	&:last-child { border-bottom: none; }

	&--done {
		.item-title {
			text-decoration: line-through;
			text-decoration-color: var(--color-muted);
			color: var(--color-muted);
		}

		.item-note { color: var(--color-muted); }
	}
}

// ── Checkbox ──
.check-icon {
	flex-shrink: 0;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.75rem;
	margin-top: 0.125rem;
	background: #16a34a;
	color: #fff;
	font-weight: 700;

	&--empty {
		background: transparent;
		border: 2px solid var(--color-border);
	}
}

// ── Item content ──
.item-body {
	flex: 1;
	min-width: 0;
}

.item-title {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-heading);
	font-family: var(--font-sans);
	line-height: var(--leading-tight);
}

.item-date {
	display: inline-block;
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin-left: 0.5rem;
}

.item-note {
	font-size: var(--text-xs);
	color: var(--color-body);
	margin: 0.25rem 0 0;
	line-height: var(--leading-normal);
}

// ── Category tags ──
.item-tag {
	flex-shrink: 0;
	font-size: 0.625rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	padding: 0.2rem 0.5rem;
	border-radius: var(--radius-pill);
	white-space: nowrap;
	margin-top: 0.125rem;
}

.tag--career { background: #dbeafe; color: #1e40af; }
.tag--life { background: #fef3c7; color: #92400e; }
.tag--create { background: #ede9fe; color: #5b21b6; }
.tag--learn { background: #d1fae5; color: #065f46; }
.tag--give-back { background: #fce7f3; color: #9d174d; }

// ── Empty state ──
.empty-state {
	text-align: center;
	padding: var(--space-xl) 0;
	color: var(--color-muted);
	font-size: var(--text-sm);
}

// ── Responsive ──
@media (max-width: 640px) {
	.item-tag { display: none; }
	.item-date { display: block; margin-left: 0; margin-top: 0.125rem; }
}
</style>
