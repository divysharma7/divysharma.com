# Design System -- divysharma.com

Personal portfolio site built with **Vue 3** + **Vite**, using **Figtree** as the primary sans-serif and **Augillion** as the display font. All tokens live in `src/assets/css/tokens.css`.

---

## 1. Design Tokens

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-sans` | `'Figtree', 'Satoshi', system-ui, -apple-system, sans-serif` | Body text, UI |
| `--font-display` | `'augillion', serif` | Hero headings, blog titles |

### Font Scale

| Token | Value | Rem px (16px base) |
|---|---|---|
| `--text-xs` | `0.75rem` | 12px |
| `--text-sm` | `0.875rem` | 14px |
| `--text-base` | `1rem` | 16px |
| `--text-lg` | `1.125rem` | 18px |
| `--text-xl` | `1.25rem` | 20px |
| `--h3` | `1.5rem` | 24px |
| `--h2` | `1.75rem` | 28px |
| `--h1` | `clamp(32px, 5vw, 48px)` | 32--48px fluid |

### Line Heights

| Token | Value | Use |
|---|---|---|
| `--leading-tight` | `1.2` | Headings |
| `--leading-snug` | `1.4` | Subheadings, cards |
| `--leading-normal` | `1.6` | Body text |
| `--leading-relaxed` | `1.8` | Long-form reading |

### Colors (Tailwind Slate palette)

| Token | Value | Use |
|---|---|---|
| `--color-heading` | `#374151` | Headings, accent |
| `--color-body` | `#6b7280` | Body copy |
| `--color-muted` | `#9CA3AF` | Captions, metadata |
| `--color-faint` | `#d1d5db` | Disabled, decorative |
| `--color-border` | `#F3F4F6` | Dividers, card borders |
| `--color-bg` | `#fff` | Page background |
| `--color-bg-subtle` | `#F9FAFB` | Card backgrounds |
| `--color-bg-hover` | `#F3F4F6` | Hover state backgrounds |
| `--color-accent` | `#374151` | Same as heading -- intentional |

