import { action, makeObservable, observable } from 'mobx'

import Edge from '../../../graph/model/edge'

type ConstructorProps = ConstructorParameters<typeof Edge>[0] & {
	coefficient?: number
}

class SamplingEdge extends Edge {
	coefficient: number

	constructor(props: ConstructorProps) {
		super(props)
		makeObservable(this, { coefficient: observable, setCoefficient: action })
		this.coefficient = props.coefficient ?? 2
	}

	setCoefficient(value: number) {
		this.coefficient = value
	}
}

export default SamplingEdge
