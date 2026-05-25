/**
 * CSP violation report collector.
 * Receives violation reports from Content-Security-Policy-Report-Only
 * and logs them to Vercel function logs for review.
 *
 * View reports: `vercel logs --follow` or Vercel dashboard → Functions → Logs
 */
export default function handler(req, res) {
	if (req.method === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Origin', 'https://divysharma-com.vercel.app')
		res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
		return res.status(204).end()
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	const body = req.body
	const bodyStr = JSON.stringify(body)
	if (!body || bodyStr.length > 8192) {
		return res.status(400).end()
	}

	const report = body['csp-report'] || body
	if (report?.['document-uri'] && report?.['violated-directive']) {
		console.log('[CSP Violation]', JSON.stringify({
			'document-uri': report['document-uri'],
			'violated-directive': report['violated-directive'],
			'blocked-uri': report['blocked-uri'] || '',
			'source-file': report['source-file'] || '',
		}))
	}

	res.status(204).end()
}
