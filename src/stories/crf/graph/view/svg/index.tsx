import { useOverlayTriggerState } from '@react-stately/overlays'
import * as d3 from 'd3'
import { ForceLink, Simulation } from 'd3-force'
import { Selection } from 'd3-selection'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Edge from '../../model/edge'
import Node from '../../model/node'
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
	width?: number
	height?: number
	simulationPlayState: boolean
}

const ForceGraph = ({ nodes, edges, width, height, simulationPlayState }: Props) => {
	const ref = useRef<SVGSVGElement>(null)
	const render = useRef<Render>()

	//
	// Draw initial graph
	//
	useEffectOnceDefined(() => {
		if (!ref.current || !isDefined(width) || !isDefined(height)) return

		const mutableNodes = nodes.map(mapMutableNodes)
		const mutableEdges = edges.map((e, i) => mapMutableEdges(e, i, mutableNodes))

		const svg = d3
			.select(ref.current)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
		svg
			.append('def')
			.append('marker')
			.classed('arrow', true)
			.attr('id', 'arrow')
			.attr('viewBox', [0, 0, 5, 5])
			.attr('markerWidth', 5)
			.attr('markerHeight', 5)
			.attr('refX', 4)
			.attr('refY', 2.5)
			.attr('orient', 'auto-start-reverse')
			.append('path')
			.attr('d', 'M 1,1 L 4,2.5 L 1,4')

		const renderedEdges = (svg.append('g') as RenderedEdges)
			.classed('edges-group', true)
			.call(renderSVGEdges, mutableEdges)

		const renderedNodes = (svg.append('g') as RenderedNodes)
			.classed('nodes-group', true)
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

		renderedNodes.selectAll<SVGTextElement, MutableNode>('g').call(drag(simulation))

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
		renderedNodes.selectAll<SVGTextElement, MutableNode>('g').call(drag(simulation))

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

	//
	// Sync simulation's play state with simulationPlayState
	//
	useEffect(() => {
		if (!render.current) return

		const { simulation } = render.current
		if (simulationPlayState) {
			simulation.restart()
			return
		}
		simulation.stop()
	}, [simulationPlayState])

	return <SVG ref={ref} />
}

export default ForceGraph

const SVG = styled.svg`
	height: 100%;
	width: auto;

	/* 
	  Node styles
	*/
	g.nodes-group {
		fill: currentColor;
	}
	rect.node-box {
		stroke: ${(p) => p.theme.bar};
		stroke-opacity: 0;
		fill: currentColor;
		fill-opacity: 0;
		cursor: pointer;
		transition: ${(p) => p.theme.animation.fastOut};
		&:hover {
			stroke-opacity: 0.5;
			fill-opacity: 0.05;
		}
		& + text {
			pointer-events: none;
		}
	}
	g.node-wrap {
		&.pressed > rect.node-box {
			stroke-opacity: 1;
			fill-opacity: 0.1;
		}
		&.focused > rect.node-box {
			stroke-opacity: 1;
			${(p) => p.theme.utils.svgFocusVisible};
		}
	}

	/* 
	  Edge styles
	*/
	g.edges-group,
	marker.arrow {
		fill: none;
		stroke: ${(p) => p.theme.bar};
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	g.edges-group {
		stroke-width: 2;
	}
`
