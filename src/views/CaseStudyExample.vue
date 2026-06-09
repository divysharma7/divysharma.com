<template>
	<div class="example-page">
		<div class="container">
			<router-link to="/blog/why-designers-abandon-case-studies" class="back-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
				Back to the post
			</router-link>

			<h1 class="title">What the skill actually produces</h1>
			<p class="dek">A phase-by-phase walkthrough of the project the skill was reverse-engineered from. This is what the output is calibrated against.</p>

			<hr class="rule" />

			<section class="phase">
				<h2>Phase 1 — Discovery</h2>
				<p class="caption">From global context to a sharp problem statement. Statistics in pairs, an emotional arc across life stages, and a How-Might-We question that names a specific life phase, not a demographic.</p>
				<div class="slides">
					<img src="/images/blog/team-dua-r1-1.webp" alt="Phase 1 slide 1 — global scenario and central problem map" loading="lazy" />
					<img src="/images/blog/team-dua-r1-2.webp" alt="Phase 1 slide 2 — national perspective with interview insights" loading="lazy" />
					<img src="/images/blog/team-dua-r1-3.webp" alt="Phase 1 slide 3 — emotional arc across life stages" loading="lazy" />
					<img src="/images/blog/team-dua-r1-4.webp" alt="Phase 1 slide 4 — opportunities and the HMW question" loading="lazy" />
				</div>
			</section>

			<section class="phase">
				<h2>Phase 2 — Empathy</h2>
				<p class="caption">The expansion. Cultural context, a concentric stakeholder map, a day-in-the-life experience map, two personas on a structural axis, and the assumptions the research actually disproved.</p>
				<div class="slides">
					<img src="/images/blog/team-dua-r2-1.webp" alt="Phase 2 slide 1 — Indian scenario funnel and existing services audit" loading="lazy" />
					<img src="/images/blog/team-dua-r2-2.webp" alt="Phase 2 slide 2 — concentric stakeholder map with quotes" loading="lazy" />
					<img src="/images/blog/team-dua-r2-3.webp" alt="Phase 2 slide 3 — seven-dimension problem mapping" loading="lazy" />
					<img src="/images/blog/team-dua-r2-4.webp" alt="Phase 2 slide 4 — day-in-the-life experience map" loading="lazy" />
					<img src="/images/blog/team-dua-r2-5.webp" alt="Phase 2 slide 5 — contrasting personas and assumptions invalidated" loading="lazy" />
				</div>
			</section>

			<section class="phase">
				<h2>Phase 3 — Convergence</h2>
				<p class="caption">Problem scoring with individual team radars, an ecosystem map of the chosen problem, market viability, and a formal need statement that names qualities of the desired service rather than its form.</p>
				<div class="slides">
					<img src="/images/blog/team-dua-r3-1.webp" alt="Phase 3 slide 1 — radar chart scoring candidate problems" loading="lazy" />
					<img src="/images/blog/team-dua-r3-2.webp" alt="Phase 3 slide 2 — ecosystem map with themes and touchpoints" loading="lazy" />
					<img src="/images/blog/team-dua-r3-3.webp" alt="Phase 3 slide 3 — pain points in existing services" loading="lazy" />
					<img src="/images/blog/team-dua-r3-4.webp" alt="Phase 3 slide 4 — impact, business viability, sub-HMWs, need statement" loading="lazy" />
				</div>
			</section>

			<section class="phase">
				<h2>Phase 4 — Solution</h2>
				<p class="caption">A named solution with five key features, a service flow that ends in a systemic outcome, FAQs that explain mechanisms (not policy), and impact looping back to the wellbeing radar from Phase 1.</p>
				<div class="slides">
					<img src="/images/blog/team-dua-final-1.webp" alt="Phase 4 slide 1 — background, cause-and-effect, co-creation with mothers" loading="lazy" />
					<img src="/images/blog/team-dua-final-2.webp" alt="Phase 4 slide 2 — Togit concept, primary stakeholders, five features" loading="lazy" />
					<img src="/images/blog/team-dua-final-3.webp" alt="Phase 4 slide 3 — service flow storyboard and FAQs" loading="lazy" />
					<img src="/images/blog/team-dua-final-4.webp" alt="Phase 4 slide 4 — benefits, wellbeing dimensions, future goals" loading="lazy" />
				</div>
			</section>

			<hr class="rule" />

			<section class="closing">
				<p>These are slides from the original project — not generated output. It's what the skill was reverse-engineered from, and what its output is calibrated against. The full playbooks that encode this style are on <a href="https://github.com/divysharma7/ux-case-study-writer" target="_blank" rel="noopener">GitHub</a>.</p>
				<p class="thanks">Thanks to <a href="https://urvisuhane.vercel.app/" target="_blank" rel="noopener">Urvi Suhane</a> and her team.</p>
			</section>

			<router-link to="/blog/why-designers-abandon-case-studies" class="back-link back-link--bottom">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
				Back to the post
			</router-link>
		</div>
	</div>
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
	name: 'CaseStudyExample',
	setup() {
		useHead({
			title: 'What the skill actually produces | Divy Sharma',
			meta: [
				{ name: 'description', content: "A phase-by-phase walkthrough of what the UX case study writer skill produces, using Team Dua's Togit project as the reference." },
				{ name: 'robots', content: 'index, follow' },
				{ property: 'og:title', content: 'What the skill actually produces | Divy Sharma' },
				{ property: 'og:description', content: "Phase-by-phase walkthrough of what the UX case study writer skill produces." },
				{ property: 'og:type', content: 'article' },
				{ property: 'og:url', content: 'https://divysharma-com.vercel.app/blog/why-designers-abandon-case-studies/example' },
				{ property: 'og:image', content: 'https://divysharma-com.vercel.app/blog-heroes/why-designers-abandon-case-studies.svg' }
			]
		})
	}
}
</script>

