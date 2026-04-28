<template>
	<div class="home-page" @mousemove="onMouseMove">

		<!-- Custom cursor follower (decorative, doesn't hide native cursor) -->
		<div class="cursor-dot" ref="cursorDot"></div>

		<div class="home-container">

			<!-- ── Hero ── -->
			<section class="hero">
				<h1 class="hero-name">divy sharma</h1>
				<p class="hero-bio">
					Associate Product Manager at <span class="tag">ASBL</span> in Hyderabad, reporting to the VP Growth. I work on real estate tech with the Marketing team, mostly on funnel and acquisition. Before ASBL, I founded <span class="tag">Aqua-Alert</span>, an IoT water management startup incubated at <strong>NSRCEL, IIM Bangalore</strong>. It was something like a Fitbit for water meters, and shut down in February 2025.
				</p>
				<div class="hero-meta">
					<span><MapPin :size="14" /> Hyderabad, India</span>
					<span><Clock :size="14" /> {{ currentTime }}</span>
				</div>

				<div class="hero-ctas">
					<a href="mailto:divysharma029@gmail.com" class="cta-btn cta-btn--primary">
						<Send :size="14" /> Get in touch
					</a>
					<router-link to="/resume" class="cta-btn cta-btn--outline" @click="gtmPush('click:resume_download', { location: 'home_hero' })">
						<FileText :size="14" /> Resume
					</router-link>
				</div>
				<div class="hero-socials">
					<a href="https://twitter.com/Divy_Sharma6" target="_blank" aria-label="Twitter" @click="gtmPush('click:social', { platform: 'twitter', location: 'home_hero' })"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
					<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" aria-label="LinkedIn" @click="gtmPush('click:social', { platform: 'linkedin', location: 'home_hero' })"><Linkedin :size="18" /></a>
					<a href="https://github.com/divysharma7" target="_blank" aria-label="GitHub" @click="gtmPush('click:social', { platform: 'github', location: 'home_hero' })"><Github :size="18" /></a>
					<a href="mailto:divysharma029@gmail.com" aria-label="Email"><Mail :size="18" /></a>
				</div>
			</section>

			<!-- ── Divider ── -->
			<div class="divider"></div>

			<!-- ── Experience ── -->
			<section class="section">
				<h2 class="section-heading">Experience</h2>
				<div class="exp-stack">
					<ExperienceCard
						v-for="exp in experiences.slice(0, 3)"
						:key="exp.company"
						:experience="exp"
						compact
					/>
				</div>
				<router-link to="/workexperience" class="view-all" @click="gtmPush('click:view_all', { section: 'experience' })">See full experience &rarr;</router-link>
			</section>

			<!-- ── Divider ── -->
			<div class="divider"></div>

			<!-- ── Latest Blog ── -->
			<section class="section">
				<h2 class="section-heading">Latest from Blog</h2>
				<div class="blog-stack">
					<router-link
						v-for="(post, index) in posts.slice(0, 3)"
						:key="post.slug"
						:to="'/blog/' + post.slug"
						class="blog-card"
						@click="gtmPush('click:blog_card', { post_title: post.title, post_slug: post.slug, location: 'home' })"
					>
						<div class="blog-body">
							<span class="blog-date">{{ formatDate(post.publishedAt) }}</span>
							<h3>{{ post.title }}</h3>
							<p>{{ post.excerpt }}</p>
						</div>
						<img
							v-if="post.heroImage"
							:src="post.heroImage"
							:alt="post.heroAlt || post.title"
							class="blog-card-hero"
							loading="lazy"
						/>
						<span v-else class="arrow">&rarr;</span>
					</router-link>
				</div>
				<router-link to="/blog" class="view-all">Read more posts &rarr;</router-link>
			</section>

			<!-- ── Divider ── -->
			<div class="divider"></div>

			<!-- ── Explore ── -->
			<section class="section">
				<h2 class="section-heading">Explore</h2>
				<div class="explore-grid">
					<router-link to="/journey" class="explore-card">
						<Route :size="18" />
						<div>
							<h3>My Journey</h3>
							<p>Overview of my learning and career journey.</p>
						</div>
					</router-link>
					<router-link to="/journey/certificates" class="explore-card">
						<Award :size="18" />
						<div>
							<h3>Certificates & Achievements</h3>
							<p>A curated list of certificates and achievements.</p>
						</div>
					</router-link>
					<router-link to="/journey/mentors" class="explore-card">
						<Users :size="18" />
						<div>
							<h3>Gurus & Mentors</h3>
							<p>The people who shaped my journey.</p>
						</div>
					</router-link>
					<router-link to="/gears" class="explore-card">
						<Settings :size="18" />
						<div>
							<h3>Gears & Setup</h3>
							<p>Tools and software I use daily.</p>
						</div>
					</router-link>
					<router-link to="/books" class="explore-card">
						<BookOpen :size="18" />
						<div>
							<h3>Books</h3>
							<p>What I'm reading and what shaped my thinking.</p>
						</div>
					</router-link>
					<router-link to="/explore" class="explore-card">
						<Compass :size="18" />
						<div>
							<h3>Explore</h3>
							<p>Curated links and things I find interesting.</p>
						</div>
					</router-link>
				</div>
			</section>

			<!-- ── Book a Call ── -->
			<div class="cta-wrapper">
				<CTA />
			</div>

		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { experiences } from '../data/experience.js'
import { posts } from '../data/posts.js'
import ExperienceCard from '../components/experience/ExperienceCard.vue'
import CTA from '../components/CTA.vue'
import { useHead } from '@vueuse/head'
import { MapPin, Clock, Send, FileText, Linkedin, Github, Mail, Route, Award, Users, Settings, BookOpen, Compass } from 'lucide-vue-next'
import posthog from 'posthog-js'

useHead({
	title: 'Home',
	meta: [
		{ name: 'description', content: 'Divy Sharma — Associate Product Manager & Entrepreneur. Building growth experiences in real estate tech.' },
		{ property: 'og:title', content: 'Divy Sharma — Product Manager & Entrepreneur' },
		{ property: 'og:description', content: 'PM at ASBL. Building growth systems for real estate tech.' }
	]
})

function gtmPush(event, params) {
	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({ event, ...params })
	posthog.capture(event, params)
}

function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Live clock
const currentTime = ref('')
let clockInterval = null
function updateClock() {
	currentTime.value = new Date().toLocaleTimeString('en-US', {
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		timeZone: 'Asia/Kolkata'
	})
}
onMounted(() => { updateClock(); clockInterval = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockInterval))

// Custom cursor (decorative follower — native cursor stays visible)
const cursorDot = ref(null)
let cx = 0, cy = 0, tx = 0, ty = 0, rafId = null

function onMouseMove(e) {
	tx = e.clientX - 20
	ty = e.clientY - 20
}

function animateCursor() {
	cx += (tx - cx) * 0.12
	cy += (ty - cy) * 0.12
	if (cursorDot.value) {
		cursorDot.value.style.transform = `translate(${cx}px, ${cy}px)`
	}
	rafId = requestAnimationFrame(animateCursor)
}

onMounted(() => { rafId = requestAnimationFrame(animateCursor) })
onUnmounted(() => { if (rafId) cancelAnimationFrame(rafId) })
</script>

<style scoped lang="scss">
/* ── Base ── */
.home-page {
	background: transparent;
	min-height: 100vh;
}

.home-container {
	max-width: var(--container);
	margin: 0 auto;
	padding: 3.5rem 1.5rem 4rem;
	font-family: var(--font-sans);
}

/* ── Cursor follower ── */
.cursor-dot {
	position: fixed;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: rgba(229, 231, 235, 0.6);
	box-shadow:
		rgba(239, 239, 243, 0.5) 1px -1px 0 0,
		rgba(239, 239, 243, 0.5) -1px -1px 0 0,
		rgba(255, 255, 255, 0.9) 0 1px 1px 0 inset,
		rgba(0, 0, 0, 0.02) 0 -1px 1px 0 inset,
		rgba(0, 0, 0, 0.06) 0 3px 14px 0;
	pointer-events: none;
	z-index: var(--z-toast);
	top: 0;
	left: 0;
	will-change: transform;

	@media (max-width: 768px) { display: none; }
}

/* ── Hero ── */
.hero {
	margin-bottom: 0;
}

.hero-name {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 600;
	line-height: var(--leading-tight);
	color: var(--color-heading);
	margin: 0 0 0.75rem;
}

.hero-bio {
	font-size: var(--text-lg);
	line-height: var(--leading-normal);
	letter-spacing: 0.38px;
	color: var(--color-body);
	margin: 0 0 1rem;

	strong {
		color: var(--color-heading);
		font-weight: 500;
	}
}

@keyframes fadeUp {
	from { opacity: 0; transform: translateY(8px); }
	to   { opacity: 1; transform: translateY(0); }
}

.tag {
	display: inline-block;
	background: var(--color-border);
	color: var(--color-heading);
	padding: 4px 8px;
	border-radius: var(--radius-sm);
	font-size: var(--text-xs);
	font-weight: 500;
	line-height: normal;
	vertical-align: middle;
	margin: 0 2px;
	animation: fadeUp 500ms ease-out both;

	&:nth-of-type(2) { animation-delay: 80ms; }
	&:nth-of-type(3) { animation-delay: 160ms; }

	&--sm {
		font-size: var(--text-xs);
		padding: 3px 7px;
		animation: none;
	}
}

.hero-meta {
	color: var(--color-body);
	font-size: var(--text-sm);
	display: flex;
	gap: 16px;

	span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}

	:deep(svg) { color: var(--color-faint); }
}

