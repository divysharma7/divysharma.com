<template>
  <Teleport to="body">
    <div class="filter-wrapper" :class="{ open: open }">
      <!-- Backdrop (desktop/tablet) -->
      <Transition name="fade">
        <div v-if="open" class="filter-backdrop" @click="close"></div>
      </Transition>

      <!-- Panel (Slide in) -->
      <Transition name="slide-right">
        <div v-if="open" class="filter-panel" role="dialog" aria-modal="true" aria-label="Filter and sort">
          <!-- ═══ Header ═══ -->
          <div class="panel-header">
            <h2 class="panel-title">FILTER &amp; SORT</h2>
            <button
              v-if="hasDraftFilters"
              class="header-clear"
              @click="clearDraft"
            >Clear all</button>
            <button class="header-close" @click="close" aria-label="Close filters">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- ═══ Applied Filters ═══ -->
          <div v-if="hasDraftFilters" class="applied-section">
            <div class="applied-label">Applied filters</div>
            <div class="applied-chips">
              <button v-if="draftQuick" class="applied-chip" @click="draftQuick = null">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                {{ quickFilters.find(q => q.key === draftQuick)?.label }}
              </button>
              <button v-if="draftApm" class="applied-chip" @click="draftApm = 0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                APM ≥ {{ draftApm }}
              </button>
              <button v-for="s in draftStatus" :key="s" class="applied-chip" @click="toggleDraftStatus(s)">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                {{ statusLabel(s) }}
              </button>
              <button v-for="t in draftTags" :key="t" class="applied-chip" @click="toggleDraftTag(t)">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                {{ t }}
              </button>
            </div>
          </div>

          <!-- ═══ Scrollable Body ═══ -->
          <div class="panel-body">
            <!-- Sort By (accordion) -->
            <div class="accordion-section" :class="{ open: openSection === 'sort' }">
              <button class="accordion-header" @click="toggleSection('sort')">
                <div class="accordion-title">
                  <span class="acc-label">Sort by</span>
                  <span class="acc-value">{{ sortLabels[draftSort] }}</span>
                </div>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="accordion-body">
                <button
                  v-for="(label, value) in sortLabels"
                  :key="value"
                  class="radio-row"
                  :class="{ selected: draftSort === value }"
                  @click="draftSort = value"
                >
                  <span class="radio-dot"><span class="radio-inner"></span></span>
                  {{ label }}
                </button>
              </div>
            </div>

            <!-- Reading Status (accordion) -->
            <div class="accordion-section" :class="{ open: openSection === 'status' }">
              <button class="accordion-header" @click="toggleSection('status')">
                <div class="accordion-title">
                  <span class="acc-label">Status</span>
                  <span v-if="draftStatus.length" class="acc-value">{{ draftStatus.map(statusLabel).join(', ') }}</span>
                </div>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="accordion-body">
                <button
                  v-for="opt in statusOptions"
                  :key="opt.value"
                  class="check-row"
                  :class="{ selected: draftStatus.includes(opt.value) }"
                  @click="toggleDraftStatus(opt.value)"
                >
                  <span class="check-box"><svg v-if="draftStatus.includes(opt.value)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span class="check-label">{{ opt.label }}</span>
                </button>
              </div>
            </div>

            <!-- Quick Filters (accordion) -->
            <div class="accordion-section" :class="{ open: openSection === 'quick' }">
              <button class="accordion-header" @click="toggleSection('quick')">
                <span class="acc-label">Quick Filters</span>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="accordion-body">
                <button
                  v-for="qf in quickFilters"
                  :key="qf.key"
                  class="check-row"
                  :class="{ selected: draftQuick === qf.key }"
                  @click="draftQuick = draftQuick === qf.key ? null : qf.key"
                >
                  <span class="check-box"><svg v-if="draftQuick === qf.key" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span class="check-label">{{ qf.label }}</span>
                  <span class="check-hint">{{ qf.short }}</span>
                </button>
              </div>
            </div>

            <!-- Min APM (accordion) -->
            <div class="accordion-section" :class="{ open: openSection === 'apm' }">
              <button class="accordion-header" @click="toggleSection('apm')">
                <div class="accordion-title">
                  <span class="acc-label">Min APM Rating</span>
                  <span v-if="draftApm" class="acc-value">{{ draftApm }}+</span>
                </div>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="accordion-body">
                <button
                  v-for="n in apmOptions"
                  :key="n.value"
                  class="check-row"
                  :class="{ selected: draftApm === n.value }"
                  @click="draftApm = draftApm === n.value ? 0 : n.value"
                >
                  <span class="check-box"><svg v-if="draftApm === n.value" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                  {{ n.label }}
                </button>
              </div>
            </div>

            <!-- Tags (accordion) -->
            <div class="accordion-section" :class="{ open: openSection === 'tags' }">
              <button class="accordion-header" @click="toggleSection('tags')">
                <div class="accordion-title">
                  <span class="acc-label">Tags</span>
                  <span v-if="draftTags.length" class="acc-value">{{ draftTags.length }} selected</span>
                </div>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="accordion-body">
                <button
                  v-for="tag in tagsByFreq"
                  :key="tag.name"
                  class="check-row"
                  :class="{ selected: draftTags.includes(tag.name) }"
                  @click="toggleDraftTag(tag.name)"
                >
                  <span class="check-box"><svg v-if="draftTags.includes(tag.name)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span class="check-label">{{ tag.name }}</span>
                  <span class="check-count">[{{ tag.count }}]</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ═══ Footer ═══ -->
          <div class="panel-footer">
            <div class="footer-count">{{ previewCount }} items found</div>
            <button class="apply-btn" @click="apply">
              <span>Apply</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { books } from '../config/books.js';

