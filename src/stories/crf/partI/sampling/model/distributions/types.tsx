export type ParameterInfo = {
	displayName: string
	description: string
	minValue?: number
	maxValue?: number
}

export enum VariableType {
	Continuous = 'continuous',
	Discrete = 'discrete',
}

export enum ContinuousDistributionType {
	Normal = 'normal',
	Exponential = 'exponential',
	Beta = 'beta',
	Gamma = 'gamma',
}

export enum DiscreteDistributionType {
	Binomial = 'binomial',
	Bernoulli = 'bernoulli',
}

export type DistributionType = ContinuousDistributionType | DiscreteDistributionType

type BaseDistribution = {
	parameters: Record<string, ParameterInfo>
	parameterValues: Record<string, number>
	setParameterValue: (name: string, value: number) => void
	support: [number, number]
	mean: number
	mode: number
	variance: number
	sample: (n: number) => number[]
}

export type ContinuousDistribution = BaseDistribution & {
	type: ContinuousDistributionType
	pdf: (value: number) => number
}

export type DiscreteDistribution = BaseDistribution & {
	type: DiscreteDistributionType
	pmf: (value: number) => number
}

export type Distribution = ContinuousDistribution | DiscreteDistribution

export const isContinuousDistribution = (
	dist: ContinuousDistribution | DiscreteDistribution,
): dist is ContinuousDistribution =>
	Object.values(ContinuousDistributionType).includes(
		dist.type as ContinuousDistributionType,
	)

export const isDiscreteDistribution = (
	dist: ContinuousDistribution | DiscreteDistribution,
): dist is DiscreteDistribution =>
	Object.values(DiscreteDistributionType).includes(dist.type as DiscreteDistributionType)
