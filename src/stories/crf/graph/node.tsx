import { nanoid } from 'nanoid'

import Edge from './edge'

type Props = {
	label?: string
	edges?: {
		source: Edge[]
		target: Edge[]
		undirected: Edge[]
	}
}

class Node { 
	readonly id: string
	label: Props['label']
	edges: Props['edges']

	constructor(props: Props) {
		this.id = nanoid()
		this.label = props?.label
		this.edges = { source: [], target: [], undirected: [] }
	}

	addSourceEdge(edge: Edge) {
		this.edges.source.push(edge)
	}

	addTargetEdge(edge: Edge) {
		this.edges.target.push(edge)
	}

	addUndirectedEdge(edge: Edge) {
		this.edges.undirected.push(edge)
	}
}

export default Node
