<template>
	<section class="hero">
		<div class="container">
			<h1 class="name" data-aos="fade-up">Divy Sharma</h1>
			<h2 class="title" data-aos="fade-up" data-aos-delay="100">Growth Product Manager</h2>
			<p class="tagline" data-aos="fade-up" data-aos-delay="200">
				I build products that grow. Focused on experimentation, data-driven decision making, and technical execution.
			</p>
			<div class="cta-group" data-aos="fade-up" data-aos-delay="300">
				<router-link to="/projects" class="btn btn-primary">View Projects</router-link>
				<router-link to="/explore" class="btn btn-secondary">Read Writing</router-link>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.hero {
	padding: 6rem 0 4rem;

	.name {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--color-text-muted);
		margin: 0 0 1.5rem;
	}

	.tagline {
		font-size: 1.1rem;
		max-width: 600px;
		color: #444;
		margin: 0 0 2rem;
	}

	.cta-group {
		display: flex;
		gap: 1rem;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
		font-size: 0.95rem;

		&:hover {
			transform: translateY(-1px);
		}

		&.btn-primary {
			background: #000;
			color: #fff;
			border: 1px solid #000;
		}

		&.btn-secondary {
			background: transparent;
			color: #000;
			border: 1px solid #e0e0e0;

			&:hover {
				border-color: #000;
			}
		}
	}
}

@media (max-width: 600px) {
	.hero {
		padding: 4rem 0 3rem;

		.name {
			font-size: 2.5rem;
		}
	}
}
</style>
