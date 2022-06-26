import { useRef, useState } from 'react'
import styled from 'styled-components'

import Graph from '../model/graph'
import GraphOverlay from './overlay'
import ForceGraph from './svg'

import useSize from '@utils/useSize'

type Props = {
	graph: Graph
}

const GraphView = ({ graph }: Props) => {
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
			{svgReady && (
				<GraphOverlay graph={graph} setSimulationPlayState={setSimulationPlayState} />
			)}
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
`
