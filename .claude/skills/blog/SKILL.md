---
name: blog
description: Add, edit, or manage blog posts on divysharma.com — covers content, hero images, sitemap, tags, and markdown formatting. Any AI model can follow this to ship a blog post.
invocable: true
---

# Blog Management Skill

Use this skill whenever the user asks to **add a new blog post**, **edit an existing post**, **create blog images**, or **manage blog content** on divysharma.com.

This skill is designed to be self-contained — any AI model (Claude, GPT, Gemini, Llama, etc.) can follow these instructions without prior knowledge of the codebase.

---

## Architecture Overview

```
src/data/posts.js              ← All blog posts live here (JS array)
src/views/Blog.vue              ← Blog list page (/blog)
src/views/BlogDetail.vue        ← Blog detail page (/blog/:slug)
src/views/Home.vue              ← Homepage (shows 3 latest posts)
src/components/blog/BlogCard.vue ← Post card component
src/components/blog/BlogList.vue ← Post grid wrapper
public/blog-heroes/             ← Hero SVG images (one per post)
public/images/blog/             ← Content images (SVG or WebP)
public/sitemap-blog.xml         ← Blog sitemap (must be updated manually)
public/sitemap.xml              ← Index sitemap (references sitemap-blog.xml)
```

There is **no CMS, no database, no markdown files**. All content is a JavaScript array in `src/data/posts.js`. The site is a Vue 3 SPA deployed on Vercel.

---

## Task: Add a New Blog Post

Follow these steps exactly, in order.

### Step 1: Read the current posts array

Read `src/data/posts.js` to understand:
- How many posts exist
- What tags are already in use (reuse existing tags when possible)
- What the newest post's `publishedAt` date is
- The exact object structure

### Step 2: Create the hero SVG image

**File location:** `public/blog-heroes/{slug}.svg`

**Required template** (copy exactly, change only the text):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" font-family="Inter, 'Helvetica Neue', sans-serif">
  <rect width="1280" height="720" fill="#F4EFE6"/>

  <!-- Subtitle (monospace, optional but recommended) -->
  <text x="96" y="240" font-family="'JetBrains Mono', 'IBM Plex Mono', monospace" font-size="18" font-weight="500" letter-spacing="0.04em">
    <tspan fill="#1A1A1A">CATEGORY </tspan><tspan fill="#E8765A">/</tspan><tspan fill="#1A1A1A"> TOPIC</tspan>
  </text>

  <!-- Title (1-3 lines, adjust y positions) -->
  <text x="96" y="330" font-size="88" font-weight="700" fill="#1A1A1A" letter-spacing="-0.02em">Title Line 1</text>
  <text x="96" y="420" font-size="88" font-weight="700" fill="#1A1A1A" letter-spacing="-0.02em">Title Line 2</text>
</svg>
```

**Design rules:**
- Dimensions: always `viewBox="0 0 1280 720"` (16:9)
- Background: always `#F4EFE6` (warm beige)
- Text color: always `#1A1A1A` (near black)
- Accent color: `#E8765A` (coral) — use for `/` separator or decorative elements
- Left margin: always `x="96"`
- Title font size: always `88`
- Subtitle font size: always `18`
- Title line spacing: `90px` between lines (y="330", y="420", y="510")
- Keep title to 2-3 lines max — break at natural word boundaries
- The slug in the filename must match the post's `slug` field exactly

### Step 3: Create content images (optional but recommended)

**File location:** `public/images/blog/{descriptive-name}.svg`

Content images should:
- Use `viewBox="0 0 1080 600"` (or similar wide ratio)
- Use the same color palette: `#F4EFE6` bg, `#1A1A1A` text, `#E8765A` accent, `#6B6B6B` secondary text, `#E2DDD4` borders, `#fff` card backgrounds
- Use rounded corners: `rx="12"` for cards, `rx="16"` for outer container
- Use Inter font family
- Be informational diagrams, not decorative — show concepts, comparisons, frameworks

### Step 4: Add the post object to posts.js

**Insert the new post at the TOP of the `posts` array** (position 0). Posts are sorted by `publishedAt` descending, but the array order should also reflect this.

**Required object structure** (every field is mandatory):

```javascript
{
    slug: 'url-friendly-slug',
    title: 'Full Post Title',
    excerpt: 'One to two sentences summarizing the post. Shows on blog list, homepage cards, and og:description.',
    heroImage: '/blog-heroes/url-friendly-slug.svg',
    heroAlt: 'Descriptive alt text for the hero image',
    content: `Markdown content here (template literal)`,
    tags: ['Tag1', 'Tag2'],
    publishedAt: '2026-05-25T12:00:00Z',
}
```

