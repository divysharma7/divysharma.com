<template>
	<div class="journey-page">
		<!-- Grid guide lines -->
		<div class="grid-guides" aria-hidden="true"><div class="guide"></div><div class="guide"></div><div class="guide"></div></div>

		<!-- ── Hero ── -->
		<section class="hero-section">
			<span class="hero-eyebrow">Journey · 2022 — 2026</span>
			<h1 class="hero-title">Product manager at ASBL.<br />Former founder. Shut down Aqua-Alert, Feb 2025.</h1>
			<p class="hero-sub">I care about marketing-as-product, honest zero-to-one thinking, and building for India.</p>

			<!-- ── Proof strip ── -->
			<div class="proof-strip">
				<div class="proof-details">22 · Based in Hyderabad</div>
				<div class="proof-awards">
					<span class="proof-award">ASME India Awardee 2025</span>
					<span class="proof-award">Samsung Solve For Tomorrow, Top 20</span>
					<span class="proof-award">Google AI APAC, Top 30</span>
					<span class="proof-award">IDE Bootcamp Winner</span>
					<span class="proof-award">SIH Finalist 2023</span>
				</div>
			</div>

			<div class="hero-ctas">
				<a href="#back-story" class="hero-cta hero-cta--primary">Read the back story</a>
				<a href="mailto:divysharma029@gmail.com" class="hero-cta hero-cta--secondary">Get in touch</a>
			</div>

			<!-- Stage -->
			<div class="stage-wrap">
				<div class="stage" ref="stage">
					<div class="stage-texture" aria-hidden="true"></div>
					<div class="stage-label">JOURNEY · 2022 — 2026</div>

					<!-- Pre-placed stickers (scroll-triggered entrance) -->
					<div
						v-for="(s, i) in preStickers"
						:key="'pre-' + i"
						class="sticker sticker--pre"
						:class="{ 'sticker--visible': stageVisible }"
						:style="{
							left: s.x + '%',
							top: s.y + '%',
							'--rot': s.rot + 'deg',
							'--delay': (i * 0.09) + 's',
							'--parallax': (scrollOffset * s.depth) + 'px',
							zIndex: s.z
						}"
					>
						<img :src="'/stickers/' + s.svg" :alt="s.label + ' sticker'" class="sticker-img" draggable="false" />
					</div>

					<!-- User-placed stickers -->
					<div
						v-for="(s, idx) in userPlaced"
						:key="s.uid"
						class="sticker sticker--user"
						:class="{
							'sticker--pop': s.fresh,
							'sticker--hidden': drag.active && drag.source === 'user' && drag.uid === s.uid,
							'sticker--removing': s.removing
						}"
						:style="{
							left: s.x + '%',
							top: s.y + '%',
							'--rot': s.rot + 'deg',
							'--parallax': (scrollOffset * 0.06) + 'px',
							zIndex: s.z
						}"
						tabindex="0"
						:aria-label="s.label + ' sticker — hold to drag, arrow keys to nudge'"
						style="touch-action: none"
						@pointerdown.prevent="onPlacedPointerDown($event, s, idx)"
						@keydown="onPlacedKeydown($event, s, idx)"
					>
						<img :src="'/stickers/' + s.svg" :alt="s.label + ' sticker'" class="sticker-img" draggable="false" />
					</div>
				</div>

				<!-- Dock (dark pill, icon-only) -->
				<div class="dock">
					<button
						v-for="st in dockItems"
						:key="st.id"
						class="dock-btn"
						:class="{ 'dock-btn--ghost': drag.active && drag.source === 'dock' && drag.dockId === st.id }"
						style="touch-action: none"
						@pointerdown.prevent="onDockPointerDown($event, st)"
						:title="st.label"
					>
						<img :src="'/stickers/' + st.svg" :alt="st.label" class="dock-img" draggable="false" />
					</button>
				</div>
			</div>
		</section>

		<!-- Floating drag sticker -->
		<div
			v-if="drag.visible"
			class="sticker sticker--floating"
			:class="{ 'sticker--returning': drag.returning }"
			:style="{
				left: drag.x + 'px',
				top: drag.y + 'px',
				'--rot': drag.rot + 'deg',
			}"
			@transitionend="onReturnTransitionEnd"
		>
			<img :src="'/stickers/' + drag.svg" :alt="'dragging sticker'" class="sticker-img" draggable="false" />
		</div>

		<!-- Aria live announcements -->
		<div class="sr-only" aria-live="polite">{{ announcement }}</div>

		<!-- ── Timeline ── -->
		<main class="article">
			<div class="article-inner">
				<section class="timeline">
					<div class="tl-entry" v-for="(e, i) in timeline" :key="i">
						<div class="tl-left">
							<span class="tl-year">{{ e.year }}</span>
							<div class="tl-line" v-if="i < timeline.length - 1"></div>
						</div>
						<div class="tl-card">
							<span class="tl-tag" v-if="e.tag">{{ e.tag }}</span>
							<h2 class="tl-title">{{ e.title }}</h2>
							<p class="tl-desc">{{ e.description }}</p>
						</div>
					</div>
				</section>
			</div>
		</main>

		<!-- ── Back Story ── -->
		<section id="back-story" class="story">
			<div class="story-inner">

				<div class="story-section">
					<h2 class="story-heading">Back Story</h2>
					<p>I shut down my startup in February 2025. Two months later I joined ASBL as a growth intern. That sentence is the shortest version of my last two years, and most of what I know about product came from the gap between those two events.</p>
					<p>The startup was Aqua-Alert. We called it a "Fitbit for Water Meters" — a small hardware device paired with an app that tracked water usage, surfaced insights, and detected leaks in real time. Four co-founders, about 14 months of full-time work, 10 lakhs raised, a patent filed, TRL 4 reached, incubation at Samsung, Innovation Hub UP, and NSRCEL at IIM Bangalore. Two research papers published, one at HCI India at IIT Bombay, one at an IEEE conference. Top 20 at Samsung Solve For Tomorrow out of 18,000+ applicants.</p>
					<p>And we still shut it down.</p>
					<p>The uncomfortable realization at NSRCEL was that we were solving a real and important problem, but for the wrong use case. You can have a validated problem, a real technical solution, a good team, and a patent, and still be wrong — because you picked the wrong user, the wrong context, or the wrong moment. Research discipline doesn't save you from that. Only honest execution does.</p>
				</div>

				<hr class="story-divider" />

				<!-- ── Chapters ── -->
				<div class="story-section">
					<h2 class="story-heading">Chapters</h2>

					<h3 class="chapter-title">Design & Research · 2023–2024</h3>
					<p>My first two internships were at TechCurators and TransCurators — first on a tech hiring platform called TC View, then on a digital marketplace. I was doing UI and UX work on paper, but what I was actually learning was how a product decision gets translated into a screen, and how often that translation quietly loses something important.</p>
					<p>Mid-2024 I spent six months at the IIT Hyderabad Department of Entrepreneurship and Management as a research intern under Prof. Jayshree Patnaik, working on lean startups and design thinking. I ran 20+ interviews with founders. The research got accepted at the REEN Conference at IISc Bangalore. That stretch is where I stopped thinking about products as things to ship and started thinking about them as things to investigate.</p>

					<h3 class="chapter-title">Aqua-Alert · 2023–2025</h3>
					<p>Aqua-Alert ran alongside and then ahead of everything else. Samsung Solve For Tomorrow picked us in the Top 20 out of 18,000+ applications. We did the innovation tour across their R&D centers. Avijit Singh, a Samsung industrial designer, mentored the team. For a stretch there I genuinely thought we were going to make it.</p>
					<p>We didn't. The short version: research-led doesn't mean market-ready. Those are two different discoveries and you have to survive both.</p>

					<h3 class="chapter-title">ASBL · 2024–present</h3>
					<p>I joined as a Growth Intern in December 2024 and moved into the Associate Product Manager, Growth role in June 2025. Real estate wasn't a category I expected to work in, and it's been the most honest teacher I've had about how differently B2C buying behavior works when the purchase is 50 lakhs instead of 500.</p>
					<p>Most of my work is at the top of the funnel — how people first encounter ASBL, what makes them come back, what makes them go quiet. The biggest shift in my thinking since joining: growth at an unknown brand is mostly a trust problem, not a conversion problem. You're not trying to get someone to click faster. You're trying to get them to believe you when you say something.</p>
					<p>Aqua-Alert taught me to run research. ASBL is teaching me to distinguish research from decision-making. Different muscles.</p>
				</div>

				<hr class="story-divider" />

				<!-- ── What I care about ── -->
				<div class="story-section">
					<h2 class="story-heading">What I care about now</h2>

					<div class="care-item">
						<h3>Marketing as product.</h3>
						<p>The tools and systems that let a growth team actually operate — landing pages that get iterated, experiments that run clean, data that gets used instead of archived. Most companies treat marketing as campaigns. I think the unlock is treating it as product.</p>
					</div>

					<div class="care-item">
						<h3>Honest zero-to-one thinking.</h3>
						<p>Having shut down a startup, I'm allergic to the kind of product writing that pretends the path is clear. Real zero-to-one work is mostly about being wrong faster than the competition and being honest about it sooner than your own team is comfortable with.</p>
					</div>

					<div class="care-item">
						<h3>Building in India, for India.</h3>
						<p>Most of the frameworks I read were written for American SaaS. They're useful, but they're not sufficient. I'm more interested in what product management actually looks like here, at this stage, for companies that don't have the luxury of the US playbook.</p>
					</div>
				</div>

				<!-- ── Photo Strip ── -->
				<div class="photo-strip">
					<div class="polaroid" style="transform: rotate(-2deg)">
						<div class="polaroid-img-wrapper">
							<img src="https://picsum.photos/seed/minigole/400/400" alt="Mini Gole" />
						</div>
						<span class="polaroid-caption">Mini Gole</span>
					</div>
					<div class="polaroid" style="transform: rotate(1deg)">
						<div class="polaroid-img-wrapper">
							<img src="https://picsum.photos/seed/dharan/400/400" alt="GoGlamping, Dharan" />
						</div>
						<span class="polaroid-caption">GoGlamping, Dharan</span>
					</div>
					<div class="polaroid" style="transform: rotate(-1deg)">
						<div class="polaroid-img-wrapper">
							<img src="https://picsum.photos/seed/bhojpur/400/400" alt="Bhojpur" />
						</div>
						<span class="polaroid-caption">Bhojpur</span>
					</div>
					<div class="polaroid" style="transform: rotate(2deg)">
						<div class="polaroid-img-wrapper">
							<img src="https://picsum.photos/seed/grade3/400/400" alt="Me in Grade III" />
						</div>
						<span class="polaroid-caption">Me in Grade III</span>
					</div>
				</div>

				<hr class="story-divider" />

				<!-- ── Education ── -->
				<div class="story-section">
					<h2 class="story-heading">Education</h2>

					<div class="edu-grid">
						<div class="edu-card">
							<div class="edu-header">
								<img src="/images/akgec-logo.webp" alt="AKGEC" class="edu-logo" />
								<div class="edu-header-text">
									<h3 class="edu-name">Ajay Kumar Garg Engineering College</h3>
									<span class="edu-meta">Bachelor of Technology, Information Technology · CGPA 7.4</span>
									<span class="edu-meta">Ghaziabad · Affiliated to Dr. A.P.J. Abdul Kalam Technical University</span>
								</div>
								<span class="edu-year">2021 – 2025</span>
							</div>
							<p class="edu-activity">Led Team Conatus, the college's technical society, where I helped juniors learn design and research — which is probably where I first figured out that I liked teaching a process more than I liked being the one executing it.</p>
						</div>

						<div class="edu-card">
							<div class="edu-header">
								<img src="/images/kvs-logo.webp" alt="KV" class="edu-logo" />
								<div class="edu-header-text">
									<h3 class="edu-name">Kendriya Vidyalaya, Gomti Nagar</h3>
									<span class="edu-meta">Grade: 92.8%</span>
									<span class="edu-meta">Lucknow</span>
								</div>
								<span class="edu-year">2009 – 2021</span>
							</div>
							<p class="edu-activity">Regional-level player in chess and swimming. Two sports that taught me very different things.</p>
							<p class="edu-reflection">Chess taught me that most bad moves aren't blunders — they're small compromises that look fine on their own. Swimming taught me that you can't fake the work.</p>
						</div>
					</div>
				</div>

				<hr class="story-divider" />

				<!-- ── Closing CTA ── -->
				<div class="story-cta">
					<p>If something here resonated — I'd like to hear from you.</p>
					<div class="story-cta-links">
						<a href="mailto:divysharma029@gmail.com" class="cta-link">Email me</a>
						<a href="https://twitter.com/Divy_Sharma6" target="_blank" rel="noopener" class="cta-link" @click="gtmPush('click:social', { platform: 'twitter', location: 'journey_cta' })">Say hi on X</a>
						<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" rel="noopener" class="cta-link" @click="gtmPush('click:social', { platform: 'linkedin', location: 'journey_cta' })">LinkedIn</a>
						<router-link to="/resume" class="cta-link" @click="gtmPush('click:resume_download', { location: 'journey_cta' })">Resume</router-link>
					</div>
				</div>

			</div>
		</section>

		<!-- ── Related pages ── -->
		<section class="explore">
			<div class="explore-inner">
				<div class="explore-grid">
					<router-link v-for="card in exploreCards" :key="card.href" :to="card.href" class="explore-card">
						<span class="explore-label">{{ card.label }}</span>
						<p class="explore-title">{{ card.title }}</p>
						<p class="explore-desc">{{ card.description }}</p>
					</router-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
