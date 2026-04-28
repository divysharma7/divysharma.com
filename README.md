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

## License + Author

Built by Divy Sharma. No license specified.
