# Skills Used to Build This Project

These are the playbooks that shaped this site. Three exist as full skill files in `/skills/`; six are documented patterns that will be formalized as skill files. Each one has a description, when to use it, where it lives, and what it produced in this codebase.

## The Humanizer

**What it does:** Rewrites product and marketing copy so it sounds like a real person talking, not a brand.
**When to use it:** When a case study section reads like a feature list instead of a story; when card copy feels generic or interchangeable; when a CTA sounds corporate rather than conversational.
**Status:** Existing skill file
**Location:** `skills/the-humanizer.md`
**What it produced in this codebase:** Aqua-Alert case study body copy across `src/data/projects.js` (section text that reads as narrative, not bullet points). Instagram card copy in `src/components/CTA.vue` ("Product Management, Unfiltered" headline and the "actual playbook" description). 1:1 Sessions card refinement in the same CTA component ("Bring your roadmap, your resume, your half-baked idea" opening line).

## Marketing Psychology

**What it does:** Applies behavioral psychology frameworks (loss aversion, anchoring, IKEA effect, job-to-be-done) to copy and layout decisions.
**When to use it:** When a value proposition needs to feel urgent rather than optional; when pricing or impact numbers need to land harder; when a card needs to answer "why should I care?" in the first line.
**Status:** Existing skill file
**Location:** `skills/marketing-psychology.md`
**What it produced in this codebase:** 1:1 Sessions card framing in `src/components/CTA.vue` (loss aversion in "no fluff, no scripts" plus IKEA effect in "We'll work through it together"). Aqua-Alert problem-section anchoring in `src/data/projects.js` (the descending number sequence: Rs 16.5 Cr annual loss, Rs 4.92 Cr recoverable, Rs 5,000 sensor cost). Instagram card job-to-be-done framing ("For PMs and aspiring PMs who want the actual playbook" directly states the job the audience is hiring the content to do).

## Speed-Readable Blog

**What it does:** Structures long-form content so a reader can extract the main point from any section in under 10 seconds.
**When to use it:** When writing a case study longer than 800 words; when a blog post has more than three sections; when a README needs to communicate architecture to a new contributor.
**Status:** Existing skill file
**Location:** `skills/speed-readable-blog.md`
**What it produced in this codebase:** Aqua-Alert case study structure in `src/data/projects.js` (inverted pyramid: the Rs 16.5 Cr problem statement leads before any solution detail; every section opens with its conclusion sentence). Blog post structure in `src/data/posts.js` (topic-sentence-first paragraphs across all six essays). README and `CODEBASE.md` structure (folder-by-folder walkthrough with table summaries readers can scan without reading prose).

## Frontend Design

**What it does:** Defines the visual system: component patterns, layout grids, typography scale, color palette, and interaction behavior for a Vue 3 + Tailwind + CSS custom properties stack.
**When to use it:** When creating a new page or section component; when a design needs to work at both 320px and 1440px; when choosing between a custom component and a Tailwind utility class.
**Status:** Pattern to formalize
**Location:** TBD
**What it produced in this codebase:** The entire component library in `src/components/` (23 components including project cards, page heroes, filter sheets, contact form, chat widget). The 11 section renderers in `src/components/sections/` (`SectionText`, `SectionStats`, `SectionProcess`, `SectionGallery`, `SectionImageText`, `SectionVideo`, `SectionTeam`, `SectionAwards`, `SectionFullImage`, `SectionCallout`, `SectionFeatureGrid`) driven by the `componentMap` in `src/views/projects/project.vue`. The two-card CTA layout in `src/components/CTA.vue` (side-by-side grid collapsing to stacked on mobile). The dotted-grid background pattern in `src/App.vue`. The `680px` content container and `960px` wide container defined in `tokens.css`.
**To formalize this skill:**
- Document the component taxonomy (layout, section renderer, reusable UI, feature-specific)
- Codify the responsive breakpoint strategy (640px mobile, container widths)
- Write rules for when to use scoped SCSS vs. Tailwind utilities vs. CSS custom properties
- Define the section renderer pattern (componentMap + dynamic `:is` binding) as a reusable architecture

## Design Tokens

