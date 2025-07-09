<template>
	<main>
		<div class="cont">
			<!-- <img
			data-aos="fade-in"
			class="topimg"
			src="/me.jpeg"
			alt="Divy Sharma"
			draggable="false"
		/>
			<br />-->

			<div data-aos="fade-in">
				<h4 class="name fancy">Divy Sharma</h4>

				<div class="yo zero" style="margin-bottom: 0.55em">
					<h6 class="zero">product manager &middot; entrepreneur </h6>
				</div>

				<p class="zero" style="margin-bottom: 1em">
					{{ `${age}` }} years old Associate Product Manager at
					<a href="https://asbl.in/" target="_blank">ASBL Hyderabad</a>
				</p>
				<p class="zero" style="margin-bottom: 1em">
					During my six-month internship at ASBL, I collaborated closely with data analysts, sales teams, and senior PMs—reporting directly to the Growth Head.
				</p>
				<p class="zero" style="margin-bottom: 1em">
					Now, as a core member of the Growth team, I am building products and shipping high-impact features that drive significant revenue growth.
				</p>
				<p class="zero" style="margin-bottom: 1em">
					I have a background in Engineering which I leverage in my role as a Product Manager. This website showcases some of my past work as a Designer and entrepreneur.
				</p>
				<p class="zero" style="margin-bottom: 1em">	I’m always excited to discuss ideas, brainstorm potential collaborations, or simply connect. Feel free to <router-link to="/explore#contact">reach out</router-link>! </p>
			</div>

			 
		</div>

		<div class="cont" style="max-width: 43em">
			<br />
			<Page
				data-aos="fade-up"
				title="Portfolio"
				data-aos-once="true"
				to="/projects"
				desc="I build experience"
			/>
			<Page
				data-aos="fade-up"
				data-aos-delay="100"
				data-aos-once="true"
				title="Explore"
				to="/explore"
				desc="More of me"
			/>
			<Page
				data-aos="fade-up"
				data-aos-delay="150"
				data-aos-once="true"
				title="Contact"
				to="/explore#contact"
				desc="Let's talk"
			/>
			<Page
				data-aos="fade-up"
				data-aos-delay="200"
				data-aos-once="true"
				title="Resume"
				to="https://drive.google.com/file/d/1DxcRgUE_-V8B23Yz4L-Padn3t07I2xwp/view?usp=sharing"
				desc="Stuff I do"
				ext
			/>
			<Page
				data-aos="fade-up"
				data-aos-delay="250"
				data-aos-once="true"
				title="Support"
				to="https://www.buymeacoffee.com/divy.sharma6"
				desc="Buy me a coffee"
				ext
			/>

			
		</div>

		<div class="cont">
			<div class="flex-center">
				<div class="six columns">
					<div class="flex-center">
						<img
							@contextmenu="onContextMenu($event)"
							draggable="false"
							loading="lazy"
							src="/DIVY3.png"
							alt="me irl (fr)"
							class="topimg"
							style="margin-top: 3em; border-radius: 0.5em"
						/>
					</div>
					<!-- <h6 class="center" style="opacity: 0.7; margin-top: -0.5em">
						me irl
					</h6> -->
				</div>
				<div class="u-cf"></div>
			</div>
		</div>

		<!-- <div class="navcont">
			<div class="pics">
				<div class="picsgrid">
					<div v-for="img in links" :key="img">
						<img
							data-aos="fade-up"
							:src="img"
							alt="img"
							draggable="false"
							loading="lazy"
						/>
					</div>
				</div>
				<h6 class="center zero meirl">me &#38; my friends irl</h6>
				<h6 class="center" style="opacity: 0.7">me irl</h6>
			</div>
		</div>-->

		<!-- <div class="cont socialstuff">
			<h4>My socials</h4>
			<div class="socialgrid">
				<Page icon="ig" title="Instagram" />
				<Page title="Twitter" />
				<Page title="GitHub" />
				<Page title="Behance" />
				<Page title="Spotify" />
				<Page title="LinkedIn" />
				<Page title="Email" />
			</div>
		</div>-->
	</main>
</template>

