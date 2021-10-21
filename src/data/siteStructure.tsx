export type Page = {
	id: string
	title: string
	path: string
}

export const siteIndex: Page = {
	id: 'site-index',
	title: 'Index',
	path: '/site-index',
}

export const sections: Page[] = [
	{
		id: 'technology',
		title: 'Technology',
		path: '/section/technology',
	},
	{
		id: 'design',
		title: 'Design',
		path: '/section/design',
	},
	{
		id: 'law',
		title: 'Law',
		path: '/section/law',
	},
]

export const writers: Page[] = [
	{
		id: 'vu',
		title: 'Vu Luong',
		path: '/by/vu-luong',
	},
	{
		id: 'justin',
		title: 'Justin Selig',
		path: '/by/justin-selig',
	},
]

export const other: Page[] = [
	siteIndex,
	{
		id: 'about',
		title: 'About',
		path: '/about',
	},
]

export const policies: Page[] = [
	{
		id: 'terms',
		title: 'Terms',
		path: '/policies/terms',
	},
	{
		id: 'privacy',
		title: 'Privacy',
		path: '/policies/privacy',
	},
	{
		id: 'accessibility',
		title: 'Accessibility',
		path: '/policies/accessibility',
	},
]
