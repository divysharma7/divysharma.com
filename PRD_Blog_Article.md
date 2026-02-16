# Product Requirements Document (PRD): Web.dev-style Blog Article Experience

## 1. Overview
This feature implements a **blog article experience** for Divy Sharma’s portfolio that closely mirrors the layout and UX of a web.dev blog page. The goal is to provide a professional, article-first reading experience with strong typography, rich metadata, and SEO-friendly structure.

This applies to the **blog article route**: `/blog/:slug`.

## 2. Goals & Non-Goals
### 2.1 Goals
1.  **Article-first layout**: Focus on content readability with a single, centered column and minimal distractions.
2.  **Professional metadata**: Show author, publish date, last updated date, and optional external links (e.g. LinkedIn, GitHub).
3.  **SEO-friendly structure**: Correct use of headings, metadata, canonical URLs, and structured data to support organic search.
4.  **Integration with CMS**: Consume data from the existing posts database/API. No code changes required to publish a new article.

### 2.2 Non-Goals
*   No multi-language support in v1.
*   No extra marketing navigation beyond the existing site header/footer.
*   No comments, reactions, or third-party widgets in v1.

## 3. User Stories
1.  **Reader**: “I want a clean article page where I can easily read and scan the content without visual clutter.”
2.  **Recruiter / Hiring Manager**: “I want to quickly understand the topic, who wrote it, and whether it’s recent or maintained.”
3.  **Admin (Divy)**: “I want my posts rendered automatically from CMS data in a consistent, professional layout without manual HTML work.”

## 4. UX & Layout Requirements
### 4.1 Overall Layout
*   **Centered content column**: Max width: ~680–760px. Centered horizontally on desktop with generous whitespace on both sides.
*   **Single column**: No sidebars in v1; focus entirely on reading.
*   **Global header/footer**: Use existing portfolio navigation and footer components. The header should not visually overpower the article.

### 4.2 Article Header
Displayed at the top of `/blog/:slug` above the body content.
*   **Breadcrumb / Section label**: Text like `Blog` or `Writing`. Small, subtle text above the title.
*   **Title**: Large H1, bold, high contrast. Exactly one `<h1>` per page.
*   **Subtitle (optional)**: Short paragraph providing context or a summary. Render only if `subtitle` exists.
*   **Author & Meta Row**:
    *   Author avatar (optional), author name (e.g. “Divy Sharma”).
    *   Optional link to author profile (e.g. LinkedIn/GitHub).
    *   Metadata line including: Published date (e.g. “Published: November 30, 2025”). Last updated date if `lastUpdatedAt` is present and later than `publishedAt`.
*   **Hero Image (optional)**: If `coverImageUrl` is provided: Show image either beneath the header section or directly under the title/meta. Include alt text.

### 4.3 Article Body
*   Content is rendered from markdown or HTML stored in CMS.
*   Must support: Headings (`h2`, `h3`), Paragraphs, Ordered/unordered lists, Hyperlinks, Blockquotes, Code blocks and inline code.
*   Spacing: Adequate vertical margin between paragraphs and sections. Extra spacing above headings.

### 4.4 Typography
*   **Headings**: Clear visual hierarchy between H1, H2, H3. H2 used for main sections; H3 for subsections.
*   **Body text**: Readable font (sans-serif or serif), consistent with site’s design system. Line height around 1.6–1.8. Comfortable base font size (e.g. 16–18px desktop, slightly smaller on mobile).
*   **Metadata**: Smaller font size than body. Softer color for lower visual prominence.

### 4.5 Bottom Section
At the end of the article:
1.  **Last updated**: Text like `Last updated on <date>` if `lastUpdatedAt` exists.
2.  **Acknowledgements (optional)**: If the post model later includes e.g. `acknowledgements`, render under a heading “Acknowledgements”.
3.  **Navigation**: Link back to blog listing: `← Back to all posts` pointing to `/blog`.

## 5. Content Model & Data Requirements
### 5.1 Post Data Shape
```typescript
type PostStatus = 'draft' | 'published';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  content: string; // markdown or HTML
  category: string;
  tags: string[];
  status: PostStatus;
  readingTimeMinutes: number;
  authorName: string;
  authorAvatarUrl?: string | null;
  authorProfileUrl?: string | null;
  coverImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  publishedAt: string | null;    // ISO datetime string
  lastUpdatedAt?: string | null; // ISO datetime string
  createdAt: string;             // ISO datetime string
}
```

### 5.2 Derived & Validation Rules
*   If `seoTitle` is null/empty, fall back to `title`.
*   If `seoDescription` is null/empty, fall back to `excerpt`.
*   `readingTimeMinutes` can be provided by CMS or computed.
*   `publishedAt` must be non-null and `status === 'published'` for the post to be publicly visible.

## 6. Functional Requirements
### 6.1 Routing & Access
*   **Route**: `/blog/:slug`.
*   **Draft protection**: If the post exists but `status !== 'published'`, the public route should behave as “not found” (404).

### 6.2 Data Fetching
*   On `/blog/:slug`: Fetch post from public API endpoint, e.g. `GET /api/posts/:slug`.
*   **Loading state**: Show skeleton or loading placeholders.
*   **Error state**: If API returns 404, render a “Post not found” view with a link back to `/blog`.

### 6.3 Markdown/HTML Rendering
*   **Markdown**: Use a renderer that supports headings, lists, links, inline code, code blocks, and blockquotes. Produces semantic HTML tags.
*   **HTML**: Safely render (sanitized) HTML.
*   **Code blocks**: Optional syntax highlighting.
*   **Internal links**: Prefer SPA navigation.

### 6.4 Integration with CMS
*   The Admin CMS is the only writer of BlogPost data.
*   The article page must not require manual edits when posts are added/updated.

## 7. SEO & Accessibility Requirements
### 7.1 SEO
*   **Title**: `seoTitle || title`.
*   **Meta Description**: `seoDescription || excerpt`.
*   **Canonical URL**: `<link rel="canonical" href={canonicalUrl || 'https://<domain>/blog/<slug>'} />`.
*   **Open Graph**: `og:title`, `og:description`, `og:type="article"`, `og:url`, `og:image`.
*   **Twitter**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

### 7.2 Structured Data (JSON-LD)
Inject `BlogPosting` JSON-LD script per article using `@vueuse/head`.

### 7.3 Accessibility
*   Exactly one `<h1>` element.
*   Proper heading hierarchy.
*   Alt text for images.
*   Sufficient color contrast.
*   Responsive layout.

## 8. Technical Specifications
### 8.1 Frontend
*   **Framework**: Vue 3 + Vite.
*   **Routing**: Vue Router.
*   **Head Management**: `@vueuse/head`.
*   **Components**: `BlogArticleLayout.vue` (renders header, content, footer), `MarkdownRenderer.vue` (optional).

### 8.2 Backend / API
*   **Public endpoint**: `GET /api/posts/:slug`.
*   **Behavior**: Look up post by slug. Ensure `status === 'published'`. Return BlogPost JSON. Return 404 if not found/published.

## 9. Future Enhancements (Out of Scope for v1)
*   Table of Contents.
*   Related posts.
*   Feedback widget.
*   Print-friendly stylesheet.
*   Multi-language support.
