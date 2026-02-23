<template>
	<div class="flexfoot">
		<div class="col left">
			<Spotify class="spotify-component" />
		</div>

		<div class="col icon">
			<div class="flex-right">
				<div class="socials">
					<a
						href="https://twitter.com/Divy_Sharma6"
						rel="noopener noreferrer"
						target="_blank"
						@click="trackOutbound('twitter', 'https://twitter.com/Divy_Sharma6', { location: 'footer' })"
					>
						<bx-bxl-twitter />
					</a>
					<a
						href="https://www.instagram.com/divy.sharma9/"
						rel="noopener noreferrer"
						target="_blank"
						@click="trackOutbound('instagram', 'https://www.instagram.com/divy.sharma9/', { location: 'footer' })"
					>
						<carbon-logo-instagram />
					</a>
					<a
						href="https://github.com/divysharma7"
						rel="noopener noreferrer"
						target="_blank"
						@click="trackOutbound('github', 'https://github.com/divysharma7', { location: 'footer' })"
					>
						<carbon-logo-github />
					</a>
					<a
						href="https://open.spotify.com/user/31wan4heyahmjpej4evvpzwzjnji"
						rel="noopener noreferrer"
						target="_blank"
						@click="trackOutbound('spotify', 'https://open.spotify.com/user/31wan4heyahmjpej4evvpzwzjnji', { location: 'footer' })"
					>
						<bx-bxl-spotify />
					</a>

					<a
						href="https://www.linkedin.com/in/divy-sharma-243748216/"
						target="_blank"
						rel="noopener noreferrer"
						@click="trackOutbound('linkedin', 'https://www.linkedin.com/in/divy-sharma-243748216/', { location: 'footer' })"
					>
						<carbon-logo-linkedin />
					</a>

					<a
						href="https://www.behance.net/divysharma3"
						target="_blank"
						rel="noopener noreferrer"
						@click="trackOutbound('behance', 'https://www.behance.net/divysharma3', { location: 'footer' })"
					>
						<bx-bxl-behance />
					</a>

					<a
						href="mailto:divysharma029@gmail.com"
						rel="noopener noreferrer"
						target="_blank"
						@click="trackOutbound('email', 'mailto:divysharma029@gmail.com', { location: 'footer' })"
					>
						<bx-bx-mail-send />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { trackOutbound } from '@/analytics/umami'
</script>

<style scoped>
.flexfoot {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 4em;
	padding-bottom: 2em;
}

.col {
	flex: 1;
}

.col.left {
	display: flex;
	align-items: flex-end;
}

.col.icon {
	display: flex;
	justify-content: flex-end;
}

.spotify-component {
	margin-top: 0;
}

.socials {
	display: flex;
	gap: 1.5em; /* Increased gap for better spacing */
	align-items: center;
}

.socials a {
	color: #666; /* Muted grey color for icons */
	transition: 0.3s;
	font-size: 1.25em; /* Slightly larger icons */
	display: flex;
	align-items: center;
	justify-content: center;
}

.socials a:hover {
	color: #222; /* Darker on hover */
	opacity: 1;
}

@media (max-width: 750px) {
	.flexfoot {
		flex-direction: column;
		align-items: flex-start;
		gap: 2em;
	}
	
	.col.icon {
		width: 100%;
		justify-content: flex-start;
	}
	
	.socials {
		gap: 1em;
		flex-wrap: wrap;
	}
}
</style>
