import { randomBinomial } from 'd3-random'
import { makeAutoObservable, set } from 'mobx'

import { DiscreteDistribution, DiscreteDistributionType } from './types'

const first20Factorials = [
	1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800,
	87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000,
	121645100408832000, 2432902008176640000,
]

function factorial(n: number) {
	if (n <= 20) {
		return first20Factorials[n]
	}

	let result = first20Factorials[20]
	for (let x = 21; x <= n; x++) {
		result *= x
	}
	return result
}

class BinomialDistribution implements DiscreteDistribution {
	type = DiscreteDistributionType.Binomial
	parameters = {
		n: {
			displayName: 'n',
			description: 'Number of trials.',
			minValue: 0,
		},
		p: {
			displayName: 'p',
			description: 'Probability of success in each trial.',
			minValue: 0,
			maxValue: 1,
		},
	}
	parameterValues

	constructor(n = 10, p = 0.5) {
		makeAutoObservable(this)
		this.parameterValues = { n, p }
	}

	setParameterValue(name: string, value: number) {
		set(this.parameterValues, name, value)
	}

	get support(): [number, number] {
		const { n } = this.parameterValues
		return [0, n]
	}

	get mean() {
		const { n, p } = this.parameterValues
		return n * p
	}

	get mode() {
		const { n, p } = this.parameterValues
		return Math.floor((n + 1) * p)
	}

	get variance() {
		const { n, p } = this.parameterValues
		return n * p * (1 - p)
	}

	/**
	 * Returns the probability density at point x of the current distribution
	 * with the current parameters. To change a parameter value, use
	 * setParameterValue().
	 */
	pmf(x: number) {
		const { n, p } = this.parameterValues
		const nPickX = factorial(n) / (factorial(x) * factorial(n - x))
		return nPickX * p ** x * (1 - p) ** (n - x)
	}

	/**
	 * Returns an array of n samples, generated with the current distribution
	 * parameters. To change a parameter value, use setParameterValue().
	 */
	sample(numSamples = 1) {
		const { p } = this.parameterValues
		const generateSample = randomBinomial(p)

		const samples = []
		for (let x = 0; x < numSamples; x++) {
			samples.push(generateSample())
		}
		return samples
	}
}

export default BinomialDistribution
