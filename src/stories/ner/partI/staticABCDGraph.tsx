import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	const nodeA = new Node({ label: 'A', forceX: -40, forceY: -30, x: -40, y: -30 })
	const nodeB = new Node({ label: 'B', forceX: 50, forceY: -40, x: 50, y: -40 })
	const nodeC = new Node({ label: 'C', forceX: -50, forceY: 40, x: -50, y: 40 })
	const nodeD = new Node({ label: 'D', forceX: 40, forceY: 30, x: 40, y: 30 })
	graph.addNode(nodeA)
	graph.addNode(nodeB)
	graph.addNode(nodeC)
	graph.addNode(nodeD)

	graph.addEdge(
		new Edge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: true,
		}),
	)
	graph.addEdge(
		new Edge({
			nodes: { source: nodeA.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	graph.addEdge(
		new Edge({
			nodes: { source: nodeB.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	graph.addEdge(
		new Edge({
			nodes: { source: nodeC.id, target: nodeD.id },
			isDirected: true,
		}),
	)

	return graph
}

const StaticABCDGraph = () => {
	const [graph] = useState(createGraph())

	return (
		<Grid>
			<Wrap>
				<StyledGraphView graph={graph} />
			</Wrap>
		</Grid>
	)
}

export default StaticABCDGraph

const Wrap = styled.div`
	position: relative;
	height: 8rem;
	${(p) => p.theme.gridColumn.text};
	margin-bottom: var(--adaptive-space-3);
`

const StyledGraphView = styled(GraphView)`
	pointer-events: none;
`
