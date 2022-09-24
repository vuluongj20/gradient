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
	const observedLayer = []

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
		if (i > 0) {
			graph.addEdge(
				new Edge({
					nodes: { source: hiddenLayer[hiddenLayer.length - 1].id, target: x.id },
					isDirected: true,
				}),
			)
		}

		hiddenLayer.push(x)
		observedLayer.push(y)
	}

	return graph
}

const OverviewGraph = () => {
	const [graph] = useState(createGraph())

	return (
		<Grid>
			<Wrap>
				<StyledGraphView graph={graph} />
			</Wrap>
		</Grid>
	)
}

export default OverviewGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 7rem;
	pointer-events: none;
`
