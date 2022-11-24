export const memmPrecisionByBinaryOOV = [
	[0.81, 0.36],
	[0.82, 0.8],
	[0.82, 0.17],
	[0.74, 0.14],
	[0.8, 0.54],
]
export const memmRecallByBinaryOOV = [
	[0.68, 0.12],
	[0.72, 0.57],
	[0.89, 0.29],
	[0.78, 0.02],
	[0.79, 0.37],
]

export const memmPrecisionByEntityLength = [
	[0.76, 0.69, 0.84, 0.36, 0.8],
	[0.59, 0.91, 0.66, 0.25, null],
	[0.8, 0.33, 0.35, 0.0, null],
	[0.82, 0.57, 0.29, 0.18, null],
	[0.77, 0.7, 0.58, 0.16, 0.43],
]

export const memmRecallByEntityLength = [
	[0.55, 0.46, 0.38, 0.12, 0.44],
	[0.34, 0.74, 0.8, null, null],
	[0.83, 0.66, 0.52, null, null],
	[0.63, 0.44, 0.52, null, null],
	[0.64, 0.64, 0.53, 0.22, 0.5],
]

export const memmPrecisionByOOVRate = [
	[0.83, null, null, null, null, null, null, null, null, null, 0.34],
	[0.76, null, null, null, null, 0.72, null, null, null, null, 0.55],
	[0.6, null, null, 0.56, null, null, null, 0.59, null, null, 0.5],
	[0.16, null, 0.2, null, null, 0.0, null, null, null, null, null],
	[0.6, 0.5, null, null, null, null, null, null, null, null, null],
	[0.8, 0.5, 0.2, 0.56, null, 0.71, null, 0.59, null, null, 0.45],
]

export const memmRecallByOOVRate = [
	[0.82, null, null, null, null, null, null, null, null, null, 0.14],
	[0.74, null, null, null, null, 0.62, null, null, null, null, 0.5],
	[0.51, null, null, 0.55, null, null, null, 0.59, null, null, 0.5],
	[0.19, null, 0.25, null, null, null, null, null, null, null, null],
	[0.6, 0.5, null, null, null, null, null, null, null, null, null],
	[0.79, 0.5, 0.25, 0.55, null, 0.61, null, 0.59, null, null, 0.25],
]
