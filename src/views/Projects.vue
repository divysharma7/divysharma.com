fi
<template>
	<div class="cont" @mouseleave="hover = false">
		<h2 class="title fancy">Projects</h2>
		<p class="zero">
			Okay, enough seriousness. Let's dive into the good stuff – the projects that make me tick! Think delightful user experiences and a sprinkle of creative chaos.
		</p>
		<div class="bigproj">
			<Project
				name="Techno Conclave"
				description="Where Design, Tech, and Entreprenurship collide"
				link="/p/techno"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710387635/Slide_16_9_-_22_nknflj.png"
				data-aos-delay="200"
				intlink
			/>

			<Project
				name="VR Rescue X"
				description="VR Based Gaming Simulator for NDRF."
				link="/p/virtual"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710388865/WhatsApp_Image_2023-12-19_at_19.17_foz6od.png"
				data-aos-delay="100"
				intlink
			/>
			<Project
				name="kalam"
				description="Innovation for Writer's Comfort."
				link="/p/kalam"
				img="https://res.cloudinary.com/dgglltv04/image/upload/v1710703057/Slide_16_9_-_24_tfylda.png"
				data-aos-delay="100"
				intlink
			/>

			
		</div>

		<hr />

		<div data-aos="fade-in" data-aos-duration="500" class="others">
			<div @mouseover="hover = false">
				<h2 class="othsmlproj">Work Experience</h2>
				<p>
					I made some of these projects as an <i>intern</i>, worked with cross-functional partners to implement user-centric solutions for complex technical challenges, resulting in client engagement retention.
					
				</p>
				<ul>
					<li>20X Increase in Adoption Rate: My design improvements significantly boosted user adoption of the techCurators platform.</li>
					<li>Improved User Satisfaction: User feedback highlighted a significant improvement in the platform's usability and overall user experience.</li>
                    <li>Enhanced User Experience: Users reported a more intuitive and efficient platform experience, leading to increased engagement and satisfaction.</li>				
                </ul>
			</div>

			<div class="grid">
				<div
					v-for="p in smlProjects"
					:key="p.title"
					:class="{ active: hover, proj: true }"
					@mouseleave="hover = false"
				>
					<Small
						@mouseover="hover = true"
						@mouseleave="hover = false"
						:title="p.title"
						:desc="p.desc"
						:link="p.link"
						:img="p.img"
						class="sml"
					/>
				</div>
			</div>

			<div class="row">
				<div class="eight columns">
					<p class="zero">
						You can check out my
						<a
							rel="noopener noreferrer"
							href="https://www.behance.net/divysharma3"
							target="_blank"
							>behance</a
						>
						for more. Most of my projects are available on it.
					</p>
				</div>
				<div class="u-cf"></div>
			</div>
		</div>
	</div>
</template>

<script>
import SmlProj from '../assets/data/smlproj.js'
export default {
	data() {
		return {
			hover: false,
			smlProjects: SmlProj.projects
		}
	}
}
</script>

<style scoped>
.othsmlproj {
	font-size: 1.75em;
}
.others {
	margin-top: 3em;
	margin-bottom: 3em;
}
.bigproj {
	margin-top: 2em;
}
.proj .sml {
	font-weight: 300;
	font-size: 1.2em;
	margin-bottom: 0.2em;
}
@media (min-width: 768px) {
	.active {
		opacity: 0.5;
		transition: 0.2s;
	}
}
.proj {
	transition: 0.3s;
}
.proj:hover {
	opacity: 1 !important;
}
.proj * {
	transition: 0.2s;
}
.grid {
	display: grid;
	grid-gap: 2em;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 3em;
	margin-bottom: 3em;
}
@media (max-width: 750px) {
	.grid {
		display: grid;
		grid-gap: 1.5em;
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