**What it does:** Maintains a single-source-of-truth CSS custom property system covering colors, spacing, typography, shadows, radii, motion, and z-index so every component draws from the same palette.
**When to use it:** When adding a new color, spacing value, or shadow; when a component needs a value that "feels right" and you want to check if a token already exists; when onboarding a new contributor who needs to understand the visual constraints.
**Status:** Pattern to formalize
**Location:** TBD
**What it produced in this codebase:** `src/assets/css/tokens.css` (123 lines of custom properties). The color system: `--color-heading` (#374151), `--color-body` (#6b7280), `--color-muted`, `--color-faint`, `--color-border`, `--color-bg`, `--color-bg-subtle`, `--color-bg-hover`, `--color-accent`, plus semantic colors (success, info, warning, danger). The spacing scale (`--space-xs` through `--space-2xl`). The typography scale (`--text-xs` through `--h1` with a fluid clamp on h1). Three shadow levels, three border radii, four motion durations, and a seven-tier z-index scale. Self-hosted font declarations for Figtree (sans) and Caveat (display). The `prefers-reduced-motion` media query that kills all animation globally. Consistent styling consumed across every view and component via `var()` references.
**To formalize this skill:**
- Document the naming convention (category-modifier: `--color-bg-subtle`, `--space-md`)
- Write the decision tree for adding a new token vs. using an existing one
- Codify the rule that raw hex values must never appear in component styles
- Document the font-display: swap strategy and unicode-range subsetting rationale

## Design Critique

**What it does:** Reviews UI implementations for visual hierarchy, spacing consistency, contrast ratios, accessibility compliance, and brand alignment.
**When to use it:** When a new component looks "off" but you cannot articulate why; when iterating on card copy and layout simultaneously; when checking that shadows, borders, and whitespace create the intended depth hierarchy.
**Status:** New -- needs writing
**Location:** TBD
**What it produced in this codebase:** The Instagram card copy iteration in `src/components/CTA.vue` (moved from a generic "follow me" prompt to the specific "Product Management, Unfiltered" headline with job-to-be-done description). Gallery aspect-ratio fixes in `src/components/sections/SectionGallery.vue` (ensuring images maintain consistent proportions across viewport sizes). Awards grid shadow treatment in `src/components/sections/SectionAwards.vue` (using `--shadow-sm` and `--shadow-md` from tokens to create subtle depth without overwhelming the content).
**To formalize this skill:**
- Define a checklist: visual hierarchy, spacing, contrast (WCAG AA minimum), touch targets (44px), focus states
- Document the feedback format (observation, problem, fix) used during iteration
- Write rules for when to escalate from a CSS tweak to a component restructure
- Include the `:focus-visible` ring pattern from `tokens.css` as the accessibility baseline

## SEO

**What it does:** Ensures every page is crawlable, indexable, and rich-result-eligible through meta tags, structured data, sitemaps, and canonical URL management.
**When to use it:** When adding a new route to the site; when a page needs to appear correctly in Google search results, social shares, or link previews; when auditing whether crawlers can discover all content.
**Status:** Pattern to formalize
**Location:** TBD
**What it produced in this codebase:** `index.html` meta defaults (author, robots, description, theme-color) and JSON-LD Person schema (linking to LinkedIn, Twitter, GitHub via `sameAs`). Dynamic per-route meta managed by `@vueuse/head` (imported in `src/main.js` via `createHead()`). `public/sitemap.xml` with 22 URLs covering all pages, 4 project case studies, and 6 blog posts, each with `lastmod`, `changefreq`, and `priority`. `public/robots.txt` allowing all crawlers and pointing to the sitemap. Open Graph tags set per route for correct social previews. Canonical URL comment in `index.html` noting dynamic management. Font preload hints (`<link rel="preload">`) for Figtree and Augillion in `index.html`.
**To formalize this skill:**
- Write the checklist for adding a new route (sitemap entry, meta tags, OG tags, canonical)
- Document the JSON-LD schema expansion path (add Article schema for blog posts, Project schema for case studies)
- Codify the priority scoring convention used in sitemap.xml (1.0 for home, 0.8 for main sections, 0.7 for secondary, 0.6 for tertiary)
- Define the OG image generation strategy (static vs. dynamic)

## Lighthouse Testing

**What it does:** Runs automated performance, accessibility, and best-practices audits against built pages and translates scores into prioritized fix lists.
**When to use it:** When deploying a new feature that adds JavaScript, images, or third-party scripts; when a page feels slow on mobile; when verifying that a performance fix actually moved the score.
**Status:** New -- needs writing
**Location:** TBD
**What it produced in this codebase:** `lighthouserc.js` configuration (3 runs per audit, Best Practices >= 100 as error, Performance >= 90 and Accessibility >= 90 as warnings). The `.lighthouseci/` directory containing audit artifacts. The performance fixes that followed audit results: idle-loading analytics via `requestIdleCallback` in `src/main.js` and `src/lib/analytics.js` (PostHog deferred with 3.5s timeout, GA4 deferred with 4s timeout). Image WebP conversion for all project assets in `public/projects/`. Font preload optimization with `<link rel="preload">` in `index.html` and `font-display: swap` in `src/assets/css/tokens.css`.
**To formalize this skill:**
- Document how to run Lighthouse CI locally (`npx lhci autorun --config=lighthouserc.js`)
- Write the triage framework: which score drops are P0 (Best Practices below 100) vs. P1 (Performance below 90)
- Codify the idle-loading pattern as the standard approach for third-party scripts
- Define the image optimization pipeline (source format, WebP conversion, sizing breakpoints)

## Analytics

**What it does:** Instruments user behavior tracking with a dual pipeline (PostHog as primary, GA4 as secondary) using deferred loading, composable hooks, and structured event naming.
**When to use it:** When adding a new user interaction that needs measurement; when deciding whether an event belongs in PostHog, GA4, or both; when auditing whether tracking scripts are degrading page performance.
**Status:** Pattern to formalize
**Location:** TBD
**What it produced in this codebase:** PostHog initialization deferred via `requestIdleCallback` in `src/main.js` (with `capture_pageview: false` for manual SPA tracking). GA4 idle-loaded via `src/lib/analytics.js` (script injection deferred with 4s timeout, env-driven measurement ID). Three composables in `src/composables/`: `useScrollDepth.js` (fires at 25/50/75/100% milestones), `useTimeSpent.js` (fires seconds on unmount, ignores sub-2s bounces), and `useCountUp.js` (animates numbers on scroll-into-view). 23 tracked events documented in `CODEBASE.md` section 9 (project views, scroll depth, time spent, blog shares, CTA clicks, nav interactions, outbound clicks, chat toggles, contact submissions). Dual-push pattern in components like `src/components/CTA.vue` (every `posthog.capture()` paired with a `window.dataLayer.push()`). CSP headers in `vercel.json` allowing `connect-src` to PostHog, Google Analytics, and Vercel Insights domains. CSP violation reporting via `api/csp-report.js`. Privacy-conscious defaults: `Permissions-Policy` blocking camera, microphone, geolocation, and interest-cohort.
**To formalize this skill:**
- Document the event naming convention (`domain:action` format, e.g. `project:scroll_depth`, `cta:book_call`)
- Write the composable selection guide (when to use `useScrollDepth` vs. `useTimeSpent` vs. a one-off `posthog.capture`)
- Codify the idle-loading contract (which scripts defer, what timeout, what happens to events fired before init)
- Define the CSP allowlist review process for adding new analytics or third-party domains

## How These Skills Work Together

The nine skills operate in three layers. The writing layer -- The Humanizer, Marketing Psychology, and Speed-Readable Blog -- shapes every piece of copy from case study narratives to CTA card descriptions, ensuring the words sound human, hit psychological triggers, and remain scannable. The design layer -- Frontend Design, Design Tokens, and Design Critique -- translates that copy into interface: a token system that enforces visual consistency, component patterns that structure the layout, and a critique loop that catches hierarchy and spacing issues before they ship. The technical layer -- SEO, Lighthouse Testing, and Analytics -- ensures the finished pages are discoverable, fast, and measurable, feeding data back into future decisions. The Aqua-Alert case study is the clearest example of all three layers running in sequence: Speed-Readable Blog structured the inverted-pyramid narrative, Marketing Psychology anchored the Rs 16.5 Cr problem statement, The Humanizer softened the technical language, Frontend Design rendered it through the section-based component system, Design Tokens kept the styling consistent across eleven section types, Lighthouse Testing caught the performance cost of gallery images and triggered WebP conversion, and Analytics instrumented scroll depth and time spent to measure whether readers actually reached the solution section.
