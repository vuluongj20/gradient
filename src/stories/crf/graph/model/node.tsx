import { action, computed, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'

type Props = {
	label?: string
	edges?: {
		incoming: string[]
		outgoing: string[]
		undirected: string[]
	}
	forceX?: number
	forceY?: number
}

class Node {
	readonly id = nanoid()
	label: string
	edges: {
		incoming: string[]
		outgoing: string[]
		undirected: string[]
	}
	isHighlighted: boolean
	forceX?: number
	forceY?: number

	constructor(props: Props) {
		makeObservable(this, {
			id: observable,
			label: observable,
			edges: observable,
			addIncomingEdge: action,
			addOutgoingEdge: action,
			addUndirectedEdge: observable,
			isRoot: computed,
			isHighlighted: observable,
			setIsHighlighted: action,
			forceX: observable,
			forceY: observable,
			setForceX: action,
			setForceY: action,
		})
		this.label = props.label ?? ''
		this.edges = { incoming: [], outgoing: [], undirected: [] }
		this.isHighlighted = false
		this.forceX = props.forceX
		this.forceY = props.forceY
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

	setIsHighlighted(to: boolean) {
		this.isHighlighted = to
	}

	setForceX(to: number) {
		this.forceX = to
	}

	setForceY(to: number) {
		this.forceY = to
	}
}

export default Node
