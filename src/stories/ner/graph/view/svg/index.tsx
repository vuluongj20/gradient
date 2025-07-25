import {
	ForceLink,
	Simulation,
	forceCenter,
	forceLink,
	forceManyBody,
	forceSimulation,
	forceX,
	forceY,
} from 'd3-force'
import { Selection, select } from 'd3-selection'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'

import BaseEdge from '../../model/edge'
import Graph from '../../model/graph'
import BaseNode from '../../model/node'
import {
	MutableEdge,
	MutableNode,
	NodeEventListener,
	RenderedEdges,
	RenderedNodes,
} from './types'
import {
	dragCallback,
	mapMutableEdges,
	mapMutableNodes,
	renderSVGEdges,
	renderSVGNodes,
	ticked,
} from './utils'

import { isDefined } from '@utils/functions'
import { tl } from '@utils/text'
import useEffectOnceDefined from '@utils/useEffectOnceDefined'

interface Render {
	svg: Selection<SVGSVGElement, unknown, null, unknown>
	mutableNodes: MutableNode[]
	mutableEdges: MutableEdge[]
	renderedNodes: RenderedNodes
	renderedEdges: RenderedEdges
	simulation: Simulation<MutableNode, MutableEdge>
}

export interface ForceGraphProps<Node extends BaseNode, Edge extends BaseEdge> {
	graph: Graph<Node, Edge>
	width?: number
	height?: number
	disableForceNode?: boolean
	disableForceEdge?: boolean
	disableForceCenter?: boolean
	minNodeDistance?: number
	nodeEventListeners?: NodeEventListener[]
	simulationPlayState: boolean
	setSvgReady: Dispatch<SetStateAction<boolean>>
}

