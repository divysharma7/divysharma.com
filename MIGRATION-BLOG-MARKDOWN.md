# Migration Plan: Blog Posts to Markdown Files

## Current Structure

**File:** `src/data/posts.js`

- **Number of posts:** 6
- **Export:** Named export `posts` (array of objects)
- **Fields per post:**
  - `slug` (string) — URL identifier
  - `title` (string)
  - `excerpt` (string) — short summary
  - `heroImage` (string) — path to hero SVG
  - `heroAlt` (string) — alt text for hero image
  - `content` (string) — full article body in a custom Markdown-like syntax
  - `tags` (array of strings)
  - `publishedAt` (ISO 8601 date string)

**Rendering:** `src/views/BlogDetail.vue` uses a custom inline parser (regex-based) that converts the content string to HTML at runtime. It supports: headings (h1-h3), blockquotes, unordered lists, bold, highlight (`==text==`), images, links, and horizontal rules.

---

## Proposed Structure

```
src/content/blog/
  growth-vs-marketing-vs-product.md
  good-product-managers-bad-product-managers.md
  how-to-build-great-products.md
  prd-structure-i-actually-use.md
  prioritization-system-i-actually-use.md
  things-i-believe.md
```

Each file uses YAML frontmatter:

```markdown
---
title: "Growth vs Marketing vs Product"
slug: growth-vs-marketing-vs-product
excerpt: "Marketing, growth, and product are three different jobs..."
heroImage: /blog-heroes/growth-vs-marketing-vs-product.svg
heroAlt: "Growth vs Marketing vs Product — Three jobs, one funnel"
tags:
  - Growth
  - Marketing
  - Product Management
publishedAt: 2026-04-26T12:00:00Z
---

Content in standard Markdown here...
```

---

## How BlogDetail.vue Would Import Markdown

### Option A: Vite `?raw` suffix (no plugin needed)

```js
// Dynamic import with raw suffix
const modules = import.meta.glob('/src/content/blog/*.md', { as: 'raw', eager: false })

async function loadPost(slug) {
  const path = `/src/content/blog/${slug}.md`
  if (modules[path]) {
    const raw = await modules[path]()
    const { frontmatter, content } = parseFrontmatter(raw)
    const html = renderMarkdown(content)
    return { ...frontmatter, html }
  }
  return null
}
```

This approach keeps the custom renderer but sources content from `.md` files.

### Option B: vite-plugin-md or unplugin-vue-markdown (recommended)

Use a Vite plugin that compiles `.md` files at build time:

```js
// vite.config.js
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import MarkdownItMark from 'markdown-it-mark'

export default {
  plugins: [
    Markdown({
      markdownItSetup(md) {
        md.use(MarkdownItMark)        // ==highlight== support
        md.use(MarkdownItHighlightjs) // code blocks (future use)
      }
    })
  ]
}
```

BlogDetail.vue would use dynamic imports:

```js
const posts = import.meta.glob('/src/content/blog/*.md')

async function loadPost(slug) {
  const mod = await posts[`/src/content/blog/${slug}.md`]()
  // mod.default = Vue component; mod.frontmatter = parsed YAML
  return mod
}
```

---

## Frontmatter Handling

Use the `gray-matter` package (or built into the Vite markdown plugin) to parse YAML frontmatter:

| Field | Source | Notes |
|-------|--------|-------|
| `title` | frontmatter | Rendered in `<h1>` and `<title>` |
| `slug` | filename or frontmatter | Derived from filename if omitted |
| `excerpt` | frontmatter | Used in meta description, cards |
| `heroImage` | frontmatter | Path to `/public` asset |
| `heroAlt` | frontmatter | Alt text for hero |
| `tags` | frontmatter (array) | Used for filtering and related posts |
| `publishedAt` | frontmatter | ISO string for sorting and display |

The blog listing page (`Blog.vue`) would use `import.meta.glob` with eager frontmatter loading to build the post index without loading full content.

---

## Plugins Needed

| Package | Purpose |
|---------|---------|
| `unplugin-vue-markdown` | Compile .md to Vue components at build time |
| `markdown-it-mark` | Support `==highlight==` syntax (maps to `<mark>`) |
| `gray-matter` | Parse YAML frontmatter (if using Option A; built into unplugin-vue-markdown for Option B) |
| `@mdit-vue/plugin-frontmatter` | Expose frontmatter as module export (bundled with unplugin-vue-markdown) |

Optional/future:
| `markdown-it-anchor` | Auto-generate heading IDs for TOC |
| `markdown-it-toc-done-right` | Auto-generate table of contents |

---

## Estimated Effort

| Task | Time |
|------|------|
| Set up vite-plugin-md / unplugin-vue-markdown | 1-2 hours |
| Migrate 6 posts to `.md` files with frontmatter | 2-3 hours |
| Refactor BlogDetail.vue to load from markdown modules | 3-4 hours |
| Refactor Blog.vue listing to use glob-based index | 1-2 hours |
| Handle `==highlight==` custom syntax via markdown-it-mark | 30 min |
| Update TOC generation (already heading-based) | 1 hour |
| Testing and polish | 2-3 hours |
| **Total** | **~10-15 hours (2-3 days)** |

---

## Migration Steps

1. Install `unplugin-vue-markdown` and `markdown-it-mark`
2. Configure vite.config.js with the markdown plugin
3. Create `src/content/blog/` directory
4. Convert each post from `posts.js` into a `.md` file with frontmatter
5. Create a `src/data/posts-index.js` helper that uses `import.meta.glob` to expose frontmatter for the listing page
6. Refactor `BlogDetail.vue` to dynamically import the markdown component by slug
7. Remove the inline regex-based HTML renderer
8. Remove `src/data/posts.js` once all references are updated
9. Verify TOC, related posts, read-time calculation, and SEO meta still work
10. Run full build and Lighthouse CI to confirm no regressions
