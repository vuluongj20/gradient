import { makeObservable, observable } from 'mobx'

import Edge from '../../graph/model/edge'

type ConstructorProps = ConstructorParameters<typeof Edge>[0] & {
	coefficient?: number
}

class SamplingEdge extends Edge {
	coefficient: number

	constructor(props: ConstructorProps) {
		super(props)
		makeObservable(this, { coefficient: observable })
		this.coefficient = props.coefficient ?? 2
	}
}

export default SamplingEdge
