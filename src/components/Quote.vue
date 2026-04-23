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
  max-width: 100%;
  background: var(--color-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(0,0,0,0.03);
  overflow: hidden;
  padding: 3rem 2.5rem;
  text-align: center;
  transition: transform var(--duration-normal) ease;
}

.wisdom-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(0,0,0,0.03);
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
  font-family: var(--font-sans);
  font-size: var(--h3);
  color: var(--color-heading);
  line-height: var(--leading-snug);
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.quote-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-sans);
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.author-dash {
  color: var(--color-faint);
  font-weight: 300;
}

.author-name {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--text-xs);
}

/* Progress Line at Top */
.progress-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--color-border);
}

.progress-fill {
  height: 100%;
  background: var(--color-heading);
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
    font-size: var(--text-lg);
  }
  .wisdom-card {
    padding: 2.5rem 1.5rem;
  }
}
</style>
