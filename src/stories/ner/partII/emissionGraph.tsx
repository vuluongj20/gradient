import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	for (let i = 0; i < 4; i++) {
		const forceX = (i - 1.5) * 100
		const subscript = String.fromCodePoint(0x2080 + i + 1)

		const x = new Node({
			label: `X${subscript}`,
			forceX,
			forceY: -40,
			x: forceX,
			y: -40,
		})
		const y = new Node({
			label: `Y${subscript}`,
			forceX,
			forceY: 40,
			x: forceX,
			y: 40,
		})

		graph.addNode(x)
		graph.addNode(y)

		graph.addEdge(
			new Edge({
				nodes: { source: x.id, target: y.id },
				isDirected: true,
			}),
		)
	}

	return graph
}

const EmissionGraph = () => {
	const [graph] = useState(createGraph())

	return (
		<Grid>
			<Wrap>
				<StyledGraphView graph={graph} />
			</Wrap>
		</Grid>
	)
}

export default EmissionGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 7rem;
	pointer-events: none;
`
