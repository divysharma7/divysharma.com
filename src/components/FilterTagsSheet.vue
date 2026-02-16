<template>
  <Teleport to="body">
    <Transition name="tags-sheet">
      <div v-if="open" class="tags-backdrop" role="dialog" aria-modal="true" aria-label="Select tags">
        <div class="tags-fullscreen">
          <!-- Header -->
          <div class="tags-header">
            <button class="tags-back" @click="$emit('close')" aria-label="Back to filters">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h2 class="tags-title">All Tags</h2>
            <span class="tags-count">{{ selectedTags.length }} selected</span>
          </div>

          <!-- Search -->
          <div class="tags-search-wrap">
            <svg class="tags-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              v-model="tagSearch"
              type="text"
              placeholder="Search tags…"
              class="tags-search-input"
              aria-label="Search tags"
            />
          </div>

          <!-- Tag list -->
          <div class="tags-list">
            <button
              v-for="tag in filteredTags"
              :key="tag.name"
              class="tag-row"
              :class="{ selected: selectedTags.includes(tag.name) }"
              @click="toggleTag(tag.name)"
            >
              <span class="tag-check">
                <svg v-if="selectedTags.includes(tag.name)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span class="tag-name">{{ tag.name }}</span>
              <span class="tag-freq">{{ tag.count }}</span>
            </button>

            <div v-if="filteredTags.length === 0" class="tags-empty">
              No tags match "{{ tagSearch }}"
            </div>
          </div>

          <!-- Footer -->
          <div class="tags-footer">
            <button class="tags-done-btn" @click="$emit('close')">
              Done ({{ selectedTags.length }})
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  open: Boolean,
  tagsByFreq: { type: Array, default: () => [] },
  selectedTags: { type: Array, default: () => [] },
});

const emit = defineEmits(['close', 'toggleTag']);

const tagSearch = ref('');

const filteredTags = computed(() => {
  if (!tagSearch.value.trim()) {
    // Alphabetical when not searching
    return [...props.tagsByFreq].sort((a, b) => a.name.localeCompare(b.name));
  }
  const q = tagSearch.value.toLowerCase();
  return props.tagsByFreq
    .filter(t => t.name.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name));
});

function toggleTag(name) {
  emit('toggleTag', name);
}
</script>

<style scoped>
.tags-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: #fff;
}

.tags-fullscreen {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}

/* ── Header ── */
.tags-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}
.tags-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #333;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.tags-back:active { background: #f5f5f5; }
.tags-title {
  flex: 1;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 650;
  color: #111;
  font-family: var(--fontDisplay, serif);
}
.tags-count {
  font-size: 0.75rem;
  color: #999;
  white-space: nowrap;
}

/* ── Search ── */
.tags-search-wrap {
  position: relative;
  padding: 0.6rem 1rem;
}
.tags-search-icon {
  position: absolute;
  left: 1.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b0b0;
  pointer-events: none;
}
.tags-search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.2rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.85rem;
  font-family: inherit;
  color: #333;
  background: #fafafa;
  outline: none;
  transition: border-color 0.15s ease;
}
.tags-search-input:focus {
  border-color: #111;
  background: #fff;
}

/* ── Tag list ── */
.tags-list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 0.25rem 0;
}

.tag-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.7rem 1.25rem;
  min-height: 48px;
  border: none;
  background: transparent;
  font-size: 0.88rem;
  font-family: inherit;
  color: #444;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s ease;
  text-align: left;
}
.tag-row:active { background: #f8f8f8; }
.tag-row.selected {
  color: #111;
  font-weight: 550;
}

.tag-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1.5px solid #d0d0d0;
  background: #fff;
  flex-shrink: 0;
  transition: all 0.15s ease;
}
.tag-row.selected .tag-check {
  background: #111;
  border-color: #111;
  color: #fff;
}

.tag-name { flex: 1; }
.tag-freq {
  font-size: 0.72rem;
  color: #bbb;
}
.tag-row.selected .tag-freq { color: #888; }

.tags-empty {
  padding: 2rem 1.25rem;
  text-align: center;
  color: #aaa;
  font-size: 0.85rem;
}

/* ── Footer ── */
.tags-footer {
  padding: 0.75rem 1rem;
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid #f0f0f0;
}
.tags-done-btn {
  width: 100%;
  padding: 0.7rem;
  min-height: 48px;
  border-radius: 14px;
  background: #111;
  color: #fff;
  border: none;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s ease;
}
.tags-done-btn:active { background: #333; }

/* ═══ Transitions ═══ */
.tags-sheet-enter-active { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.tags-sheet-leave-active { transition: transform 0.25s cubic-bezier(0.32, 0.72, 0, 1); }
.tags-sheet-enter-from { transform: translateX(100%); }
.tags-sheet-leave-to { transform: translateX(100%); }
</style>
