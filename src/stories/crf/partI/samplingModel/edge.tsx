import Edge from '../../graph/model/edge'

// import SamplingNode from './edge'

type ConstructorProps = ConstructorParameters<typeof Edge>[0] & {
	coefficient?: number
}

class SamplingEdge extends Edge {
	coefficient: number

	constructor(props: ConstructorProps) {
		super(props)
		this.coefficient = props.coefficient ?? 2
	}

	// sample()
	// validate()
}

export default SamplingEdge
