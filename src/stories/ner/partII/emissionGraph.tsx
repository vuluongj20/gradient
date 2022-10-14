import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

import useSize from '@utils/useSize'

const createGraph = (nStates: number, xDelta: number) => {
	const graph = new Graph()

	for (let i = 0; i < nStates; i++) {
		const forceX = (i - 1.5) * xDelta
		const subscript = String.fromCodePoint(0x2080 + i + 1)

		const x = new Node({
			label: `S${subscript}`,
			forceX,
			forceY: -40,
			x: forceX,
			y: -40,
		})
		const y = new Node({
			label: `O${subscript}`,
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
	}

	return graph
}

const EmissionGraph = () => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const [graph, setGraph] = useState<Graph>()

	const { width } = useSize(wrapRef)

	useEffect(() => {
		if (!width) return

		const nStates = 4
		const xDelta = Math.min(100, width / nStates)
		const graph = createGraph(nStates, xDelta)
		setGraph(graph)
	}, [width])

	return (
		<Grid>
			<Wrap ref={wrapRef}>
				{graph && <StyledGraphView graph={graph} disableForceEdge disableForceCenter />}
			</Wrap>
		</Grid>
	)
}

export default EmissionGraph

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	height: 7rem;
	pointer-events: none;
`
