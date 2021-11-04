export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'

export type GridColumns = {
	start: number
	end: number
}

export type AdaptiveGridColumns = Record<Breakpoint, GridColumns>

export type Image = {
	src: string
	alt: string
	aspectRatio?: 'square' | 'rect' | 'wide'
}

export type Page = {
	slug: string
	title: string
	path: string
}

export type Story = {
	slug: string
	title: string
	sections: string[]
	authors: string[]
	img: Image
}