let _uid = 0

export default {
	name: 'Journey',
	data() {
		return {
			stageVisible: false,
			scrollOffset: 0,
			zCounter: 20,
			userPlaced: [],

			// Drag state
			drag: {
				active: false,
				visible: false,
				returning: false,
				source: null,       // 'dock' | 'user'
				dockId: null,       // dock sticker id (for ghost)
				uid: null,          // uid of placed sticker being dragged
				svg: '',
				label: '',
				x: 0, y: 0,        // floating element position (viewport px)
				rot: 0,
				origRot: 0,         // original rotation (preserved for reposition)
				prevX: 0, prevY: 0, // previous sticker canvas % (for return)
				startClientX: 0, startClientY: 0,
				dragEngaged: false,  // has pointer moved enough to show floating element
				// Velocity tracking
				lastX: 0, lastY: 0, lastTime: 0,
				vx: 0, vy: 0,
			},

			// Long-press tracking for placed stickers
			_pressTimer: null,
			_pressCurrentX: 0,
			_pressCurrentY: 0,

			announcement: '',

			// Pre-placed stickers (appear on scroll-in)
			preStickers: [
				{ svg: 'pm.svg',          label: 'PM',       x: 15, y: 18, rot: -6,  depth: 0.04, z: 5 },
				{ svg: 'asbl.svg',        label: 'ASBL',     x: 68, y: 14, rot: 4,   depth: 0.08, z: 6 },
				{ svg: 'ship.svg',        label: 'Ship it',  x: 42, y: 48, rot: -2,  depth: 0.12, z: 7 },
				{ svg: 'vue.svg',         label: 'Vue.js',   x: 75, y: 58, rot: 8,   depth: 0.06, z: 4 },
				{ svg: 'zero-to-one.svg', label: '0→1',      x: 22, y: 65, rot: -10, depth: 0.10, z: 8 },
			],

			// Extra stickers for the dock
			dockItems: [
				{ id: 'okr',      svg: 'okr.svg',      label: 'OKR' },
				{ id: 'prd',      svg: 'prd.svg',      label: 'PRD' },
				{ id: 'design',   svg: 'design.svg',   label: 'Design' },
				{ id: 'code',     svg: 'code.svg',     label: 'Code' },
				{ id: 'users',    svg: 'users.svg',    label: 'Users' },
				{ id: 'growth',   svg: 'growth.svg',   label: 'Growth' },
				{ id: 'data',     svg: 'data.svg',     label: 'Data' },
				{ id: 'mvp',      svg: 'mvp.svg',      label: 'MVP' },
				{ id: 'strategy', svg: 'strategy.svg', label: 'Strategy' },
				{ id: 'craft',    svg: 'craft.svg',    label: 'Craft' },
				{ id: 'impact',   svg: 'impact.svg',   label: 'Impact' },
				{ id: 'rice',     svg: 'rice.svg',     label: 'RICE' },
			],

			timeline: [
				{ year: '2026', tag: 'Current', title: 'APM, Growth at ASBL', description: 'Learned that growth at an unknown brand is a trust problem, not a conversion problem. Real estate taught me what a 50-lakh purchase funnel actually looks like.' },
				{ year: '2025', tag: 'Turning point', title: 'Shut down Aqua-Alert → joined ASBL', description: 'Closed a funded, patented, IIM-incubated startup. The lesson: research-led doesn\'t mean market-ready. Started over as a growth intern.' },
				{ year: '2024', tag: 'Research', title: 'IIT Hyderabad research + Samsung Top 20', description: 'Ran 20+ founder interviews on lean startups. Published at REEN Conference, IISc. Samsung Solve For Tomorrow picked Aqua-Alert in the Top 20 out of 18,000+ teams.' },
				{ year: '2023', tag: 'Design', title: 'First internships in product design', description: 'TechCurators, TransCurators — learned how product decisions get translated into screens, and how often that translation loses something.' },
				{ year: '2022', tag: 'Foundation', title: 'Started building', description: 'First code. First broken deployments. Vue, React, Node — built the muscle memory for shipping end-to-end.' },
			],

			exploreCards: [
				{ href: '/journey/certificates', label: 'Achievements', title: 'Certificates & Achievements', description: 'Awards, hackathons, and proof that I occasionally finish things.' },
				{ href: '/journey/mentors', label: 'People', title: 'Gurus & Mentors', description: 'The people who shaped how I think about product, engineering, and work.' },
			],
		}
	},

	methods: {
		gtmPush(event, params) {
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({ event, ...params })
		},
		/* ═══════════════════════════════════════════
		   BEHAVIOR 1 — Drag from dock to canvas
		   ═══════════════════════════════════════════ */
		onDockPointerDown(e, sticker) {
			if (this.drag.active) return
			if (e.button !== 0 && e.pointerType === 'mouse') return

			this.drag.source = 'dock'
			this.drag.dockId = sticker.id
			this.drag.svg = sticker.svg
			this.drag.label = sticker.label
			this.drag.x = e.clientX
			this.drag.y = e.clientY
			this.drag.rot = 0
			this.drag.startClientX = e.clientX
			this.drag.startClientY = e.clientY
			this.drag.dragEngaged = false
			this.drag.active = true
			this.drag.visible = false  // don't show until movement threshold
			this.drag.returning = false
			this.drag.pointerId = e.pointerId

			this._resetVelocity(e.clientX, e.clientY)

			document.addEventListener('pointermove', this._onPointerMove)
			document.addEventListener('pointerup', this._onPointerUp)
			document.addEventListener('pointercancel', this._onPointerUp)
		},

		/* ═══════════════════════════════════════════
		   BEHAVIOR 2 — Reposition placed sticker
		   (long-press to drag, short-click = bringToFront)
		   ═══════════════════════════════════════════ */
		onPlacedPointerDown(e, sticker, index) {
			if (this.drag.active) return
			if (e.button !== 0 && e.pointerType === 'mouse') return

			const threshold = e.pointerType === 'touch' ? 300 : 400
			const startX = e.clientX
			const startY = e.clientY

			this._pressCurrentX = startX
			this._pressCurrentY = startY

			// Start long-press timer
			this._pressTimer = setTimeout(() => {
				this._startPlacedDrag(this._pressCurrentX, this._pressCurrentY, sticker)
			}, threshold)

			// Track movement during press
			this._placedMoveHandler = (me) => {
				this._pressCurrentX = me.clientX
				this._pressCurrentY = me.clientY

				// Cancel long-press if moved too far (probably scrolling)
				const dx = me.clientX - startX
				const dy = me.clientY - startY
				if (!this.drag.active && Math.sqrt(dx * dx + dy * dy) > 10) {
					this._cancelPress()
				}

				// Forward to drag handler if drag engaged
				if (this.drag.active && this.drag.source === 'user') {
					this._handleDragMove(me)
				}
			}

			this._placedUpHandler = (ue) => {
				if (this.drag.active && this.drag.source === 'user') {
					this._handleDragEnd(ue)
				} else {
					// Short click — bring to front
					this._cancelPress()
					this.bringToFront(sticker)
				}
				document.removeEventListener('pointermove', this._placedMoveHandler)
				document.removeEventListener('pointerup', this._placedUpHandler)
				document.removeEventListener('pointercancel', this._placedUpHandler)
			}

			document.addEventListener('pointermove', this._placedMoveHandler)
			document.addEventListener('pointerup', this._placedUpHandler)
			document.addEventListener('pointercancel', this._placedUpHandler)
		},

		_startPlacedDrag(clientX, clientY, sticker) {
			this._cancelPress()

			this.drag.source = 'user'
			this.drag.uid = sticker.uid
			this.drag.svg = sticker.svg
			this.drag.label = sticker.label
			this.drag.x = clientX
			this.drag.y = clientY
			this.drag.rot = 0          // straighten during drag
			this.drag.origRot = sticker.rot
			this.drag.prevX = sticker.x
			this.drag.prevY = sticker.y
			this.drag.dragEngaged = true
			this.drag.active = true
			this.drag.visible = true
			this.drag.returning = false

			this._resetVelocity(clientX, clientY)
		},

		_cancelPress() {
			if (this._pressTimer) {
				clearTimeout(this._pressTimer)
				this._pressTimer = null
			}
		},

		/* ═══════════════════════════════════════════
		   Shared drag move / end
		   ═══════════════════════════════════════════ */
		_handleDragMove(e) {
			if (!this.drag.active) return

			// For dock: engage after 5px movement
			if (this.drag.source === 'dock' && !this.drag.dragEngaged) {
				const dx = e.clientX - this.drag.startClientX
				const dy = e.clientY - this.drag.startClientY
				if (Math.sqrt(dx * dx + dy * dy) > 5) {
					this.drag.dragEngaged = true
					this.drag.visible = true
				} else {
					return
				}
			}

			this.drag.x = e.clientX
			this.drag.y = e.clientY

			// Velocity tracking
			const now = performance.now()
			const dt = now - this.drag.lastTime
			if (dt > 0) {
				this.drag.vx = (e.clientX - this.drag.lastX) / dt * 1000
				this.drag.vy = (e.clientY - this.drag.lastY) / dt * 1000
			}
			this.drag.lastX = e.clientX
			this.drag.lastY = e.clientY
			this.drag.lastTime = now

			e.preventDefault()
		},

		_handleDragEnd(e) {
			if (!this.drag.active) return

			// Clean up dock listeners (no-op if placed sticker drag)
			document.removeEventListener('pointermove', this._onPointerMove)
			document.removeEventListener('pointerup', this._onPointerUp)
			document.removeEventListener('pointercancel', this._onPointerUp)

			// Dock: if drag never engaged, treat as click (random placement)
			if (this.drag.source === 'dock' && !this.drag.dragEngaged) {
				const item = this.dockItems.find(d => d.id === this.drag.dockId)
				if (item) this.placeSticker(item)
				this._resetDrag()
				return
			}

			// Calculate final position with momentum
			let finalX = e.clientX
			let finalY = e.clientY
			const speed = Math.sqrt(this.drag.vx ** 2 + this.drag.vy ** 2)

			if (speed > 600) {
				finalX += this.drag.vx * 0.18
				finalY += this.drag.vy * 0.18
			}

			if (this._isInsideCanvas(finalX, finalY)) {
				this._dropInside(finalX, finalY)
			} else {
				this._dropOutside()
			}
		},

		_dropInside(clientX, clientY) {
			const pos = this._getCanvasPercent(clientX, clientY)

			if (this.drag.source === 'dock') {
				const rot = -18 + Math.random() * 36
				const uid = ++_uid
				this.userPlaced.push({
					id: this.drag.dockId,
					svg: this.drag.svg,
					label: this.drag.label,
					x: pos.x, y: pos.y,
					rot, z: ++this.zCounter,
					uid, fresh: true,
				})
				setTimeout(() => {
					const s = this.userPlaced.find(p => p.uid === uid)
					if (s) s.fresh = false
				}, 450)
				this.announce(`Placed ${this.drag.label} sticker`)
				window.dataLayer = window.dataLayer || []
				window.dataLayer.push({ event: 'journey:sticker_place', sticker_id: this.drag.dockId, x: pos.x, y: pos.y, method: 'drag' })

			} else if (this.drag.source === 'user') {
				const s = this.userPlaced.find(p => p.uid === this.drag.uid)
				if (s) {
					const fromX = s.x, fromY = s.y
					s.x = pos.x
					s.y = pos.y
					s.z = ++this.zCounter
					s.rot = this.drag.origRot  // preserve original rotation
					this.announce(`Moved ${s.label} sticker`)
					window.dataLayer = window.dataLayer || []
					window.dataLayer.push({ event: 'journey:sticker_reposition', sticker_id: s.id })
				}
			}

			this._saveBoardState()
			this._resetDrag()
		},

		_dropOutside() {
			if (this.drag.source === 'dock') {
				// Return to dock slot
				const btn = this.$el.querySelector(`.dock-btn[title="${this.drag.label}"]`)
				if (btn) {
					const rect = btn.getBoundingClientRect()
					this.drag.x = rect.left + rect.width / 2
					this.drag.y = rect.top + rect.height / 2
					this.drag.returning = true
					this.announce(`Returned ${this.drag.label} sticker to dock`)
				} else {
					this._resetDrag()
				}
			} else if (this.drag.source === 'user') {
				// Return to previous canvas position
				const pos = this._getClientFromPercent(this.drag.prevX, this.drag.prevY)
				this.drag.x = pos.x
				this.drag.y = pos.y
				this.drag.rot = this.drag.origRot
				this.drag.returning = true
				this.announce(`Returned ${this.drag.label} sticker`)
			}
			// transitionend cleans up via onReturnTransitionEnd
		},

		onReturnTransitionEnd(e) {
			if (e.propertyName === 'left' || e.propertyName === 'top') {
				this._resetDrag()
			}
		},

		_resetDrag() {
			this.drag.active = false
			this.drag.visible = false
			this.drag.returning = false
			this.drag.source = null
			this.drag.dockId = null
			this.drag.uid = null
			this.drag.dragEngaged = false
			this.drag.svg = ''
			this.drag.label = ''
		},

		_resetVelocity(x, y) {
			this.drag.lastX = x
			this.drag.lastY = y
			this.drag.lastTime = performance.now()
			this.drag.vx = 0
			this.drag.vy = 0
		},

		/* ═══════════════════════════════════════════
		   Bounds helpers
		   ═══════════════════════════════════════════ */
		_isInsideCanvas(clientX, clientY) {
			const rect = this.$refs.stage?.getBoundingClientRect()
			if (!rect) return false
			return clientX >= rect.left && clientX <= rect.right
				&& clientY >= rect.top && clientY <= rect.bottom
		},

		_getCanvasPercent(clientX, clientY) {
			const rect = this.$refs.stage.getBoundingClientRect()
			return {
				x: Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)),
				y: Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100)),
			}
		},

		_getClientFromPercent(xPct, yPct) {
			const rect = this.$refs.stage.getBoundingClientRect()
			return {
				x: rect.left + (xPct / 100) * rect.width,
				y: rect.top + (yPct / 100) * rect.height,
			}
		},

		/* ═══════════════════════════════════════════
		   Keyboard — placed stickers
		   ═══════════════════════════════════════════ */
		onPlacedKeydown(e, sticker, idx) {
			const stage = this.$refs.stage
			if (!stage) return
			const rect = stage.getBoundingClientRect()
			const nudgePx = e.shiftKey ? 24 : 8
			const nudgeX = (nudgePx / rect.width) * 100
			const nudgeY = (nudgePx / rect.height) * 100

			switch (e.key) {
				case 'ArrowLeft':
					e.preventDefault()
					sticker.x = Math.max(0, sticker.x - nudgeX)
					this._saveBoardState()
					break
				case 'ArrowRight':
					e.preventDefault()
					sticker.x = Math.min(100, sticker.x + nudgeX)
					this._saveBoardState()
					break
				case 'ArrowUp':
					e.preventDefault()
					sticker.y = Math.max(0, sticker.y - nudgeY)
					this._saveBoardState()
					break
				case 'ArrowDown':
					e.preventDefault()
					sticker.y = Math.min(100, sticker.y + nudgeY)
					this._saveBoardState()
					break
				case 'Delete':
				case 'Backspace':
					e.preventDefault()
					this._removeSticker(sticker)
					break
				case 'Escape':
					e.preventDefault()
					this._cancelActiveDrag()
					break
				case 'Enter':
				case ' ':
					e.preventDefault()
					this.bringToFront(sticker)
					break
			}
		},

		_removeSticker(sticker) {
			sticker.removing = true
			setTimeout(() => {
				const idx = this.userPlaced.findIndex(s => s.uid === sticker.uid)
				if (idx !== -1) this.userPlaced.splice(idx, 1)
				this._saveBoardState()
				this.announce(`Removed ${sticker.label} sticker`)
			}, 240)
		},

		_cancelActiveDrag() {
			if (!this.drag.active) return
			document.removeEventListener('pointermove', this._onPointerMove)
			document.removeEventListener('pointerup', this._onPointerUp)
			document.removeEventListener('pointercancel', this._onPointerUp)
			if (this._placedMoveHandler) {
				document.removeEventListener('pointermove', this._placedMoveHandler)
				document.removeEventListener('pointerup', this._placedUpHandler)
				document.removeEventListener('pointercancel', this._placedUpHandler)
			}
			this._cancelPress()

			if (this.drag.visible) {
				this._dropOutside()
			} else {
				this._resetDrag()
			}
		},

		/* ═══════════════════════════════════════════
		   Persistence — localStorage
		   ═══════════════════════════════════════════ */
		_saveBoardState() {
			try {
				const state = this.userPlaced
					.filter(s => !s.removing)
					.map(s => ({
						id: s.id, svg: s.svg, label: s.label,
						x: s.x, y: s.y, rot: s.rot, z: s.z, uid: s.uid,
					}))
				localStorage.setItem('journey.board.state', JSON.stringify(state))
				localStorage.setItem('journey.board.zCounter', String(this.zCounter))
			} catch { /* private browsing — skip silently */ }
		},

		_loadBoardState() {
			try {
				const raw = localStorage.getItem('journey.board.state')
				if (!raw) return
				const state = JSON.parse(raw)
				if (!Array.isArray(state)) return
				this.userPlaced = state.map(s => ({ ...s, fresh: false }))
				const zRaw = localStorage.getItem('journey.board.zCounter')
				if (zRaw) this.zCounter = parseInt(zRaw, 10) || 20
				const maxUid = Math.max(0, ...this.userPlaced.map(s => s.uid || 0))
				_uid = maxUid
			} catch { /* skip */ }
		},

		/* ═══════════════════════════════════════════
		   Announcements
		   ═══════════════════════════════════════════ */
		announce(msg) {
			this.announcement = ''
			this.$nextTick(() => { this.announcement = msg })
		},

		/* ═══════════════════════════════════════════
		   Existing methods (preserved)
		   ═══════════════════════════════════════════ */
		placeSticker(st) {
			if (!st) return
			const x = 10 + Math.random() * 70
			const y = 10 + Math.random() * 65
			const rot = -14 + Math.random() * 28
			const uid = ++_uid
			this.userPlaced.push({ ...st, x, y, rot, z: ++this.zCounter, uid, fresh: true })
			setTimeout(() => {
				const s = this.userPlaced.find(p => p.uid === uid)
				if (s) s.fresh = false
			}, 450)
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({ event: 'journey:sticker_place', sticker_id: st.id, x, y, method: 'click' })
			this.announce(`Placed ${st.label} sticker`)
			this._saveBoardState()
		},

		bringToFront(s) {
			s.z = ++this.zCounter
		},

		onScroll() {
			if (!this.$refs.stage) return
			const rect = this.$refs.stage.getBoundingClientRect()
			const viewH = window.innerHeight
			this.scrollOffset = -(rect.top - viewH / 2) * 0.15
		},

		setupObserver() {
			const observer = new IntersectionObserver(entries => {
				if (entries[0]?.isIntersecting) {
					this.stageVisible = true
					observer.disconnect()
				}
			}, { threshold: 0.2 })
			if (this.$refs.stage) observer.observe(this.$refs.stage)
			this._observer = observer
		},
	},

	created() {
		// Bind shared pointer handlers for dock drag
		this._onPointerMove = (e) => this._handleDragMove(e)
		this._onPointerUp = (e) => this._handleDragEnd(e)

		// Escape key handler
		this._escHandler = (e) => {
			if (e.key === 'Escape' && this.drag.active) {
				e.preventDefault()
				this._cancelActiveDrag()
			}
		}
	},

	mounted() {
		this._loadBoardState()
		this.setupObserver()
		window.addEventListener('scroll', this.onScroll, { passive: true })
		window.addEventListener('keydown', this._escHandler)
		this.onScroll()
	},

	beforeUnmount() {
		window.removeEventListener('scroll', this.onScroll)
		window.removeEventListener('keydown', this._escHandler)
		this._observer?.disconnect()
		document.removeEventListener('pointermove', this._onPointerMove)
		document.removeEventListener('pointerup', this._onPointerUp)
		document.removeEventListener('pointercancel', this._onPointerUp)
		this._cancelPress()
	},
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
useHead({
	title: 'Journey',
	meta: [
		{ name: 'description', content: 'The path so far — milestones, roles, and decisions that shaped how Divy Sharma thinks about product.' },
		{ property: 'og:title', content: 'My Journey | Divy Sharma' },
		{ property: 'og:description', content: 'The path so far — milestones, roles, and decisions that shaped how Divy Sharma thinks about product.' },
	]
})
</script>

