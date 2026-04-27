#!/usr/bin/env node
/**
 * Postbuild: inlines critical CSS and async-loads the full stylesheets.
 *
 * For a Vue SPA the HTML is empty at build time (<div id="app"></div>),
 * so tools like Critters can't detect above-the-fold selectors.
 * Instead, we:
 *   1. Extract a minimal critical CSS snippet from the main stylesheet
 *      (font-face, CSS custom properties, body/html reset, background)
 *   2. Inline it as <style> in <head>
 *   3. Convert <link rel="stylesheet"> to async preload+swap pattern
 *   4. Add <noscript> fallback for each stylesheet
 *
 * Runs via `npm run postbuild` after `vite build`.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist', 'index.html')

// --- Critical CSS extraction ---

/**
 * Extract critical CSS rules from the full stylesheet.
 * We grab: @font-face, :root (custom properties), html/body base styles,
 * ::selection, :focus-visible, and the .cont layout class.
 */
function extractCriticalCSS(cssContent) {
	const critical = []

	// @font-face blocks
	const fontFaceRegex = /@font-face\s*\{[^}]+\}/g
	let match
	while ((match = fontFaceRegex.exec(cssContent)) !== null) {
		critical.push(match[0])
	}

	// :root block (CSS custom properties / design tokens)
	const rootRegex = /:root\s*\{[^}]+\}/g
	while ((match = rootRegex.exec(cssContent)) !== null) {
		critical.push(match[0])
	}

	// html and body rules (reset + base styles)
	// Match simple selectors like `html{...}`, `body{...}`, `html,body,...{...}`
	const baseResetRegex = /(?:^|[},])([^{}]*(?:\bhtml\b|\bbody\b)[^{]*)\{([^}]+)\}/g
	while ((match = baseResetRegex.exec(cssContent)) !== null) {
		const selector = match[1].trim()
		const rules = match[2].trim()
		// Only grab compact selectors, not component-specific ones
		if (!selector.includes('.') && !selector.includes('#') && !selector.includes('>') && !selector.includes('[data-')) {
			critical.push(`${selector}{${rules}}`)
		}
	}

	// ::selection
	const selectionRegex = /::selection\s*\{[^}]+\}/g
	while ((match = selectionRegex.exec(cssContent)) !== null) {
		critical.push(match[0])
	}

	// :focus-visible
	const focusRegex = /:focus-visible\s*\{[^}]+\}/g
	while ((match = focusRegex.exec(cssContent)) !== null) {
		critical.push(match[0])
	}

	return critical.join('')
}

// --- HTML transformation ---

let html
try {
	html = readFileSync(distIndex, 'utf8')
} catch (err) {
	console.error('[inline-critical-css] Could not read dist/index.html')
	process.exit(1)
}

// Find all <link rel="stylesheet"> tags
const linkRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/g
const links = []
let linkMatch
while ((linkMatch = linkRegex.exec(html)) !== null) {
	links.push({ fullMatch: linkMatch[0], href: linkMatch[1] })
}

if (links.length === 0) {
	console.log('[inline-critical-css] No stylesheet links found — skipping')
	process.exit(0)
}

console.log(`[inline-critical-css] Found ${links.length} stylesheet(s)`)

// Find the main (index) stylesheet and extract critical CSS from it
let criticalCSS = ''
for (const link of links) {
	const isIndex = link.href.includes('index-')
	if (isIndex) {
		try {
			const cssPath = resolve(root, 'dist', link.href.replace(/^\//, ''))
			const cssContent = readFileSync(cssPath, 'utf8')
			criticalCSS = extractCriticalCSS(cssContent)
			console.log(`[inline-critical-css] Extracted ${criticalCSS.length} bytes of critical CSS from ${link.href}`)
		} catch (err) {
			console.warn(`[inline-critical-css] Could not read ${link.href} — skipping critical extraction`)
		}
	}
}

// Build replacement HTML
let insertions = ''

// Inline critical CSS if we extracted any
if (criticalCSS) {
	insertions += `<style>${criticalCSS}</style>`
}

// Convert each stylesheet link to async preload pattern
for (const link of links) {
	insertions += `<link rel="preload" as="style" href="${link.href}" crossorigin onload="this.onload=null;this.rel='stylesheet'">`
	insertions += `<noscript><link rel="stylesheet" href="${link.href}" crossorigin></noscript>`
}

// Replace original links with async versions
// Remove all original link tags first
let newHtml = html
for (const link of links) {
	newHtml = newHtml.replace(link.fullMatch, '')
}

// Insert the critical CSS + async links right before </head>
newHtml = newHtml.replace('</head>', insertions + '</head>')

writeFileSync(distIndex, newHtml, 'utf8')
console.log('[inline-critical-css] Patched dist/index.html with critical CSS + async stylesheet loading')
