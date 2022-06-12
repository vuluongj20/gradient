import * as d3 from 'd3'
import { Simulation } from 'd3-force'
import { Selection } from 'd3-selection'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Edge, Node } from '../graph'
import {
	drag,
	mapMutableEdges,
	mapMutableNodes,
	renderSVGEdges,
	renderSVGNodes,
	ticked,
} from './utils'

import useMountEffect from '@utils/hooks/useMountEffect'

type Render = {
	svg: SVGSVGElement
	mutableNodes: ReturnType<typeof mapMutableNodes>[]
	mutableEdges: ReturnType<typeof mapMutableEdges>[]
	renderedNodes: Selection<SVGGElement, Render['mutableNodes'], SVGSVGElement, unknown>
	renderedEdges: Selection<SVGGElement, Render['mutableEdges'], SVGSVGElement, unknown>
	simulation: Simulation
}

type Props = {
	nodes: Node[]
	edges: Edge[]
}

const ForceGraph = ({ nodes, edges }: Props) => {
	const ref = useRef<HTMLDivElement>()
	const render = useRef<Render>()

	useMountEffect(() => {
		const width = 640
		const height = 320

		const mutableNodes = d3.map(nodes, mapMutableNodes)
		const mutableEdges = d3.map(edges, mapMutableEdges)

		const svg = d3
			.create('svg')
			.attr('viewBox', [0, 0, width, height])
			.attr('preserveAspectRatio', 'xMidYMid meet')

		svg
			.append('def')
			.append('marker')
			.attr('id', 'arrow')
			.attr('viewBox', [0, 0, 5, 5])
			.attr('markerWidth', 5)
			.attr('markerHeight', 5)
			.attr('refX', 4)
			.attr('refY', 2.5)
			.attr('orient', 'auto-start-reverse')
			.append('path')
			.attr('d', 'M 1,1 L 4,2.5 L 1,4')
			.attr('stroke', '#CCCCCC')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round')
			.attr('fill', 'none')

		const renderedEdges = svg
			.append('g')
			.attr('stroke', '#CCCCCC')
			.attr('stroke-width', 2)
			.attr('stroke-linecap', 'round')
			.call(renderSVGEdges, mutableEdges)

		const renderedNodes = svg
			.append('g')
			.attr('fill', 'currentColor')
			.call(renderSVGNodes, mutableNodes)

		// Construct the forces.
		const forceNode = d3.forceManyBody().strength(-800)
		const forceLink = d3
			.forceLink(mutableEdges)
			.id((e) => e.id)
			.strength(1)
			.distance((e) => {
				const minDistance = 50
				const sourceCutoff = e.source.label.length * 4.5 + 10
				const targetCutoff = e.target.label.length * 4.5 + 10
				return minDistance + sourceCutoff + targetCutoff
			})

		const simulation = d3
			.forceSimulation(mutableNodes)
			.force('link', forceLink)
			.force('charge', forceNode)
			.force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
			.on('tick', ticked({ edges: renderedEdges, nodes: renderedNodes }))

		renderedNodes.selectAll('text').call(drag(simulation))

		render.current = {
			svg,
			renderedNodes,
			renderedEdges,
			mutableNodes,
			mutableEdges,
			simulation,
		}
		ref.current.appendChild(svg.node())
	})

	useEffect(() => {
		if (!render.current) return
		const { renderedEdges, simulation } = render.current

		const mutableEdges = d3.map(edges, mapMutableEdges)

		renderedEdges.call(renderSVGEdges, mutableEdges)
		simulation.force('link').links(mutableEdges)

		render.current.mutableEdges = mutableEdges
	}, [edges])

	useEffect(() => {
		if (!render.current) return
		const { mutableNodes: oldMutableNodes, renderedNodes, simulation } = render.current

		const oldMutableNodesMap = new Map(oldMutableNodes.map((d) => [d.id, d]))
		const mutableNodes = nodes.map((d) =>
			Object.assign(oldMutableNodesMap.get(d.id) || {}, mapMutableNodes(d)),
		)
		renderedNodes.call(renderSVGNodes, mutableNodes)
		renderedNodes.selectAll('text').call(drag(simulation))

		simulation.nodes(mutableNodes)

		render.current.mutableNodes = mutableNodes
	}, [nodes])

	return <SVG ref={ref} />
}

export default ForceGraph

const SVG = styled.div`
	width: 100%;
	height: 24rem;
	svg {
		width: 100%;
		height: 100%;
		${(p) => p.theme.text.viz.body};
	}
`
