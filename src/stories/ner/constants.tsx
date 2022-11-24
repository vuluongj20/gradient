export enum MODEL {
	HMM = 'hmm',
	MEMM = 'memm',
	CRF = 'crf',
}

export const MODEL_SHORT = {
	[MODEL.HMM]: 'HMM',
	[MODEL.MEMM]: 'MEMM',
	[MODEL.CRF]: 'CRF',
}

export const MODEL_FULL = {
	[MODEL.HMM]: 'Hidden Markov Model',
	[MODEL.MEMM]: 'Maximum-Entropy Markov Model',
	[MODEL.CRF]: 'Conditional Random Field',
}

export const nameTags = [
	'B-ORG',
	'I-ORG',
	'B-PER',
	'I-PER',
	'B-LOC',
	'I-LOC',
	'B-MISC',
	'I-MISC',
	'O',
] as const

export const entityNameCategories = ['ORG', 'PER', 'LOC', 'MISC', 'ALL']
