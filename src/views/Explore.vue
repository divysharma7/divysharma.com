<template>
	<div class="cont">
		<h2 class="title fancy">Explore</h2>
		<p class="sub">Miscellaneous stuff about me.</p>

		<div aos-animate data-aos="fade-up">
			<a rel="noopener noreferrer" href="https://www.behance.net/divysharma3" target="_blank">
				<div id="design" class="coolbox">
					<div class="flexbox">
						<h6>Design</h6>
						<span>
							<bx-bx-link-external />
						</span>
					</div>
					<p>
						(WIP) I'm mostly interested in building products and managing teams but I
						enjoy doing design research too.
					</p>
				</div>
			</a>
		</div>

		<div aos-animate data-aos="fade-up" data-aos-delay="100">
			<a rel="noopener noreferrer" href="https://www.linkedin.com/posts/divy-sharma-243748216_startupjourney-gratitude-bitsabrpilani-activity-7168917217009496064-UFhB?utm_source=share&utm_medium=member_desktop" target="_blank">
				<div id="events" class="coolbox">
					<div class="flexbox">
						<h6>Achievements</h6>
						<span>
							<bx-bx-link-external />
						</span>
					</div>
					<p>
						I've participated in startups competitions, Hackathons, Ideathons, Designathons, B-plans, etc.
						Check out some of my wins.
					</p>
				</div>
			</a>
		</div>
		<div aos-animate data-aos="fade-up">
			<a
				rel="noopener noreferrer"
				href="https://drive.google.com/file/d/1DxcRgUE_-V8B23Yz4L-Padn3t07I2xwp/view?usp=sharing"
				target="_blank"
			>
				<div id="organ" class="coolbox">
					<div class="flexbox">
						<h6>Résumé</h6>
						<span>
							<bx-bx-link-external />
						</span>
					</div>
					<p>
						Check out some of my stuff I've worked on and teams I've been a
						part of.
					</p>
				</div>
			</a>
		</div>

	
		<div data-aos="fade-up" data-aos-delay="200">
			<a rel="noopener noreferrer" href="https://teamconatus.com/" target="_blank">
				<div id="conatus" class="coolbox">
					<div class="flexbox">
						<h6>Events</h6>
						<span>
							<bx-bx-link-external />
						</span>
					</div>
					<p>
						Over the last few years I've been part of the core teams of Team Conatus
						(technical Society). Check out some of the events I organized.
					</p>
				</div>
			</a>
		</div> 
		<div aos-animate data-aos="fade-up" data-aos-delay="200">
			<a
				rel="noopener noreferrer"
				href="https://buymeacoffee.com/divy.sharma6"
				target="_blank"
			>
				<div id="support" class="coolbox">
					<div class="flexbox">
						<h6>Support</h6>
						<span>
							<bx-bx-link-external />
						</span>
					</div>
					<p>
						<span class="bold">Buy me a coffee</span> to support my journey in
						building delightful product experience.
						<a href="https://www.linkedin.com/posts/divy-sharma-243748216_designathon-teamwork-hardworkpaysoff-activity-7105298291315085312-tPdb?utm_source=share&utm_medium=member_desktop" target="_blank">IIIT Delhi</a>.
					</p>
				</div>
			</a>
		</div>		


		<br />
		<br />

		<Top id="top-tracks" style="margin-bottom: 4em" />

		<Website data-aos="fade-in" />

		<Contact data-aos="fade-in" style="margin-top: 4em" />
	</div>
</template>

<style scoped lang="scss">
.bold {
	font-weight: 600;
}

.socials {
	display: grid;
	grid-gap: 1em;
	grid-template-columns: repeat(2, 1fr);
}
.socials a {
	color: rgb(30, 80, 165);
	transition: 0.2s;
	font-size: 1.1em;
}
.socials a:hover {
	opacity: 0.5;
}
.coolbox {
	padding: 2em;
	border-radius: 1em;
	margin-bottom: 1.25em;
	transition: 0.3s;
	color: #222;
	h6 {
		margin-bottom: 0.25em;
		font-size: 1.2em;
		margin-right: 0.2em;
	}
	.flexbox {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		span {
			margin-bottom: -0.135em;
		}
	}
	p {
		margin-bottom: 0;
	}
	.cta {
		margin: 0;
		text-transform: none;
		letter-spacing: 0;
	}
}
#design {
	background-color: rgba(146, 184, 250, 0.288);
	h6 {
		color: rgb(43, 85, 158);
	}
}
#design:hover {
	background-color: rgba(146, 184, 250, 0.4);
}
#events {
	background-color: rgba(146, 250, 245, 0.288);
	h6 {
		color: rgb(8, 128, 72);
	}
	&:hover {
		background-color: rgba(151, 228, 225, 0.384);
	}
}
#conatus{
		background-color: #e6ffeb;
	h6 {
		color: #036a37;
	}
	&:hover {
		background-color: #bfffccb1;
	}
}
#organ {
	background-color: rgba(197, 116, 235, 0.171);
	h6 {
		color: rgb(136, 26, 139);
	}
	&:hover {
		background-color: rgba(194, 114, 231, 0.26);
	}
}

#support {
	background-color: rgba(240, 227, 82, 0.171);
	h6 {
		color: rgb(173, 133, 14);
	}
	&:hover {
		background-color: rgba(241, 216, 86, 0.26);
	}
}
</style>
