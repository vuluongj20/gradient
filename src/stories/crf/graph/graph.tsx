import { nanoid } from 'nanoid'

import Edge from './edge'
import Node from './node'

type Props = {
	nodes?: Node[]
	edges?: Edge[]
}

class Graph {
	readonly id: string
	nodes: Props['nodes']
	edges: Props['edges']

	constructor(props: Props = {}) {
		this.id = nanoid()
		this.nodes = props.nodes ?? []
		this.edges = props.edges ?? []
	}

	addNode(node: Node, callback?: (nodes: Props['nodes']) => void) {
		this.nodes.push(node)
		callback?.(this.nodes)
	}

	addEdge(edge: Edge, callback?: (edges: Props['edges']) => void) {
		this.edges.push(edge)
		if (edge.isDirected) {
			edge.nodes[0].addEdgeSource(edge)
			edge.nodes[1].addEdgeTarget(edge)
		} else {
			edge.nodes[0].addUndirectedEdge(edge)
			edge.nodes[1].addUndirectedEdge(edge)
		}
		callback?.(this.edges)
	}
}

export default Graph
