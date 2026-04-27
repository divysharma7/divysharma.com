# Lighthouse Best Practices — Audit Baseline and Remediation

## Baseline Scores (before this work)

| Category | Mobile | Desktop |
|---|---|---|
| Best Practices | 77 | 77 |
| Trust & Safety | 77 | 77 |

**Flagged issues:**
1. No CSP found in enforcement mode
2. No COOP header found
3. No Trusted Types directive in CSP

## Changes Made

### 1. CSP in Report-Only mode (commit: `feat(security): add CSP Report-Only...`)

- Added `Content-Security-Policy-Report-Only` header in `vercel.json`
- Hash-based `script-src` (no `'unsafe-eval'`, no `'unsafe-inline'`)
- `'strict-dynamic'` propagates trust to dynamically loaded scripts
- Created `/api/csp-report` endpoint for violation logging
- Created `scripts/generate-csp.js` postbuild script for SHA-256 hash computation

**Why Report-Only first:** Deploying an enforcing CSP without monitoring can break third-party scripts silently. Report-Only surfaces violations without blocking anything.

### 2. COOP + CORP headers (same commit)

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

### 3. Trusted Types (commit: `feat(security): register Trusted Types...`)

- Registered `vue` policy (passthrough for Vue internals)
- Registered `default` policy (DOMPurify sanitizer as catch-all)
- Added `require-trusted-types-for 'script'` and `trusted-types default vue` to CSP
- Installed `dompurify` as a dependency
- Added safety comments on both `v-html` usages

### 4. Console cleanup (commit: `fix(console): guard console.debug...`)

- Guarded `console.debug` in `useHapticFeedback.js` with `import.meta.env.DEV`
- `console.error` in main.js error handler left intentionally (error boundary)

### 5. Permissions-Policy update

- Added `interest-cohort=()` to block FLoC/Topics API

### 6. Dependency audit

- Only vulnerability: katex (moderate, 5 CVEs) via vue3-notion — no fix available
- Dependabot configured for weekly scans
- See SECURITY.md for full CVE list and acceptance rationale

---

## CSP Rollout Plan: Report-Only to Enforcement

### Current state: Report-Only

The CSP is deployed as `Content-Security-Policy-Report-Only`. It logs violations to `/api/csp-report` but does not block anything.

### Steps to enforce

- [ ] Deploy to Vercel preview with Report-Only CSP
- [ ] Browse all routes manually (home, projects, blog, blog detail, explore, books, gears, journey, certificates, mentors, 404)
- [ ] Check Vercel function logs (`vercel logs --follow`) for CSP violations
- [ ] For each violation, determine if it's:
  - **Expected third-party:** Add origin to the CSP allowlist
  - **Unexpected inline script:** Add hash or refactor to external script
  - **Bug:** Fix the code
- [ ] Once no violations appear for at least one browsing session across all routes:
  1. Rename `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `vercel.json`
  2. Commit with message: `chore(security): enforce CSP (was report-only, violations reviewed)`
  3. Keep `report-uri /api/csp-report` to catch regressions
- [ ] Monitor `/api/csp-report` for 1 week after enforcement

### Debugging CSP violations locally

```bash
# Build and preview locally
npm run build
npx vite preview

# Open Chrome DevTools → Console tab
# CSP violations appear as warnings with the blocked directive name
# Compare against the CSP in vercel.json to identify the fix
```

### If the hash stops matching

The `scripts/generate-csp.js` postbuild script computes SHA-256 hashes of inline scripts in `dist/index.html` and patches `vercel.json`. If you see a CSP violation for the inline JSON-LD script:

1. Run `npm run build` — the postbuild script regenerates the hash
2. Check `vercel.json` — the hash should be updated
3. If `sha256-PLACEHOLDER` appears in the deployed `vercel.json`, the postbuild script didn't run — check the Vercel build logs

---

## Whitelisted CSP Origins

| Origin | Directive | Service |
|---|---|---|
| `https://www.googletagmanager.com` | `script-src`, `img-src` | GA4 script loader + measurement pixel |
| `https://cloud.umami.is` | `script-src`, `connect-src` | Umami Analytics script + beacon |
| `https://va.vercel-scripts.com` | `script-src`, `connect-src` | Vercel Analytics / Speed Insights |
| `https://vitals.vercel-insights.com` | `connect-src` | Vercel Core Web Vitals beacon |
| `https://www.google-analytics.com` | `connect-src` | GA4 event collection |
| `https://analytics.google.com` | `connect-src` | GA4 Measurement Protocol |

---

## Maintaining 100/100

### What to check before merging any PR

1. **New external scripts?** Add their origin to `script-src` in `vercel.json`
2. **New fetch/XHR endpoints?** Add to `connect-src`
3. **New inline scripts?** The postbuild script auto-hashes them, but verify with a build
4. **New `v-html` usage?** Document the data source and confirm it's trusted
5. **New `console.log/warn/debug`?** Guard with `import.meta.env.DEV`
6. **New dependencies?** Run `npm audit --omit=dev` before merging

### Lighthouse CI

Lighthouse CI is configured in `lighthouserc.js` with a hard fail on Best Practices < 100. This runs in the CI pipeline on every PR.
