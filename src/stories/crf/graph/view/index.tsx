import { HTMLAttributes, ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'

import BaseEdge from '../model/edge'
import Graph from '../model/graph'
import BaseNode from '../model/node'
import NodePanels from './nodePanels'
import ForceGraph from './svg'

import useSize from '@utils/useSize'

type Props<Node extends BaseNode, Edge extends BaseEdge> = {
	graph: Graph<Node, Edge>
	renderNodePanel?: (
		node: Node,
		overlayProps: HTMLAttributes<HTMLDivElement>,
	) => ReactNode
}

const GraphView = <Node extends BaseNode = BaseNode, Edge extends BaseEdge = BaseEdge>({
	graph,
	renderNodePanel,
}: Props<Node, Edge>) => {
	const ref = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(ref)

	const [simulationPlayState, setSimulationPlayState] = useState(true)
	const [svgReady, setSvgReady] = useState(false)

	return (
		<Wrap ref={ref}>
			<ForceGraph
				graph={graph}
				width={width}
				height={height}
				simulationPlayState={simulationPlayState}
				setSvgReady={setSvgReady}
			/>
			{svgReady && renderNodePanel && (
				<NodePanels
					graph={graph}
					setSimulationPlayState={setSimulationPlayState}
					renderNodePanel={renderNodePanel}
				/>
			)}
		</Wrap>
	)
}

export default GraphView

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 20rem;
`
