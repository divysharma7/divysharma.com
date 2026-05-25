/**
 * Lightweight AOS replacement using native IntersectionObserver.
 * Reads the same data-aos, data-aos-delay, and data-aos-duration attributes
 * so no template changes are needed.
 */
const DEFAULT_DURATION = 600
const DEFAULT_OFFSET = 0.1

let observer

function init() {
	if (observer) return

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('aos-animate')
					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: DEFAULT_OFFSET }
	)

	observe()
}

function observe() {
	document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach((el) => {
		const delay = el.getAttribute('data-aos-delay') || 0
		const duration = el.getAttribute('data-aos-duration') || DEFAULT_DURATION

		el.style.transitionDelay = `${delay}ms`
		el.style.transitionDuration = `${duration}ms`

		observer.observe(el)
	})
}

export default {
	install(app) {
		app.mixin({
			mounted() {
				init()
				requestAnimationFrame(() => observe())
			},
			updated() {
				requestAnimationFrame(() => observe())
			}
		})
	}
}
