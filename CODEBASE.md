# divysharma.com — Codebase Walkthrough

---

## 1. Project Overview

A **personal portfolio and content site** for Divy Sharma (Growth PM at ASBL). Projects, blog essays, reading list, resume, an AI chatbot, and a Spotify widget.

| Layer | Choice |
|-------|--------|
| Framework | **Vue 3.3.4** |
| API style | **Mixed** — Composition API (`<script setup>`) in newer components, Options API in older ones (Home, Journey, project detail) |
| State management | **None** — no Pinia, no Vuex. All state is local to components or static JS exports |
| Router | **Vue Router 4** with lazy-loaded routes and hash-based smooth scroll |
| TypeScript | **No** — plain JS with `jsconfig.json` path aliases |
| Build tool | **Vite 6.4** with manual chunk splitting (vue, icons, vendor) |
| Styling | **Scoped SCSS** + **Tailwind CSS 4** + **CSS custom properties** (`tokens.css`) |
| Backend | **Vercel Edge/Serverless Functions** — chat (Mistral AI + Upstash RAG), contact (SendGrid), Spotify, health |
| Analytics | **PostHog** (primary) + **GA4** (idle-loaded) |
| Icons | **lucide-vue-next** + **unplugin-icons** |

---

## 2. Folder-by-folder Walkthrough

```
src/
├── assets/
│   ├── css/
│   │   ├── normal.css      # Reset/normalize (158 lines)
│   │   ├── tokens.css      # Design tokens — colors, spacing, fonts, shadows (144 lines)
│   │   ├── global.css      # Global utilities, containers, keyframes (203 lines)
│   │   └── tailwind.css    # @tailwind directives (52 lines)
│   └── img/                # SVGs — ham.svg, close.svg, spotify.svg, brand icons
├── components/             # 56 .vue files (see section 4)
├── composables/
│   ├── useCountUp.js       # Animate numbers on scroll-into-view (IntersectionObserver + RAF)
│   ├── useScrollDepth.js   # Fire PostHog event at 25/50/75/100% scroll milestones
│   └── useTimeSpent.js     # Fire PostHog event with seconds on unmount (ignores <2s)
├── config/
│   ├── books.js            # 40 books with ratings, tags, readingStatus (backlog/in_progress/done)
│   ├── cta.js              # Cal.com booking config (link, avatar, text)
│   ├── gears.js            # Devices, software, books for /gears page
│   └── quotes.js           # 20 motivational quotes
├── data/
│   ├── achievements.js     # 13 achievements with metrics, links, assets
│   ├── experience.js       # 3 featured + 8 total work experiences
│   ├── featured-reads.js   # 3 recommended books (used by gears page)
│   ├── journey.js          # 3 nav items for /journey sub-routes
│   ├── kb.js               # 100 Q&A pairs for the chatbot (8 categories)
│   ├── mentors.js          # 6 mentors with roles and links
│   ├── posts.js            # 6 blog essays as markdown strings
│   ├── profile.js          # Name, role, tagline, socials, skills
│   ├── projects.js         # 4 case studies with section-based content system
│   └── smlproj.js          # Small project cards (3 items, Cloudinary images)
├── hooks/
│   └── useHapticFeedback.js  # Vibration API wrapper (light/medium/heavy)
├── lib/
│   ├── analytics.js        # GA4 idle-loader (requestIdleCallback, env-driven measurement ID)
│   └── utils.js            # cn() — clsx + tailwind-merge
└── views/                  # 16 page-level components (see section 3)
```

**Root-level directories:**

```
api/                    # 8 Vercel serverless/edge functions
public/                 # Static assets — images (WebP), fonts, resume.pdf, sitemap, robots.txt
```

---

## 3. Routing Map

| Path | Component | What it does |
|------|-----------|-------------|
| `/` | `Home.vue` | Hero, featured experience, project highlights, blog preview |
| `/projects` | `Projects.vue` | Grid of all project cards |
| `/p/:id` | `projects/project.vue` | Dynamic case study page with section renderer |
| `/blog` | `Blog.vue` | Blog post list with search |
| `/blog/:slug` | `BlogDetail.vue` | Single post with markdown rendering, social share sidebar |
| `/workexperience` | `workexperience.vue` | Work experience timeline |
| `/books` | `Books.vue` | Reading list with tag filters and rating display |
| `/explore` | `Explore.vue` | Quick links — design portfolio, achievements, resume, events, support |
| `/resume` | `Resume.vue` | PDF viewer (pdfjs-dist, async loaded) |
| `/gears` | `Gears.vue` | Devices, software, books setup page |
| `/journey` | `Journey.vue` | Interactive timeline with draggable stickers |
| `/journey/certificates` | `Certificates.vue` | Achievements/certificates grid |
| `/journey/mentors` | `Mentors.vue` | Mentor cards |
| `/projects/:proj` | redirect to `/p/:proj` | Legacy redirect |
| `/project/:proj` | redirect to `/p/:proj` | Legacy redirect |
| `/p` | redirect to `/projects` | Bare path redirect |
| `/*` | `NotFound.vue` | 404 page |

