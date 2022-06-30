import { action, computed, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'

import Edge from './edge'

type Props = {
	label?: string
	edges?: {
		incoming: Edge[]
		outgoing: Edge[]
		undirected: Edge[]
	}
}

class Node {
	readonly id: string
	label: string
	edges: {
		incoming: Edge[]
		outgoing: Edge[]
		undirected: Edge[]
	}

	constructor(props: Props) {
		makeObservable(this, {
			id: observable,
			label: observable,
			edges: observable,
			addIncomingEdge: action,
			addOutgoingEdge: action,
			addUndirectedEdge: observable,
			isRoot: computed,
		})
		this.id = nanoid()
		this.label = props?.label ?? ''
		this.edges = { incoming: [], outgoing: [], undirected: [] }
	}

	addIncomingEdge(edge: Edge) {
		this.edges.incoming.push(edge)
	}

	addOutgoingEdge(edge: Edge) {
		this.edges.outgoing.push(edge)
	}

	addUndirectedEdge(edge: Edge) {
		this.edges.undirected.push(edge)
	}

	get isRoot() {
		return this.edges.incoming.length === 0
	}
}

export default Node
