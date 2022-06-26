import * as d3 from 'd3'
import { ForceLink, Simulation } from 'd3-force'
import { Selection } from 'd3-selection'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Graph from '../../model/graph'
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
	graph: Graph
	width?: number
	height?: number
	simulationPlayState: boolean
	setSvgReady: Dispatch<SetStateAction<boolean>>
}

const ForceGraph = ({
	graph,
	width,
	height,
	simulationPlayState,
	setSvgReady,
}: Props) => {
	const ref = useRef<SVGSVGElement>(null)
	const render = useRef<Render>()

	//
	// Draw initial graph
	//
	useEffectOnceDefined(() => {
		if (!ref.current || !isDefined(width) || !isDefined(height)) return

		const mutableNodes = graph.nodes.map(mapMutableNodes)
		const mutableEdges = graph.edges.map((e, i) => mapMutableEdges(e, i, mutableNodes))

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
		setSvgReady(true)
	}, [width, height])

	//
	// Update graph when nodes or edges have been updated
	//
	useEffect(
		() =>
			autorun(() => {
				const newMutableNodes = graph.nodes.map(mapMutableNodes)
				const oldMutableNodesMap = new Map(
					(render.current?.mutableNodes ?? newMutableNodes).map((d) => [d.id, d]),
				)
				const combinedMutableNodes = graph.nodes.map((d, i) =>
					Object.assign(oldMutableNodesMap.get(d.id) || {}, newMutableNodes[i]),
				)
				const newMutableEdges = graph.edges.map((e, i) =>
					mapMutableEdges(e, i, combinedMutableNodes),
				)

				if (!render.current) return

				const { renderedNodes, renderedEdges, simulation } = render.current

				renderedNodes.call(renderSVGNodes, combinedMutableNodes)
				renderedNodes.selectAll<SVGTextElement, MutableNode>('g').call(drag(simulation))
				renderedEdges.call(renderSVGEdges, newMutableEdges)

				simulation.nodes(combinedMutableNodes)
				simulation
					.force<ForceLink<MutableNode, MutableEdge>>('link')
					?.links(newMutableEdges)

				render.current.mutableNodes = combinedMutableNodes
				render.current.mutableEdges = newMutableEdges
			}),
		[graph.nodes, graph.edges],
	)

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

export default observer(ForceGraph)

const SVG = styled.svg`
	${(p) => p.theme.text.viz.body};

	height: 100%;
	width: auto;

	/* 
	  Node styles
	*/
	g.nodes-group {
		fill: currentcolor;
	}
	rect.node-box {
		stroke: ${(p) => p.theme.bar};
		stroke-opacity: 0;
		fill: currentcolor;
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