const props = defineProps({
  open: Boolean,
  appliedQuick: { type: String, default: null },
  appliedApm: { type: Number, default: 0 },
  appliedTags: { type: Array, default: () => [] },
  appliedStatus: { type: Array, default: () => [] },
  appliedSort: { type: String, default: 'apmRating' },
  tagsByFreq: { type: Array, default: () => [] },
  quickFilters: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
});

const emit = defineEmits(['close', 'apply', 'update:open']);

// ── Draft state ──
const draftQuick = ref(null);
const draftApm = ref(0);
const draftTags = ref([]);
const draftStatus = ref([]);
const draftSort = ref('apmRating');
const openSection = ref(null);

const sortLabels = {
  apmRating: 'APM rating',
  status: 'Status',
  business: 'Business',
  usability: 'Usability',
  'effort-asc': 'Effort (low → high)',
  'effort-desc': 'Effort (high → low)',
  title: 'A–Z',
};

const apmOptions = [
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 5, label: '5★' },
];

const statusOptions = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

function statusLabel(val) {
  const opt = statusOptions.find(o => o.value === val);
  return opt ? opt.label : val;
}

// Initialize draft when sheet opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    draftQuick.value = props.appliedQuick;
    draftApm.value = props.appliedApm;
    draftTags.value = [...props.appliedTags];
    draftStatus.value = [...props.appliedStatus];
    draftSort.value = props.appliedSort;
    openSection.value = null;
    nextTick(() => { document.body.style.overflow = 'hidden'; });
  } else {
    document.body.style.overflow = '';
  }
});

function toggleSection(name) {
  openSection.value = openSection.value === name ? null : name;
}

function toggleDraftTag(tag) {
  const i = draftTags.value.indexOf(tag);
  if (i >= 0) draftTags.value.splice(i, 1);
  else draftTags.value.push(tag);
}

function toggleDraftStatus(status) {
  const i = draftStatus.value.indexOf(status);
  if (i >= 0) draftStatus.value.splice(i, 1);
  else draftStatus.value.push(status);
}

const hasDraftFilters = computed(() =>
  draftQuick.value || draftApm.value || draftTags.value.length || draftStatus.value.length
);

function clearDraft() {
  draftQuick.value = null;
  draftApm.value = 0;
  draftTags.value = [];
  draftStatus.value = [];
}

// ── Preview count ──
const previewCount = computed(() => {
  let list = [...books];

  if (props.searchQuery.trim()) {
    const q = props.searchQuery.toLowerCase();
    list = list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.topics.some(t => t.toLowerCase().includes(q)) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (draftQuick.value) {
    const qf = props.quickFilters.find(x => x.key === draftQuick.value);
    if (qf) list = list.filter(qf.filter);
  }

  if (draftApm.value) list = list.filter(b => b.apmRating >= draftApm.value);

  if (draftStatus.value.length) {
    list = list.filter(b => draftStatus.value.includes(b.readingStatus));
  }

  if (draftTags.value.length) {
    list = list.filter(b => draftTags.value.some(t => b.tags.includes(t)));
  }

  return list.length;
});

// ── Actions ──
function apply() {
  emit('apply', {
    quick: draftQuick.value,
    apm: draftApm.value,
    tags: [...draftTags.value],
    status: [...draftStatus.value],
    sort: draftSort.value,
  });
  emit('update:open', false);
}

function close() {
  emit('update:open', false);
  emit('close');
}

defineExpose({ draftTags });
</script>

<style scoped>
/* ═══ Wrapper ═══ */
.filter-wrapper {
  position: relative;
  z-index: 2000;
}

/* ═══ Backdrop ═══ */
.filter-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2000;
}

