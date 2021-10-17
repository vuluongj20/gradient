import { Breakpoints } from './types'

export const breakpoints: Breakpoints = {
	xs: '30em', // 480px
	s: '48em', // 768px
	m: '64em', // 1024px
	l: '74em', // 1184px
	xl: '90em', // 1440px
}

const breakpointMediaRules = Object.keys(breakpoints).map(
	(key) => `@media only screen and max-width(${breakpoints[key]})`,
)

export type BreakpointMediaRule = typeof breakpointMediaRules[number]
