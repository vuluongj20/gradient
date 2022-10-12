import { useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const S = ['O', 'B-LOC', 'I-LOC', 'O', 'O', 'B-LOC', 'I-LOC']
const O = ['Great', 'Birnam', 'Wood', 'to', 'high', 'Dunsinane', 'Hill']

const createGraph = () => {
	const graph = new Graph()

	const hiddenLayer = []
	const observedLayer = []

	for (let i = 0; i < S.length; i++) {
		const forceX = (i - (S.length - 1) / 2) * 80

		const s = new Node({
			label: S[i],
			forceX,
			forceY: -40,
			x: forceX,
			y: -40,
		})
		const o = new Node({
			label: O[i],
			forceX,
			forceY: 40,
			x: forceX,
			y: 40,
		})

		graph.addNode(s)
		graph.addNode(o)

		graph.addEdge(
			new Edge({
				nodes: { source: s.id, target: o.id },
				isDirected: true,
			}),
		)
		if (i > 0) {
			graph.addEdge(
				new Edge({
					nodes: { source: hiddenLayer[hiddenLayer.length - 1].id, target: s.id },
					isDirected: true,
				}),
			)
		}

		hiddenLayer.push(s)
		observedLayer.push(o)
	}

	return graph
}

const NERGraph = () => {
	const [graph] = useState(createGraph())

	return (
		<Grid>
			<Wrap>
				<StyledGraphView graph={graph} />
			</Wrap>
		</Grid>
	)
}

export default NERGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.wide};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 8rem;
	pointer-events: none;
`
