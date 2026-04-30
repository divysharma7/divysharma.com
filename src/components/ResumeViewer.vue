<template>
  <div ref="containerRef" class="resume-viewer">
    <!-- Loading state -->
    <div v-if="loading" class="resume-skeleton">
      <div class="resume-skeleton__pulse" />
      <span class="resume-skeleton__text">Loading resume&hellip;</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="resume-error">
      <FileWarning :size="32" />
      <p>Failed to load the resume.</p>
      <a href="/resume.pdf" download class="resume-error__link">Download PDF instead</a>
    </div>

    <!-- Pages + FAB -->
    <template v-else>
      <!-- Sticky FAB track (zero-height so it doesn't push content) -->
      <div class="fab-track">
        <a
          href="/resume.pdf"
          download
          class="download-fab"
          :class="{ 'download-fab--pulsed': showPulse }"
          aria-label="Download resume"
          @click="downloadPriceSheet"
        >
          <Download :size="22" />
        </a>
      </div>

      <canvas
        v-for="page in totalPages"
        :key="page"
        :ref="(el) => setCanvasRef(el, page)"
        class="resume-page"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { FileWarning, Download } from 'lucide-vue-next'
import * as pdfjsLib from 'pdfjs-dist'
import posthog from 'posthog-js'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

const containerRef = ref(null)
const loading = ref(true)
const error = ref(false)
const totalPages = ref(0)
const showPulse = ref(true)

let pdfDoc = null
let canvasRefs = {}
let resizeObserver = null
let containerWidth = 0
let pulseTimer = null

function setCanvasRef(el, page) {
  if (el) canvasRefs[page] = el
}

function downloadPriceSheet() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'click:resume_download', location: 'resume_fab' })
  posthog.capture('click:resume_download', { location: 'resume_fab' })
}

async function renderPage(pageNum, width) {
  if (!pdfDoc || !canvasRefs[pageNum]) return
  const page = await pdfDoc.getPage(pageNum)
  const canvas = canvasRefs[pageNum]
  const ctx = canvas.getContext('2d')

  const dpr = window.devicePixelRatio || 1
  const viewport = page.getViewport({ scale: 1 })
  const scale = (width / viewport.width) * dpr
  const scaledViewport = page.getViewport({ scale })

  canvas.width = scaledViewport.width
  canvas.height = scaledViewport.height
  canvas.style.width = `${scaledViewport.width / dpr}px`
  canvas.style.height = `${scaledViewport.height / dpr}px`

  await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise
}

async function renderAllPages(width) {
  for (let i = 1; i <= totalPages.value; i++) {
    await renderPage(i, width)
  }
}

onMounted(async () => {
  pulseTimer = setTimeout(() => { showPulse.value = false }, 3000)

  try {
    pdfDoc = await pdfjsLib.getDocument('/resume.pdf').promise
    totalPages.value = pdfDoc.numPages
    loading.value = false

    await nextTick()

    if (containerRef.value) {
      containerWidth = containerRef.value.clientWidth
      await renderAllPages(containerWidth)

      resizeObserver = new ResizeObserver((entries) => {
        const newWidth = entries[0].contentRect.width
        if (Math.abs(newWidth - containerWidth) > 2) {
          containerWidth = newWidth
          renderAllPages(containerWidth)
        }
      })
      resizeObserver.observe(containerRef.value)
    }
  } catch (e) {
    console.error('PDF load error:', e)
    loading.value = false
    error.value = true
  }
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (pdfDoc) pdfDoc.destroy()
  if (pulseTimer) clearTimeout(pulseTimer)
  canvasRefs = {}
})
</script>

<style scoped>
.resume-viewer {
  height: 70vh;
  min-height: 500px;
  width: 100%;
  overflow: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: #fff;
  position: relative;
}

/* Sticky track: zero height, doesn't push content */
.fab-track {
  position: sticky;
  top: 16px;
  height: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

/* The FAB itself */
.download-fab {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-heading);
  color: var(--color-bg);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.25s ease-out, background 0.2s ease;
  margin-right: 16px;
  margin-top: -8px;
  flex-shrink: 0;
  position: relative;
}

.download-fab:hover {
  transform: scale(1.05);
  background: var(--color-accent);
}

/* Pulse ring animation on first load */
.download-fab--pulsed::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--color-heading);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.resume-page {
  display: block;
  margin: 0 auto;
  width: 100%;
  vertical-align: top;
}

/* Skeleton loader */
.resume-skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.resume-skeleton__pulse {
  width: 60%;
  height: 40%;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--color-border) 25%, var(--color-bg-hover) 50%, var(--color-border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.resume-skeleton__text {
  font-size: var(--text-sm);
  color: var(--color-muted);
}

/* Error state */
.resume-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 0.5rem;
  color: var(--color-muted);
}

.resume-error p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-body);
}

.resume-error__link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-heading);
  text-decoration: underline;
}

/* Mobile */
@media (max-width: 480px) {
  .download-fab {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }

  .download-fab :deep(svg) {
    width: 18px;
    height: 18px;
  }
}
</style>