<style scoped lang="scss">
button {
	text-transform: none;
	letter-spacing: normal;
	height: auto;
	line-height: normal;
	font-family: inherit;
	font-size: inherit;
	background: none;
	border: none;
	cursor: pointer;
}

.journey-page {
	min-height: 100vh;
	background: var(--color-bg-subtle);
	font-family: var(--font-sans);
	position: relative;
	overflow-x: hidden;
}

/* ── Guides ── */
.grid-guides {
	position: fixed; inset: 0;
	display: flex; justify-content: center;
	pointer-events: none; z-index: 0;
	max-width: var(--container-wide); margin: 0 auto;
}
.guide {
	flex: 1;
	border-right: 1px dashed rgba(0,0,0,0.05);
	&:first-child { border-left: 1px dashed rgba(0,0,0,0.05); }
}

/* ── Hero ── */
.hero-section {
	position: relative; z-index: 1;
	text-align: center;
	padding: 5rem 2rem 0;
}

.hero-eyebrow {
	display: inline-block;
	font-size: var(--text-xs); font-weight: 500;
	color: var(--color-muted); text-transform: uppercase;
	letter-spacing: 0.1em; margin-bottom: 1.25rem;
}

.hero-title {
	font-size: var(--h1); font-weight: 600;
	color: var(--color-heading); line-height: var(--leading-tight);
	letter-spacing: -0.02em; margin: 0 0 1rem;
	max-width: 580px; margin-left: auto; margin-right: auto;
}

