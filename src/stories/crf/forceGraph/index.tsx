import * as d3 from 'd3'
import { ForceLink, Simulation } from 'd3-force'
import { Selection } from 'd3-selection'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Edge, Node } from '../graph'
import { MutableEdge, MutableNode, RenderedEdges, RenderedNodes } from './types'
import {
	drag,
	mapMutableEdges,
	mapMutableNodes,
	renderSVGEdges,
	renderSVGNodes,
	ticked,
} from './utils'

import { isDefined } from '@utils/functions'
import useEffectOnceDefined from '@utils/useEffectOnceDefined'
import useSize from '@utils/useSize'

type Render = {
	svg: Selection<SVGSVGElement, unknown, null, unknown>
	mutableNodes: MutableNode[]
	mutableEdges: MutableEdge[]
	renderedNodes: RenderedNodes
	renderedEdges: RenderedEdges
	simulation: Simulation<MutableNode, MutableEdge>
}

type Props = {
	nodes: Node[]
	edges: Edge[]
}

const ForceGraph = ({ nodes, edges }: Props) => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const render = useRef<Render>()

	const { width, height } = useSize(wrapRef)

	//
	// Draw initial graph
	//
	useEffectOnceDefined(() => {
		if (!svgRef.current || !isDefined(width) || !isDefined(height)) return

		const mutableNodes = nodes.map(mapMutableNodes)
		const mutableEdges = edges.map((e, i) => mapMutableEdges(e, i, mutableNodes))

		const svg = d3
			.select(svgRef.current)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
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

		const renderedEdges = (svg.append('g') as RenderedEdges)
			.attr('stroke', '#CCCCCC')
			.attr('stroke-width', 2)
			.attr('stroke-linecap', 'round')
			.call(renderSVGEdges, mutableEdges)

		const renderedNodes = (svg.append('g') as RenderedNodes)
			.attr('fill', 'currentColor')
			.call(renderSVGNodes, mutableNodes)

		// Construct the forces.
		const forceNode = d3.forceManyBody<MutableNode>().strength(-800)
		const forceLink = d3
			.forceLink<MutableNode, MutableEdge>(mutableEdges)
			.id((e) => e.id)
			.strength(1)
			.distance((e) => {
				const minDistance = 50
				const sourceCutoff = e.source.label.length * 4.5 + 10
				const targetCutoff = e.target.label.length * 4.5 + 10
				return minDistance + sourceCutoff + targetCutoff
			})

		const simulation: Simulation<MutableNode, MutableEdge> = d3
			.forceSimulation<MutableNode>(mutableNodes)
			.force('link', forceLink)
			.force('charge', forceNode)
			.force('center', d3.forceCenter().strength(0.1))
			.on('tick', ticked(renderedNodes, renderedEdges))

		renderedNodes.selectAll<SVGTextElement, MutableNode>('text').call(drag(simulation))

		render.current = {
			svg,
			renderedNodes,
			renderedEdges,
			mutableNodes,
			mutableEdges,
			simulation,
		}
	}, [width, height])

	//
	// Update graph when edges list changes
	//
	useEffect(() => {
		if (!render.current) return
		const { renderedEdges, simulation, mutableNodes } = render.current

		const mutableEdges = edges.map((e, i) => mapMutableEdges(e, i, mutableNodes))

		renderedEdges.call(renderSVGEdges, mutableEdges)
		simulation.force<ForceLink<MutableNode, MutableEdge>>('link')?.links(mutableEdges)

		render.current.mutableEdges = mutableEdges
	}, [edges])

	//
	// Update graph when nodes list changes
	//
	useEffect(() => {
		if (!render.current) return

		const { mutableNodes: oldMutableNodes, renderedNodes, simulation } = render.current

		const oldMutableNodesMap = new Map(oldMutableNodes.map((d) => [d.id, d]))
		const mutableNodes = nodes.map((d, i) =>
			Object.assign(oldMutableNodesMap.get(d.id) || {}, mapMutableNodes(d, i)),
		)
		renderedNodes.call(renderSVGNodes, mutableNodes)
		renderedNodes.selectAll<SVGTextElement, MutableNode>('text').call(drag(simulation))

		simulation.nodes(mutableNodes)

		render.current.mutableNodes = mutableNodes
	}, [nodes])

	//
	// Update SVG dimensions when width or height changes
	//
	useEffect(() => {
		if (!render.current || !isDefined(width) || !isDefined(height)) return

		const { svg } = render.current
		svg.attr('viewBox', [-width / 2, -height / 2, width, height])
	}, [width, height])

	return (
		<Wrap ref={wrapRef}>
			<SVG ref={svgRef} />
		</Wrap>
	)
}

export default ForceGraph

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 24rem;
	${(p) => p.theme.text.viz.body};
`

const SVG = styled.svg`
	height: 100%;
	width: auto;
`
