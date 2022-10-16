import { keyframes } from 'styled-components'

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'

export const orderedBreakpoints: Breakpoint[] = ['xl', 'l', 'm', 's', 'xs']
/**
 * List of breakpoints. This should be in the utils folder
 * instead of the theme folder since we may want to import it
 * into individual components too.
 */
export const breakpoints: Record<Breakpoint, string> = {
	xl: '90rem', // 1440px
	l: '78rem', // 1248px
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
	xs: '0.25rem',
	s: '0.375rem',
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

/**
 * Spacing values. Most of the times, whole-number keys (0, 1, 2) are enough.
 * Decimal keys (0.5, 1.5) are only useful for small elements that need
 * balanced vertical & horizontal paddings, like buttons.
 */
export const space = {
	0: '4px',
	0.5: '6px',
	1: '8px',
	1.5: '12px',
	2: '16px',
	3: '24px',
	4: '32px',
	5: '48px',
	6: '64px',
	7: '96px',
	8: '128px',
}

export const navSize = {
	width: '2.5rem',
	mobileHeight: '3rem',
}

export type ColCounts = Record<Breakpoint | 'xxl', number>

/** Number of grid columns at different breakpoints */
export const gridColCounts: ColCounts = { xxl: 14, xl: 12, l: 10, m: 8, s: 6, xs: 4 }

/** Width of outer frame, in em unit */
export const paddingHorizontal = 2

export const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`
