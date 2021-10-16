export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'

export type GridColumns = {
	start: number
	end: number
}

export type AdaptiveGridColumns = Record<Breakpoint, GridColumns>

export type Image = {
	src: string
	alt: string
}