<style scoped lang="scss">
.example-page {
	min-height: 100vh;
	font-family: var(--font-sans);
	padding-bottom: 5rem;
}

.container {
	max-width: var(--container);
	margin: 0 auto;
	padding: 3rem 2rem 4rem;
}

.back-link {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: var(--text-sm);
	font-weight: 500;
	color: var(--color-heading);
	text-decoration: none;
	margin-bottom: 2.5rem;
	transition: opacity 0.15s;
	&:hover { opacity: 0.6; }
}

.back-link--bottom {
	margin-top: 3rem;
	margin-bottom: 0;
}

.title {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 600;
	color: var(--color-heading);
	line-height: var(--leading-tight);
	letter-spacing: -0.025em;
	text-wrap: balance;
	margin: 0 0 1.25rem;
}

.dek {
	font-size: var(--text-lg);
	color: var(--color-muted);
	line-height: var(--leading-normal);
	margin: 0 0 1.5rem;
}

.rule {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 2rem 0 3rem;
}

.phase {
	margin-bottom: 4rem;

	h2 {
		font-size: 26px;
		font-weight: 700;
		color: var(--color-heading);
		line-height: 1.3;
		margin: 0 0 0.5rem;
	}

	.caption {
		font-size: var(--text-base);
		color: var(--color-body);
		line-height: var(--leading-normal);
		margin: 0 0 1.5rem;
	}
}

.slides {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	img {
		width: 100%;
		max-width: 100%;
		height: auto;
		border-radius: var(--radius-sm);
		display: block;
		object-fit: contain;
		outline: 1px solid rgba(0, 0, 0, 0.06);
		outline-offset: -1px;
	}
}

.closing {
	font-size: var(--text-base);
	color: var(--color-body);
	line-height: var(--leading-relaxed);

	p { margin-bottom: 1rem; }

	a {
		color: var(--color-heading);
		text-decoration: underline;
		text-decoration-color: var(--color-faint);
		text-underline-offset: 3px;
		transition: text-decoration-color 0.15s;
		&:hover { text-decoration-color: var(--color-heading); }
	}

	.thanks {
		color: var(--color-muted);
		font-size: var(--text-sm);
	}
}

@media (max-width: 640px) {
	.container { padding: 2rem 1.25rem 4rem; }
	.title { font-size: var(--h2); }
	.dek { font-size: var(--text-base); }
	.phase h2 { font-size: var(--text-xl); }
}
</style>