.hero-sub {
	font-size: var(--text-base); color: var(--color-body);
	max-width: 480px; margin: 0 auto 2rem;
	line-height: var(--leading-normal);
}

.hero-ctas {
	display: flex; gap: 0.75rem;
	justify-content: center;
	margin-bottom: 2.5rem;
}

.hero-cta {
	display: inline-flex; align-items: center;
	padding: 0.6rem 1.25rem;
	border-radius: var(--radius-sm);
	font-size: var(--text-sm); font-weight: 500;
	text-decoration: none;
	transition: all 0.2s ease;

	&--primary {
		background: #111; color: #fff;
		&:hover { background: #333; transform: translateY(-1px); }
	}

	&--secondary {
		background: #fff; color: var(--color-heading);
		border: 1px solid var(--color-faint);
		&:hover { background: var(--color-bg-subtle); border-color: var(--color-faint); transform: translateY(-1px); }
	}
}

/* ── Stage ── */
.stage-wrap {
	max-width: 580px;
	margin: 0 auto 4rem;
	padding: 0 1rem;
}

.stage {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	background: #0e0e0e;
	border-radius: 18px;
	overflow: hidden;
	box-shadow:
		0 0 0 1px rgba(255,255,255,0.04) inset,
		0 2px 4px rgba(0,0,0,0.2),
		0 12px 48px rgba(0,0,0,0.18);
}

.stage-texture {
	position: absolute; inset: 0;
	background-image:
		radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
	background-size: 20px 20px;
	pointer-events: none;
}

.stage-label {
	position: absolute;
	bottom: 12px; left: 50%;
	transform: translateX(-50%);
	font-size: 9px; font-weight: 600;
	letter-spacing: 0.18em;
	color: rgba(255,255,255,0.07);
	pointer-events: none; white-space: nowrap;
}

/* ── Sticker (shared) ── */
.sticker {
	position: absolute;
	width: 90px;
	height: 90px;
	transform: translate(-50%, -50%) rotate(var(--rot, 0deg)) translateY(var(--parallax, 0px));
	cursor: grab;
	user-select: none;
	will-change: transform;
	filter: drop-shadow(0 4px 12px rgba(0,0,0,0.35)) drop-shadow(0 1px 2px rgba(0,0,0,0.2));
	transition: filter 0.2s;

	&:hover {
		filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.25));
	}

	&:active { cursor: grabbing; }
}

