import { nanoid } from 'nanoid'

import Node from './node'

type Props = {
	/**
	 * The nodes that this edge connects. If this is a directed edge, the order
	 * matters: the first listed node is the starting node, and the second the
	 * end node. Otherwise it the order does not matter.
	 */
	nodes: [Node, Node]
	isDirected?: boolean 
}

class Edge {
	readonly id: string
	isDirected: Props['isDirected']
	nodes: Props['nodes']

	constructor(props: Props) {
		this.id = nanoid()
		this.isDirected = props.isDirected ?? true
		this.nodes = props.nodes
	}
}

export default Edge
