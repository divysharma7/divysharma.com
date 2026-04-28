import Home from './views/Home.vue'

export const routes = [
	{ path: '/', component: Home, meta: { title: 'Home' } },
	{
		path: '/projects',
		meta: { title: 'Projects' },
		component: () => import('./views/Projects.vue')
	},
	{
		path: '/explore',
		meta: { title: 'Explore' },
		component: () => import('./views/Explore.vue')
	},
	{
		path: '/books',
		meta: { title: 'Books' },
		component: () => import('./views/Books.vue')
	},
	{
		path: '/blog',
		meta: { title: 'Essays' },
		component: () => import('./views/Blog.vue')
	},
	{
		path: '/blog/:slug',
		name: 'BlogDetail',
		component: () => import('./views/BlogDetail.vue'),
		meta: { title: 'Blog' }
	},
	{
		path: '/projects/:proj',
		redirect: (to) => {
			return {
				path: `/p/${to.params.proj}`
			}
		}
	},
	{
		path: '/workexperience',
		meta: { title: 'experience' },
		component: () => import('./components/workexperience.vue')
	},
	{
		path: '/project/:proj',
		redirect: (to) => {
			return {
				path: `/p/${to.params.proj}`
			}
		}
	},
	{
		path: '/p',
		redirect: (to) => {
			return { path: `/projects` }
		}
	},
	{
		path: '/project',
		redirect: (to) => {
			return { path: `/projects` }
		}
	},
	{ path: '/p/:id', name: 'Page', component: () => import('./views/projects/project.vue') },
	{
		path: '/resume',
		meta: { title: 'Resume' },
		component: () => import('./views/Resume.vue')
	},
	{
		path: '/gears',
		meta: { title: 'Gears' },
		component: () => import('./views/Gears.vue')
	},
	{
		path: '/journey',
		meta: { title: 'Journey' },
		component: () => import('./views/Journey.vue')
	},
	{
		path: '/journey/certificates',
		meta: { title: 'Achievements' },
		component: () => import('./views/Certificates.vue')
	},
	{
		path: '/journey/mentors',
		meta: { title: 'Mentors' },
		component: () => import('./views/Mentors.vue')
	},
	{ path: '/:pathMatch(.*)', component: () => import('./views/NotFound.vue'), meta: { title: 'notfound' } }
]