/* Horizontal stickers (ship, design, strategy, impact, rice) get wider */
.sticker[style*="ship"], .sticker[style*="design"], .sticker[style*="strategy"], .sticker[style*="impact"], .sticker[style*="rice"] {
	width: 110px;
	height: 65px;
}

.sticker-img {
	width: 100%;
	height: 100%;
	display: block;
	pointer-events: none;
}

/* ── Pre-placed: scroll-triggered entrance ── */
.sticker--pre {
	opacity: 0;
	transform: translate(-50%, calc(-50% + 30px)) rotate(var(--rot)) translateY(var(--parallax, 0px)) scale(0.5);
	transition: none;
}

.sticker--pre.sticker--visible {
	opacity: 1;
	transform: translate(-50%, -50%) rotate(var(--rot)) translateY(var(--parallax, 0px)) scale(1);
	transition:
		opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
		transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay);
}

/* ── User-placed: pop-in ── */
.sticker--pop {
	animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pop {
	0%   { opacity: 0; transform: translate(-50%, -50%) rotate(var(--rot)) scale(0.15); }
	60%  { opacity: 1; transform: translate(-50%, -50%) rotate(var(--rot)) scale(1.12); }
	80%  { transform: translate(-50%, -50%) rotate(var(--rot)) scale(0.95); }
	100% { transform: translate(-50%, -50%) rotate(var(--rot)) scale(1); }
}

/* ── Hidden sticker during drag ── */
.sticker--hidden {
	opacity: 0 !important;
	pointer-events: none !important;
	transition: none !important;
}

/* ── Removing sticker (fade out) ── */
.sticker--removing {
	opacity: 0 !important;
	transform: translate(-50%, -50%) rotate(var(--rot)) scale(0.5) !important;
	transition: opacity 0.24s ease, transform 0.24s ease !important;
	pointer-events: none !important;
}

/* ── Floating drag sticker ── */
.sticker--floating {
	position: fixed;
	z-index: var(--z-toast);
	pointer-events: none;
	transform: translate(-50%, -50%) rotate(var(--rot, 0deg)) scale(1.08);
	filter: drop-shadow(0 16px 32px rgba(0,0,0,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.25));
	cursor: grabbing;
	transition: none;
	will-change: left, top;
}

.sticker--floating.sticker--returning {
	transition:
		left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
		top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
		opacity 0.45s ease;
	opacity: 0.7;
	transform: translate(-50%, -50%) rotate(var(--rot, 0deg)) scale(1);
}

/* ── Dock (dark pill) ── */
.dock {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.125rem;
	padding: 0.5rem 0.75rem;
	margin: 0.875rem auto 0;
	background: #1a1a1a;
	border-radius: var(--radius-pill);
	max-width: fit-content;
	box-shadow:
		0 2px 8px rgba(0,0,0,0.12),
		0 0 0 1px rgba(255,255,255,0.04) inset;
}

.dock-btn {
	width: 44px; height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: var(--radius-sm);
	padding: 0.25rem;
	transition: transform 0.15s, background 0.15s, opacity 0.15s;

	&:hover {
		background: rgba(255,255,255,0.1);
		transform: translateY(-3px) scale(1.12);
	}

	&:active {
		transform: translateY(0) scale(0.92);
	}
}

.dock-btn--ghost {
	opacity: 0.3;
	pointer-events: none;
}

.dock-img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: var(--radius-sm);
	pointer-events: none;
}

