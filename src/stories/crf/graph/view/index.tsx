import { useRef, useState } from 'react'
import styled from 'styled-components'

import Edge from '../model/edge'
import Node from '../model/node'
import GraphOverlay from './overlay'
import ForceGraph from './svg'

import useSize from '@utils/useSize'

type Props = {
	nodes: Node[]
	edges: Edge[]
}

const GraphView = ({ nodes, edges }: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(ref)

	const [simulationPlayState, setSimulationPlayState] = useState(true)

	return (
		<Wrap ref={ref}>
			<ForceGraph
				nodes={nodes}
				edges={edges}
				width={width}
				height={height}
				simulationPlayState={simulationPlayState}
			/>
			<GraphOverlay
				nodes={nodes}
				edges={edges}
				setSimulationPlayState={setSimulationPlayState}
			/>
		</Wrap>
	)
}

export default GraphView

const Wrap = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 24rem;
	${(p) => p.theme.text.viz.body};
`
