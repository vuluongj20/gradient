import * as d3 from 'd3'
import intersect from 'path-intersection'

import { Edge, Node } from '../graph'

type MutableNode = {
	id: Node['id']
	label: Node['label']
	index?: number
	x?: number
	y?: number
	vx?: number
	vy?: number
}

export function mapMutableNodes(node: Node): MutableNode {
	return { id: node.id, label: node.label }
}

type MutableEdge = {
	id: Edge['id']
	source: string | Node
	target: string | Node
	index?: number
}

export function mapMutableEdges(edge: Edge): MutableEdge {
	return {
		id: edge.id,
		source: edge.nodes[0].id,
		target: edge.nodes[1].id,
	}
}

export function renderSVGNodes(renderedNodes, data) {
	renderedNodes
		.selectAll('text')
		.data(data, (n) => n.id)
		.join((enter) =>
			enter
				.append('text')
				.text((d) => d.label)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'central'),
		)
}

export function renderSVGEdges(renderedEdges, data) {
	renderedEdges
		.selectAll('g')
		.data(data, (e) => e.id)
		.join((enter) => enter.append('g').append('line').attr('marker-end', 'url(#arrow)'))
}

export function getNodeBoundary(node) {
	const { x, y, label } = node
	const w = label.length * 4.5 + 10
	const h = 14

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

export function getEdgePath(d) {
	const { source, target } = d

	const edgePath = `M ${source.x}, ${source.y} L ${target.x} ${target.y}`

	const sourceNodeBoundary = getNodeBoundary(source)
	const targetNodeBoundary = getNodeBoundary(target)

	const sourceIntersect = intersect(sourceNodeBoundary, edgePath)[0]
	const targetIntersect = intersect(targetNodeBoundary, edgePath)[0]

	if (!sourceIntersect || !targetIntersect) {
		return {}
	}
	return {
		x1: sourceIntersect?.x,
		y1: sourceIntersect?.y,
		x2: targetIntersect?.x,
		y2: targetIntersect?.y,
	}
}

export function ticked({ edges, nodes }) {
	return () => {
		edges
			.selectAll('g')
			.datum((d) => ({ ...d, ...getEdgePath(d) }))
			.select('line')
			.attr('x1', (d) => d.x1)
			.attr('y1', (d) => d.y1)
			.attr('x2', (d) => d.x2)
			.attr('y2', (d) => d.y2)

		nodes.selectAll('text').attr('transform', (d) => `translate(${d.x} ${d.y})`)
	}
}

export function drag(simulation) {
	function dragstarted(event) {
		if (!event.active) simulation.alphaTarget(0.3).restart()
		event.subject.fx = event.subject.x
		event.subject.fy = event.subject.y
	}

	function dragged(event) {
		event.subject.fx = event.x
		event.subject.fy = event.y
	}

	function dragended(event) {
		if (!event.active) simulation.alphaTarget(0)
		event.subject.fx = null
		event.subject.fy = null
	}

	return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}
