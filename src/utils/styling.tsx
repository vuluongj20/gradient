import { Breakpoint } from '@types'

type ColCounts = Record<Breakpoint, number>

/**
 * List of breakpoints. This should be in the utils folder
 * instead of the theme folder since we may want to import it
 * into individual components too.
 */
export const breakpoints: Record<Breakpoint, string> = {
	xs: '30em', // 480px
	s: '48em', // 768px
	m: '64em', // 1024px
	l: '74em', // 1184px
	xl: '90em', // 1440px
}

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
