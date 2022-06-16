import { Selection } from 'd3-selection'

import { Edge, Node } from '../graph'

export type MutableNode = {
	id: Node['id']
	label: Node['label']
	index: number
	x?: number
	y?: number
	vx?: number
	vy?: number
	fx?: number | null
	fy?: number | null
}

export type MutableEdge = {
	id: Edge['id']
	index: number
	source: MutableNode
	target: MutableNode
	x1?: number
	y1?: number
	x2?: number
	y2?: number
}

export type RenderedNodes = Selection<
	SVGGElement,
	MutableNode[] | undefined,
	null,
	unknown
>
export type RenderedEdges = Selection<
	SVGGElement,
	MutableEdge[] | undefined,
	null,
	unknown
>