All routes except `/` are **lazy-loaded** via dynamic `import()`.

---

## 4. Component Inventory

### Page-level (views) — 16 files

`Home.vue`, `Projects.vue`, `Blog.vue`, `BlogDetail.vue`, `Books.vue`, `Explore.vue`, `Resume.vue`, `Gears.vue`, `Journey.vue`, `Certificates.vue`, `Mentors.vue`, `NotFound.vue`, `projects/project.vue`, `projects/linkplus.vue`, `projects/notion.vue`, `workexperience.vue`

### Layout — 3 files

- `App.vue` — shell (navbar, grid background, footer, chat, oneko)
- `footer.vue` — site footer with socials, Spotify widget
- `NavBar.vue` — secondary nav component (not currently active in App.vue — App has its own inline nav)

### Section renderers (project case studies) — 11 files

`SectionText`, `SectionStats`, `SectionProcess`, `SectionGallery`, `SectionImageText`, `SectionVideo`, `SectionTeam`, `SectionAwards`, `SectionFullImage`, `SectionCallout`, `SectionFeatureGrid`

These are mapped in `project.vue` via `componentMap` and rendered dynamically:

```vue
<component :is="sectionComponent(section.type)" :data="section" />
```

### Aqua-Alert specific — 8 files

`WaterLossStats`, `SurveyResults`, `EmpathyMap`, `SystemArchitecture`, `AppScreens`, `BuildBTS`, `SdgStrip`, `AwardsGrid`

### Reusable UI — 8 files

`ui/Badge.vue`, `ui/Separator.vue`, `common/Container.vue`, `common/SectionHeading.vue`, `common/SkillBadge.vue`, `PageHero.vue`, `FilterSheet.vue`, `FilterTagsSheet.vue`

### Feature-specific — 12 files

`Hero.vue`, `CTA.vue`, `ChatWidget.vue`, `Oneko.vue`, `Quote.vue`, `ContactForm.vue`, `ResumeViewer.vue`, `SocialShareSidebar.vue`, `SpotifyWidget.vue`, `spotify.vue`, `project.vue` (card), `ProjectCard.vue`

### Experience/Achievement — 5 files

`ExperienceCard.vue`, `DetailedExperienceCard.vue`, `AchievementCard.vue`, `AchievementSection.vue`, `MentorCard.vue`

### Potentially misplaced

- **`NavBar.vue`** — exists but App.vue has its own inline nav. Either dead code or a planned replacement.
- **`BuildBTS.vue`** — no longer referenced in projects.js data, but the component file and its import in `project.vue` remain.
- **`quotes.ts`** — only TypeScript file in an otherwise pure JS codebase.

---

## 5. State Management

**There is no store.** Every piece of state is either:

| Type | Where | Example |
|------|-------|---------|
| Static data | `src/data/*.js`, `src/config/*.js` | Projects, posts, books, experience — imported directly |
| Local component state | `ref()`, `data()` | Chat messages, form fields, nav toggle, scroll progress |
| URL-derived | `useRoute()` | Current project slug, blog slug |
| Browser APIs | `window.dataLayer`, `posthog` | Analytics singletons |
| Env vars | `import.meta.env.VITE_*` | PostHog token, API host |

No shared reactive state between components. The closest thing is the `projects` array imported by both `Projects.vue` and `project.vue`, but it's a static import, not reactive.

---

## 6. Data Flow

```
Static JS files (src/data/, src/config/)
        |
        v
  Vue components import directly
        |
        v
  Template renders data
```

**No API fetching in the frontend** for content. All projects, posts, experience, books, achievements, and mentors are baked into the JS bundle at build time.

**API calls exist only for:**

1. **Chat** — `ChatWidget.vue` -> `POST /api/chat` -> Mistral AI (streaming) + Upstash Vector (RAG)
2. **Contact** — `ContactForm.vue` -> `POST /api/contact` -> SendGrid
3. **Spotify** — `SpotifyWidget.vue` -> `GET /api/spotify` -> Spotify API (15s cache)
4. **Ingestion** — `POST /api/ingest` -> Upstash Vector (admin-only, bearer token)

**Composables** (`useCountUp`, `useScrollDepth`, `useTimeSpent`) are pure behavior — they don't fetch data, they add scroll/animation/tracking logic to components.

---

## 7. Things That Look Off (audit log)

