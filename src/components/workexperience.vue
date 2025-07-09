<template>
	<div class="cont" style="margin-top: 4em">
		<h4 data-aos="fade-up" class="name fancy">work experience</h4>

		<div class="timeline">
			<div
				v-for="(exp, index) in experiences"
				:key="index"
				class="experience-card"
				:data-aos="'fade-up'"
				:data-aos-delay="index * 100"
			>
				<!-- Logo instead of dot -->
				<div class="logo-wrapper">
					<img
						:src="exp.logo"
						:alt="`${exp.company} logo`"
						class="company-logo"
						draggable="false"
					/>
				</div>

				<div class="card-content">
					<h5 class="role">{{ exp.role }}</h5>
					<p class="company">
						{{ exp.company }} &middot; <span class="duration">{{ exp.period }}</span>
					</p>
					<ul class="points">
						<li v-for="(point, i) in exp.achievements" :key="i">
							{{ point }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "WorkExperience",
	data() {
		return {
			experiences: [
				{
					role: "Associate Product Manager (Growth)",
					company: "ASBL",
					period: "June 2025 - Present",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986080/Frame_1_vwcfel.png",
					achievements: [
						"Drove growth strategies and collaborated with cross-functional teams",
						"Contributed to retention and engagement through product-led growth"
					]
				},
                {
	role: "Campus Founder",
	company: "NSRCEL IIM Bangalore",
	period: "July 2025 – Nov 2025",
	logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986051/Frame_4_sktekq.png", // Replace with actual logo
	achievements: [
		"Selected among top student entrepreneurs across India for NSRCEL's Campus Founders Program",
		"Undergoing 4-month hands-on entrepreneurial training powered by GPS Renewables",
		"Receiving mentorship from startup coaches, VCs, and product leaders",
		"Learning lean startup frameworks, business validation, and go-to-market strategy"
	]
}
,
				{
					role: "Growth Intern",
					company: "ASBL",
					period: "Dec 2024 - May 2025",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986080/Frame_1_vwcfel.png",
					achievements: [
						"Worked on data-driven initiatives to support product growth",
						"Assisted APMs in sprint planning and stakeholder communication"
					]
				},
                {
					role: "Mercedes-Benz Climate Launchpad — Cohort Member",
					company: "MBRDI Launchpad Program",
					period: "Feb 2025 – June 2025",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986052/Frame_6_hge7o1.png",
					achievements: [
			"Selected as one of 5 finalists nationally for Mercedes-Benz sponsored Climate Tech Launchpad",
			"Led end-to-end product development of Kisan Rover — a soil-health mapping & advisory platform",
			"Integrated smart sensors and precision farming logic for smallholder farmers",
            "Received mentorship from climate tech leaders and design experts at T-Works",
			"Refined market fit, built MVP, and pitched to investors during Demo Day"
		]
				},
				{
					role: "Summer UG Research Intern",
					company: "IIT Hyderabad",
					period: "June 2024 - Nov 2024",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986051/Frame_2_eqjudf.png",
					achievements: [
						"Research accepted at REEN Conference, IISc Bangalore",
						"Explored Lean Startup + Design Thinking via 20+ founder interviews"
					]
				},
				{
					role: "Top 20 Finalist – Product Design",
					company: "Samsung Solve for Tomorrow",
					period: "June 2024 - Aug 2024",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986051/Frame_3_ypp4b3.png",
					achievements: [
						"₹10 Lakh Prize for AquaAlert & R&D Innovation Tour",
						"Built MVP with mentorship from Samsung Industrial Designer"
					]
				},
				{
					role: "UX Designer",
					company: "TransCurators",
					period: "April 2023 - June 2023",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986051/Frame_5_lyfqyj.png",
					achievements: [
						"Led UX research for a digital marketplace platform",
						"Created wireframes, prototypes, and ran usability tests"
					]
				},
				{
					role: "UI Designer",
					company: "TechCurators",
					period: "Feb 2023 - Mar 2023",
					logo: "https://res.cloudinary.com/dgglltv04/image/upload/v1751986051/Frame_7_hodbni.png",
					achievements: [
						"Designed interface for TC View – tech hiring platform",
						"Work led to selection for next internship at TransCurators"
					]
				}
			]
		};
	}
};
</script>
<style scoped>
.timeline {
	position: relative;
	margin-top: 2em;
	padding-left: 6.5em; /* was 3.5em */
	border-left: 2px solid rgba(100, 100, 100, 0.15);
}

.experience-card {
	position: relative;
	display: flex;
	gap: 1.5em;
	margin-bottom: 3em;
}

.logo-wrapper {
	width: 5.5em; /* around 88px */
	height: auto;
	position: absolute;
	left: -6.5em; /* enough spacing from card */
	top: 0.15em;
	display: flex;
	align-items: center;
	justify-content: center;
}

.company-logo {
	width: 5.5em;   /* ~88px */
	height: 2.75em; /* ~44px */
	object-fit: contain;
	border-radius: 0.4em;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
	background-color: white;
	border: 1px solid #eaeaea;
	transition: transform 0.3s ease;
}

.company-logo:hover {
	transform: scale(1.05);
}

.card-content {
	padding-left: 0.5em;
}

.role {
	font-weight: 600;
	font-size: 1.05em;
	margin-bottom: 0.2em;
	text-transform: lowercase;
}

.company {
	font-size: 0.9em;
	color: #888;
	margin-bottom: 0.75em;
}

.duration {
	opacity: 0.8;
	font-style: italic;
}

.points {
	list-style-type: disc;
	padding-left: 1.2em;
	font-size: 0.9em;
	line-height: 1.5em;
	color: #666;
}

.points li::marker {
	color: #69e;
}
</style>

