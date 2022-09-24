import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	const hiddenLayer = []
	for (let i = 0; i < 4; i++) {
		const forceX = (i - 1.5) * 100
		const subscript = String.fromCodePoint(0x2080 + i + 1)

		const x = new Node({
			label: `X${subscript}`,
			forceX,
			forceY: 0,
			x: forceX,
			y: 0,
		})

		graph.addNode(x)

		if (i > 0) {
			graph.addEdge(
				new Edge({
					nodes: { source: hiddenLayer[hiddenLayer.length - 1].id, target: x.id },
					isDirected: true,
				}),
			)
		}

		hiddenLayer.push(x)
	}

	return graph
}

const TransitionGraph = () => {
	const [graph] = useState(createGraph())

	return (
		<Grid>
			<Wrap>
				<StyledGraphView graph={graph} />
			</Wrap>
		</Grid>
	)
}

export default TransitionGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 2rem;
	pointer-events: none;
`
