<template>
  <section class="cta-section">
    <h2 class="cta-heading">Work with Divy</h2>
    <div class="cta-card" @click="openBooking" role="button" tabindex="0" @keydown.enter="openBooking">
      <h3 class="cta-title">1:1 Coaching</h3>
      <p class="cta-desc">One hour with Divy. Personalized to your exact role and challenge.</p>
      <span class="cta-link">Book a Session <span class="cta-arrow">&rarr;</span></span>
    </div>

    <!-- Booking Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showCalPopup" class="overlay" @click.self="closeBooking">
          <Transition name="slide-up">
            <div v-if="showCalPopup" class="booking-modal">
              <!-- Loading -->
              <div v-if="isLoading" class="loader">
                <div class="loader-spinner" />
                <span>Loading calendar…</span>
              </div>

              <!-- Calendar iframe -->
              <iframe 
                :src="calUrl"
                class="booking-frame"
                frameborder="0"
                allow="payment"
                loading="lazy"
                @load="isLoading = false"
              />

              <!-- Close -->
              <button class="close-btn" @click="closeBooking" aria-label="Close">
                <XIcon :size="16" />
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ctaConfig } from '@/config/cta';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { trackEvent } from '@/analytics/umami';
import { XIcon } from 'lucide-vue-next';

const showCalPopup = ref(false);
const isLoading = ref(true);
const { triggerHaptic, isMobile } = useHapticFeedback();

const calUrl = computed(() => {
  const uiConfig = {
    layout: "month_view",
    theme: "light",
    styles: {
      eventTypeAppItem: {
        display: "grid",
        "grid-template-areas": '"meta main timeslots" "meta main timeslots"',
        width: "100%",
        "grid-template-columns": "var(--booker-meta-width) 1fr var(--booker-timeslots-width)",
        "grid-template-rows": "1fr 0fr",
        "min-height": "100vh",
        "margin-top": "50px"
      }
    }
  };
  const configStr = encodeURIComponent(JSON.stringify(uiConfig));
  return `https://cal.com/${ctaConfig.calLink}?embed=true&theme=light&config=${configStr}`;
});

function gtmPush(event, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

function openBooking() {
  trackEvent('cta:book_call', { location: 'cta_component' });
  gtmPush('cta:book_call', { location: 'cta_component' });
  if (isMobile()) triggerHaptic('medium');
  isLoading.value = true;
  showCalPopup.value = true;
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  gtmPush('cta:booking_close');
  showCalPopup.value = false;
  document.body.style.overflow = '';
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   CTA Section — "Work with Divy"
   ═══════════════════════════════════════════ */
.cta-section {
  width: 100%;
  margin-top: 3rem;
}

.cta-heading {
  font-size: var(--h2);
  font-weight: 400;
  color: var(--color-heading);
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  font-family: var(--font-sans);
}

.cta-card {
  padding: 1.5rem 1.75rem;
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-heading);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  cursor: pointer;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.cta-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-color: var(--color-heading);
}

.cta-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.5rem;
  font-family: var(--font-sans);
}

.cta-desc {
  font-size: var(--text-base);
  color: var(--color-body);
  margin: 0 0 1.25rem;
  line-height: var(--leading-relaxed);
}

.cta-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-heading);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: gap 0.2s ease;
}

.cta-card:hover .cta-link {
  gap: 0.5rem;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

.cta-card:hover .cta-arrow {
  transform: translateX(2px);
}

/* ═══════════════════════════════════════════
   Booking Modal
   ═══════════════════════════════════════════ */
.overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.booking-modal {
  position: relative;
  width: 100%;
  max-width: var(--container-wide);
  height: 90vh;
  max-height: 90vh;
  background: #fff;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 24px 48px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
}

.booking-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* ─── Loader ─── */
.loader {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #fff;
  color: var(--color-body);
  font-size: 0.85rem;
  font-weight: 500;
}

.loader-spinner {
  width: 24px;
  height: 24px;
  border: 2.5px solid #e5e7eb;
  border-top-color: #374151;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Close ─── */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.92);
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  padding: 0;
}

.close-btn:hover {
  background: #fff;
  color: #111827;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

/* ═══════════════════════════════════════════
   Transitions
   ═══════════════════════════════════════════ */

/* Backdrop fade */
.fade-enter-active { transition: opacity 0.2s ease; }
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* Modal slide up */
.slide-up-enter-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.2s ease;
}
.slide-up-leave-active {
  transition: transform 0.2s ease,
              opacity 0.15s ease;
}
.slide-up-enter-from {
  transform: translateY(24px) scale(0.97);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(8px) scale(0.98);
  opacity: 0;
}

/* ═══════════════════════════════════════════
   Mobile (≤ 640px)
   ═══════════════════════════════════════════ */
@media (max-width: 640px) {
  .cta-card {
    padding: 1.25rem;
  }

  /* Bottom-sheet style modal on mobile */
  .overlay {
    align-items: flex-end;
    padding: 0;
  }

  .booking-modal {
    max-width: 100%;
    width: 100%;
    height: 88vh;
    max-height: 88vh;
    border-radius: 20px 20px 0 0;
    box-shadow:
      0 -4px 24px rgba(0, 0, 0, 0.12),
      0 -1px 4px rgba(0, 0, 0, 0.06);
  }

  .booking-modal::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 4px;
    border-radius: var(--radius-sm);
    background: var(--color-faint);
    z-index: 15;
  }

  .close-btn {
    top: 16px;
    right: 16px;
  }

  .slide-up-enter-from {
    transform: translateY(100%);
    opacity: 1;
  }
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 1;
  }
}

/* ─── Focus ─── */
.cta-card:focus-visible {
  outline: 2px solid var(--color-heading);
  outline-offset: 2px;
}

.close-btn:focus-visible {
  outline: 2px solid #374151;
  outline-offset: 2px;
}
</style>
