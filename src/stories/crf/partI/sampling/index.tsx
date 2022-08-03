import { useState } from 'react'
import styled from 'styled-components'

import GraphView from '../../graph/view'
import SamplingEdge from './model/edge'
import SamplingGraph from './model/graph'
import SamplingNode from './model/node'
import SamplingNodePanel from './nodePanel'
import PairGrid from './pairGrid'

import Grid from '@components/grid'
import Panel from '@components/panel'

const newGraph = () => {
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

const Section = () => {
	const [graph] = useState(() => newGraph())

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				<GraphView
					graph={graph}
					renderNodePanel={(node, overlayProps) => (
						<SamplingNodePanel
							node={node}
							incomingEdges={graph.getIncomingEdges(node.id)}
							parentNodes={graph.getParentNodes(node.id)}
							overlayProps={overlayProps}
						/>
					)}
				/>
				<PairGrid graph={graph} />
			</StyledPanel>
		</Grid>
	)
}

export default Section

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.space.marginVertical[3]}
`