/* ── Screen reader only ── */
.sr-only {
	position: absolute;
	width: 1px; height: 1px;
	padding: 0; margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}

/* ── Article (timeline) ── */
.article {
	position: relative; z-index: 1;
	max-width: var(--container); margin: 0 auto;
	padding: 0 2rem 2rem;
}
.article-inner { display: flex; flex-direction: column; }

/* ── Timeline ── */
.timeline { display: flex; flex-direction: column; }

.tl-entry {
	display: grid;
	grid-template-columns: 56px 1fr;
	gap: 1.25rem;
}
.tl-left {
	display: flex; flex-direction: column;
	align-items: center; padding-top: 0.25rem;
}
.tl-year {
	font-size: var(--text-sm); font-weight: 600;
	color: var(--color-heading); font-variant-numeric: tabular-nums;
}
.tl-line {
	width: 1px; flex: 1;
	background: var(--color-faint);
	margin-top: 0.625rem; min-height: 20px;
}
.tl-card { padding-bottom: 2.25rem; }
.tl-tag {
	display: inline-block;
	font-size: 11px; font-weight: 500;
	color: var(--color-muted); text-transform: uppercase;
	letter-spacing: 0.06em; margin-bottom: 0.25rem;
}
.tl-title {
	font-size: var(--text-lg); font-weight: 600;
	color: var(--color-heading); line-height: var(--leading-snug);
	letter-spacing: -0.01em; margin: 0 0 0.375rem;
}
.tl-desc {
	font-size: var(--text-sm); line-height: var(--leading-normal);
	color: var(--color-body); margin: 0;
}

