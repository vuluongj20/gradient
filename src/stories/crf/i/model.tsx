import Edge from '../graph/model/edge'
import Node from '../graph/model/node'
import { Distribution } from './distributions'

type NodeConstructorProps = ConstructorParameters<typeof Node>[0] & {
	distribution?: { type: Distribution; parameters: number[] }
}

type EdgeConstructorProps = ConstructorParameters<typeof Edge>[0] & {
	coefficient?: number
}

export class SamplingNode extends Node {
	distribution?: { type: Distribution; parameters: number[] }

	constructor(props: NodeConstructorProps) {
		super(props)
		this.distribution = props.distribution
	}

	// sample()
	// validate()
}

export class SamplingEdge extends Edge {
	coefficient?: number

	constructor(props: EdgeConstructorProps) {
		super(props)
		this.coefficient = props.coefficient
	}

	// sample()
	// validate()
}
