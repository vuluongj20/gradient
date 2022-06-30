import { action, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'

import Edge from './edge'
import Node from './node'

type Props<N, E> = {
	nodes?: N[]
	edges?: E[]
}

class Graph<N extends Node = Node, E extends Edge = Edge> {
	readonly id: string
	nodes: N[]
	edges: E[]

	constructor(props: Props<N, E> = {}) {
		makeObservable(this, {
			id: observable,
			nodes: observable,
			edges: observable,
			addNode: action,
			addEdge: action,
		})
		this.id = nanoid()
		this.nodes = props.nodes ?? []
		this.edges = props.edges ?? []
	}

	addNode(node: N) {
		this.nodes.push(node)
	}

	addEdge(edge: E) {
		this.edges.push(edge)

		if (edge.isDirected) {
			edge.nodes[0].addOutgoingEdge(edge)
			edge.nodes[1].addIncomingEdge(edge)
		} else {
			edge.nodes[0].addUndirectedEdge(edge)
			edge.nodes[1].addUndirectedEdge(edge)
		}

		return edge
	}
}

export default Graph
