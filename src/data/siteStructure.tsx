export type Page = {
	id: string
	title: string
	path: string
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
	{
		id: 'index',
		title: 'Index',
		path: '/site-index',
	},
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
		path: '/terms',
	},
	{
		id: 'privacy',
		title: 'Privacy',
		path: '/privacy',
	},
	{
		id: 'accessibility',
		title: 'Accessibility',
		path: '/accessibility',
	},
]
