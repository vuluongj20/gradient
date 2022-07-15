import { useState } from 'react'

import GraphView from '../../graph/view'
import SamplingEdge from './model/edge'
import SamplingGraph from './model/graph'
import SamplingNode from './model/node'
import SamplingNodePanel from './nodePanel'
import PairGrid from './pairGrid'

import Grid from '@components/grid'
import Panel from '@components/panel'

// import useMountEffect from '@utils/useMountEffect'

const newGraph = () => {
	const g = new SamplingGraph()
	const nodeA = new SamplingNode({ label: 'Alpha' })
	const nodeB = new SamplingNode({ label: 'Beta' })
	const nodeC = new SamplingNode({ label: 'Gamma' })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	const edgeA = new SamplingEdge({
		nodes: { source: nodeA.id, target: nodeB.id },
		isDirected: true,
	})
	const edgeB = new SamplingEdge({
		nodes: { source: nodeC.id, target: nodeB.id },
		isDirected: true,
	})
	g.addEdge(edgeA)
	g.addEdge(edgeB)

	return g
}

const Section = () => {
	const [graph] = useState(() => newGraph())

	// useMountEffect(() => {
	// 	setTimeout(() => {
	// console.log(graph.sample(2))
	// const nodeD = new SamplingNode({ label: 'Delta' })
	// graph.addNode(nodeD)
	// }, 1000)

	// setTimeout(() => {
	// 	graph.addEdge(
	// 		new SamplingEdge({
	// 			nodes: { source: graph.nodes[1].id, target: graph.nodes[3].id },
	// 			isDirected: true,
	// 		}),
	// 	)

	// const samples = graph.sample()
	// console.log(
	// 	Object.entries(samples).map(([id, value]) => [graph.getNode(id).label, value[0]]),
	// )
	// }, 2000)
	// })

	return (
		<Grid noPaddingOnMobile>
			<Panel overlay size="m" gridColumn="wide">
				<GraphView
					graph={graph}
					renderNodePanel={(node, overlayProps) => (
						<SamplingNodePanel
							node={node}
							incomingEdges={graph.getIncomingEdges(node.id)}
							parentNodes={graph.getParentNodes(node.id)}
							overlayProps={overlayProps}
						/>
					)}
				/>
				<PairGrid graph={graph} />
			</Panel>
		</Grid>
	)
}

export default Section