/* ── Story ── */
.story {
	position: relative; z-index: 1;
	max-width: var(--container); margin: 4rem auto 0;
	padding: 0 2rem;
}
.story-inner { display: flex; flex-direction: column; }

.story-section { margin-bottom: 0; }

.story-heading {
	font-size: var(--h3); font-weight: 600;
	color: var(--color-heading); letter-spacing: -0.01em;
	line-height: var(--leading-tight);
	margin: 0 0 1rem;
}

.story p {
	font-size: var(--text-base); line-height: var(--leading-relaxed);
	color: var(--color-body); margin: 0 0 1rem;
	&:last-child { margin-bottom: 0; }
}

.story-divider {
	border: none; height: 1px;
	background: var(--color-faint);
	margin: 2.5rem 0;
}

.photo-strip {
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	padding: 2rem 0;
	flex-wrap: wrap;
}

.polaroid {
	background: #fff;
	padding: 0.625rem 0.625rem 0.375rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
	border-radius: var(--radius-sm);
	transition: transform 0.2s;

	&:hover { transform: rotate(0deg) !important; scale: 1.05; }
}

.polaroid-img-wrapper {
	width: 180px;
	height: 180px;
	overflow: hidden;
	background: var(--color-faint);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
}

.polaroid-caption {
	display: block;
	text-align: center;
	font-family: 'Caveat', cursive;
	font-size: var(--text-base);
	color: var(--color-body);
	padding: 0.5rem 0 0.25rem;
}

.chapter-title {
	font-size: var(--text-sm); font-weight: 600;
	color: var(--color-muted); margin: 2rem 0 0.75rem;
	letter-spacing: 0.01em;
	&:first-of-type { margin-top: 0.5rem; }
}