/* ═══ Panel (Drawer) ═══ */
.filter-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 420px; /* Constrained on desktop */
  background: #fff;
  display: flex;
  flex-direction: column;
  z-index: 2001;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
}

/* On mobile (narrower than 420px), it just takes 100% width naturally */

/* ═══ Header ═══ */
.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.1rem 1rem 1.1rem 1.25rem;
  border-bottom: 2px solid #111;
  flex-shrink: 0;
}

.panel-title {
  flex: 1;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #111;
}

.header-clear {
  font-size: 0.82rem;
  font-weight: 500;
  color: #111;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-family: inherit;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.header-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  color: #111;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: -6px;
  -webkit-tap-highlight-color: transparent;
}
.header-close:active { opacity: 0.5; }

/* ═══ Applied Filters ═══ */
.applied-section {
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #e5e5e5;
  flex-shrink: 0;
}

.applied-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
  text-transform: none;
}

.applied-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.applied-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.65rem;
  border: 1px solid #999;
  border-radius: 0;
  background: #fff;
  font-size: 0.76rem;
  font-family: inherit;
  color: #111;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s ease;
}
.applied-chip:active { background: #f0f0f0; }

/* ═══ Scrollable Body ═══ */
.panel-body {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* ═══ Accordion Sections ═══ */
.accordion-section {
  border-bottom: 1px solid #e5e5e5;
  border-left: 3px solid transparent;
  transition: border-left-color 0.2s ease;
}

/* ★ Black left border on expanded section */
.accordion-section.open {
  border-left-color: #111;
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem 1rem 1.1rem;
  min-height: 56px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.accordion-title {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.acc-label {
  font-size: 0.92rem;
  font-weight: 700;
  color: #111;
  text-transform: none;
}

.acc-value {
  font-size: 0.75rem;
  font-weight: 400;
  color: #777;
  text-transform: none;
}

.acc-chevron {
  color: #111;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.accordion-section.open .acc-chevron {
  transform: rotate(180deg);
}

/* Accordion body: collapsed by default */
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.accordion-section.open .accordion-body {
  max-height: 600px;
}

/* ═══ Radio rows (Sort) ═══ */
.radio-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.8rem 1.25rem 0.8rem 1.5rem;
  min-height: 52px;
  border: none;
  background: none;
  font-size: 0.88rem;
  font-family: inherit;
  color: #444;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s ease;
}
.radio-row:active { background: #f5f5f5; }
.radio-row.selected { font-weight: 600; color: #111; }

.radio-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #bbb;
  flex-shrink: 0;
  transition: border-color 0.15s ease;
}
.radio-row.selected .radio-dot { border-color: #111; }

.radio-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.15s ease;
}
.radio-row.selected .radio-inner { background: #111; }

/* ═══ Checkbox rows (Quick, APM, Tags) ═══ */
.check-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 1.5rem;
  min-height: 50px;
  border: none;
  background: none;
  font-size: 0.88rem;
  font-family: inherit;
  color: #444;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s ease;
}
.check-row:active { background: #f5f5f5; }
.check-row.selected { font-weight: 600; color: #111; }

.check-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 3px;
  border: 1.5px solid #bbb;
  background: #fff;
  flex-shrink: 0;
  transition: all 0.15s ease;
}
.check-row.selected .check-box {
  background: #111;
  border-color: #111;
  color: #fff;
}

.check-label { flex: 1; }

.check-hint {
  font-size: 0.7rem;
  color: #999;
  white-space: nowrap;
}

.check-count {
  font-size: 0.72rem;
  color: #999;
  margin-left: auto;
}

/* ═══ Footer ═══ */
.panel-footer {
  padding: 0.6rem 1.25rem;
  padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid #e5e5e5;
  flex-shrink: 0;
  background: #fff;
}

.footer-count {
  font-size: 0.82rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

/* ★ Adidas-style Apply button: black, text left, arrow right */
.apply-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.05rem 1.25rem;
  background: #111;
  color: #fff;
  border: 2px solid #111;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.02em;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s ease, color 0.15s ease;
}
.apply-btn:active {
  background: #fff;
  color: #111;
}
.apply-btn span {
  text-transform: none;
}

/* ═══ Transitions ═══ */
/* Slide right for panel */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Fade for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
