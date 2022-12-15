import { CSSObject, Keyframes, keyframes } from 'styled-components'

import {
	Breakpoint,
	breakpoints,
	numericBreakpoints,
	orderedBreakpoints,
} from '@theme/breakpoints'
import { TextScale, textScales } from '@theme/text'

type CSSStringUtil = Record<'defaultTransitions' | 'lineHeight', string>
type CSSObjectUtil = Record<
	| 'spread'
	| 'flexCenter'
	| 'absCenter'
	| 'focusVisible'
	| 'svgFocusVisible'
	| 'transitionGroupFade',
	CSSObject
>

export type Theme = {
	elevation: number
	/** Text */
	text: {
		system: TextScale
		content: TextScale
		viz: TextScale
	}
	media: Record<Breakpoint | 'mobile', string>
	gridColumn: Record<'text' | 'wide' | 'fullWidth', CSSObject>
	fadeIn: Keyframes
} & CSSStringUtil &
	CSSObjectUtil

export type ThemeSettings = {
	color: {
		appearance: 'light' | 'dark' | 'auto'
		elevation: number
		increaseContrast: boolean
	}
	text: {
		system: keyof typeof textScales
		content: keyof typeof textScales
		viz: keyof typeof textScales
	}
	alwaysShowVideoCaptions: boolean
}

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

export const getTheme = (settings: ThemeSettings): Theme => {
	return {
		elevation: settings.color.elevation,
		text: {
			system: textScales[settings.text.system],
			content: textScales[settings.text.content],
			viz: textScales[settings.text.viz],
		},
		fadeIn,
		spread: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
		flexCenter: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		absCenter: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		focusVisible: {
			outline: 'none',
			boxShadow: '0 0 0 3px var(--color-focus)',
			borderColor: 'transparent',
			zIndex: 1,
		},
		svgFocusVisible: {
			strokeWidth: 3,
			stroke: 'var(--color-focus)',
			zIndex: 1,
		},
		lineHeight: `calc(1rem * ${String(textScales.sohne.body.lineHeight)})`,
		defaultTransitions: `background-color var(--animation-medium-out), 
		      border-color var(--animation-medium-out),
		      box-shadow var(--animation-medium-out)`,
		transitionGroupFade: {
			opacity: 0,
			['&.enter-active, &.enter-done']: {
				opacity: 1,
			},
			['&.exit-active, &.exit-done']: {
				opacity: 0,
			},
		},
		media: {
			xs: `@media only screen and (max-width: ${breakpoints.xs})`,
			s: `@media only screen and (max-width: ${breakpoints.s})`,
			m: `@media only screen and (max-width: ${breakpoints.m})`,
			l: `@media only screen and (max-width: ${breakpoints.l})`,
			xl: `@media only screen and (max-width: ${breakpoints.xl})`,
			mobile: `@media only screen and (max-width: ${breakpoints.s}), only screen and (max-height: ${breakpoints.s})`,
		},
		gridColumn: {
			text: {
				width: '100%',
				maxWidth: '44rem',
				marginLeft: 'auto',
				marginRight: 'auto',
				gridColumn: '4 / -4',
				[`@media only screen and (max-width: ${breakpoints.xl})`]: {
					gridColumn: '3 / -3',
				},
				[`@media only screen and (max-width: ${breakpoints.m})`]: {
					gridColumn: '2 / -2',
				},
				[`@media only screen and (max-width: ${breakpoints.s})`]: {
					gridColumn: '1 / -1',
				},
			},
			wide: {
				width: '100%',
				maxWidth: '60rem',
				marginLeft: 'auto',
				marginRight: 'auto',
				gridColumn: '2 / -2',
				[`@media only screen and (max-width: ${breakpoints.m})`]: {
					gridColumn: '1 / -1',
				},
			},
			fullWidth: {
				width: '100%',
				gridColumn: '1 / -1',
			},
		},
	}
}
