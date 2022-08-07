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

	const nodeA = new SamplingNode({ label: 'A', x: -20, y: -10 })
	const nodeB = new SamplingNode({ label: 'B', x: 20, y: 10 })
	g.addNode(nodeA)
	g.addNode(nodeB)

	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: true,
		}),
	)

	return g
}

const ABGraph = () => {
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

export default ABGraph

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