/* ── Hero CTAs ── */
.hero-ctas {
	display: flex;
	gap: 0.625rem;
	margin-top: 1.5rem;
	flex-wrap: wrap;
}

.cta-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.6rem 1.15rem;
	border-radius: var(--radius-sm);
	font-size: var(--text-sm);
	font-weight: 500;
	text-decoration: none;
	transition: all var(--duration-fast);

	&--primary {
		background: var(--color-heading);
		color: #fff;
		border: 1px solid var(--color-heading);

		&:hover {
			background: #4b5563;
			transform: translateY(-1px);
			box-shadow: var(--shadow-md);
		}
	}

	&--outline {
		background: var(--color-bg);
		color: var(--color-heading);
		border: 1px solid var(--color-border);

		&:hover {
			border-color: var(--color-faint);
			transform: translateY(-1px);
		}
	}
}

.hero-socials {
	display: flex;
	gap: 0.25rem;
	margin-top: 1rem;

	a {
		color: var(--color-faint);
		font-size: var(--text-lg);
		padding: 0.375rem;
		min-width: 40px;
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color var(--duration-fast);

		&:hover { color: var(--color-heading); }
	}
}

/* ── About ── */
.hero-about {
	margin-top: 2rem;

	p {
		font-size: var(--text-sm);
		line-height: var(--leading-relaxed);
		color: var(--color-body);
		margin: 0 0 1rem;

		&:last-child { margin-bottom: 0; }

		strong {
			color: var(--color-heading);
			font-weight: 600;
		}
	}
}

