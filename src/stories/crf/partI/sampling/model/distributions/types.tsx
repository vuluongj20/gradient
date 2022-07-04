export type ParameterInfo = {
	displayName: string
	description: string
	minValue?: number
	maxValue?: number
}

export enum ContinuousDistribution {
	Normal = 'normal',
	Exponential = 'exponential',
	Beta = 'beta',
	Gamma = 'gamma',
}

export enum DiscreteDistribution {
	Binomial = 'binomial',
	Bernoulli = 'bernoulli',
}

export type Distribution = ContinuousDistribution | DiscreteDistribution
