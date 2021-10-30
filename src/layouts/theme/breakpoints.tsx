import { breakpoints } from '@utils/styling'

const breakpointMediaRules = Object.keys(breakpoints).map(
	(key) => `@media only screen and max-width(${breakpoints[key]})`,
)

export type BreakpointMediaRule = typeof breakpointMediaRules[number]
