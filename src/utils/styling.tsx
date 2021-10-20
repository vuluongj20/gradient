import { Breakpoint } from '@types'

type ColCounts = Record<Breakpoint, number>

/** Number of grid columns at different breakpoints */
export const gridColCounts: ColCounts = { xl: 12, l: 10, m: 8, s: 6, xs: 4 }

/** Width of outer frame, in em unit */
export const frameWidth = 2

/** Check system settings for preference for reduced motion */
export const reducedMotion = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false
	}
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
