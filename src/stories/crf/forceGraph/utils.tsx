import * as d3 from 'd3'
import { D3DragEvent } from 'd3-drag'
import { Simulation } from 'd3-force'
import intersect from 'path-intersection'

import { Edge, Node } from '../graph'
import { MutableEdge, MutableNode, RenderedEdges, RenderedNodes } from './types'

export function mapMutableNodes(node: Node, index: number): MutableNode {
	return { index, id: node.id, label: node.label }
}

export function mapMutableEdges(
	edge: Edge,
	index: number,
	mutableNodes: MutableNode[],
): MutableEdge {
	return {
		index,
		id: edge.id,
		source: mutableNodes.find((n) => n.id === edge.nodes[0].id) as MutableNode,
		target: mutableNodes.find((n) => n.id === edge.nodes[1].id) as MutableNode,
	}
}

export function renderSVGNodes(renderedNodes: RenderedNodes, data: MutableNode[]) {
	renderedNodes
		.selectAll('text')
		.data<MutableNode>(data, (n) => (n as MutableNode).id)
		.join((enter) =>
			enter
				.append('text')
				.text((d) => d.label)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'central'),
		)
}

export function renderSVGEdges(renderedEdges: RenderedEdges, data: MutableEdge[]) {
	renderedEdges
		.selectAll('g')
		.data<MutableEdge>(data, (e) => (e as MutableEdge).id)
		.join((enter) => enter.append('g').append('line').attr('marker-end', 'url(#arrow)'))
}

export function getNodeBoundary(node: MutableNode) {
	const { x, y, label } = node
	const w = label.length * 4.5 + 10
	const h = 14

	if (!x || !y) return null

	return [
		`M ${x},${y - h}`,
		`H ${x + w - h}`,
		`Q ${x + w}, ${y - h}, ${x + w}, ${y}`,
		`Q ${x + w}, ${y + h}, ${x + w - h}, ${y + h}`,
		`H ${x - w + h}`,
		`Q ${x - w}, ${y + h}, ${x - w}, ${y}`,
		`Q ${x - w}, ${y - h}, ${x - w + h}, ${y - h}`,
		'z',
	].join(' ')
}

function getUpdatedMutableEdge(edge: MutableEdge) {
	const { source, target } = edge

	if (!source.x || !source.y || !target.x || !target.y) return edge

	const edgePath = `M ${source.x}, ${source.y} L ${target.x} ${target.y}`

	const sourceNodeBoundary = getNodeBoundary(source)
	const targetNodeBoundary = getNodeBoundary(target)

	if (!sourceNodeBoundary || !targetNodeBoundary) return edge

	const sourceIntersect = intersect(sourceNodeBoundary, edgePath)[0]
	const targetIntersect = intersect(targetNodeBoundary, edgePath)[0]

	if (!sourceIntersect || !targetIntersect) return edge

	return {
		...edge,
		x1: sourceIntersect.x,
		y1: sourceIntersect.y,
		x2: targetIntersect.x,
		y2: targetIntersect.y,
	}
}

export function ticked(renderedNodes: RenderedNodes, renderedEdges: RenderedEdges) {
	return () => {
		renderedEdges
			.selectAll('g')
			.datum<MutableEdge>((edge) => getUpdatedMutableEdge(edge as MutableEdge))
			.select('line')
			.attr('x1', (d) => d.x1 ?? null)
			.attr('y1', (d) => d.y1 ?? null)
			.attr('x2', (d) => d.x2 ?? null)
			.attr('y2', (d) => d.y2 ?? null)

		renderedNodes.selectAll('text').attr('transform', (d) => {
			const { x, y } = d as MutableNode
			return x && y ? `translate(${x} ${y})` : null
		})
	}
}

export function drag(simulation: Simulation<MutableNode, MutableEdge>) {
	function dragstarted(event: D3DragEvent<SVGTextElement, MutableNode, MutableNode>) {
		if (!event.active) simulation.alphaTarget(0.3).restart()
		event.subject.fx = event.subject.x
		event.subject.fy = event.subject.y
	}

	function dragged(event: D3DragEvent<SVGTextElement, MutableNode, MutableNode>) {
		event.subject.fx = event.x
		event.subject.fy = event.y
	}

	function dragended(event: D3DragEvent<SVGTextElement, MutableNode, MutableNode>) {
		if (!event.active) simulation.alphaTarget(0)
		event.subject.fx = null
		event.subject.fy = null
	}

	return d3
		.drag<SVGTextElement, MutableNode>()
		.on('start', dragstarted)
		.on('drag', dragged)
		.on('end', dragended)
}
