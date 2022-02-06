import { ImageDataLike } from 'gatsby-plugin-image'

import { Breakpoint } from '@utils/style'

export type GridColumns = {
	start: number
	end: number
}

export type AdaptiveGridColumns = Record<Breakpoint, GridColumns>

export type Image = {
	src: ImageDataLike
	alt: string
	aspectRatio?: 'square' | 'rect' | 'wide'
	loading?: 'eager' | 'lazy'
}

export type Page = {
	slug: string
	title: string
	path: string
}

export type Section = {
	slug: string
	name: string
	path: string
}

export type Story = {
	slug: string
	title: string
	featuredIn?: string[]
	featuredSize?: string
	sections: string[]
	authors: string[]
	image: Image
	buildPage?: boolean
	path: string
}
