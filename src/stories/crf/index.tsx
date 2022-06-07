import { useRef, useState } from 'react'
import styled from 'styled-components'

import ForceGraph from './forceGraph'
import { Edge, Graph, Node } from './graph'
import Hero from './hero'

import Page from '@components/page'
import TypeArea from '@components/typeArea'

const newGraph = () => {
	const g = new Graph()
	const nodeA = new Node()
	const nodeB = new Node()
	const nodeC = new Node()
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	const edgeA = new Edge({ nodes: [nodeA, nodeB], isDirected: true })
	const edgeB = new Edge({ nodes: [nodeB, nodeC], isDirected: true })
	g.addEdge(edgeA)
	g.addEdge(edgeB)

	return g
}

const Component = () => {
	const graph = useRef(newGraph())
	const [nodes, setNodes] = useState(graph.current.nodes)
	const [edges, setEdges] = useState(graph.current.edges)

	// setTimeout(() => {
	// 	const g = graph.current
	// 	const edgeC = new Edge({ nodes: [g.nodes[0], g.nodes[2]], isDirected: true })
	// 	g.addEdge(edgeC, (edges) => setEdges([...edges]))
	// }, 1000)

	return (
		<Page>
			<Wrap id="App" type="content" as="article">
				<Hero />
				<ForceGraph nodes={nodes} edges={edges} />
			</Wrap>
		</Page>
	)
}

export default Component

const Wrap = styled(TypeArea)`
	--theme: ${(p) => p.theme.green1};
	--warm: ${(p) => p.theme.red1};
	--cool: ${(p) => p.theme.blue1};
	min-height: 100vh;

	svg {
		margin: 0 auto;
		overflow: visible;
	}
`
