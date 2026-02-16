<template>
  <div class="books-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Books</h1>
      <p class="page-subtitle">
        What I am reading, what I have read, and what I keep pretending I will read.
      </p>
    </div>

    <!-- Sticky Filter Bar -->
    <div class="filter-bar" :class="{ stuck: isStuck }">

      <!-- Unified Filter Bar (Mobile & Desktop) -->
      <div class="unified-bar">
        <div class="row-main">
          <div class="search-box">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              v-model="query"
              type="text"
              placeholder="Search books, topics, notes…"
              class="search-input"
              aria-label="Search books"
            />
            <button v-if="query" class="search-clear" @click="query = ''" aria-label="Clear search">✕</button>
          </div>

          <div class="controls-right">
            <button
              class="filter-trigger-btn"
              :class="{ 'has-active': totalFilterCount > 0 }"
              @click="filterSheetOpen = true"
              aria-label="Filter and sort"
            >
              <span class="btn-text desktop-only-text">Filter &amp; Sort</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18a1 1 0 010 2H3a1 1 0 010-2zm2 6h14a1 1 0 010 2H5a1 1 0 010-2zm3 6h8a1 1 0 010 2H8a1 1 0 010-2z"/></svg>
              <span v-if="totalFilterCount > 0" class="filter-badge">{{ totalFilterCount }}</span>
            </button>

            <span class="count" role="status" :aria-label="`Showing ${filteredBooks.length} of ${books.length} books`">
              <span class="count-num" :key="filteredBooks.length">{{ filteredBooks.length }}</span><span class="count-sep">/</span>{{ books.length }}
            </span>
          </div>
        </div>

        <!-- Status Summary Counts -->
        <div class="status-summary">
          <button 
            v-for="s in ['backlog', 'in_progress', 'done']" 
            :key="s"
            class="summary-item"
            :class="[statusClass(s), { active: activeStatus.includes(s) }]"
            @click="toggleStatusFilter(s)"
          >
            <span class="s-label">{{ statusLabel(s) }}</span>
            <span class="s-count">{{ statusCounts[s] }}</span>
          </button>
        </div>

        <!-- Horizontal quick filter chips -->
        <div class="quick-scroll" v-if="quickFilters.length">
          <button
            v-for="qf in quickFilters"
            :key="qf.key"
            :class="['quick-chip', { active: activeQuick === qf.key }]"
            :aria-pressed="activeQuick === qf.key"
            @click="toggleQuick(qf.key)"
          >{{ qf.label }}</button>
        </div>

        <!-- Active filter pills -->
        <div v-if="hasActiveFilters" class="active-chips-scroll">
          <span v-if="query" class="active-pill pill-enter">
            Search: {{ query }}
            <button class="pill-x" @click="query = ''" aria-label="Remove search filter">✕</button>
          </span>
          <span v-if="activeQuick" class="active-pill pill-enter">
            {{ quickFilters.find(q => q.key === activeQuick)?.label }}
            <button class="pill-x" @click="activeQuick = null" aria-label="Remove quick filter">✕</button>
          </span>
          <span v-if="minApm" class="active-pill pill-enter">
            APM ≥ {{ minApm }}
            <button class="pill-x" @click="minApm = 0" aria-label="Remove APM filter">✕</button>
          </span>
          <span v-for="s in activeStatus" :key="s" class="active-pill pill-enter" :class="statusClass(s)">
            {{ statusLabel(s) }}
            <button class="pill-x" @click="toggleStatusFilter(s)" :aria-label="`Remove ${s} filter`">✕</button>
          </span>
          <span v-for="t in activeTags" :key="t" class="active-pill pill-enter">
            {{ t }}
            <button class="pill-x" @click="toggleTag(t)" :aria-label="`Remove ${t} tag filter`">✕</button>
          </span>
          <button class="clear-link-btn" @click="clearAll">Clear all</button>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid">
      <div v-for="book in filteredBooks" :key="book.title" class="card">
        
        <!-- Left: Cover -->
        <div class="card-cover-area">
          <img 
            v-if="book.coverImage" 
            :src="book.coverImage" 
            :alt="book.title" 
            class="book-cover-large"
          />
          <div v-else class="avatar-large">{{ initials(book.title) }}</div>
        </div>

        <!-- Right: Content -->
        <div class="card-content-area">
          <div class="card-header-row">
            <h3 class="card-title-large">{{ book.title }}</h3>
              <div class="header-badges">
                <span class="apm-large" :class="apmClass(book.apmRating)">
                  <span class="star-icon">★</span> {{ book.apmRating }}/5
                </span>
              </div>
          </div>

          <p class="card-summary-large">{{ book.summary }}</p>

          <div class="topics">
            <span v-for="topic in book.topics" :key="topic" class="topic">{{ topic }}</span>
          </div>

          <div class="meta-footer">
            <div class="scores">
              <div class="score-item" v-for="s in scoreFields" :key="s.key">
                <span class="score-lbl">{{ s.label }}</span>
                <span class="dots" :aria-label="`${s.label}: ${book[s.key]} out of 5`">
                  <span v-for="n in 5" :key="n" :class="['dot', { on: n <= book[s.key] }]" />
                </span>
              </div>
            </div>

            <div class="footer-row">
              <button class="status-badge" :class="statusClass(getBookStatus(book))" @click.stop="toggleStatus(book)" title="Change status">
                {{ statusLabel(getBookStatus(book)) }}
              </button>
              
              <div class="card-tags">
                <span v-for="t in book.tags" :key="t" class="ctag">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredBooks.length === 0" class="empty">
      <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      <p class="empty-title">No books match your filters</p>
      <p class="empty-hint">Try broadening your search or removing some filters.</p>
      <button class="clear-link-btn" @click="clearAll">Clear all filters</button>
    </div>

    <!-- Universal Filter & Sort Panel -->
    <FilterSheet
      v-model:open="filterSheetOpen"
      :applied-quick="activeQuick"
      :applied-apm="minApm"
      :applied-tags="activeTags"
      :applied-status="activeStatus"
      :applied-sort="sortBy"
      :tags-by-freq="tagsByFreq"
      :quick-filters="quickFilters"
      :search-query="query"
      @apply="handleApply"
      @close="filterSheetOpen = false"
      ref="filterSheetRef"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { books, allTags } from '../config/books.js';
