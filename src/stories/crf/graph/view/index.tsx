import { HTMLAttributes, ReactNode, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import BaseEdge from '../model/edge'
import Graph from '../model/graph'
import BaseNode from '../model/node'
import NodePanel from './nodePanel'
import ForceGraph from './svg'
import { NodeEventListener } from './svg/types'

import useSize from '@utils/useSize'

type Props<Node extends BaseNode, Edge extends BaseEdge> = {
	graph: Graph<Node, Edge>
	renderNodePanel?: (
		node: Node,
		overlayProps: HTMLAttributes<HTMLDivElement>,
	) => ReactNode
	nodeEventListeners?: NodeEventListener[]
	className?: string
}

const GraphView = <Node extends BaseNode = BaseNode, Edge extends BaseEdge = BaseEdge>({
	graph,
	renderNodePanel,
	nodeEventListeners = [],
	className,
}: Props<Node, Edge>) => {
	const ref = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(ref)

	const [simulationPlayState, setSimulationPlayState] = useState(true)
	const [svgReady, setSvgReady] = useState(false)

	const allNodeEventListeners: NodeEventListener[] = useMemo(
		() => [
			[
				typeof window !== 'undefined' && 'ontouchstart' in window ? 'touchend' : 'click',
				(_, d) => {
					// Pass click event from node element in SVG to the trigger button for the
					// corresponding node panel
					if (!d) return
					document
						.querySelector<HTMLButtonElement>(`#node-panel-trigger-${d.id}`)
						?.click()
				},
			],
			...nodeEventListeners,
		],
		[nodeEventListeners],
	)

	return (
		<Wrap ref={ref} className={className}>
			<ForceGraph
				graph={graph}
				width={width}
				height={height}
				nodeEventListeners={allNodeEventListeners}
				simulationPlayState={simulationPlayState}
				setSvgReady={setSvgReady}
			/>
			{svgReady &&
				renderNodePanel &&
				graph.nodes.map((node) => (
					<NodePanel
						key={node.id}
						node={node}
						setSimulationPlayState={setSimulationPlayState}
						renderNodePanel={renderNodePanel}
						wrapRef={ref}
					/>
				))}
		</Wrap>
	)
}

export default GraphView

const Wrap = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 20rem;
`
