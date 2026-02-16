# Implementation Plan - Web.dev-style Blog Article Experience

## Goal
Implement the blog article experience for `/blog/:slug` as defined in `PRD_Blog_Article.md`, featuring a clean, centered layout, rich metadata, and SEO optimization.

## Proposed Changes

### 1. Components
*   **`src/components/blog/MarkdownRenderer.vue`**:
    *   Responsible for rendering markdown content into semantic HTML.
    *   Will use `markdown-it` (or similar) to parse markdown.
    *   Styles for typography (headings, lists, code blocks).
*   **`src/components/blog/BlogArticleLayout.vue`**:
    *   Presentational component receiving `post` as a prop.
    *   Renders the header (breadcrumb, title, subtitle, meta, hero image).
    *   Renders the body using `MarkdownRenderer`.
    *   Renders the footer (last updated, back link).
    *   Implements the centered, single-column layout.

### 2. Views
*   **`src/views/BlogDetail.vue`**:
    *   Container view for the route `/blog/:slug`.
    *   Fetches post data from `/api/posts/:slug`.
    *   Handles loading, error (404), and success states.
    *   Manages SEO using `@vueuse/head` (title, meta tags, JSON-LD).

### 3. Routing
*   Ensure `src/routes.js` has the correct definition:
    ```javascript
    {
      path: '/blog/:slug',
      name: 'BlogDetail',
      component: () => import('./views/BlogDetail.vue')
    }
    ```

### 4. Dependencies
*   Install `markdown-it` if not present.

## Verification Plan
*   **Local Testing**:
    *   Navigate to a valid blog post URL (e.g., `/blog/building-experimentation-culture`).
    *   Verify the layout matches the requirements (centered, typography).
    *   Verify metadata (author, date) is displayed correctly.
    *   Verify SEO tags in the `<head>`.
    *   Test 404 behavior by navigating to an invalid slug.

## Checklist
- [ ] Install `markdown-it`
- [ ] Create `src/components/blog/MarkdownRenderer.vue`
- [ ] Create `src/components/blog/BlogArticleLayout.vue`
- [ ] Update `src/views/BlogDetail.vue`
- [ ] Verify routing in `src/routes.js`