import FilterSheet from '../components/FilterSheet.vue';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Books',
  meta: [
    { name: 'description', content: 'My reading list, book notes, and recommendations. Tracking what I read and what I learn.' },
    { property: 'og:title', content: 'Books | Divy Sharma' },
    { property: 'og:description', content: 'Curated list of books on product, business, and life.' }
  ]
})

// ── State ──
const query = ref('');
const sortBy = ref('apmRating');
const minApm = ref(0);
const activeTags = ref([]);
const activeStatus = ref([]);
const activeQuick = ref(null);
const showAllTags = ref(false);
const isStuck = ref(false);
const filtersExpanded = ref(false);
const filterSheetOpen = ref(false);
const tagsSheetOpen = ref(false);
const filterSheetRef = ref(null);

// ── Mobile detection ──
const isMobile = ref(false);
let mql = null;
function checkMobile(e) { isMobile.value = e.matches; }
const visibleTagCount = 12;

const scoreFields = [
  { key: 'effort', label: 'Effort' },
  { key: 'business', label: 'Business' },
  { key: 'usability', label: 'Usability' },
];

const quickFilters = [
  { key: 'high_leverage', label: 'High leverage', hint: 'Business ≥4, Usability ≥4, Effort ≤3', short: 'Biz≥4 · Use≥4 · Eff≤3', filter: (b) => b.business >= 4 && b.usability >= 4 && b.effort <= 3 },
  { key: 'deep_reads', label: 'Deep reads', hint: 'Effort ≥4, Business ≥4', short: 'Eff≥4 · Biz≥4', filter: (b) => b.effort >= 4 && b.business >= 4 },
  { key: 'interview_prep', label: 'Interview prep', hint: 'Interview-tagged books', short: 'Tag: Interviews', filter: (b) => b.tags.includes('Interviews') },
  { key: 'must_read', label: 'Must read (5★)', hint: 'APM rating = 5', short: 'APM = 5', filter: (b) => b.apmRating === 5 },
];

// ── Status Logic ──
const bookStatuses = reactive({});

function getBookStatus(book) {
  return bookStatuses[book.title] || book.readingStatus || 'backlog';
}

function toggleStatus(book) {
  const current = getBookStatus(book);
  const map = { backlog: 'in_progress', in_progress: 'done', done: 'backlog' };
  const next = map[current];
  bookStatuses[book.title] = next;
  localStorage.setItem(`book_status_${book.title}`, next);
}

function toggleStatusFilter(status) {
  const i = activeStatus.value.indexOf(status);
  if (i >= 0) activeStatus.value.splice(i, 1);
  else activeStatus.value.push(status);
}