.tool-badge {
	display: inline-flex;
	align-items: center;
	padding: 0.125rem 0.5rem;
	background: var(--color-border);
	border-radius: var(--radius-sm);
	font-size: var(--text-sm);
	font-weight: 500;
	color: var(--color-heading);
	white-space: nowrap;
	margin: 0 0.1rem;
}

/* ── Dividers ── */
.divider {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 2.5rem 0;
}

/* ── Sections ── */
.section-heading {
	font-family: var(--font-sans);
	font-size: var(--h3);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	margin: 0 0 1.25rem;
}

/* ── Shared arrow ── */
.arrow {
	color: var(--color-faint);
	font-size: var(--text-base);
	flex-shrink: 0;
	opacity: 0;
	transition: all 0.15s ease;
	padding-top: 2px;
}

/* ── Projects ── */
.project-stack {
	display: flex;
	flex-direction: column;
}

.project-card {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 0;
	border-bottom: 1px solid var(--color-border);
	text-decoration: none;
	transition: background 0.15s;

	&:first-child { padding-top: 0; }
	&:last-child { border-bottom: none; }

	&:hover {
		.arrow { opacity: 1; transform: translateX(3px); }
		h3 { color: #111827; }
	}
}

.project-body {
	flex: 1;
	min-width: 0;
}

.project-head {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-bottom: 0.25rem;

	h3 {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-heading);
		margin: 0;
		transition: color 0.15s;
	}

	.sep { color: #e5e7eb; font-weight: 300; }
	.role { font-size: var(--text-sm); font-weight: 500; color: var(--color-muted); }
}

.project-body > p {
	font-size: var(--text-sm);
	color: var(--color-body);
	line-height: var(--leading-normal);
	margin: 0 0 0.5rem;
}

.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
}

