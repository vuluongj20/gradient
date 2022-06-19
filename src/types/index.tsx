import { IGatsbyImageData } from 'gatsby-plugin-image'

import { ColCounts } from '@utils/style'

export type GridColumns = {
	start: number
	end: number
}

export type AdaptiveGridColumns = Record<keyof ColCounts, GridColumns>

export type Page = {
	readonly slug: string
	readonly title: string
	readonly path: string
}

export type Section = {
	readonly slug: string
	readonly name: string
	readonly path: string
}

export type Author = {
	readonly slug: string
	readonly name: string
	readonly path: string
}

export type Story = {
	readonly slug: string
	readonly title: string
	readonly featuredIn?: readonly string[]
	readonly featuredSize: string
	readonly sections: readonly string[]
	readonly authors: readonly string[]
	readonly cover: {
		image: IGatsbyImageData
		alt: string
	}
	readonly buildPage?: boolean
	readonly path: string
}
