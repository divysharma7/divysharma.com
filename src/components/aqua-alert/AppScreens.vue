<template>
  <section :id="sectionId" class="app-screens" data-aos="fade-up">
    <div ref="container" class="screens-scroll">
      <div
        v-for="(screen, i) in screens"
        :key="i"
        class="phone-wrap"
        :class="{ visible: isVisible }"
        :style="{ transitionDelay: i * 100 + 'ms' }"
      >
        <div class="phone-frame">
          <div class="phone-notch"></div>
          <img
            :src="screen.src"
            :alt="screen.caption"
            class="phone-img"
            loading="lazy"
          />
        </div>
        <p class="phone-caption">{{ screen.caption }}</p>
      </div>
    </div>

    <!-- Mobile dot indicators -->
    <div class="dot-indicators">
      <span
        v-for="(screen, i) in screens"
        :key="'d'+i"
        class="dot"
        :class="{ active: i === 0 }"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data?.title ? slugify(props.data.title) : undefined)

const container = ref(null)
const isVisible = ref(false)

const screens = computed(() => props.data?.screens || [])

let observer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }
  if (!container.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(container.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.app-screens {
  margin-bottom: 3rem;
}

.screens-scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0 1.5rem;
  scrollbar-width: thin;
}

.screens-scroll::-webkit-scrollbar {
  height: 4px;
}

.screens-scroll::-webkit-scrollbar-thumb {
  background: #D3D1C7;
  border-radius: 2px;
}

.phone-wrap {
  flex-shrink: 0;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.phone-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .phone-wrap {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

.phone-frame {
  width: 240px;
  height: 480px;
  border: 1px solid #D3D1C7;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  background: #f9f9f7;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.phone-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 6px;
  background: #D3D1C7;
  border-radius: 3px;
  z-index: 1;
}

.phone-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.phone-caption {
  font-size: 14px;
  color: #888780;
  margin: 12px 0 0;
  text-align: center;
}

.dot-indicators {
  display: none;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D3D1C7;
}

.dot.active {
  background: #0D2950;
}

@media (max-width: 640px) {
  .dot-indicators { display: flex; }
  .phone-frame {
    width: 200px;
    height: 400px;
  }
}
</style>