**Field rules:**

| Field | Format | Constraints |
|-------|--------|-------------|
| `slug` | lowercase, hyphens only | Must match hero SVG filename. Must be unique across all posts. |
| `title` | Title Case | Keep under 60 chars for SEO. No quotes that break JS strings. |
| `excerpt` | 1-2 sentences | Keep under 160 chars for meta description. Escape single quotes with `\'`. |
| `heroImage` | `/blog-heroes/{slug}.svg` | Path must match the SVG you created in Step 2. |
| `heroAlt` | Descriptive text | Describe the image for screen readers. Include the post title. |
| `content` | Template literal (backticks) | See Markdown Reference below. Escape backticks inside content with `\``. |
| `tags` | Array of 2-3 strings | Reuse existing tags when possible (see Tag Pool below). |
| `publishedAt` | ISO 8601 UTC | Format: `YYYY-MM-DDTHH:MM:SSZ`. Use today's date, noon UTC. |

### Step 5: Update the sitemap

**File:** `public/sitemap-blog.xml`

1. **Update the blog index `<lastmod>`** to today's date (YYYY-MM-DD format)
2. **Add a new `<url>` entry** immediately after the blog index entry, before existing post entries:

```xml
<url>
  <loc>https://divysharma-com.vercel.app/blog/{slug}</loc>
  <lastmod>{YYYY-MM-DD}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### Step 6: Verify (do not skip)

After making all changes, verify:

- [ ] Hero SVG exists at `public/blog-heroes/{slug}.svg`
- [ ] Content images (if any) exist at `public/images/blog/`
- [ ] Post object is first in the `posts` array
- [ ] `slug` matches hero filename (without `.svg`)
- [ ] `publishedAt` date is correct
- [ ] All image paths in `content` start with `/images/blog/` or `/blog-heroes/`
- [ ] Sitemap has the new entry
- [ ] Sitemap blog index `<lastmod>` is updated
- [ ] No syntax errors in `posts.js` (unescaped backticks, quotes, etc.)
- [ ] Tags are 2-3 items, preferably from the existing tag pool
- [ ] Content uses only supported markdown (see reference below)

---

## Task: Edit an Existing Blog Post

1. Read `src/data/posts.js`
2. Find the post by `slug`
3. Edit the relevant fields
4. If the title changed significantly, update `heroAlt` and the hero SVG
5. If content images were added/removed, add/remove files in `public/images/blog/`
6. Update `<lastmod>` in `public/sitemap-blog.xml` for that post's URL

---

## Task: Delete a Blog Post

1. Remove the post object from the `posts` array in `src/data/posts.js`
2. Remove the hero SVG from `public/blog-heroes/`
3. Remove any content images in `public/images/blog/` that are only used by this post
4. Remove the `<url>` entry from `public/sitemap-blog.xml`
5. Update the blog index `<lastmod>` in `public/sitemap-blog.xml`

---

## Markdown Reference

The blog uses a **custom markdown parser** (not a library). Only these syntax elements are supported:

### Supported syntax

| Syntax | Renders as | Notes |
|--------|-----------|-------|
| `## Heading` | `<h2>` with auto-generated ID | Used for Table of Contents. **Use this for main sections.** |
| `### Heading` | `<h3>` with auto-generated ID | Used for subsections within a `##` section. |
| `**bold text**` | `<strong>` | Inline bold. |
| `==highlighted text==` | `<mark>` (yellow underline highlight) | **Use for key insights and memorable phrases.** |
| `[link text](url)` | `<a target="_blank">` | All links open in new tab. |
| `![alt text](/path)` | `<img loading="lazy">` | Images are lazy-loaded. Use absolute paths from `/public`. |
| `---` | `<hr>` | Section divider. Must be on its own line. |
| `- list item` | `<li>` inside `<ul>` | Unordered lists. Each item on its own line starting with `- `. |
| `> quoted text` | `<blockquote>` | Block quotes with left border, italic styling. |
| Blank line | `<p>` break | Separate paragraphs with double newlines. |

### NOT supported (do not use)

- `# H1` headings (reserved for page title)
- `1. Ordered lists` (use `- ` unordered lists instead)
- Inline code or code blocks (no backtick-fenced blocks)
- Tables
- Footnotes
- HTML tags inside content
- Nested lists
- `*italic*` (use `**bold**` or `==highlight==` instead)

### Content style guide

Follow the voice and style of existing posts:

