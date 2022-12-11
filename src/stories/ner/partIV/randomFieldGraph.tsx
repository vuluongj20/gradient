import { useRef, useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

const createGraph = () => {
	const graph = new Graph()

	const nodeA = new Node({ label: 'A', forceX: -40, forceY: -33, x: -40, y: -33 })
	const nodeB = new Node({ label: 'B', forceX: 40, forceY: -33, x: 40, y: -33 })
	const nodeC = new Node({ label: 'C', forceX: 0, forceY: 33, x: 0, y: 33 })

	graph.addNode(nodeA)
	graph.addNode(nodeB)
	graph.addNode(nodeC)

	graph.addEdge(
		new Edge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: false,
		}),
	)
	graph.addEdge(
		new Edge({
			nodes: { source: nodeB.id, target: nodeC.id },
			isDirected: false,
		}),
	)
	graph.addEdge(
		new Edge({
			nodes: { source: nodeC.id, target: nodeA.id },
			isDirected: false,
		}),
	)

	return graph
}

const CRFRandomFieldGraph = () => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const [graph] = useState<Graph>(createGraph())

	return (
		<Grid>
			<Wrap ref={wrapRef}>
				{graph && <StyledGraphView graph={graph} disableForceEdge disableForceCenter />}
			</Wrap>
		</Grid>
	)
}

export default CRFRandomFieldGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 6rem;
	pointer-events: none;
`