**Legacy aliases** (don't use in new code):

| Alias | Points to |
|---|---|
| `--text-primary` | `--color-heading` |
| `--text-secondary` | `--color-body` |
| `--text-muted` | `--color-muted` |
| `--heading-color` | `--color-heading` |
| `--bg` | `--color-bg` |
| `--card-bg` | `--color-bg-subtle` |
| `--border` | `--color-border` |

### Spacing

| Token | Value |
|---|---|
| `--space-xs` | `0.25rem` (4px) |
| `--space-sm` | `0.5rem` (8px) |
| `--space-md` | `1rem` (16px) |
| `--space-lg` | `1.5rem` (24px) |
| `--space-xl` | `2rem` (32px) |
| `--space-2xl` | `3rem` (48px) |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `8px` | Pills, small cards, logos |
| `--radius-md` | `12px` | Cards, modals |
| `--radius-pill` | `999px` | Tags, badges, pill buttons |

### Layout

| Token | Value | Use |
|---|---|---|
| `--container` | `680px` | Default content width |
| `--container-wide` | `960px` | Wide layouts (modals, grids) |
| `--container-max` | `var(--container)` | Alias |
| `--container-padding` | `1.5rem` | Horizontal page gutters |
| `--page-top` | `3rem` | Top padding for pages |

### Scrollbar

| Token | Value |
|---|---|
| `--c-bg` | `#fff` |
| `--c-scrollbar` | `#d1d5db` |
| `--c-scrollbar-hover` | `#9CA3AF` |

### Focus

| Token | Value |
|---|---|
| `--focus-ring` | `0 0 0 2px #fff, 0 0 0 4px var(--color-heading)` |

Global `:focus-visible` applies `outline: 2px solid var(--color-heading); outline-offset: 2px`.

---

## 2. Top 5 Components

### SectionHeading

`src/components/common/SectionHeading.vue`

Renders a small uppercase label above a section title.

| Prop | Type | Required | Description |
|---|---|---|---|
| `subHeading` | `String` | Yes | Uppercase label (e.g. "Work") |
| `heading` | `String` | Yes | Section title (e.g. "Experience") |

```html
<SectionHeading subHeading="Work" heading="Experience" />
```

**Styling notes:**
- Sub-heading: `--text-sm`, weight 500, uppercase, `letter-spacing: 0.05em`, `--color-body`
- Heading: `--h3`, weight 600, `--color-heading`, `--leading-tight`
- Bottom margin: `2rem`

---

### ExperienceCard

`src/components/experience/ExperienceCard.vue`

Displays a work experience entry with logo, role, dates, tech stack, and description.

| Prop | Type | Required | Description |
|---|---|---|---|
| `experience` | `Object` | Yes | Experience data object |

**Expected `experience` shape:**

```js
{
  company: 'ASBL',
  logo: '/logos/asbl.png',     // optional, falls back to initial
  role: 'Associate PM',
  startDate: 'Jan 2024',
  endDate: 'Present',
  location: 'Bangalore',
  current: true,               // shows green "Working" badge
  links: { website: 'https://...' },
  technologies: [{ name: 'Figma', icon: 'figma' }],
  description: ['Led feature X...', 'Shipped Y...']
}
```

**States:**
- Default: 3-column flex layout (logo | content | meta)
- Mobile (<=768px): stacks vertically, hides desktop meta, shows mobile meta
- `current: true` shows a green "Working" badge with pulsing dot

**Accessibility:** Logo `alt` uses company name. Icon links have `aria-label`.

---

### BlogCard

`src/components/blog/BlogCard.vue`

Full blog post card with dark hero section, excerpt, tags, and read-time.

| Prop | Type | Required | Description |
|---|---|---|---|
| `post` | `Object` | Yes | Post data object |

**Expected `post` shape:**

```js
{
  slug: 'my-post',
  title: 'Post Title',
  excerpt: 'Short summary...',
  publishedAt: '2025-01-15',
  tags: ['Product', 'Design'],
  content: '...'              // used for read-time calc
}
```

**States:**
- Hover: `translateY(-2px)`, border darkens, CTA text letter-spacing widens
- Tag click: navigates to `/blog?tag=<tag>` (via `@click.prevent`)

**Accessibility:** Entire card is a `<router-link>`. Tags are clickable `<span>` elements (consider adding `role="link"`).

---

### MentorCard

`src/components/achievements/MentorCard.vue`

Displays a mentor with avatar, role, description, and external links.

| Prop | Type | Required | Description |
|---|---|---|---|
| `mentor` | `Object` | Yes | Mentor data object |

**Expected `mentor` shape:**

```js
{
  name: 'Jane Doe',
  image: '/mentors/jane.jpg',  // optional, falls back to initial
  role: 'VP Product',
  company: 'Acme Inc',        // optional
  description: 'Mentored me on...',
  links: [{ platform: 'LinkedIn', url: 'https://...' }]
}
```

**States:**
- Hover: `translateY(-4px)`, shadow intensifies, top gradient bar fades in
- Link hover: background inverts to `#111`, text to white

**Styling:** Uses `24px` border-radius, `32px` padding. Avatar is `64px` circle with gradient fallback.

---

### CTA

`src/components/CTA.vue`

Call-to-action section with Cal.com booking integration. No props -- pulls config from `@/config/cta`.

```html
<CTA />
```

**Behavior:**
1. Click "Book a call" button
2. Opens modal with Cal.com iframe (Teleported to `<body>`)
3. On mobile (<=640px): renders as bottom sheet with pull-handle indicator
4. Tracks `cta:book_call` event via Umami
5. Triggers haptic feedback on mobile

**States:**
- Button hover: `translateY(-1px)`, shadow grows, "You" avatar slides in from left
- Button active: snaps back to `translateY(0)`
- Modal: fade + slide-up transition, loader spinner while iframe loads

**Accessibility:** `aria-label="Book a free call"` on button, `aria-label="Close"` on close button. Focus-visible rings on both interactive elements.

---

## 3. Patterns

### Page Layout

Every page follows the same structure:

```html
<div class="page" style="max-width: var(--container); margin: 0 auto; padding: var(--page-top) var(--container-padding);">
  <h1>Page Title</h1>
  <div class="divider" style="border-top: 1px solid var(--color-border); margin: 1.5rem 0;" />
  <SectionHeading subHeading="Label" heading="Title" />
  <!-- content -->
  <CTA />
</div>
```

### Card Hover

All cards use the same hover pattern:

```css
.card {
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.card:hover {
  transform: translateY(-2px);  /* or -4px for larger cards */
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}
```

### List Item Hover (Arrow Slide-in)

Used in blog cards and link lists:

```css
.cta-text {
  transition: letter-spacing 160ms ease;
}
.item:hover .cta-text {
  letter-spacing: 0.01em;
}
```

### Divider

```css
border-top: 1px solid var(--color-border);  /* #F3F4F6 */
```

Used between page title and content, between card sections (`border-bottom: 1px solid #f0f0f0` in ExperienceCard).

---

## 4. Accessibility

### Focus Visible

Global rule in `tokens.css`:

```css
:focus-visible {
  outline: 2px solid var(--color-heading);
  outline-offset: 2px;
}
```

Components that need a white gap (over dark backgrounds) use `--focus-ring` box-shadow instead.

### Reduced Motion

Global rule in `tokens.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Touch Targets

Interactive elements (buttons, links) should be at least **44x44px**. The CTA close button is `32px` but has adequate padding. New components must meet the 44px minimum.

### Contrast

- Heading on white: `#374151` on `#fff` = **8.5:1** (AAA)
- Body on white: `#6b7280` on `#fff` = **5.0:1** (AA)
- Muted on white: `#9CA3AF` on `#fff` = **2.9:1** (fails AA for body text -- use only for non-essential metadata)
- Blog card title on dark: `#f8fafc` on `#0f172a` = **15.4:1** (AAA)

### ARIA Patterns

| Pattern | Usage |
|---|---|
| `aria-hidden="true"` | Decorative icons, avatar initials, arrow symbols |
| `aria-label` | Icon-only buttons (close, external links) |
| `role` implied by element | `<button>`, `<a>`, `<router-link>` |
| `rel="noopener noreferrer"` | All `target="_blank"` links |

---

## 5. Do's and Don'ts

| Do | Don't |
|---|---|
| Use tokens (`--color-heading`) for all colors | Hardcode hex values in new components |
| Use `--font-sans` for UI, `--font-display` for hero headings | Add new font families without updating tokens |
| Use spacing tokens (`--space-md`) | Use arbitrary pixel values for spacing |
| Keep transitions at `160ms ease` for micro-interactions | Use transitions longer than `400ms` for hover states |
| Use `translateY(-2px)` for card hover | Use `scale()` for card hover (causes layout shift) |
| Add `:focus-visible` styles to custom interactive elements | Remove outline without providing an alternative |
| Use `--container` (680px) for content pages | Let content stretch full-width |
| Use `--radius-md` (12px) for cards, `--radius-pill` for tags | Mix border-radius values inconsistently |
| Use the legacy aliases only to avoid breaking old pages | Use `--text-primary` in new code (use `--color-heading`) |
| Test with `prefers-reduced-motion: reduce` | Rely on animation to convey meaning |
