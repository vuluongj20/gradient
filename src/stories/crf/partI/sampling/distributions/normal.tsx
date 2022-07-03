import { randomNormal } from 'd3-random'

import { ParameterInfo } from './types'

enum NormalParameter {
	Mu = 'mu',
	Sigma = 'sigma',
}

class NormalDistribution {
	static parameters: Record<NormalParameter, ParameterInfo> = {
		mu: { displayName: '\u03bc', description: 'Location param' },
		sigma: { displayName: '\u03c3', description: 'Scale param' },
	}
	parameterValues: Record<NormalParameter, number> = {
		mu: 5,
		sigma: 10,
	}

	constructor(mu = 5, sigma = 10) {
		this.parameterValues.mu = mu
		this.parameterValues.sigma = sigma
	}

	setParameterValue(name: NormalParameter, value: number) {
		this.parameterValues[name] = value
	}

	/**
	 * Returns the probability density at point x of the current distribution
	 * with the current parameters. To change a parameter value, use
	 * setParameterValue().
	 */
	pdf(x: number) {
		const { mu, sigma } = this.parameterValues
		return Math.E ** (-(((x - mu) / sigma) ** 2) / 2) / Math.sqrt(2 * Math.PI) / sigma
	}

	/**
	 * Returns an array of n samples, generated with the current distribution
	 * parameters. To change a parameter value, use setParameterValue().
	 */
	sample(numSamples = 1) {
		const { mu, sigma } = this.parameterValues
		const generateSample = randomNormal(mu, sigma)

		const samples = []
		for (let x = 0; x < numSamples; x++) {
			samples.push(generateSample())
		}
		return samples
	}
}

export default NormalDistribution