1. **Open with an image** — Start content with `![descriptive alt](/images/blog/...)` if a content image exists
2. **Short opening paragraph** — 2-4 sentences establishing the topic. First-person, direct.
3. **Use `---` between major sections** — Provides visual breathing room
4. **Use `==highlights==` sparingly** — 1-2 per section max, for the single most important insight
5. **Keep paragraphs short** — 1-4 sentences. Single-sentence paragraphs are fine for emphasis.
6. **Use `##` for main sections, `###` for sub-sections** — These become the Table of Contents
7. **Lists for scannable content** — Use `- ` bullets for 3+ parallel items
8. **End with a takeaway section** — Use `## The Takeaway` or similar closing heading
9. **No emojis** — The site design is minimal and text-driven
10. **Escape special characters** — Use `\'` for apostrophes in excerpt field, `\`` for backticks in content

### Example content structure

```
![Overview image alt text](/images/blog/overview-image.svg)

Opening paragraph that hooks the reader and establishes the topic. Keep it short and direct.

---

## First Major Section

Body text here. ==Highlight the key insight.==

- Point one
- Point two
- Point three

---

## Second Major Section

### Subsection A

More content here.

> A blockquote for emphasis or attribution.

### Subsection B

![Diagram alt text](/images/blog/diagram.svg)

Content continues after the image.

---

## The Takeaway

Closing thoughts. ==Final memorable line.==
```

---

## Tag Pool

Reuse these existing tags to maintain consistency. Create new tags only if none of these fit.

**Currently in use:**
- `Product Management` (most used)
- `Career`
- `Leadership`
- `AI`
- `Growth`
- `Marketing`
- `Strategy`
- `Product Thinking`
- `PRD`
- `Documentation`
- `Prioritization`

**When to create a new tag:** Only if you have 2+ posts that would share it and none of the above tags apply.

---

## How Rendering Works (for debugging)

Understanding this helps when content doesn't render as expected:

1. **Blog list page** (`/blog`) — Imports `posts` array, sorts by `publishedAt` desc, shows excerpt + heroImage + first tag + read time
2. **Blog detail page** (`/blog/:slug`) — Finds post by slug from URL params, runs content through regex-based markdown parser, auto-generates Table of Contents from `##`/`###` headings
3. **Homepage** — Shows 3 most recent posts as cards with hero image, title, excerpt
4. **Read time** — Calculated as `Math.max(1, Math.ceil(wordCount / 225))` minutes
5. **Related posts** — Shows 3 posts sharing at least one tag with current post. Falls back to 3 most recent if no tag matches.
6. **SEO meta tags** — Auto-set from post fields: `og:title` from title, `og:description` from excerpt, `og:image` from heroImage
7. **Tag filtering** — Blog list sidebar shows all tags sorted by frequency. Clicking filters posts by that tag.
8. **Search** — Blog list has a search input that filters posts by title and excerpt (minimum 2 chars, debounced 500ms).

---

## Quick Reference: File Paths

| What | Where |
|------|-------|
| All post data | `src/data/posts.js` |
| Blog list view | `src/views/Blog.vue` |
| Blog detail view | `src/views/BlogDetail.vue` |
| Homepage (latest 3) | `src/views/Home.vue` |
| Blog card component | `src/components/blog/BlogCard.vue` |
| Hero images | `public/blog-heroes/{slug}.svg` |
| Content images | `public/images/blog/{name}.svg` or `.webp` |
| Blog sitemap | `public/sitemap-blog.xml` |
| Main sitemap index | `public/sitemap.xml` |
| Design tokens | `src/assets/css/tokens.css` |
| Routes | `src/routes.js` |

---

## Common Mistakes to Avoid

1. **Forgetting to escape quotes in excerpt** — Use `\'` for apostrophes: `excerpt: 'Don\'t do this'`
2. **Using `#` heading in content** — Only `##` and `###` are supported. `#` won't render correctly.
3. **Wrong image path** — Content images must start with `/images/blog/`, hero images with `/blog-heroes/`
4. **Forgetting the sitemap** — Every new post needs a `<url>` entry in `sitemap-blog.xml`
5. **Mismatched slug and hero filename** — `slug: 'my-post'` must have hero at `public/blog-heroes/my-post.svg`
6. **Using unsupported markdown** — No code blocks, no ordered lists, no tables, no HTML
7. **Placing post in wrong array position** — Newest post goes FIRST in the array
8. **Using a date in the future** — `publishedAt` should be today or earlier
9. **Too many tags** — Stick to 2-3. More than 3 clutters the UI.
10. **Unescaped backticks in content** — If content contains a backtick, escape it since content uses template literals
