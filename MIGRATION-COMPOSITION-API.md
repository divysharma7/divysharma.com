# Migration Plan: Options API to Composition API (`<script setup>`)

## Files Using Options API

| # | File | Options API features used | Effort |
|---|------|--------------------------|--------|
| 1 | `src/components/page.vue` | props only (no data/methods/computed) | **Small** |
| 2 | `src/components/blog/BlogList.vue` | props only, component registration | **Small** |
| 3 | `src/components/small.vue` | data (mirrors props) | **Small** |
| 4 | `src/views/NotFound.vue` | methods (gtmPush) | **Small** |
| 5 | `src/components/project.vue` | props, data (mirrors props), methods (gtmPush) | **Small** |
| 6 | `src/components/blog/PostCover.vue` | props, computed (palette logic) | **Small** |
| 7 | `src/components/blog/BlogCard.vue` | props, computed, methods (formatDate, tag click) | **Small** |
| 8 | `src/components/spotify.vue` | data, mounted, unmounted, methods (axios polling) | **Small** |
| 9 | `src/components/top.vue` | data, mounted, methods (axios fetch) | **Small** |
| 10 | `src/components/contact.vue` | data, methods (form submit with axios) | **Small** |
| 11 | `src/App.vue` | data, watch, components (hybrid: has separate `<script setup>` block) | **Small** |
| 12 | `src/views/Projects.vue` | data, components (hybrid: has separate `<script setup>` block) | **Small** |
| 13 | `src/views/Mentors.vue` | data, computed (filter/visible logic) (hybrid: has separate `<script setup>` block) | **Medium** |
| 14 | `src/views/Blog.vue` | data, computed, methods, mounted, watch (hybrid: has separate `<script setup>` block) | **Medium** |
| 15 | `src/views/BlogDetail.vue` | setup(), data, computed, methods, mounted, beforeUnmount, watch (hybrid) | **Large** |
| 16 | `src/views/projects/project.vue` | setup(), data, computed, methods, mounted, beforeUnmount, watch (hybrid) | **Large** |
| 17 | `src/views/Journey.vue` | data (complex drag state), methods (500+ lines: drag/drop, persistence, observers), created, mounted, beforeUnmount | **Large** |

---

## Hybrid Pattern Files (Options API with `setup()` or separate `<script setup>`)

These files mix both APIs in the same component:

- `src/App.vue` — Options API `export default` block + separate `<script setup>` for useHead
- `src/views/Projects.vue` — Options API `export default` + separate `<script setup>` for useHead
- `src/views/Blog.vue` — Options API `export default` + separate `<script setup>` for useHead
- `src/views/Mentors.vue` — Options API `export default` + separate `<script setup>` for useHead
- `src/views/BlogDetail.vue` — Inline `setup()` function inside Options API (useHead, composables)
- `src/views/projects/project.vue` — Inline `setup()` function inside Options API (useHead, composables)

---

## Proposed Conversion Order (easiest first)

### Phase 1 — Trivial (props-only or minimal data)
1. `src/components/page.vue`
2. `src/components/blog/BlogList.vue`
3. `src/components/small.vue`
4. `src/views/NotFound.vue`
5. `src/components/project.vue`

### Phase 2 — Small (computed, simple methods)
6. `src/components/blog/PostCover.vue`
7. `src/components/blog/BlogCard.vue`
8. `src/components/spotify.vue`
9. `src/components/top.vue`
10. `src/components/contact.vue`

### Phase 3 — Small hybrids (merge two script blocks into one `<script setup>`)
11. `src/App.vue`
12. `src/views/Projects.vue`

### Phase 4 — Medium (computed + watchers + lifecycle)
13. `src/views/Mentors.vue`
14. `src/views/Blog.vue`

### Phase 5 — Large (complex state, many methods, inline setup to merge)
15. `src/views/BlogDetail.vue`
16. `src/views/projects/project.vue`
17. `src/views/Journey.vue` (most complex — 500+ lines of drag-and-drop logic)

---

## Notes

- All files already use Vue 3, so no Vue 2 compatibility layer is involved.
- Composables (`useScrollDepth`, `useTimeSpent`) are already imported in the hybrid files; they will work identically in `<script setup>`.
- PostHog and GTM push helpers are repeated across many files; extract a shared `useAnalytics()` composable during migration to reduce duplication.
- The `this.$route` / `this.$router` pattern converts to `useRoute()` / `useRouter()` from vue-router.
- Template refs (`this.$refs.stage`) convert to `const stage = ref(null)` with `ref="stage"` in template.
- `this.$el` usage (BlogDetail, project.vue) needs a root template ref instead.
