<template>
	<div class="home-container">
		<div class="hero-section">
			<h1 class="headline fancy">
				divy sharma
			</h1>
			<h2 class="sub-headline">
				product manager • entrepreneur
			</h2>

			<div class="bio-text">
				<p>
					Hi, I'm Divy. I'm an Associate Product Manager in real estate tech, working closely with the Marketing team.
				</p>
				<p>
					I use
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/metabase" alt="Metabase" />
						Metabase
					</span>,
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/posthog" alt="PostHog" />
						PostHog
					</span>,
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/googleanalytics" alt="GA4" />
						GA4
					</span>,
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/googleads" alt="Google Ads" />
						Google Ads
					</span>,
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/meta" alt="Meta Ads" />
						Meta Ads
					</span>,
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/semrush" alt="Semrush" />
						Semrush
					</span>,
					and
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/googlesheets" alt="Sheets" />
						Sheets
					</span>
					to understand what users are doing and where we’re losing them. Then I turn those insights into execution using
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/figma" alt="Figma" />
						Figma
					</span>
					and
					<span class="tool-badge">
						<img src="https://cdn.simpleicons.org/jira" alt="Jira" />
						Jira
					</span>.
				</p>
				<p>
					My work starts with <span class="text-bold">Asking Right Questions</span>. The ones that make us stop and rethink what we think we know. I spend a lot of time <span class="text-bold">unblocking my team</span> from dependencies so they can focus on building, not waiting. I try to <span class="text-bold">lead with empathy</span> because behind every metric and every deadline, there are people doing their best.
				</p>
				<p>
					I obsess over the funnel not as a chart, but as a <span class="text-bold">story</span>. Where do users hesitate? Where do they get confused? Where do we lose their trust?
				</p>
				<p>
					I track retention and conversion closely, dig deep into drop-offs, and use <span class="text-bold">Opportunity Solution Trees</span> to separate noise from real insights. My goal is simple <span class="text-bold">to learn from the best people and do what best teams do to bring revenue impact to the organisation.</span>
				</p>
			</div>

			<div class="action-buttons">
				<a
					href="https://drive.google.com/file/d/1DxcRgUE_-V8B23Yz4L-Padn3t07I2xwp/view?usp=sharing"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline"
				>
					<i class="ph-bold ph-file-text"></i>
					Resume / CV
				</a>
				<a href="mailto:divysharma029@gmail.com" class="btn btn-solid">
					<i class="ph-bold ph-paper-plane-tilt"></i>
					Get in touch
				</a>
			</div>

			<div class="social-links">
				<a href="https://twitter.com/Divy_Sharma6" target="_blank" aria-label="Twitter">
					<i class="ph-bold ph-x-logo"></i>
				</a>
				<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" aria-label="LinkedIn">
					<i class="ph-bold ph-linkedin-logo"></i>
				</a>
				<a href="https://github.com/divysharma7" target="_blank" aria-label="GitHub">
					<i class="ph-bold ph-github-logo"></i>
				</a>
				<a href="mailto:divysharma029@gmail.com" aria-label="Email">
					<i class="ph-bold ph-envelope-simple"></i>
				</a>
			</div>
		</div>

		<!-- Work Experience Section -->
		<div class="experience-section">
			<SectionHeading heading="Experience" subHeading="Featured" />
			
			<div class="experience-list">
				<ExperienceCard 
					v-for="experience in experiences" 
					:key="experience.company" 
					:experience="experience" 
				/>
			</div>

			<div class="show-all-btn-wrapper">
				<router-link to="/workexperience" class="btn btn-outline show-all-btn">
					Show all work experiences
				</router-link>
			</div>
		</div>

		<!-- Setup Section -->
		<SetupSection />

		<!-- Journey Section -->
		<JourneySection />

		<div class="cta-wrapper">
			<CTA />
		</div>

	</div>
</template>

