import { useState } from 'react'
import styled from 'styled-components'

import GraphView from '../../graph/view'
import SamplingEdge from './model/edge'
import SamplingGraph from './model/graph'
import SamplingNode from './model/node'
import SamplingNodePanel from './nodePanel'
import PairGrid from './pairGrid'

import Divider from '@components/divider'
import Grid from '@components/grid'
import Panel from '@components/panel'

const createGraph = () => {
	const g = new SamplingGraph()

	const nodeA = new SamplingNode({ label: 'A' })
	const nodeB = new SamplingNode({ label: 'B' })
	const nodeC = new SamplingNode({ label: 'C' })
	const nodeD = new SamplingNode({ label: 'D' })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	g.addNode(nodeD)

	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: true,
		}),
	)
	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeA.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeB.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeC.id, target: nodeD.id },
			isDirected: true,
		}),
	)

	return g
}

const ABCDGraph = () => {
	const [graph] = useState(() => createGraph())

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				<StyledGraphView
					graph={graph}
					renderNodePanel={(node, overlayProps) => (
						<SamplingNodePanel
							// styled-components doesn't preserve generic props
							// https://github.com/styled-components/styled-components/issues/1803
							node={node as SamplingNode}
							incomingEdges={graph.getIncomingEdges(node.id)}
							parentNodes={graph.getParentNodes(node.id)}
							overlayProps={overlayProps}
						/>
					)}
				/>
				<StyledDivider orientation="vertical" />
				<PairGrid graph={graph} />
			</StyledPanel>
		</Grid>
	)
}

export default ABCDGraph

const StyledDivider = styled(Divider)`
	margin: 0 ${(p) => p.theme.space[3]};
`

const StyledGraphView = styled(GraphView)`
	height: 100%;
	width: 30%;
	flex-shrink: 0;
`

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.space.marginVertical[3]}
	height: 28rem;
	display: flex;
`
