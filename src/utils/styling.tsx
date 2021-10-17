import { getNestedKey } from './functions'

import { Breakpoint } from '@types'

type ColCounts = Record<Breakpoint, number>

/** Number of grid columns at different breakpoints */
export const gridColCounts: ColCounts = { xl: 12, l: 10, m: 8, s: 6, xs: 4 }

/** Width of outer frame, in em unit */
export const frameWidth = 2

/** Simplify calls to the theme object in styled-components.
 *  Instead of having to write `${p => p.theme.[path]}`
 *  we can write `${theme([path])}`
 *  */
export const theme =
	(key: string) =>
	(props: Record<string, unknown>): unknown =>
		getNestedKey(props.theme, key)

/** Check system settings for preference for reduced motion */
export const reducedMotion = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false
	}
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
