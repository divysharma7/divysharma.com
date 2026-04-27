# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

- **Email:** security@divysharma.com
- **Do not** open a public GitHub issue for security vulnerabilities
- You should receive acknowledgement within 48 hours
- We will work with you to understand and address the issue before any public disclosure

---

## Security Headers

All headers are configured in `vercel.json` and applied to every route.

### Content-Security-Policy (currently Report-Only)

The CSP is deployed as `Content-Security-Policy-Report-Only` first. It will be promoted to `Content-Security-Policy` (enforcement) after monitoring violation reports.

**Directives:**

| Directive | Value | Why |
|---|---|---|
| `default-src` | `'self'` | Deny everything not explicitly allowed |
| `script-src` | `'self' 'sha256-...' 'strict-dynamic' https://www.googletagmanager.com https://cloud.umami.is https://va.vercel-scripts.com` | Allow own scripts, the inline JSON-LD (via hash), and analytics scripts. `'strict-dynamic'` allows scripts loaded by trusted scripts to execute without listing every sub-resource |
| `style-src` | `'self' 'unsafe-inline'` | Vue and AOS inject inline styles at runtime. Nonce-based style injection is a future improvement |
| `img-src` | `'self' data: https: https://www.googletagmanager.com` | Allow self-hosted images, data URIs (inline SVGs), any HTTPS image (blog content, external), and GTM pixel |
| `font-src` | `'self' data:` | Self-hosted fonts (Figtree, Augillion) + data URI fallbacks |
| `connect-src` | `'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://cloud.umami.is https://www.google-analytics.com https://analytics.google.com` | API calls to self, Vercel Speed Insights, Umami analytics, and GA4 beacons |
| `object-src` | `'none'` | No plugins (Flash, Java applets) |
| `base-uri` | `'self'` | Prevent `<base>` tag injection |
| `frame-ancestors` | `'none'` | Prevent framing (clickjacking) — mirrors `X-Frame-Options: DENY` |
| `form-action` | `'self'` | Forms can only submit to same origin |
| `require-trusted-types-for` | `'script'` | Enforce Trusted Types on DOM XSS sinks |
| `trusted-types` | `default vue` | Only these two named policies can create trusted values |
| `upgrade-insecure-requests` | — | Auto-upgrade HTTP to HTTPS |
| `report-uri` | `/api/csp-report` | Violation reports sent to serverless endpoint |

**Hash-based approach (no nonces):**

Vercel serves static files from an edge CDN — there is no per-request server rendering, so nonces cannot be injected. Instead, `scripts/generate-csp.js` runs as a postbuild step, computes SHA-256 hashes of inline `<script>` content in `dist/index.html`, and patches `vercel.json` with the real hashes before deployment.

**Whitelisted external origins:**

| Origin | Service | Why |
|---|---|---|
| `https://www.googletagmanager.com` | GA4 loader | Google Analytics 4 script tag |
| `https://cloud.umami.is` | Umami Analytics | Privacy-focused analytics |
| `https://va.vercel-scripts.com` | Vercel Analytics | Speed Insights + Web Analytics script |
| `https://vitals.vercel-insights.com` | Vercel Speed Insights | Core Web Vitals beacon endpoint |
| `https://www.google-analytics.com` | GA4 | Event collection endpoint |
| `https://analytics.google.com` | GA4 | Measurement Protocol endpoint |

### Cross-Origin-Opener-Policy

```
Cross-Origin-Opener-Policy: same-origin
```

Prevents cross-origin windows from accessing `window.opener`. Mitigates Spectre-type side-channel attacks and cross-origin information leaks.

### Cross-Origin-Resource-Policy

```
Cross-Origin-Resource-Policy: same-origin
```

Prevents other origins from loading our resources. Combined with COOP, provides cross-origin isolation.

### Strict-Transport-Security

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

2-year HSTS with preload. Forces HTTPS for the domain and all subdomains.

### X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Prevents MIME-type sniffing. Browser must respect the declared `Content-Type`.

### Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
```

Sends full referrer for same-origin requests, only the origin for cross-origin HTTPS, nothing for HTTP downgrade.

### Permissions-Policy

```
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

Disables camera, microphone, geolocation APIs, and FLoC/Topics API. None of these are used by the app.

### X-Frame-Options

```
X-Frame-Options: DENY
```

Legacy framing protection (redundant with `frame-ancestors 'none'` in CSP but kept for older browsers).

---

## Trusted Types

Two policies are registered in `src/main.js` before `createApp()`:

### `vue` policy (passthrough)

```js
window.trustedTypes.createPolicy('vue', {
  createHTML: (s) => s,
})
```

Vue internally uses `innerHTML` for the `v-html` directive and SVG rendering. This policy is a passthrough — it trusts Vue's internal HTML string as-is.

**Why this is safe:** Both `v-html` usages in this app operate on trusted content:

1. **`src/views/BlogDetail.vue:47`** — Content sourced from `src/data/posts.js`, a static JS file bundled at build time. No user input, no API fetch.
2. **`src/components/ChatWidget.vue:56`** — Input runs through `escapeHtml()` before regex-based markdown rendering. URLs are sanitized via `sanitizeUrl()`.

**What would make this unsafe:** If either data source changes to accept user-generated content (e.g., an API fetch, CMS, or database query), the passthrough policy would need to be replaced with DOMPurify sanitization.

### `default` policy (DOMPurify sanitizer)

```js
window.trustedTypes.createPolicy('default', {
  createHTML: (s) => DOMPurify.sanitize(s, { RETURN_TRUSTED_TYPE: false }),
  createScript: () => { throw new Error('Blocked') },
  createScriptURL: (s) => { throw new Error('Blocked') },
})
```

Catch-all for any other code path that writes to an HTML sink. DOMPurify sanitizes HTML; script and scriptURL creation are blocked entirely.

---

## Known Vulnerabilities

### katex (via vue3-notion)

**Status:** Accepted risk — no upstream fix available

**CVEs:**
- GHSA-3wc5-fcw2-2329 (moderate) — protocol normalization bypass
- GHSA-f98w-7cxr-ff2h (moderate) — `\includegraphics` filename escape
- GHSA-cvr6-37gx-v8wc (moderate) — maxExpand bypass via Unicode
- GHSA-cg87-wmx4-v546 (moderate) — `\htmlData` attribute validation
- GHSA-64fm-8hw2-v72w (moderate) — maxExpand bypass via `\edef`

**Why accepted:** All vulnerabilities are in KaTeX's rendering engine. In this app, vue3-notion is used only for rendering Notion page content that is developer-controlled. There is no user-supplied LaTeX input.

**Mitigation:** Dependabot is configured to ignore katex patch updates until vue3-notion releases a version with a fixed katex dependency. Re-evaluation date: **2026-07-27**.

**Replacement options:** If vue3-notion remains unmaintained, consider migrating to the Notion API with a custom renderer or using `@notionhq/client` + `notion-to-md`.