| # | Issue | Status | Resolution |
|---|-------|--------|------------|
| 1 | **Mixed API styles** — Options API hybrid in older components | Plan created | See `MIGRATION-COMPOSITION-API.md` |
| 2 | **NavBar.vue dead code** | Fixed | Deleted |
| 3 | **BuildBTS.vue dead import** | Fixed | Import and componentMap entry removed; file kept |
| 4 | **`quotes.ts` only TS file** | Fixed | Converted to `quotes.js` |
| 5 | **Two book data files** | Fixed | `data/books.js` renamed to `data/featured-reads.js` |
| 6 | **Empty `src/analytics/` dir** | Fixed | Deleted |
| 7 | **Two project card components** | Fixed | Deleted unused `ProjectCard.vue`; `project.vue` (card) kept |
| 8 | **Blog posts as inline markdown** | Plan created | See `MIGRATION-BLOG-MARKDOWN.md` |
| 9 | **Hardcoded GA4 ID** | Fixed | Moved to `VITE_GA4_MEASUREMENT_ID` env var |
| 10 | **`smlproj.js` orphaned** | Fixed | Moved to `src/data/smlproj.js` |
| 11 | **CSP report-only** | Intentional | Skipped — will enforce when ready |
| 12 | **PostHog sync init** | Fixed | Deferred via `requestIdleCallback` (3.5s timeout) |

---

## 8. API Endpoints (Vercel Functions)

| Endpoint | Runtime | Purpose | Rate limit |
|----------|---------|---------|------------|
| `POST /api/chat` | Edge, 30s | AI chatbot (Mistral + Upstash RAG, streaming) | 10/min per IP |
| `POST /api/contact` | Serverless | Contact form email (SendGrid) | 3/10min per IP |
| `GET /api/health` | Edge, 10s | Health check | None |
| `GET /api/spotify` | Edge | Now-playing track (15s cache) | 429 handling |
| `POST /api/ingest` | Edge | Vector DB ingestion (bearer auth) | Auth-gated |
| `POST /api/csp-report` | Serverless | CSP violation logger | None |
| `GET /api/top-tracks` | Edge | Spotify top tracks | None |

---

## 9. Analytics Events Map

### PostHog events

| Event | Properties | Source |
|-------|-----------|--------|
| `$pageview` | `$current_url` | main.js (router.afterEach) |
| `project:viewed` | `slug`, `title` | project.vue |
| `project:scroll_depth` | `slug`, `title`, `depth` | project.vue (composable) |
| `project:time_spent` | `slug`, `title`, `seconds` | project.vue (composable) |
| `project:section_viewed` | `slug`, `section_id` | project.vue (scroll spy) |
| `project:toc_click` | `slug`, `section_id` | project.vue |
| `explorer:project_switch` | `from_slug`, `to_slug` | project.vue sidebar |
| `blog:scroll_depth` | `slug`, `title`, `depth` | BlogDetail.vue (composable) |
| `blog:time_spent` | `slug`, `title`, `seconds` | BlogDetail.vue (composable) |
| `blog:share` | `platform`, `slug` | SocialShareSidebar.vue |
| `nav:click` | `to`, `device` | App.vue |
| `nav:mobile_menu_open/close` | — | App.vue |
| `outbound:click` | `platform`, `location` | footer.vue |
| `chat:toggle` | `action` | ChatWidget.vue |
| `chat:message_sent` | `is_suggestion`, `message_length`, `page` | ChatWidget.vue |
| `cta:book_call` | `location` | CTA.vue |
| `cta:booking_close` | — | CTA.vue |
| `cta:instagram_click` | `location` | CTA.vue |
| `resume:viewed` | `location` | Resume.vue |
| `contact:message_sent` | `location` | ContactForm.vue |
| `contact:form_error` | `error_type` | ContactForm.vue |
| `click:project_open` | `project_name`, `link_type` | project.vue (card) |
| `click:explore_card` | `card`, `destination` | Explore.vue |

### GA4 events (via dataLayer)

All `page_view` events on route change, plus mirrored custom events from the GTM dataLayer pushes above.

---

## 10. Environment Variables

```
# PostHog
VITE_POSTHOG_PROJECT_TOKEN     # Project API key
VITE_POSTHOG_HOST              # API host (default: eu.i.posthog.com)

# AI Chat
MISTRAL_API_KEY                # Mistral API key
UPSTASH_VECTOR_REST_URL        # Vector DB URL
UPSTASH_VECTOR_REST_TOKEN      # Vector DB token
INGEST_API_KEY                 # Bearer token for /api/ingest

# Email
SENDGRID_API_KEY               # SendGrid API key
CONTACT_EMAIL                  # Recipient for contact form

# Spotify
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
ENABLE_SPOTIFY                 # true/false

# Auto-set
VERCEL                         # Set by Vercel at build time
```
