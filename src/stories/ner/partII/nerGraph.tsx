import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Edge from '../graph/model/edge'
import Graph from '../graph/model/graph'
import Node from '../graph/model/node'
import GraphView from '../graph/view'

import Grid from '@components/grid'

import useSize from '@utils/useSize'

const S = ['O', 'B-LOC', 'I-LOC', 'O', 'O', 'B-LOC', 'I-LOC']
const O = ['Great', 'Birnam', 'Wood', 'to', 'high', 'Dunsinane', 'Hill']

const createGraph = (shortForm: boolean, xDelta: number) => {
	const graph = new Graph()

	const hiddenLayer = []
	const observedLayer = []

	const SLength = shortForm ? 3 : S.length

	for (let i = 0; i < SLength; i++) {
		const forceX = (i - (SLength - 1) / 2) * xDelta

		const s = new Node({
			label: S[i],
			forceX,
			forceY: -30,
			x: forceX,
			y: -30,
		})
		const o = new Node({
			label: O[i],
			forceX,
			forceY: 30,
			x: forceX,
			y: 30,
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

const HMMNERGraph = () => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const [graph, setGraph] = useState<Graph>()

	const { width } = useSize(wrapRef)

	useEffect(() => {
		if (!width) return

		const nStates = 4
		const shortForm = width / nStates < 160
		const xDelta = Math.min(80, width / nStates + 10)
		const graph = createGraph(shortForm, xDelta)
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

export default HMMNERGraph

const Wrap = styled.div`
	position: relative;
	height: 7rem;
	${(p) => p.theme.gridColumn.wide};
	${(p) => p.theme.marginBottom[3]}
`

const StyledGraphView = styled(GraphView)`
	pointer-events: none;
`
