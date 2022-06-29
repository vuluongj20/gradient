import { useState } from 'react'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import useMountEffect from '@utils/useMountEffect'

const newGraph = () => {
	const g = new Graph<Node, Edge>()
	const nodeA = new Node({ label: 'Alpha' })
	const nodeB = new Node({ label: 'Beta' })
	const nodeC = new Node({ label: 'Gamma' })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	const edgeA = new Edge({ nodes: [nodeA, nodeB], isDirected: true })
	const edgeB = new Edge({ nodes: [nodeB, nodeC], isDirected: true })
	g.addEdge(edgeA)
	g.addEdge(edgeB)

	return g
}
const Section = () => {
	const [graph] = useState(() => newGraph())

	useMountEffect(() => {
		setTimeout(() => {
			const nodeD = new Node({ label: 'Delpha' })
			graph.addNode(nodeD)
		}, 1000)

		setTimeout(() => {
			graph.addEdge(
				new Edge({ nodes: [graph.nodes[0], graph.nodes[3]], isDirected: true }),
			)
		}, 2000)
	})

	return <GraphView graph={graph} />
}

export default Section
