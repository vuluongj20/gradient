import { action, computed, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'

type Props = {
	label?: string
	edges?: {
		incoming: string[]
		outgoing: string[]
		undirected: string[]
	}
}

class Node {
	readonly id = nanoid()
	label: string
	edges: {
		incoming: string[]
		outgoing: string[]
		undirected: string[]
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
		this.label = props?.label ?? ''
		this.edges = { incoming: [], outgoing: [], undirected: [] }
	}

	addIncomingEdge(edge: string) {
		this.edges.incoming.push(edge)
	}

	addOutgoingEdge(edge: string) {
		this.edges.outgoing.push(edge)
	}

	addUndirectedEdge(edge: string) {
		this.edges.undirected.push(edge)
	}

	get isRoot() {
		return this.edges.incoming.length === 0
	}
}

export default Node
