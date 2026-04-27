#!/usr/bin/env node
/**
 * Postbuild script: computes SHA-256 hashes for inline scripts in dist/index.html
 * and patches the CSP header in vercel.json with real hashes.
 *
 * Runs automatically via `npm run postbuild` (which fires after `vite build`).
 *
 * How it works:
 *   1. Reads dist/index.html
 *   2. Extracts all inline <script> content (e.g. JSON-LD)
 *   3. Computes SHA-256 hashes for each
 *   4. Replaces 'sha256-PLACEHOLDER' in vercel.json with the real hashes
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function computeSHA256(content) {
	return createHash('sha256').update(content, 'utf8').digest('base64')
}

function extractInlineScripts(html) {
	const scripts = []
	// Match inline <script ...>content</script> (non-empty, no src attribute)
	const regex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi
	let match
	while ((match = regex.exec(html)) !== null) {
		const content = match[1].trim()
		if (content) {
			scripts.push(content)
		}
	}
	return scripts
}

// --- Main ---

const distIndex = resolve(root, 'dist', 'index.html')
let html
try {
	html = readFileSync(distIndex, 'utf8')
} catch (err) {
	console.error('[generate-csp] Could not read dist/index.html — did the build succeed?')
	process.exit(1)
}

const inlineScripts = extractInlineScripts(html)
console.log(`[generate-csp] Found ${inlineScripts.length} inline script(s) in dist/index.html`)

const hashes = inlineScripts.map((script) => {
	const hash = computeSHA256(script)
	console.log(`  → 'sha256-${hash}'`)
	return `'sha256-${hash}'`
})

// Read vercel.json and replace placeholder
const vercelJsonPath = resolve(root, 'vercel.json')
let vercelJson = readFileSync(vercelJsonPath, 'utf8')

if (!vercelJson.includes('sha256-PLACEHOLDER')) {
	console.log('[generate-csp] No sha256-PLACEHOLDER found in vercel.json — nothing to replace')
	process.exit(0)
}

// Replace the placeholder with all computed hashes
const hashString = hashes.length > 0 ? hashes.join(' ') : "'sha256-PLACEHOLDER'"
vercelJson = vercelJson.replace(/'sha256-PLACEHOLDER'/g, hashString)

writeFileSync(vercelJsonPath, vercelJson, 'utf8')
console.log(`[generate-csp] Patched vercel.json with ${hashes.length} hash(es)`)
