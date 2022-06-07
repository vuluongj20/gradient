import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Graph } from './graph'

import useMountEffect from '@utils/hooks/useMountEffect'

type Props = {
	graph: Graph
}

const createForceGraph = ({
	nodes,
	edges,
	width = 640,
	height = 400,
	nodeFill = 'currentColor', // node stroke fill (if not using a group color encoding)
	nodeStroke = '#fff', // node stroke color
	nodeStrokeWidth = 1.5, // node stroke width, in pixels
	nodeStrokeOpacity = 1, // node stroke opacity
	nodeRadius = 5, // node radius, in pixels
	nodeStrength = 1,
	edgeStroke = '#999', // edge stroke color
	edgeStrokeOpacity = 0.6, // edge stroke opacity
	edgeStrokeWidth = 1.5, // given d in edges, returns a stroke width in pixels
	edgeStrokeLinecap = 'round', // edge stroke linecap
	edgeStrength = 1,
	colors = d3.schemeTableau10, // an array of color strings, for the node groups
}: Props) => {
	// Compute values.
	const N = d3.map(nodes, (n) => n.id).map(intern)
	const LS = d3.map(edges, (e) => e.nodes[0].id).map(intern)
	const LT = d3.map(edges, (e) => e.nodes[1].id).map(intern)
	const W = typeof edgeStrokeWidth !== 'function' ? null : d3.map(edges, edgeStrokeWidth)
	const L = typeof edgeStroke !== 'function' ? null : d3.map(edges, edgeStroke)

	// Replace the input nodes and edges with mutable objects for the simulation.
	const mutableNodes = d3.map(nodes, (_, i) => ({ id: N[i] }))
	const mutableEdges = d3.map(edges, (_, i) => ({ source: LS[i], target: LT[i] }))

	// Construct the forces.
	const forceNode = d3.forceManyBody()
	const forceLink = d3.forceLink(mutableEdges).id(({ index: i }) => N[i])
	if (nodeStrength !== undefined) forceNode.strength(nodeStrength)
	if (edgeStrength !== undefined) forceLink.strength(edgeStrength)

	const simulation = d3
		.forceSimulation(mutableNodes)
		.force('edge', forceLink)
		.force('charge', forceNode)
		.force('center', d3.forceCenter())
		.on('tick', ticked)

	const svg = d3
		.create('svg')
		.attr('viewBox', [-width / 2, -height / 2, width, height])
		.attr('preserveAspectRatio', 'xMidYMid meet')

	const renderedEdges = svg
		.append('g')
		.attr('stroke', typeof edgeStroke !== 'function' ? edgeStroke : null)
		.attr('stroke-opacity', edgeStrokeOpacity)
		.attr('stroke-width', typeof edgeStrokeWidth !== 'function' ? edgeStrokeWidth : null)
		.attr('stroke-linecap', edgeStrokeLinecap)
		.selectAll('line')
		.data(mutableEdges)
		.join('line')

	const renderedNodes = svg
		.append('g')
		.attr('fill', nodeFill)
		.attr('stroke', nodeStroke)
		.attr('stroke-opacity', nodeStrokeOpacity)
		.attr('stroke-width', nodeStrokeWidth)
		.selectAll('circle')
		.data(mutableNodes)
		.join('circle')
		.attr('r', nodeRadius)
		.attr('vector-effect', 'non-scaling-stroke')
		.call(drag(simulation))

	if (W) renderedEdges.attr('stroke-width', ({ index: i }) => W[i])
	if (L) renderedEdges.attr('stroke', ({ index: i }) => L[i])

	function intern(value) {
		return value !== null && typeof value === 'object' ? value.valueOf() : value
	}

	function ticked() {
		renderedEdges
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y)

		renderedNodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
	}

	function drag(simulation) {
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

	return { svg, nodes: renderedNodes, edges: renderedEdges }
}

const ForceGraph = ({ nodes, edges }) => {
	const ref = useRef<HTMLDivElement>()

	useMountEffect(() => {
		const { svg } = createForceGraph({ nodes, edges })
		ref.current.appendChild(svg.node())
	})

	useEffect(() => {
		console.log(edges)
	}, [edges])

	return <SVG ref={ref} />
}

export default ForceGraph

const SVG = styled.div`
	width: 100%;
	height: 24rem;
	svg {
		width: 100%;
		height: 100%;
	}
`
