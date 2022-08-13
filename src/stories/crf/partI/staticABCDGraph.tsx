import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	const nodeA = new Node({ label: 'A', forceX: -40, forceY: -20 })
	const nodeB = new Node({ label: 'B', forceX: 40, forceY: -20 })
	const nodeC = new Node({ label: 'C', forceX: -40, forceY: 20 })
	const nodeD = new Node({ label: 'D', forceX: 40, forceY: 20 })
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
				<Overlay />
			</Wrap>
		</Grid>
	)
}

export default StaticABCDGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.utils.gridColumn.text};
	${(p) => p.theme.utils.space.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 8rem;
`

const Overlay = styled.div`
	${(p) => p.theme.utils.spread}
`