const statusCounts = computed(() => {
  const counts = { backlog: 0, in_progress: 0, done: 0 };
  books.forEach(b => {
    const s = getBookStatus(b);
    if (counts[s] !== undefined) counts[s]++;
  });
  return counts;
});

function statusLabel(s) {
  if (s === 'in_progress') return 'In Progress';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function statusClass(s) {
  if (s === 'done') return 'st-done';
  if (s === 'in_progress') return 'st-progress';
  return 'st-backlog';
}

// ── Tag frequency ──
const tagsByFreq = computed(() => {
  const counts = {};
  for (const b of books) {
    for (const t of b.tags) counts[t] = (counts[t] || 0) + 1;
  }
  return allTags
    .map((name) => ({ name, count: counts[name] || 0 }))
    .sort((a, b) => b.count - a.count);
});

const displayedTags = computed(() => {
  return showAllTags.value ? tagsByFreq.value : tagsByFreq.value.slice(0, visibleTagCount);
});

// ── Filters ──
const hasActiveFilters = computed(() => {
  return query.value.trim() || minApm.value || activeQuick.value || activeTags.value.length;
});

const activeFilterCount = computed(() => {
  let count = 0;
  if (query.value.trim()) count++;
  if (activeQuick.value) count++;
  if (minApm.value) count++;
  if (activeStatus.value.length) count++;
  count += activeTags.value.length;
  return count;
});

// Mobile badge: count filter CATEGORIES, not individual items
const mobileFilterCategoryCount = computed(() => {
  let count = 0;
  if (activeQuick.value) count++;
  if (minApm.value) count++;
  if (activeTags.value.length) count++; // tags = 1 category
  return count;
});

function toggleTag(tag) {
  const i = activeTags.value.indexOf(tag);
  if (i >= 0) activeTags.value.splice(i, 1);
  else activeTags.value.push(tag);
}

function toggleQuick(key) {
  activeQuick.value = activeQuick.value === key ? null : key;
}

function clearAll() {
  query.value = '';
  sortBy.value = 'apmRating';
  minApm.value = 0;
  activeStatus.value = [];
  activeTags.value = [];
  activeQuick.value = null;
}

const filteredBooks = computed(() => {
  let list = [...books];

  // Search
  if (query.value.trim()) {
    const q = query.value.toLowerCase();
    list = list.filter((b) =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.topics.some((t) => t.toLowerCase().includes(q)) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Quick filter
  if (activeQuick.value) {
    const qf = quickFilters.find((x) => x.key === activeQuick.value);
    if (qf) list = list.filter(qf.filter);
  }

  // Min APM
  if (minApm.value) list = list.filter((b) => b.apmRating >= minApm.value);

  // Tags (OR)
  if (activeTags.value.length) {
    list = list.filter((b) => activeTags.value.some((t) => b.tags.includes(t)));
  }

  // Status filter
  if (activeStatus.value.length) {
    list = list.filter(b => activeStatus.value.includes(getBookStatus(b)));
  }

  // Sort
  const k = sortBy.value;
  if (k === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
  else if (k === 'status') {
    const order = { backlog: 1, in_progress: 2, done: 3 };
    list.sort((a, b) => order[getBookStatus(a)] - order[getBookStatus(b)]);
  }
  else if (k === 'effort-asc') list.sort((a, b) => a.effort - b.effort);
  else if (k === 'effort-desc') list.sort((a, b) => b.effort - a.effort);
  else list.sort((a, b) => b[k] - a[k]);

  return list;
});

// ── Segmented control keyboard nav ──
function handleSegKeydown(e) {
  const segments = Array.from(e.currentTarget.querySelectorAll('[role="radio"]'));
  const currentIdx = segments.indexOf(e.target);
  if (currentIdx < 0) return;

  let nextIdx = currentIdx;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    nextIdx = (currentIdx + 1) % segments.length;
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    nextIdx = (currentIdx - 1 + segments.length) % segments.length;
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    const n = currentIdx + 1;
    minApm.value = minApm.value === n ? 0 : n;
    return;
  } else {
    return;
  }

  segments[nextIdx].focus();
  const n = nextIdx + 1;
  minApm.value = n;
}

// ── Sticky detection ──
function handleScroll() {
  const wasStuck = isStuck.value;
  isStuck.value = window.scrollY > 220;
  // Auto-collapse filters when transitioning to stuck
  if (!wasStuck && isStuck.value) {
    filtersExpanded.value = false;
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  mql = window.matchMedia('(max-width: 800px)');
  isMobile.value = mql.matches;
  mql.addEventListener('change', checkMobile);

  // Load persistence
  books.forEach(b => {
    const s = localStorage.getItem(`book_status_${b.title}`);
    if (s) bookStatuses[b.title] = s;
  });
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  mql?.removeEventListener('change', checkMobile);
});

// ── Unified apply handler ──
function handleApply({ quick, apm, tags, status, sort }) {
  activeQuick.value = quick;
  minApm.value = apm;
  activeTags.value = tags;
  activeStatus.value = status;
  if (sort) sortBy.value = sort;
}

// ── Helpers ──
function initials(title) {
  const w = title.replace(/[^\w\s]/g, '').split(' ').filter(Boolean);
  return ((w[0]?.[0] ?? 'B') + (w[1]?.[0] ?? '')).toUpperCase();
}
function apmClass(r) {
  if (r >= 5) return 'a5';
  if (r >= 4) return 'a4';
  if (r >= 3) return 'a3';
  return 'a2';
}
</script>

<style scoped>
/* ═══ Page ═══ */
.books-page {
  max-width: 1000px; /* Reduced max-width for single column focus */
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.page-header { text-align: center; margin-bottom: 2rem; }

.page-title {
  font-size: var(--h1);
  font-weight: 400;
  color: var(--heading-color);
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-family: var(--font-sans);
  margin: 0 0 0.5rem;
}

.page-subtitle {
  color: #666;
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
}

/* ═══ Focus-Visible Global ═══ */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #111;
  outline-offset: 2px;
}

/* ═══ Sticky Filter Bar ═══ */
.filter-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  /* Normal state: transparent, lives in the page flow */
  background: transparent;
  border-bottom: 1px solid transparent;
  padding: 1rem 0;
  margin: 0 -0.5rem 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, padding 0.25s ease;
}

/* Stuck state: subtle grounding */
.filter-bar.stuck {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: rgba(0, 0, 0, 0.06);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

/* ═══ Unified Bar ═══ */
.unified-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.row-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* ─ Search Box ─ */
.search-box {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  transition: color 0.15s ease;
}

.search-box:focus-within .search-icon {
  color: #111;
}

.search-input {
  width: 100%;
  padding: 0 2.5rem 0 2.5rem;
  height: 52px; /* Taller touch target */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  color: #111;
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.search-input:focus {
  border-color: #111;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.search-clear:hover {
  background: #f3f4f6;
  color: #111;
}

/* ─ Controls Right ─ */
.controls-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.filter-trigger-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.25rem;
  height: 52px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  color: #111;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  min-width: 52px;
}

.filter-trigger-btn:hover {
  border-color: #111;
  background: #f9fafb;
}

.filter-trigger-btn:active {
  transform: scale(0.98);
}

.filter-trigger-btn.has-active {
  background: #111;
  color: #fff;
  border-color: #111;
}

.btn-icon {
  flex-shrink: 0;
}

.desktop-only-text {
  display: none; /* Hidden by default (mobile) */
}

.filter-badge {
  background: #111;
  color: #fff;
  font-size: 0.7rem;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  margin-left: 0.2rem;
}

.filter-trigger-btn.has-active .filter-badge {
  background: #fff;
  color: #111;
}

.count {
  font-size: 0.9rem;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  display: none; /* Hide for cleanliness on mobile, shown on desktop */
}

/* ─ Quick Filters Scroll ─ */
.quick-scroll {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.quick-scroll::-webkit-scrollbar { display: none; }

.quick-chip {
  flex-shrink: 0;
  padding: 0 1rem;
  height: 38px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 100px;
  background: #fff;
  font-size: 0.85rem;
  color: #4b5563;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.quick-chip:hover {
  border-color: #9ca3af;
  color: #111;
}

.quick-chip.active {
  background: #111;
  color: #fff;
  border-color: #111;
}

/* ─ Active Chips Scroll ─ */
.active-chips-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.2rem 0 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  align-items: center;
}
.active-chips-scroll::-webkit-scrollbar { display: none; }

.active-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 0.8rem;
  color: #374151;
  height: 32px;
}

.pill-x {
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: all 0.15s ease;
}

.pill-x:hover {
  background: #d1d5db;
  color: #111;
}


/* ═══ Desktop / Tablet Overrides ═══ */
@media (min-width: 601px) {
  .count { display: inline; }
  .desktop-only-text { display: inline; margin-right: 0.2rem; }
  .filter-trigger-btn { padding: 0 1.25rem; width: auto; }
}

/* ═══ Card Grid (Redesigned) ═══ */
.grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Cover / Avatar Area */
.card-cover-area {
  flex-shrink: 0;
  width: 120px;
}

.book-cover-large {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: #f3f4f6;
  display: block;
}

.avatar-large {
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 8px;
  background: #f3f4f6;
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #9ca3af;
}

/* Content Area */
.card-content-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* Header Row */
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.card-title-large {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin: 0;
  line-height: 1.3;
}

.apm-large {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}
.apm-large .star-icon { font-size: 0.85em; }

/* Re-use apm colors */
.a5 { background: #ecfdf5; color: #059669; border: 1px solid rgba(5,150,105,0.15); }
.a4 { background: #eff6ff; color: #2563eb; border: 1px solid rgba(37,99,235,0.1); }
.a3 { background: #fffbeb; color: #d97706; border: 1px solid rgba(217,119,6,0.1); }
.a2 { background: #f9fafb; color: #aaa; border: 1px solid rgba(0,0,0,0.04); }

.card-summary-large {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.topic {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  font-size: 0.75rem;
  color: #666;
}

/* Meta Footer (Scores + Tags) */
.meta-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
}

.scores {
  display: flex;
  gap: 1.25rem;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.score-lbl {
  font-size: 0.75rem;
  color: #999;
  font-weight: 600;
}

.dots { display: flex; gap: 3px; }

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #e5e5e5;
}

.dot.on { background: #333; }

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.ctag {
  font-size: 0.7rem;
  color: #9ca3af;
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

/* Mobile Responsive */
@media (max-width: 650px) {
  .card {
    flex-direction: column;
    align-items: center; /* Center cover on mobile? or left aligned? let's keep left but column */
    align-items: stretch;
    gap: 1rem;
  }

  .card-cover-area {
    width: 100px; /* Smaller cover on mobile */
    margin-bottom: 0.5rem;
  }
  
  .card-header-row {
     flex-direction: column;
     gap: 0.25rem;
  }
  
  .apm-large {
    align-self: flex-start;
  }

  .meta-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .scores {
    gap: 1rem;
    flex-wrap: wrap;
  }
}
/* ═══ Empty ═══ */
.empty {
  text-align: center;
  padding: 4rem 1rem;
  color: #999;
  animation: emptyFadeIn 0.3s ease-out;
}

@keyframes emptyFadeIn {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.empty-icon {
  color: #d0d0d0;
  margin-bottom: 0.75rem;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  margin: 0 0 0.25rem;
}

.empty-hint {
  font-size: 0.82rem;
  color: #aaa;
  margin: 0 0 1rem;
}

.clear-link-btn {
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #111;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8rem;
  padding: 0.45rem 1rem;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.clear-link-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

/* ═══ Status Summary ═══ */
.status-summary {
  display: flex;
  gap: 0.5rem;
  padding-bottom: 0.2rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff; /* Fallback */
  border: 1px solid transparent; /* Replaces #e5e7eb to allow color overrides */
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.82rem;
  color: #555;
  cursor: pointer;
  transition: all 0.15s ease;
}

.summary-item:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}

.summary-item.active {
  box-shadow: 0 0 0 1px #fff, 0 0 0 3px #111;
  z-index: 1; /* Ensure shadow is visible */
}

.s-label { font-weight: 600; }
.s-count { 
  background: rgba(0,0,0,0.06); 
  color: inherit;
  opacity: 0.8;
  font-size: 0.7rem; 
  padding: 0.1rem 0.4rem; 
  border-radius: 4px; 
  font-weight: 600;
}

/* ═══ Header Badges ═══ */
.header-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  font-size: 0.75rem; /* Aligned with .apm-large */
  font-weight: 600;
  /* text-transform: uppercase; Removed for consistency */
  /* letter-spacing: 0.03em; */
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.status-badge:hover { filter: brightness(0.95); transform: translateY(-1px); }
.status-badge:active { transform: translateY(0); }

.st-backlog { background: #f3f4f6; color: #6b7280; border-color: #e5e7eb; }
.st-progress { background: #eff6ff; color: #2563eb; border-color: #dbeafe; }
.st-done { background: #ecfdf5; color: #059669; border-color: #d1fae5; }

</style>
