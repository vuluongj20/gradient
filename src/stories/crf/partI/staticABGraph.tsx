import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	const nodeA = new Node({ label: 'A', forceX: -40, forceY: -10 })
	const nodeB = new Node({ label: 'B', forceX: 40, forceY: 10 })
	graph.addNode(nodeA)
	graph.addNode(nodeB)

	graph.addEdge(
		new Edge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: true,
		}),
	)

	return graph
}

const StaticABGraph = () => {
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

export default StaticABGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.utils.gridColumn.text};
	${(p) => p.theme.utils.space.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 4rem;
`

const Overlay = styled.div`
	${(p) => p.theme.utils.spread}
`
