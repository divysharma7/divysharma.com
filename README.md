# divysharma.com

Personal portfolio, case studies, and blog -- built with Vue 3, Vite, and Vercel Edge Functions.

**Live:** [https://divysharma.com](https://divysharma.com)

![Vue 3](https://img.shields.io/badge/Vue_3-3.3.4-4FC08D?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)
![PostHog](https://img.shields.io/badge/PostHog-analytics-F54E00?logo=posthog&logoColor=white)

---

## What this is

Portfolio site for Divy Sharma (Growth PM). Features project case studies with a dynamic section renderer, blog essays with markdown rendering, a reading list, an AI chatbot powered by Mistral + Upstash RAG, and a live Spotify now-playing widget. All content is statically baked into the JS bundle at build time -- no CMS, no database for frontend content.

---

## Tech stack

| Category | Technology | Version |
|----------|-----------|---------|
| Frontend | Vue 3 + Vue Router 4 | `3.3.4` / `4.2.4` |
| Build | Vite | `6.4.2` |
| Styling | Tailwind CSS + scoped SCSS | `4.1.18` |
| Icons | lucide-vue-next + unplugin-icons | `0.525.0` / `22.1.0` |
| AI / Chat | Mistral AI (`@ai-sdk/mistral`) + Vercel AI SDK | `3.0.21` / `6.0.86` |
| Vector DB | Upstash Vector (RAG retrieval) | `1.2.2` |
| Email | SendGrid (`@sendgrid/mail`) | `8.1.5` |
| Analytics | PostHog (primary) + GA4 (idle-loaded) | `1.372.3` |
| PDF | pdfjs-dist | `5.7.284` |
| Deployment | Vercel (Edge + Serverless Functions) | -- |

---

## Project structure

```
src/
├── main.js                     # App entry, router setup, PostHog init
├── routes.js                   # Route definitions (lazy-loaded)
├── App.vue                     # Shell — navbar, grid bg, footer, chat, oneko
├── assets/
│   ├── css/                    # normal.css, tokens.css, global.css, tailwind.css
│   ├── img/                    # SVGs (ham, close, spotify)
│   └── brands/                 # Brand SVGs (figma, jira, posthog, etc.)
├── components/
│   ├── achievements/           # AchievementCard, AchievementSection, MentorCard
│   ├── aqua-alert/             # Project-specific: WaterLossStats, EmpathyMap, etc.
│   ├── blog/                   # BlogCard, BlogList, PostCover
│   ├── common/                 # Container, SectionHeading, SkillBadge
│   ├── experience/             # ExperienceCard, DetailedExperienceCard
│   ├── landing/                # JourneySection, SetupSection
│   ├── sections/               # Dynamic section renderers (Text, Stats, Gallery, etc.)
│   ├── ui/                     # Badge, Separator
│   ├── ChatWidget.vue          # AI chatbot (streaming, Mistral)
│   ├── SpotifyWidget.vue       # Now-playing widget
│   ├── Hero.vue                # Landing hero
│   ├── CTA.vue                 # Call-to-action (Cal.com booking)
│   ├── ContactForm.vue         # Contact form (SendGrid)
│   ├── ResumeViewer.vue        # PDF viewer
│   ├── SocialShareSidebar.vue  # Blog share sidebar
│   └── ...                     # footer, Quote, Oneko, project card, etc.
├── composables/
│   ├── useCountUp.js           # Animate numbers on scroll
│   ├── useScrollDepth.js       # PostHog scroll-depth events
│   └── useTimeSpent.js         # PostHog time-on-page events
├── config/
│   ├── books.js                # Reading list (40 books)
│   ├── cta.js                  # CTA config
│   ├── gears.js                # Devices, software, books for /gears
│   └── quotes.js               # Motivational quotes
├── data/
│   ├── projects.js             # Case study content (section-based)
│   ├── posts.js                # Blog essays (inline markdown)
│   ├── experience.js           # Work experience entries
│   ├── achievements.js         # Achievements with metrics
│   ├── profile.js              # Name, role, socials, skills
│   ├── smlproj.js              # Small project cards
│   ├── kb.js                   # Chatbot knowledge base (100 Q&A pairs)
│   ├── featured-reads.js       # Recommended books
│   ├── journey.js              # Journey nav items
│   └── mentors.js              # Mentor cards
├── hooks/
│   └── useHapticFeedback.js    # Vibration API wrapper
├── lib/
│   ├── analytics.js            # GA4 idle-loader
│   └── utils.js                # cn() — clsx + tailwind-merge
└── views/
    ├── Home.vue                # Landing page
    ├── Projects.vue            # Project grid
    ├── Blog.vue                # Blog list
    ├── BlogDetail.vue          # Single post (markdown)
    ├── Books.vue               # Reading list
    ├── Explore.vue             # Quick links page
    ├── Resume.vue              # PDF viewer page
    ├── Gears.vue               # Setup/gear page
    ├── Journey.vue             # Interactive timeline
    ├── Certificates.vue        # Achievements grid
    ├── Mentors.vue             # Mentor cards
    ├── ProjectDetail.vue       # Project detail (alternate)
    ├── NotFound.vue            # 404
    └── projects/
        ├── project.vue         # Dynamic case study renderer
        ├── linkplus.vue        # LinkPlus project page
        └── notion.vue          # Notion project page
```

---

## Local development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start dev server (opens browser)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The dev server starts at `http://localhost:5173` with hot module replacement. The `@` alias resolves to `./src`.

---

## Environment variables

Copy `.env.example` to `.env` and fill in your values.

### Spotify

| Variable | Description |
|----------|-------------|
| `SPOTIFY_CLIENT_ID` | Spotify OAuth app client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify OAuth app client secret |
| `SPOTIFY_REFRESH_TOKEN` | Long-lived refresh token from OAuth flow |
| `SPOTIFY_REDIRECT_URI` | Redirect URI for auth helper script (default: `http://127.0.0.1:3000`) |
| `ENABLE_SPOTIFY` | Set to `true` to enable now-playing and top-tracks endpoints |

### Google Analytics 4

| Variable | Description |
|----------|-------------|
| `VITE_GA4_MEASUREMENT_ID` | GA4 measurement ID (e.g. `G-XXXXXXXXXX`). If empty, analytics loading is skipped. |

### PostHog

| Variable | Description |
|----------|-------------|
| `VITE_POSTHOG_PROJECT_TOKEN` | PostHog project API key |
| `VITE_POSTHOG_HOST` | PostHog API host (default: `eu.i.posthog.com`) |

### AI Chat (Mistral)

| Variable | Description |
|----------|-------------|
| `MISTRAL_API_KEY` | Mistral API key for the chatbot |

### Vector DB (Upstash)

| Variable | Description |
|----------|-------------|
| `UPSTASH_VECTOR_REST_URL` | Upstash Vector REST endpoint |
| `UPSTASH_VECTOR_REST_TOKEN` | Upstash Vector REST token |
| `INGEST_API_KEY` | Bearer token protecting the `/api/ingest` endpoint |

### Email (SendGrid)

| Variable | Description |
|----------|-------------|
| `SENDGRID_API_KEY` | SendGrid API key for contact form |
| `CONTACT_EMAIL` | Recipient email for contact form submissions |

---

## Deployment

Auto-deploys to Vercel on every push to `main`. Pull requests get preview deployments with unique URLs. The build runs `vite build` followed by post-build scripts that inline critical CSS and generate a Content Security Policy header. Vercel Edge Functions handle the chat, Spotify, and health endpoints; serverless functions handle contact and CSP reporting.

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server with HMR |
| `build` | `cross-env NODE_ENV=production vite build` | Production build with tree-shaking and chunk splitting |
| `postbuild` | `node scripts/inline-critical-css.js && node scripts/generate-csp.js` | Inline critical CSS into HTML, generate CSP headers |
| `serve` | `vite preview` | Preview production build locally |

---

## Skills

See [skills.md](skills.md) for the playbooks that shaped this project.

---

## v2 Changelog

### 1. Blog System & Content Creation

**Situation:** The portfolio site had a blog section with 8 existing posts, all stored as JavaScript objects in `src/data/posts.js`. There was no documentation on how the blog system worked — meaning if the user switched away from Claude Code to another AI tool (ChatGPT, Gemini, etc.), that tool would have no way to correctly add a blog post without re-discovering the entire architecture.

**Task:** Write a new blog post ("What Makes a Great Product Manager") from raw content provided by the user. Create a comprehensive skill file that any AI model could follow to manage the blog in the future — without needing Claude Code or prior codebase knowledge.

**Action:**
- Explored the full blog architecture: data schema in `posts.js`, markdown parser in `BlogDetail.vue` (regex-based, supports `##`, `###`, `**bold**`, `==highlight==`, `![images]()`, `---`, `- lists`, `> quotes`), routing in `routes.js`, rendering in `Blog.vue` and `Home.vue`, sitemap structure, and hero SVG design system
- Created a hero SVG (`public/blog-heroes/what-makes-a-great-product-manager.svg`) matching the existing design language — `#F4EFE6` background, `#1A1A1A` text, `#E8765A` accent, 1280x720 viewBox, Inter + JetBrains Mono fonts
- Created a content image SVG (`public/images/blog/pm-traits-overview.svg`) — a 3x3 grid of the 9 PM traits
- Rewrote the user's raw content into the site's voice — first-person, short paragraphs, `==highlighted==` key insights, `---` section dividers, proper `##` headings for Table of Contents generation
- Added the post object to the top of the `posts` array with correct schema (slug, title, excerpt, heroImage, heroAlt, content, tags, publishedAt)
- Updated `sitemap-blog.xml` with the new URL entry and updated the blog index `<lastmod>`
- Wrote a 300+ line skill file at `.claude/skills/blog/SKILL.md` covering: architecture overview, step-by-step instructions for add/edit/delete, hero SVG template with exact colors and spacing, full markdown reference (supported and unsupported syntax), content style guide, tag pool, rendering pipeline explanation, file path reference, and 10 common mistakes to avoid

**Result:**
- New blog post live at `/blog/what-makes-a-great-product-manager` — properly renders with TOC, related posts, read time, share buttons, and SEO meta tags
- The `/blog` skill is now registered in Claude Code and usable by any AI model

---

### 2. SEO Audit & Fixes

**Situation:** The portfolio site had strong SEO fundamentals (Person schema JSON-LD, dynamic canonical tags, og:image per blog post, proper robots.txt) but two pages had gaps: the Bucket List page (`/bucket-list`) had no meta tags despite being in the sitemap, and the 404 page was indexable by search engines — meaning Google could index random 404 URLs and dilute the site's crawl budget.

**Task:** Run a full technical SEO audit covering crawlability, indexability, meta tags, structured data, heading structure, and sitemaps — then fix all identified gaps.

**Action:**
- Audited all 15 routes for `useHead` coverage — found 12/14 views had proper meta tags, but `BucketList.vue` and `NotFound.vue` were missing
- Verified sitemap coverage across `sitemap-pages.xml` (16 URLs) and `sitemap-blog.xml` (10 URLs)
- Checked `index.html` for hardcoded meta, JSON-LD, and preloads — found Person schema properly implemented with `jobTitle`, `worksFor`, `sameAs` linking to LinkedIn, Twitter, GitHub
- Added `useHead()` to `BucketList.vue` with title, description, and OpenGraph tags
- Added `useHead()` to `NotFound.vue` with `title: 'Page Not Found'` and `meta robots: noindex`

**Result:**
- All 14 views now have proper SEO meta tags
- 404 page now signals `noindex` to search engines, preventing crawl budget waste
- SEO score improved from 8.2/10 to approximately 9/10

---

### 3. Security Review & Hardening

**Situation:** The site has 7 serverless API routes on Vercel handling sensitive operations: an AI chatbot (Mistral API), a contact form (SendGrid), Spotify integrations (OAuth tokens), a RAG ingestion endpoint (Upstash Vector), and a health check.

**Task:** Perform a full security review across OWASP Top 10 categories then fix all code-level vulnerabilities.

**Action:**
- **C-2 (CRITICAL):** `api/health.js` exposed `process.version` and feature flag state publicly. Removed both fields.
- **H-2 (HIGH):** `api/chat.js` did not restrict the `role` field — attacker could send `role: "system"` to override the LLM system prompt. Added `Set(['user', 'assistant'])` whitelist.
- **H-5 (HIGH):** `api/csp-report.js` logged raw unvalidated bodies with no size limit. Added 8KB guard and whitelist-only field logging.
- **M-3/M-4 (MEDIUM):** Both `api/chat.js` and `api/contact.js` used full `x-forwarded-for` header as rate-limit key. Fixed with `.split(',')[0].trim()`.

**Result:**
- 5 security vulnerabilities fixed across 4 API files
- Health endpoint no longer leaks server internals
- Chat endpoint protected against prompt injection via role spoofing
- CSP report endpoint hardened against log injection
- Rate limiting correctly identifies clients regardless of proxy chain

---

### 4. UI Polish & Performance

**Situation:** The site used `transition: all` in 30+ CSS locations across 15 Vue components — a known anti-pattern that forces the browser to watch and interpolate every CSS property on every frame. Blog images had no visual border, causing white-background images to bleed into the page.

**Task:** Audit the site for UI polish issues and fix the highest-impact ones.

**Action:**
- Added `text-wrap: balance` to `.title` class globally — prevents orphan words on all page titles
- Added subtle image outlines (`rgba(0, 0, 0, 0.06)`) to `.img` class and blog `:deep(.blog-image)`
- Replaced 17 `transition: all` instances with explicit properties across `Home.vue`, `Blog.vue`, `Books.vue`, `BucketList.vue`, `CTA.vue`, `ChatWidget.vue`, and `global.css`

**Result:**
- 17 `transition: all` instances eliminated — cleaner animation, less GPU work
- Blog images have subtle borders preventing background bleed
- Page titles wrap evenly on narrow screens
- Build verified: passes cleanly in 4.33s

---

### 5. Vite Build Optimization

**Situation:** The `vite.config.js` was well-structured but had minor issues: unused CJS import, non-ESM alias, no explicit sourcemap protection, unnecessary TypeScript declaration generation, and no dev server warmup.

**Task:** Review and apply all best-practice improvements.

**Action:**
- Removed unused `path` import, switched alias to ESM-native `new URL()` syntax
- Added `sourcemap: false` explicitly, changed `dts: true` to `false` (JS project)
- Added `server.warmup.clientFiles` for faster dev cold starts

**Result:**
- Build passes cleanly, dev server starts faster, config is fully ESM-idiomatic

---

### Files Changed in v2

| Category | Files |
|----------|-------|
| New content | `posts.js`, `what-makes-a-great-product-manager.svg`, `pm-traits-overview.svg` |
| New skill | `.claude/skills/blog/SKILL.md` |
| SEO | `BucketList.vue`, `NotFound.vue`, `sitemap-blog.xml` |
| Security | `health.js`, `chat.js`, `contact.js`, `csp-report.js` |
| UI polish | `global.css`, `Home.vue`, `Blog.vue`, `BlogDetail.vue`, `Books.vue`, `CTA.vue`, `ChatWidget.vue` |
| Build | `vite.config.js` |

---

## License + Author

Built by Divy Sharma. No license specified.
