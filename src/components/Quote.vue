<template>
  <div class="quote-wrap">
    <div class="wisdom-card">
      <!-- Watermark Icon -->
      <div class="watermark-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path>
        </svg>
      </div>

      <!-- Top Progress Line -->
      <div class="progress-line">
        <div class="progress-fill" :key="index" :style="{ animationDuration: `${intervalMs}ms` }"></div>
      </div>

      <div class="card-content">
        <Transition name="fade" mode="out-in">
          <div :key="current.quote" class="quote-inner">
            <h3 class="quote-text">
              “{{ current.quote.trim() }}”
            </h3>
            <div class="quote-meta">
              <span class="author-dash">——</span>
              <span class="author-name">{{ current.author }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { quotes } from '@/config/quotes';

const props = defineProps({
  intervalMs: {
    type: Number,
    default: 8000
  }
});

const items = quotes.filter((q) => q.quote?.trim() && q.author?.trim());

function pickRandomIndex(max, avoid) {
  if (max <= 1) return 0;
  let idx = Math.floor(Math.random() * max);
  while (idx === avoid) idx = Math.floor(Math.random() * max);
  return idx;
}

const index = ref(pickRandomIndex(items.length));
const current = computed(() => items[index.value] ?? null);

let timer = null;

function rotateQuote() {
  index.value = pickRandomIndex(items.length, index.value);
}

onMounted(() => {
  if (!items.length) return;
  timer = window.setInterval(rotateQuote, props.intervalMs);
});

onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<style scoped>
.quote-wrap {
  width: 100%;
  padding: 3rem 0 5rem; /* Reduced top/side padding to fit container perfectly */
  display: flex;
  justify-content: center;
  align-items: center;
}

.wisdom-card {
  position: relative;
  width: 100%;
  max-width: 100%; /* Full width to match parent container (800px) */
  background: #fff;
  border-radius: 16px;
  /* Creative shadow: soft lift */
  box-shadow: 
    0 10px 40px -10px rgba(0,0,0,0.08),
    0 0 0 1px rgba(0,0,0,0.03); 
  overflow: hidden;
  padding: 3rem 2.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.wisdom-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 40px -10px rgba(0,0,0,0.12),
    0 0 0 1px rgba(0,0,0,0.03);
}

.watermark-icon {
  position: absolute;
  top: -10px;
  left: 20px;
  opacity: 0.04;
  color: #000;
  pointer-events: none;
  z-index: 0;
}

.watermark-icon svg {
  width: 100px;
  height: 100px;
}

.card-content {
  position: relative;
  z-index: 1;
}

.quote-inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.quote-text {
  /* Using serif for wisdom feel */
  font-family: var(--fontDisplay, Georgia, serif);
  font-size: 1.5rem;
  color: #222;
  line-height: 1.4;
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.quote-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  color: #666;
  font-size: 0.9rem;
  opacity: 0.8;
}

.author-dash {
  color: #ccc;
  font-weight: 300;
}

.author-name {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
}

/* Progress Line at Top */
.progress-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #f3f3f3;
}

.progress-fill {
  height: 100%;
  background: #222;
  width: 0%;
  animation: progress linear forwards;
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .quote-text {
    font-size: 1.25rem;
  }
  .wisdom-card {
    padding: 2.5rem 1.5rem;
  }
}
</style>