.care-item {
	margin-bottom: 1.25rem;
	&:last-child { margin-bottom: 0; }

	h3 {
		font-size: var(--text-base); font-weight: 600;
		color: var(--color-heading); margin: 0 0 0.3rem;
	}
	p { margin-bottom: 0; }
}

/* ── Education ── */
.edu-grid {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 0.5rem;
}

.edu-card {
	padding: 1.5rem 1.75rem;
	background: var(--color-bg-subtle);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	transition: background 0.2s;

	&:hover { background: #f2f2ef; }
}

.edu-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 0.75rem;
}

.edu-mono {
	width: 48px; height: 48px;
	border-radius: 50%;
	background: var(--color-faint);
	color: var(--color-body);
	display: flex; align-items: center; justify-content: center;
	font-size: var(--text-xs); font-weight: 700;
	letter-spacing: 0.03em;
	flex-shrink: 0;
}

.edu-logo {
	width: 48px; height: 48px;
	border-radius: 50%;
	object-fit: cover;
	flex-shrink: 0;
}

.edu-header-text {
	flex: 1; min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
}

.edu-name {
	font-size: var(--text-base); font-weight: 600;
	color: var(--color-heading); line-height: 1.3;
	margin: 0;
}

.edu-meta {
	font-size: var(--text-sm); color: var(--color-muted);
	line-height: var(--leading-snug);
	display: block;
}

.edu-year {
	font-size: var(--text-sm); color: var(--color-muted);
	white-space: nowrap;
	flex-shrink: 0;
	font-weight: 500;
}

.edu-degree {
	font-size: var(--text-sm); font-weight: 500;
	color: var(--color-heading);
	margin-bottom: 0.5rem;
}

.edu-activity {
	font-size: var(--text-sm);
	color: var(--color-body);
	line-height: var(--leading-normal);
	margin-bottom: 0;
}

.edu-reflection {
	font-size: var(--text-sm);
	color: var(--color-muted);
	font-style: italic;
	line-height: var(--leading-normal);
	margin-top: 0.75rem;
	padding-top: 0.75rem;
	border-top: 1px solid var(--color-border);
	margin-bottom: 0;
}

.proof-strip {
	padding: 1.5rem 0;
	text-align: center;
}

.proof-details {
	font-size: var(--text-sm); color: var(--color-muted);
	margin-bottom: 0.75rem;
	letter-spacing: 0.01em;
}

.proof-awards {
	display: flex; flex-wrap: wrap; gap: 0.5rem;
	justify-content: center;
}

.proof-award {
	display: inline-block;
	font-size: var(--text-sm); font-weight: 500;
	color: var(--color-body);
	padding: 0.25rem 0.625rem;
	background: var(--color-border);
	border-radius: var(--radius-sm);
}

.story-cta {
	text-align: center;
	padding: 1rem 0 0;

	p {
		font-size: var(--text-lg);
		color: var(--color-heading);
		margin-bottom: 1.25rem;
	}
}

.story-cta-links {
	display: flex; gap: 0.75rem;
	justify-content: center;
	flex-wrap: wrap;
}

.cta-link {
	display: inline-flex; align-items: center;
	padding: 0.5rem 1rem;
	border: 1px solid #ddd;
	border-radius: var(--radius-sm);
	font-size: var(--text-sm); font-weight: 500;
	color: var(--color-heading); text-decoration: none;
	transition: all 0.2s ease;

	&:hover {
		background: var(--color-bg-subtle);
		border-color: #ccc;
		transform: translateY(-1px);
	}
}

/* ── Related pages (footer) ── */
.explore {
	position: relative; z-index: 1;
	max-width: var(--container); margin: 2rem auto 0;
	padding: 0 2rem 5rem;
}
.explore-inner { display: flex; flex-direction: column; }
.explore-grid { display: flex; gap: 1.5rem; }

.explore-card {
	flex: 1; display: flex; flex-direction: column;
	gap: 0.25rem; text-decoration: none;
	padding: 0.875rem;
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	transition: background 0.15s, border-color 0.15s;
	&:hover {
		background: rgba(0,0,0,0.02);
		border-color: #ddd;
		.explore-title { color: #000; }
	}
}
.explore-label { font-size: var(--text-xs); color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.explore-title {
	font-size: var(--text-base); font-weight: 600;
	color: var(--color-heading); letter-spacing: -0.01em;
	line-height: 1.3; margin: 0;
	transition: color 0.15s;
}
.explore-desc { font-size: var(--text-sm); color: var(--color-muted); line-height: var(--leading-normal); margin: 0; }

/* ── Responsive ── */
@media (max-width: 640px) {
	.hero-section { padding-top: 3rem; }
	.hero-title { font-size: 24px; }
	.hero-sub { font-size: 14px; max-width: 320px; }
	.hero-ctas { flex-direction: column; align-items: center; }
	.stage-wrap { padding: 0 0.5rem; margin-bottom: 3rem; }
	.stage { border-radius: var(--radius-md); }
	.dock { gap: 1px; padding: 0.375rem 0.625rem; }
	.dock-btn { width: 36px; height: 36px; font-size: 18px; }
	.sticker { width: 70px; height: 70px; }
	.sticker--floating { width: 70px; height: 70px; }
	.tl-entry { grid-template-columns: 44px 1fr; gap: 0.875rem; }
	.divider { width: 100%; margin-left: 0; }
	.photo-strip { gap: 1rem; }
	.polaroid-img-wrapper { width: 140px; height: 140px; }
	.edu-header { flex-wrap: wrap; }
	.edu-year { width: 100%; padding-top: 0; }
	.explore-grid { flex-direction: column; gap: 0.75rem; }
	.proof-awards { gap: 0.375rem; }
	.proof-award { font-size: 12px; }
	.story-cta-links { flex-direction: column; align-items: center; }
}

@media (max-width: 400px) {
	.hero-title { font-size: 22px; }
	.guide { display: none; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
	.sticker--floating.sticker--returning {
		transition: left 0.12s linear, top 0.12s linear, opacity 0.12s linear;
	}
	.sticker--pop {
		animation-duration: 0.12s;
		animation-timing-function: linear;
	}
	.sticker--pre.sticker--visible {
		transition: opacity 0.12s linear, transform 0.12s linear !important;
	}
	.sticker--removing {
		transition: opacity 0.12s linear, transform 0.12s linear !important;
	}
}
</style>
