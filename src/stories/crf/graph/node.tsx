import { nanoid } from 'nanoid'

import Edge from './edge'

type Props = {}

class Node {
	readonly id: string
	edges: {
		source: Edge[]
		target: Edge[]
		undirected: Edge[]
	}

	constructor(props: Props = {}) {
		this.id = nanoid()
		this.edges = { source: [], target: [], undirected: [] }
	}

	addEdgeSource(edge: Edge) {
		this.edges.source.push(edge)
	}

	addEdgeTarget(edge: Edge) {
		this.edges.target.push(edge)
	}

	addUndirectedEdge(edge: Edge) {
		this.edges.undirected.push(edge)
	}
}

export default Node
