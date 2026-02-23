<template>
  <section class="cta-section">
    <div class="cta-card">
      <!-- Centered content -->
      <div class="cta-inner">
        <p class="cta-message">{{ ctaConfig.preText }}</p>
        
        <button @click="openBooking" class="cta-btn group" aria-label="Book a free call">
          <div class="avatars-group">
            <div class="avatar-wrapper">
              <img 
                :src="ctaConfig.profileImage" 
                :alt="ctaConfig.profileAlt" 
                class="btn-avatar"
              />
            </div>
            
            <div class="hover-avatar-add">
              <PlusIcon :size="12" class="plus-icon" />
              <div class="you-avatar">You</div>
            </div>
          </div>
          <span class="btn-text">{{ ctaConfig.linkText }}</span>
        </button>
      </div>

      <!-- Cat doodle accent -->
      <div class="doodle-accent" aria-hidden="true">
        <Cat :size="20" />
      </div>
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
import { XIcon, Cat, PlusIcon } from 'lucide-vue-next';

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

function openBooking() {
  trackEvent('cta:book_call', { location: 'cta_component' });
  if (isMobile()) triggerHaptic('medium');
  isLoading.value = true;
  showCalPopup.value = true;
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  showCalPopup.value = false;
  document.body.style.overflow = '';
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   CTA Section
   ═══════════════════════════════════════════ */
.cta-section {
  display: flex;
  justify-content: center;
  width: 100%;
  /* padding: 0 1rem; Removed to allow full width */
}

.cta-card {
  width: 100%;
  max-width: 100%;
  margin: 3rem auto;
  padding: 4rem 2rem;
  border: 1.5px dashed rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  background: rgba(250, 250, 250, 0.4);
  position: relative;
  transition: border-color 0.3s ease;
}

.cta-card:hover {
  border-color: rgba(0, 0, 0, 0.22);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

/* ─── Message ─── */
.cta-message {
  font-size: 1.25rem;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
  line-height: 1.5;
  letter-spacing: -0.01em;
  margin: 0;
}

/* ─── Button ─── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem 0.45rem 0.45rem;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.cta-btn:hover {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.cta-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* Avatar Group */
.avatars-group {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 2px #f3f4f6;
  background: #f3f4f6; /* Placeholder bg */
  flex-shrink: 0;
  z-index: 2;
}

.btn-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* On hover, don't swap, maybe just slight scale */
.cta-btn:hover .btn-avatar {
  transform: scale(1.05);
}

.hover-avatar-add {
  display: flex;
  align-items: center;
  opacity: 0;
  width: 0;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.cta-btn:hover .hover-avatar-add {
  opacity: 1;
  width: 38px; /* space for icon + avatar + margin */
  transform: translateX(0);
  margin-left: 4px;
}

.plus-icon {
  color: #9ca3af;
  flex-shrink: 0;
}

.you-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  margin-left: 4px;
  flex-shrink: 0;
}

.btn-text {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1f2937;
  white-space: nowrap;
}

/* ─── Cat doodle ─── */
.doodle-accent {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  color: #d1d5db;
  opacity: 0.5;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.cta-card:hover .doodle-accent {
  opacity: 0.8;
}

/* ═══════════════════════════════════════════
   Booking Modal
   ═══════════════════════════════════════════ */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
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
  max-width: 960px;
  height: 90vh;
  max-height: 90vh;
  background: #fff;
  border-radius: 16px;
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
  color: #9ca3af;
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
    margin: 2rem 0;
    padding: 2.25rem 1.25rem;
    border-radius: 14px;
  }

  .cta-message {
    font-size: 1.1rem;
  }

  .cta-btn {
    padding: 0.5rem 0.7rem;
    padding-right: 0.85rem;
    gap: 0.5rem;
  }

  .btn-avatar {
    width: 24px;
    height: 24px;
  }

  .btn-text {
    font-size: 0.85rem;
  }

  .doodle-accent {
    display: none;
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

  /* Pull handle indicator */
  .booking-modal::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 4px;
    border-radius: 4px;
    background: #d1d5db;
    z-index: 15;
  }

  .close-btn {
    top: 16px;
    right: 16px;
  }

  /* Slide up from bottom on mobile */
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
.cta-btn:focus-visible {
  outline: 2px solid #374151;
  outline-offset: 2px;
}

.close-btn:focus-visible {
  outline: 2px solid #374151;
  outline-offset: 2px;
}
</style>
