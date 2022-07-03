import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import GraphView from '../graph/view'
import SamplingEdge from './samplingModel/edge'
import SamplingGraph from './samplingModel/graph'
import SamplingNode from './samplingModel/node'

import useMountEffect from '@utils/useMountEffect'

const newGraph = () => {
	const g = new SamplingGraph()
	const nodeA = new SamplingNode({ label: 'Alpha' })
	const nodeB = new SamplingNode({ label: 'Beta' })
	const nodeC = new SamplingNode({ label: 'Gamma' })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	const edgeA = new SamplingEdge({ nodes: [nodeA.id, nodeB.id], isDirected: true })
	const edgeB = new SamplingEdge({ nodes: [nodeC.id, nodeB.id], isDirected: true })
	g.addEdge(edgeA)
	g.addEdge(edgeB)

	return g
}

const Section = () => {
	const [graph] = useState(() => newGraph())

	useMountEffect(() => {
		setTimeout(() => {
			const nodeD = new SamplingNode({ label: 'Delta' })
			graph.addNode(nodeD)
		}, 1000)

		setTimeout(() => {
			graph.addEdge(
				new SamplingEdge({
					nodes: [graph.nodes[1].id, graph.nodes[3].id],
					isDirected: true,
				}),
			)

			// const samples = graph.sample()

			// console.log(
			// 	Object.entries(samples).map(([id, value]) => [graph.getNode(id).label, value[0]]),
			// )
		}, 2000)
	})

	return <GraphView graph={graph} />
}

export default observer(Section)
