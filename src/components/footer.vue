<template>
	<footer class="site-footer">
		<div class="footer-container">
			<div class="footer-grid">

				<!-- Brand column -->
				<div class="footer-brand">
					<h3 class="footer-name">Divy Sharma</h3>
					<p class="footer-tagline">Associate Product Manager building growth systems and honest products.</p>
					<div class="footer-socials">
						<a href="mailto:divysharma029@gmail.com" aria-label="Email" rel="noopener noreferrer" @click="trackOutbound('email', 'mailto:divysharma029@gmail.com', { location: 'footer' })">
							<i class="ph-bold ph-envelope-simple"></i>
						</a>
						<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" @click="trackOutbound('linkedin', 'https://www.linkedin.com/in/divy-sharma-243748216/', { location: 'footer' })">
							<i class="ph-bold ph-linkedin-logo"></i>
						</a>
						<a href="https://github.com/divysharma7" target="_blank" rel="noopener noreferrer" aria-label="GitHub" @click="trackOutbound('github', 'https://github.com/divysharma7', { location: 'footer' })">
							<i class="ph-bold ph-github-logo"></i>
						</a>
						<a href="https://twitter.com/Divy_Sharma6" target="_blank" rel="noopener noreferrer" aria-label="Twitter" @click="trackOutbound('twitter', 'https://twitter.com/Divy_Sharma6', { location: 'footer' })">
							<i class="ph-bold ph-x-logo"></i>
						</a>
						<a href="https://www.behance.net/divysharma3" target="_blank" rel="noopener noreferrer" aria-label="Behance" @click="trackOutbound('behance', 'https://www.behance.net/divysharma3', { location: 'footer' })">
							<i class="ph-bold ph-behance-logo"></i>
						</a>
					</div>
				</div>

				<!-- General column -->
				<div class="footer-col">
					<h4 class="footer-col-title">General</h4>
					<nav class="footer-nav">
						<router-link to="/">Home</router-link>
						<router-link to="/blog">Blog</router-link>
						<router-link to="/projects">Projects</router-link>
						<router-link to="/workexperience">Experience</router-link>
						<router-link to="/explore">Explore</router-link>
					</nav>
				</div>

				<!-- The Website column -->
				<div class="footer-col">
					<h4 class="footer-col-title">The Website</h4>
					<nav class="footer-nav">
						<router-link to="/journey">Journey</router-link>
						<router-link to="/gears">Gears</router-link>
						<router-link to="/books">Books</router-link>
						<router-link to="/journey/certificates">Certificates</router-link>
						<router-link to="/journey/mentors">Mentors</router-link>
					</nav>
				</div>

				<!-- Connect column -->
				<div class="footer-col">
					<h4 class="footer-col-title">Connect</h4>
					<nav class="footer-nav">
						<a href="mailto:divysharma029@gmail.com">Email</a>
						<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						<a href="https://twitter.com/Divy_Sharma6" target="_blank" rel="noopener noreferrer">Twitter / X</a>
						<a href="https://github.com/divysharma7" target="_blank" rel="noopener noreferrer">GitHub</a>
						<a href="https://drive.google.com/file/d/1DxcRgUE_-V8B23Yz4L-Padn3t07I2xwp/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
					</nav>
				</div>

			</div>

			<!-- Spotify -->
			<div class="footer-spotify">
				<Spotify />
			</div>

			<!-- Copyright -->
			<div class="footer-bottom">
				<p>Copyright &copy; {{ new Date().getFullYear() }} Divy Sharma. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
import Spotify from './spotify.vue'
import { trackOutbound } from '@/analytics/umami'
</script>

<style scoped>
.site-footer {
	margin-top: 4rem;
	border-top: 1px solid var(--color-border);
}

.footer-container {
	max-width: var(--container-wide);
	margin: 0 auto;
	padding: 3rem 2rem 2rem;
}

.footer-grid {
	display: grid;
	grid-template-columns: 1.5fr 1fr 1fr 1fr;
	gap: 2rem;
}

/* Brand */
.footer-name {
	font-family: var(--font-sans);
	font-size: var(--text-xl);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.5rem;
}

.footer-tagline {
	font-size: var(--text-sm);
	color: var(--color-muted);
	line-height: var(--leading-normal);
	margin: 0 0 1rem;
	max-width: 280px;
}

.footer-socials {
	display: flex;
	gap: 0;
}

.footer-socials a {
	color: var(--color-muted);
	font-size: var(--text-lg);
	padding: 0.5rem;
	min-width: 40px;
	min-height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color var(--duration-fast);
}

.footer-socials a:hover {
	color: var(--color-heading);
}

/* Columns */
.footer-col-title {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.75rem;
}

.footer-nav {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.footer-nav a {
	font-size: var(--text-sm);
	color: var(--color-body);
	text-decoration: none;
	transition: color var(--duration-fast);
}

.footer-nav a:hover {
	color: var(--color-heading);
}

/* Spotify */
.footer-spotify {
	margin-top: 2rem;
}

/* Bottom */
.footer-bottom {
	margin-top: 3rem;
	padding-top: 1.5rem;
	border-top: 1px solid var(--color-border);
	text-align: center;
}

.footer-bottom p {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
	.footer-grid {
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.footer-brand {
		grid-column: 1 / -1;
	}
}

@media (max-width: 480px) {
	.footer-grid {
		grid-template-columns: 1fr;
	}
}
</style>
