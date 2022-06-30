import { useState } from 'react'

import Graph from '../graph/model/graph'
import GraphView from '../graph/view'
import { SamplingEdge, SamplingNode } from './model'

import useMountEffect from '@utils/useMountEffect'

const newGraph = () => {
	const g = new Graph<SamplingNode, SamplingEdge>()
	const nodeA = new SamplingNode({ label: 'Alpha' })
	const nodeB = new SamplingNode({ label: 'Beta' })
	const nodeC = new SamplingNode({ label: 'Gamma' })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	const edgeA = new SamplingEdge({ nodes: [nodeA, nodeB], isDirected: true })
	const edgeB = new SamplingEdge({ nodes: [nodeB, nodeC], isDirected: true })
	g.addEdge(edgeA)
	g.addEdge(edgeB)

	return g
}
const Section = () => {
	const [graph] = useState(() => newGraph())

	useMountEffect(() => {
		setTimeout(() => {
			const nodeD = new SamplingNode({ label: 'Delpha' })
			graph.addNode(nodeD)
		}, 1000)

		setTimeout(() => {
			graph.addEdge(
				new SamplingEdge({ nodes: [graph.nodes[0], graph.nodes[3]], isDirected: true }),
			)
		}, 2000)
	})

	return <GraphView graph={graph} />
}

export default Section
