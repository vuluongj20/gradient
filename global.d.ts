type Image = {
	src: string
	alt: string
}

type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'

type GridColumns = {
	start: number
	end: number
}

type AdaptiveGridColumns = Record<Breakpoint, GridColumns>
