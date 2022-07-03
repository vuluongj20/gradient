import { randomBinomial } from 'd3-random'

import { ParameterInfo } from './types'

enum BinomialParameter {
	n = 'n',
	p = 'p',
}

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

class BinomialDistribution {
	static parameters: Record<BinomialParameter, ParameterInfo> = {
		n: {
			displayName: '\u03bc',
			description: 'Number of trials',
			validator: (n) => n > 0,
		},
		p: {
			displayName: '\u03c3',
			description: 'Probability of success in each trial',
			validator: (p) => p >= 0 && p <= 1,
		},
	}
	parameterValues: Record<BinomialParameter, number> = {
		n: 5,
		p: 10,
	}

	constructor(n = 10, p = 0.5) {
		this.parameterValues.n = n
		this.parameterValues.p = p
	}

	setParameterValue(name: BinomialParameter, value: number) {
		this.parameterValues[name] = value
	}

	/**
	 * Returns the probability density at point x of the current distribution
	 * with the current parameters. To change a parameter value, use
	 * setParameterValue().
	 */
	pmf(x: number) {
		const { n, p } = this.parameterValues
		const nPickX = factorial(n) / (factorial(x) * factorial(n - x))
		console.log(nPickX)
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
