import { makeObservable, observable } from 'mobx'
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
	nodes: [Node, Node]
	isDirected: boolean

	constructor(props: Props) {
		makeObservable(this, {
			id: observable,
			nodes: observable,
			isDirected: observable,
		})
		this.id = nanoid()
		this.nodes = props.nodes
		this.isDirected = props.isDirected ?? true
	}
}

export default Edge
