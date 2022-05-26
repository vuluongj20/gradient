import { GatsbyImageProps } from 'gatsby-plugin-image'

import { ColCounts } from '@utils/style'

export type GridColumns = {
	start: number
	end: number
}

export type AdaptiveGridColumns = Record<keyof ColCounts, GridColumns>

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
	cover: GatsbyImageProps
	buildPage?: boolean
	path: string
}
