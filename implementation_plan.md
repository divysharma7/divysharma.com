# Implementation Plan - Divy Sharma Portfolio Overhaul

## Goal Description
Overhaul the personal portfolio website to better showcase Divy Sharma as a Growth Product Manager. The new site will feature a modern design, improved information architecture, and deeper content integration (Projects, Blog, Books).

## User Review Required
> [!IMPORTANT]
> **Analytics**: As requested, NO analytics or PostHog code will be added.
> **Content**: I will use placeholder content for projects, blogs, and books where actual data is missing. You will need to populate `src/data` or the relevant Notion pages later.
> **Environment Variables**: The Spotify and Email integrations require environment variables (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`, `SENDGRID_API_KEY`, etc.) to be set in Vercel.

## Proposed Changes

### 1. Architecture & Routing
*   **Update `src/routes.js`**:
    *   Define routes: `/`, `/projects`, `/projects/:slug`, `/explore`, `/blog/:slug`, `/books` (optional, can be part of explore).
    *   Ensure proper meta tags for titles.

### 2. Data Management
*   **Create `src/data/`**:
    *   `projects.json`: Store project metadata (slug, title, summary, tags, content).
    *   `books.json`: Store book metadata.
    *   `posts.json`: Store blog post metadata (if not fully on Notion yet).

### 3. Components (New & Refactored)
*   **`src/components/`**:
    *   `NavBar.vue`: Responsive navigation.
    *   `Hero.vue`: Home page hero section.
    *   `ProjectCard.vue`: Reusable card for projects.
    *   `ContentCard.vue`: Reusable card for blog posts/books.
    *   `SpotifyWidget.vue`: Updated to show progress/duration and handle "not playing" state.
    *   `ContactForm.vue`: Form with validation and `bad-words` filter.
    *   `Footer.vue`: Updated footer.

### 4. Views Implementation
*   **`src/views/Home.vue`**:
    *   Implement Hero, "What I do", Featured Projects, Recent Writing, Featured Books, Spotify Widget.
*   **`src/views/Projects.vue`**:
    *   List all projects with filtering/sorting.
*   **`src/views/ProjectDetail.vue`**:
    *   Detailed view with "Context", "Problem", "Solution", "Outcome" sections.
*   **`src/views/Explore.vue`**:
    *   Content hub with tabs for Blog, Books, Notes.
*   **`src/views/BlogDetail.vue`**:
    *   Render blog content (Markdown or Notion).

### 5. API & Integrations
*   **`api/spotify.js`**: Update to return `progressMs` and `durationMs`.
*   **`api/contact.js`**: Ensure secure email sending with validation.

### 6. SEO & Performance
*   **Global**: Use `@vueuse/head` in `App.vue` or individual views for dynamic titles and meta descriptions.
*   **Sitemap**: Generate `sitemap.xml` (or provide script).
*   **Performance**: Lazy load heavy components (Notion renderer).

## Verification Plan

### Automated Tests
*   Run `npm run dev` to verify the build and local server.
*   Check console for any Vue warnings or errors.

### Manual Verification
*   **Navigation**: Click through all links in Navbar and Footer.
*   **Responsiveness**: Check Home, Projects, and Explore pages on Mobile, Tablet, and Desktop viewports.
*   **Spotify**: Verify the widget handles "playing" and "not playing" states (using mock data if env vars are missing).
*   **Contact Form**: Test form validation (empty fields, bad words).
*   **SEO**: Inspect `<head>` tags on different routes to ensure titles and descriptions change.
