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
					>
						<bx-bxl-twitter />
					</a>
					<a
						href="https://www.instagram.com/divy.sharma9/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<carbon-logo-instagram />
					</a>
					<a
						href="https://github.com/divysharma7"
						rel="noopener noreferrer"
						target="_blank"
					>
						<carbon-logo-github />
					</a>
					<a
						href="https://open.spotify.com/user/31wan4heyahmjpej4evvpzwzjnji"
						rel="noopener noreferrer"
						target="_blank"
					>
						<bx-bxl-spotify />
					</a>

					<a
						href="https://www.linkedin.com/in/divy-sharma-243748216/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<carbon-logo-linkedin />
					</a>

					<a
						href="https://www.behance.net/divysharma3"
						target="_blank"
						rel="noopener noreferrer"
					>
						<bx-bxl-behance />
					</a>

					<a
						href="mailto:divysharma029@gmail.com"
						rel="noopener noreferrer"
						target="_blank"
					>
						<bx-bx-mail-send />
					</a>
				</div>
				<p class="zero arhn">Divy Sharma</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.arhn {
	margin-top: 0.35em;
	display: none;
}

.spotify-component {
	margin-top: 2em;
}

.socials {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: -2.3em;
}

.flex-right {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-direction: column;
}

.socials a {
	/* color: #69e; */
	color: var(--red-text);
	transition: 0.3s;
	font-size: 1.1em;
	margin: 0;
	padding: 0.5em;
	margin-left: 0.35em;
}

@media (max-width: 750px) {
	.flex-right {
		align-items: flex-start;
	}
	.socials a {
		margin-left: 0;
		padding: 0;
		margin-right: 1em;
		padding: 0.25em 0.25em 0.25em 0;
	}
	.socials {
		margin-top: 1em;
	}
	.arhn {
		display: none;
	}
}

.socials a:hover {
	opacity: 0.6;
}

.flexfoot {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.col {
	flex: 1 1 0px;
}

@media (max-width: 750px) {
	.flexfoot {
		flex-direction: column;
		align-items: flex-start;
	}
	.col {
		width: 100%;
	}
	.col.icon {
		width: 65%;
	}
	.flexfoot {
		margin-bottom: 4em;
	}
}
</style>
