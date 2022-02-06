type ColCounts = Record<Breakpoint, number>

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'
/**
 * List of breakpoints. This should be in the utils folder
 * instead of the theme folder since we may want to import it
 * into individual components too.
 */
export const breakpoints: Record<Breakpoint, string> = {
	xl: '90rem', // 1440px
	l: '74rem', // 1184px
	m: '64rem', // 1024px
	s: '48rem', // 768px
	xs: '30rem', // 480px
}
/** Useful for comparing with window.innerWidth */
export const numericBreakpoints: Record<Breakpoint, number> = {
	xl: 1440,
	l: 1184,
	m: 1024,
	s: 768,
	xs: 480,
}

/**
 * Should be kept in one place (inside theme) for better
 *  management, to prevent unintentional mixups
 */
export const zIndices: Record<string, number> = {
	nav: 9,
	dialog: 10,
	popover: 10,
	tooltip: 10,
}

/** Border radii */
export const radii: Partial<Record<Breakpoint, string>> = {
	s: '0.25rem',
	m: '0.5rem',
	l: '0.75rem',
}

/** Box shadows */
export const boxShadowsLight: Partial<Record<Breakpoint, string>> = {
	s: '0 1px 2px rgba(33, 37, 41, 0.04)',
	m: '0 1px 4px rgba(33, 37, 41, 0.06)',
	l: '0 4px 32px rgba(33, 37, 41, 0.08)',
}

export const boxShadowsDark: Partial<Record<Breakpoint, string>> = {
	s: '0 1px 2px rgb(25, 25, 25)',
	m: '0 1px 4px rgb(25, 25, 25)',
	l: '0 4px 32px rgb(25, 25, 25)',
}

/** Text shadows */
export const textShadows = {
	light: '0 1px 8px rgba(33, 37, 41, 0.16)',
	dark: '0 1px 12px rgba(25, 25, 25, 0.32)',
}

/** Spacing */
export const space = [
	'4px',
	'8px',
	'16px',
	'24px',
	'32px',
	'48px',
	'64px',
	'96px',
	'128px',
]

/** Number of grid columns at different breakpoints */
export const gridColCounts: ColCounts = { xl: 12, l: 10, m: 8, s: 6, xs: 4 }

/** Width of outer frame, in em unit */
export const paddingHorizontal = 2

/** Check system settings for preference for reduced motion */
export const reducedMotion = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false
	}
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
