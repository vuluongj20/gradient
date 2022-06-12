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

	addNode(
		nodeParams: ConstructorParameters<typeof Node>[0],
		callback?: (nodes: Graph['nodes']) => void,
	) {
		const node = new Node(nodeParams)
		this.nodes.push(node)

		callback?.(this.nodes)

		return node
	}

	addEdge(
		edgeParams: ConstructorParameters<typeof Edge>[0],
		callback?: (edges: Graph['edges']) => void,
	) {
		const edge = new Edge(edgeParams)
		this.edges.push(edge)

		if (edge.isDirected) {
			edge.nodes[0].addSourceEdge(edge)
			edge.nodes[1].addTargetEdge(edge)
		} else {
			edge.nodes[0].addUndirectedEdge(edge)
			edge.nodes[1].addUndirectedEdge(edge)
		}

		callback?.(this.edges)

		return edge
	}
}

export default Graph