<script setup>
import { experiences } from '../data/experience.js';
import SectionHeading from '../components/common/SectionHeading.vue';
import ExperienceCard from '../components/experience/ExperienceCard.vue';
import CTA from '../components/CTA.vue';
import SetupSection from '../components/landing/SetupSection.vue';
import JourneySection from '../components/landing/JourneySection.vue';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Divy Sharma — Associate Product Manager & Developer. Specializing in real estate tech, analytics, and user-centric product development.' },
    { property: 'og:title', content: 'Divy Sharma — Product Manager & Developer' },
    { property: 'og:description', content: 'Associate Product Manager building delightful experiences in real estate tech.' }
  ]
})
</script>

<style scoped lang="scss">
.home-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 4rem 1.5rem;
	min-height: 60vh;
	display: flex;
	flex-direction: column; /* Changed to column to stack sections */
	align-items: flex-start; /* Left align everything */
}

.cta-wrapper {
	width: 100%;
	margin-top: 2rem;
}

.hero-section {
	width: 100%;
	text-align: left;
	margin-bottom: 4rem; /* Spacing between hero and experience */
}

.experience-section {
	width: 100%;
	text-align: left;
	margin-bottom: 4rem;
	
	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}
// ...
	
	.experience-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.show-all-btn-wrapper {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
		width: 100%;

		.show-all-btn {
			font-size: 0.95rem;
			color: #444;
			border-color: #ddd;
			padding: 0.6rem 1.25rem;

			&:hover {
				background: #f9f9f9;
				color: #111;
			}
		}
	}
}

.headline {
	font-family: var(--fontDisplay, serif); /* Use serif for "old style" look */
	font-weight: 700;
	font-size: 3rem;
	line-height: 1.2;
	color: #6a788c; /* Matches typical serif header color from screenshot */
	margin-bottom: 0.5rem;
	letter-spacing: -0.02em;
}

.sub-headline {
	font-family: var(--font-sans);
	font-size: var(--text-xl);
	font-weight: 400;
	color: var(--text-secondary);
	margin-bottom: 2.5rem;
	letter-spacing: 0.02em;
}

.bio-text {
	margin-bottom: 2.5rem;
	max-width: 650px;

	p {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		line-height: 1.8; /* Increased line-height for badges */
		color: var(--text-secondary);
		margin-bottom: 1rem;

		&:last-child {
			margin-bottom: 0;
		}

		.text-bold {
			color: var(--text-primary);
			font-weight: 600;
		}

		.tool-badge {
			display: inline-flex;
			align-items: center;
			gap: 0.35rem;
			padding: 0.15rem 0.5rem;
			border: 1px solid #e0e0e0;
			border-radius: 6px;
			background: #fafafa;
			font-size: 0.95rem;
			font-weight: 600;
			color: #333;
			vertical-align: middle;
			margin: 0 0.15rem;
			transition: all 0.2s ease;
			white-space: nowrap;

			img {
				width: 1rem;
				height: 1rem;
				border-radius: 2px;
			}

			&:hover {
				background: #fff;
				border-color: #bbb;
				transform: translateY(-1px);
				box-shadow: 0 2px 4px rgba(0,0,0,0.05);
			}
		}
	}
}

.action-buttons {
	display: flex;
	gap: 1rem;
	margin-bottom: 2.5rem;
	flex-wrap: wrap;

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		text-decoration: none;
		font-size: 1rem;
		transition: all 0.2s ease;

		i {
			font-size: 1.2rem;
		}

		&.btn-outline {
			background: #fff;
			border: 1px solid #ddd;
			color: #333;

			&:hover {
				background: #f9f9f9;
				border-color: #ccc;
				transform: translateY(-1px);
			}
		}

		&.btn-solid {
			background: #111;
			border: 1px solid #111;
			color: #fff;

			&:hover {
				background: #333;
				border-color: #333;
				transform: translateY(-1px);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			}
		}
	}
}

.social-links {
	display: flex;
	gap: 1.5rem;
	
	a {
		color: #999;
		font-size: 1.5rem;
		transition: color 0.2s ease, transform 0.2s ease;

		&:hover {
			color: #111;
			transform: translateY(-2px);
		}
	}
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.headline {
		font-size: 2.5rem;
	}
	
	.sub-headline {
		font-size: 1.1rem;
	}
	
	.bio-text p {
		font-size: 1.05rem;
	}

	.home-container {
		padding-top: 2rem;
	}
}
</style>
