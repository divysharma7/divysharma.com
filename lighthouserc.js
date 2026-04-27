export default {
	ci: {
		collect: {
			staticDistDir: './dist',
			numberOfRuns: 3
		},
		assert: {
			assertions: {
				'categories:best-practices': ['error', { minScore: 1 }],
				'categories:performance': ['warn', { minScore: 0.9 }],
				'categories:accessibility': ['warn', { minScore: 0.9 }]
			}
		},
		upload: {
			target: 'temporary-public-storage'
		}
	}
}