/* ── Blog ── */
.blog-stack {
	display: flex;
	flex-direction: column;
	margin-bottom: 1.25rem;
}

.blog-card {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 0;
	border-bottom: 1px solid var(--color-border);
	text-decoration: none;

	&:first-child { padding-top: 0; }
	&:last-child { border-bottom: none; }

	&:hover {
		.arrow { opacity: 1; transform: translateX(3px); }
		h3 { color: #111827; }
	}
}

.blog-card-hero {
	width: 160px;
	aspect-ratio: 16 / 9;
	object-fit: cover;
	border-radius: var(--radius-sm);
	flex-shrink: 0;
}

.blog-body {
	flex: 1;
	min-width: 0;

	.blog-date {
		font-size: var(--text-xs);
		color: var(--color-muted);
		font-weight: 500;
	}

	h3 {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-heading);
		margin: 0.1rem 0 0.25rem;
		line-height: var(--leading-snug);
		transition: color 0.15s;
	}

	p {
		font-size: var(--text-sm);
		color: var(--color-body);
		line-height: var(--leading-normal);
		margin: 0;
	}
}

.view-all {
	font-size: var(--text-sm);
	font-weight: 500;
	color: var(--color-muted);
	text-decoration: none;
	transition: color 0.15s;

	&:hover { color: var(--color-heading); }
}

/* ── Experience ── */
.exp-stack {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-bottom: 1.25rem;
}

/* ── Explore ── */
.explore-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
}

.explore-card {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 14px 16px;
	background: var(--color-bg-subtle);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	text-decoration: none;
	transition: all 0.15s;

	&:hover {
		border-color: #e5e7eb;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
		transform: translateY(-1px);
	}

	:deep(svg) {
		color: var(--color-muted);
		margin-top: 2px;
		flex-shrink: 0;
	}

	h3 {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-heading);
		margin: 0 0 0.15rem;
	}

	p {
		font-size: var(--text-sm);
		color: var(--color-muted);
		line-height: var(--leading-snug);
		margin: 0;
	}
}


/* ── Responsive ── */
@media (max-width: 768px) {
	.home-container { padding: 2rem 1.25rem 3rem; }
	.hero-bio { font-size: 16px; }
	.explore-grid { grid-template-columns: 1fr; }
	.arrow { display: none; }
	.blog-card-hero { width: 120px; }
}

@media (max-width: 480px) {
	.cta-buttons { flex-direction: column; align-items: center; }
}
</style>