const ForceGraph = <Node extends BaseNode, Edge extends BaseEdge>({
	graph,
	width,
	height,
	disableForceNode,
	disableForceEdge,
	disableForceCenter,
	minNodeDistance = 50,
	nodeEventListeners,
	simulationPlayState,
	setSvgReady,
}: ForceGraphProps<Node, Edge>) => {
	const ref = useRef<SVGSVGElement>(null)
	const render = useRef<Render>()

	const arrowMarkerId = useMemo(() => nanoid(), [])

	//
	// Draw initial graph
	//
	useEffectOnceDefined(() => {
		if (!ref.current || !isDefined(width) || !isDefined(height)) return

		const mutableNodes = graph.nodes.map(mapMutableNodes)
		const mutableEdges = graph.edges.map((e, i) => mapMutableEdges(e, i, mutableNodes))

		const svg = select(ref.current).attr('viewBox', [
			-width / 2,
			-height / 2,
			width,
			height,
		])
		svg
			.append('defs')
			.append('marker')
			.attr('id', `arrow-marker-${arrowMarkerId}`)
			.attr('viewBox', [0, 0, 5, 5])
			.attr('markerWidth', 5)
			.attr('markerHeight', 5)
			.attr('markerUnits', 'strokeWidth')
			.attr('refX', 4)
			.attr('refY', 2.5)
			.attr('orient', 'auto-start-reverse')
			.append('path')
			.attr('d', 'M 1,1 L 4,2.5 L 1,4')

		const renderedEdges = (svg.append('g') as RenderedEdges)
			.classed('edges', true)
			.call(renderSVGEdges, mutableEdges, arrowMarkerId)

		const renderedNodes = (svg.append('g') as RenderedNodes)
			.classed('nodes', true)
			.call(renderSVGNodes, mutableNodes, nodeEventListeners)

		// Construct the forces.
		const forceNode = forceManyBody<MutableNode>().strength(disableForceNode ? 0 : -800)
		const forceEdge = forceLink<MutableNode, MutableEdge>(mutableEdges)
			.id((e) => e.id)
			.strength(disableForceEdge ? 0 : 1)
			.distance((e) => {
				const sourceCutoff = e.source.label.length * 4.5 + 10
				const targetCutoff = e.target.label.length * 4.5 + 10
				return minNodeDistance + sourceCutoff + targetCutoff
			})

		const simulation: Simulation<MutableNode, MutableEdge> = forceSimulation<MutableNode>(
			mutableNodes,
		)
			.force('link', forceEdge)
			.force('charge', forceNode)
			.force('center', forceCenter().strength(disableForceCenter ? 0 : 0.1))
			.force(
				'y',
				forceY<MutableNode>((n) => n.forceY ?? 0).strength((n) =>
					isDefined(n.forceY) ? 5 : 0,
				),
			)
			.force(
				'x',
				forceX<MutableNode>((n) => n.forceX ?? 0).strength((n) =>
					isDefined(n.forceX) ? 5 : 0,
				),
			)
			.on('tick', ticked(renderedNodes, renderedEdges))

		renderedNodes
			.selectAll<SVGTextElement, MutableNode>('g')
			.call(dragCallback(simulation))

		render.current = {
			svg,
			renderedNodes,
			renderedEdges,
			mutableNodes,
			mutableEdges,
			simulation,
		}
		setSvgReady(true)
	}, [width, height, minNodeDistance])

	//
	// Update graph when nodes or edges have been updated
	//
	useEffect(
		() =>
			autorun(() => {
				const newMutableNodes = graph.nodes
					.map(mapMutableNodes)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.map(({ x, y, ...node }) => node)
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

				renderedNodes.call(renderSVGNodes, combinedMutableNodes, nodeEventListeners)
				renderedNodes
					.selectAll<SVGTextElement, MutableNode>('g')
					.call(dragCallback(simulation))
				renderedEdges.call(renderSVGEdges, newMutableEdges, arrowMarkerId)

				simulation.nodes(combinedMutableNodes)
				simulation
					.force<ForceLink<MutableNode, MutableEdge>>('link')
					?.links(newMutableEdges)
				simulation.alpha(0.1).restart()

				render.current.mutableNodes = combinedMutableNodes
				render.current.mutableEdges = newMutableEdges
			}),
		[graph.nodes, graph.edges, arrowMarkerId, nodeEventListeners],
	)

	//
	// Update graph when list of highlighted nodes has been updated
	//
	useEffect(
		() =>
			autorun(() => {
				const highlightedNodes = new Set(
					graph.nodes.filter((n) => n.isHighlighted).map((n) => n.id),
				)

				if (!render.current) return
				const { renderedNodes } = render.current
				renderedNodes
					.selectAll('g.node-wrap')
					.classed('highlighted', (n) => highlightedNodes.has((n as MutableNode).id))
			}),
		[graph.nodes],
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
			simulation.alpha(0).restart()
			return
		}
		simulation.stop()
	}, [simulationPlayState])

	const title = useMemo(() => {
		const { nodes, edges } = graph

		return tl(
			`A graphical structure consisting of ${nodes.length} {1,node,nodes}: $1.${
				edges.length > 0 ? ` There are directed edges $2.` : ''
			}`,
			nodes.map((n) => n.label),
			edges.map(
				(e) =>
					`from ${graph.getNode(e.nodes.source).label} to ${
						graph.getNode(e.nodes.target).label
					}`,
			),
		).join('')
	}, [graph])

	return <SVG ref={ref} aria-label={title} />
}

export default observer(ForceGraph)

const SVG = styled.svg`
	${(p) => p.theme.vizText.body};
	overflow: hidden;

	height: 100%;
	width: auto;

	/* 
	  Node styles
	*/
	g.nodes {
		fill: currentcolor;
	}
	g.node-wrap {
		rect.node-box {
			stroke: var(--color-bar);
			stroke-linecap: round;
			fill: currentcolor;
			fill-opacity: 0;
			opacity: 0;

			transition:
				all var(--animation-fast-out),
				stroke-dasharray var(--animation-medium-out),
				stroke-dashoffset var(--animation-medium-out);

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					opacity: 0.5;
					fill-opacity: 0.1;
					cursor: pointer;
				}
			}
		}
		text {
			pointer-events: none;
		}

		&.pressed > rect.node-box {
			fill-opacity: 0.1;
			opacity: 1;
		}
		&.focused > rect.node-box {
			opacity: 1;
			${(p) => p.theme.svgFocusVisible};
		}
		&.highlighted:not(.focused) > rect.node-box:not(:hover),
		&.highlighted-guide:not(.focused) > rect.node-box:not(:hover) {
			opacity: 1;
			stroke-dasharray: 4 3;
			stroke-dashoffset: -4;
		}
	}

	/* 
	  Edge styles
	*/
	g.edges,
	marker {
		fill: none;
		stroke: var(--color-bar);
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	g.edges {
		stroke-width: 2;
	}
`
