export type ParameterInfo = {
	displayName: string
	description: string
	validator?: (value: number) => boolean
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
