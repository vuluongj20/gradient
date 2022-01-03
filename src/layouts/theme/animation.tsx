type EasingName =
	| 'inSine'
	| 'outSine'
	| 'inOutSine'
	| 'inQuad'
	| 'outQuad'
	| 'inOutQuad'
	| 'inCubic'
	| 'outCubic'
	| 'inOutCubic'
	| 'inQuart'
	| 'outQuart'
	| 'inOutQuart'
	| 'inQuint'
	| 'outQuint'
	| 'inOutQuint'
	| 'inExpo'
	| 'outExpo'
	| 'inOutExpo'
	| 'inCirc'
	| 'outCirc'
	| 'inOutCirc'
	| 'inBack'
	| 'outBack'
	| 'inOutBack'

type Easings = Record<EasingName, string>

type AnimationAliasName =
	| 'vFastIn'
	| 'vFastOut'
	| 'vFastInOut'
	| 'fastIn'
	| 'fastOut'
	| 'fastInOut'
	| 'mediumIn'
	| 'mediumOut'
	| 'mediumInOut'
	| 'slowIn'
	| 'slowOut'
	| 'slowInOut'

type AnimationAliases = Record<AnimationAliasName, string>

export type Animation = Easings &
	AnimationAliases & {
		reduced: boolean
	}

export const easings: Easings = {
	inSine: 'cubic-bezier(0.12, 0, 0.39, 0)',
	outSine: 'cubic-bezier(0.61, 1, 0.88, 1)',
	inOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',
	inQuad: 'cubic-bezier(0.11, 0, 0.5, 0)',
	outQuad: 'cubic-bezier(0.5, 1, 0.89, 1)',
	inOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
	inCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
	outCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
	inOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
	inQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
	outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
	inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
	inQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
	outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
	inOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
	inExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
	outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
	inOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
	inCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
	outCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
	inOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
	inBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
	outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
	inOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
}

export const animationAliases: AnimationAliases = {
	vFastIn: `0.125s ${easings.inQuad}`,
	vFastOut: `0.125s ${easings.outQuad}`,
	vFastInOut: `0.125s ${easings.inOutQuad}`,
	fastIn: `0.25s ${easings.inQuart}`,
	fastOut: `0.25s ${easings.outQuart}`,
	fastInOut: `0.25s ${easings.inOutQuart}`,
	mediumIn: `0.5s ${easings.inQuart}`,
	mediumOut: `0.5s ${easings.outQuart}`,
	mediumInOut: `0.5s ${easings.inOutQuart}`,
	slowIn: `1s ${easings.inQuart}`,
	slowOut: `1s ${easings.outQuart}`,
	slowInOut: `1s ${easings.inOutQuart}`,
}

export const animation: Easings & AnimationAliases = { ...easings, ...animationAliases }