<script>
export default {
	data() {
		return {
			age: 18,
			prefix: 'an',
			links: [
				
			]
		}
	},
	mounted() {
		const age = this.getAge('3/23/04')
		this.age = age
		this.prefix = [8, 11, 18].includes(age) ? 'an' : 'a'
	},
	methods: {
		getAge(DOB) {
			var today = new Date()
			var birthDate = new Date(DOB)
			var age = today.getFullYear() - birthDate.getFullYear()
			var m = today.getMonth() - birthDate.getMonth()
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age = age - 1
			}
			return age
		},
		onContextMenu(e) {
			//prevent the browser's default menu
			e.preventDefault()
			//show our menu
			this.$contextmenu({
				items: [
					{
						label: 'Download image',
						onClick: () => {

				// TODO: CHANGE THIS
							
							window.open('https://res.cloudinary.com/dgglltv04/image/upload/v1710277532/new_me_zrnsck.jpg')
						}
					},
					// {
					// 	label: 'Copy image',
					// 	onClick: () => {
					// 		navigator.clipboard.write([
					// 			new ClipboardItem({
					// 				'image/png': 'https://res.cloudinary.com/dgglltv04/image/upload/v1710277532/new_me_zrnsck.jpg'
					// 			})
					// 		])
					// 	}
					// },
					{
						label: 'Copy image address',
						onClick: () => {
				// TODO: CHANGE THIS

							navigator.clipboard.writeText('https://res.cloudinary.com/dgglltv04/image/upload/v1710277532/new_me_zrnsck.jpg')
						}
					},
					{
						label: 'Download polaroid',
						onClick: () => {
							window.open('https://res.cloudinary.com/dgglltv04/image/upload/v1710277532/new_me_zrnsck.jpg"')
						}
					},
					{
						label: 'Copy polaroid address',
						onClick: () => {
					// TODO: CHANGE THIS
							navigator.clipboard.writeText('https://res.cloudinary.com/dgglltv04/image/upload/v1710277532/new_me_zrnsck.jpg')
						}
					}
				],
				iconFontClass: 'iconfont',
				customClass: 'class-a',
				zIndex: 3,
				minWidth: 230,
				x: e.x,
				y: e.y
			})
		}
	}
}
</script>

<style scoped>
/*p {
	text-transform: lowercase;
}*/
.pics img {
	width: 100%;
}

.pics {
	margin-top: 2em;
	margin-bottom: 2.5em;
}
.picsgrid {
	display: grid;
	/* grid-gap: 3em; */
	grid-template-columns: repeat(3, 1fr);
}
.socialgrid {
	display: grid;
	/* grid-gap: 3em; */
	grid-template-columns: repeat(2, 1fr);
}
.meirl {
	/* margin-top: 2em; */
	font-size: 1.1em;
}
@media (max-width: 750px) {
	.meirl {
		margin-top: 0;
	}
	.picsgrid,
	.socialgrid {
		display: grid;
		/* grid-gap: 3em; */
		grid-gap: 0;
		grid-template-columns: repeat(1, 1fr);
	}
	.pics {
		margin-top: 0;
		margin-bottom: 0;
	}
}
.yo,
.name {
	margin: 0;
	font-size: 2.15em;
}

.name {
	margin-top: 1.5em;
	margin-bottom: -0.35em;
}

h1 {
	font-size: 5em;
	margin: 0;
}
.subtitle {
	margin: 0;
	font-size: 2em;
	font-weight: 500;
	opacity: 0.65;
	margin-top: -0.25em;
}
.subtitle a {
	border: none;
}
.main {
	margin-top: 12em;
}
img.topimg {
	width: 10em;
	border-radius: 0.5em;
	margin-bottom: 1em;
}
.vh {
	margin: 0 auto;
	max-width: 50em;
	margin-top: 20vh;
}
.sml {
	font-size: 0.5em;
}
.nav a {
	border: none;
	margin: 0 1em;
	font-size: 1em;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}
.nav {
	margin-top: 1em;
}
.yo a {
	transition: 0.3s;
}
.yo a:hover {
	color: #69e;
}
.topimg {
	margin-top: 0.5em;
	width: 100% !important;
}
@media (max-width: 750px) {
	.topimg {
		margin-top: 0;
		width: 75% !important;
	}
	.name {
		margin-top: 0.75em;
	}
}
</style>
