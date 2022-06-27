import { useRef, useState } from 'react'
import styled from 'styled-components'

import Graph from './graph/model/graph'
import GraphView from './graph/view'
import Hero from './hero'

import Page from '@components/page'
import TypeArea from '@components/typeArea'

import useMountEffect from '@utils/useMountEffect'

const newGraph = () => {
	const g = new Graph()
	const nodeA = g.addNode({ label: 'Alpha' })
	const nodeB = g.addNode({ label: 'Beta' })
	const nodeC = g.addNode({ label: 'Gamma' })
	g.addEdge({ nodes: [nodeA, nodeB], isDirected: true })
	g.addEdge({ nodes: [nodeB, nodeC], isDirected: true })

	return g
}

const Component = () => {
	const [graph] = useState(() => newGraph())
	const ref = useRef(null)

	useMountEffect(() => {
		setTimeout(() => {
			graph.addNode({ label: 'Delta' })
		}, 1000)

		setTimeout(() => {
			graph.addEdge({ nodes: [graph.nodes[0], graph.nodes[3]], isDirected: true })
		}, 2000)
	})

	return (
		<Page>
			<Wrap id="App" type="content" as="article" ref={ref}>
				<Hero />
				<GraphView graph={graph} />
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
