import Node from '../../graph/model/node'
import BinomialDistribution from './distributions/binomial'
import NormalDistribution from './distributions/normal'
import { ContinuousDistribution, DiscreteDistribution } from './distributions/types'

// import SamplingEdge from './edge'

type DistributionInstance = NormalDistribution | BinomialDistribution
type Distribution = ContinuousDistribution | DiscreteDistribution

type ConstructorProps = ConstructorParameters<typeof Node>[0] & {
	distribution?: DistributionInstance
}

class SamplingNode extends Node {
	distribution: DistributionInstance
	sampleValue?: number

	constructor(props: ConstructorProps) {
		super(props)
		this.distribution = props.distribution ?? new NormalDistribution()
	}

	setDistribution(dist: Distribution) {
		switch (dist) {
			case ContinuousDistribution.Normal:
				this.distribution = new NormalDistribution()
				break
			case DiscreteDistribution.Binomial:
				this.distribution = new BinomialDistribution()
				break
		}
	}

	sample(n = 1) {
		const { isRoot } = this

		if (isRoot) {
			return this.distribution.sample(n)
		} else {
			throw 'Cannot sample non-root nodes'
		}
	}
}

export default SamplingNode
