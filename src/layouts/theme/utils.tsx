import { CSSObject } from 'styled-components'

import { Theme } from '@theme'

import { Breakpoint, breakpoints, paddingHorizontal } from '@utils/style'

type CSSUtilName =
	| 'spread'
	| 'flexCenter'
	| 'absCenter'
	| 'focusVisible'
	| 'svgFocusVisible'

type CSSUtil = Record<CSSUtilName, CSSObject>

type CSSStringUtilName = 'defaultTransitions' | 'lineHeight'

type CSSStringUtil = Record<CSSStringUtilName, string>

type MediaUtil = { media: Record<Breakpoint | 'mobile', string> }

type GridColumnUtil = { gridColumn: Record<'text' | 'wide' | 'fullWidth', CSSObject> }

type SpacingName =
	| 'paddingVertical'
	| 'paddingTop'
	| 'paddingBottom'
	| 'marginVertical'
	| 'marginTop'
	| 'marginBottom'

type ComplexSpacingName =
	| 'paddingHorizontal'
	| 'paddingHorizontalMobile'
	| 'marginHorizontal'
	| 'marginHorizontalMobile'

export type SpacingUtil = {
	space: Record<SpacingName, CSSObject[]> & Record<ComplexSpacingName, CSSObject>
}

export type Utils = CSSUtil & CSSStringUtil & MediaUtil & GridColumnUtil & SpacingUtil

const breakpointNames = Object.keys(breakpoints) as Breakpoint[]

const adaptiveSpacing: Record<Breakpoint, number>[] = [
	{ xl: 0, l: 0, m: 0, s: 0, xs: 0 },
	{ xl: 1, l: 1, m: 1, s: 1, xs: 0 },
	{ xl: 2, l: 2, m: 1, s: 1, xs: 1 },
	{ xl: 3, l: 3, m: 2, s: 2, xs: 1 },
	{ xl: 4, l: 4, m: 3, s: 3, xs: 2 },
	{ xl: 5, l: 5, m: 4, s: 4, xs: 2 },
	{ xl: 6, l: 6, m: 5, s: 5, xs: 3 },
	{ xl: 7, l: 7, m: 6, s: 6, xs: 4 },
	{ xl: 8, l: 8, m: 7, s: 7, xs: 5 },
]

const generateAdaptiveSpacing = (
	theme: Omit<Theme, 'utils'>,
	properties: string[],
): CSSObject[] => {
	const generateCSSProperties = (props: string[], value: string): CSSObject =>
		Object.fromEntries(props.map((p) => [p, value]))
	console.log(
		theme.space.map((s, i) => ({
			...generateCSSProperties(properties, s),
			...Object.fromEntries(
				breakpointNames.map((b) => [
					`@media only screen and (max-width: ${theme.breakpoints[b]})`,
					generateCSSProperties(properties, theme.space[adaptiveSpacing[i][b]]),
				]),
			),
		})),
	)

	return theme.space.map((s, i) => ({
		...generateCSSProperties(properties, s),
		...Object.fromEntries(
			breakpointNames.map((b) => [
				`@media only screen and (max-width: ${theme.breakpoints[b]})`,
				generateCSSProperties(properties, theme.space[adaptiveSpacing[i][b]]),
			]),
		),
	}))
}

export const generateUtils = (theme: Omit<Theme, 'utils'>): Utils => ({
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
		boxShadow: `0 0 0 3px ${theme.focus}`,
		borderColor: 'transparent',
		zIndex: 1,
	},
	svgFocusVisible: {
		strokeWidth: 3,
		stroke: theme.focus,
		zIndex: 1,
	},
	lineHeight: `calc(1rem * ${String(theme.text.system.body.lineHeight)})`,
	defaultTransitions: `background-color 0.5s ${theme.animation.outQuart}, 
      border-color 0.5s ${theme.animation.outQuart},
      box-shadow 0.5s ${theme.animation.outQuart}`,
	media: {
		xs: `@media only screen and (max-width: ${theme.breakpoints.xs})`,
		s: `@media only screen and (max-width: ${theme.breakpoints.s})`,
		m: `@media only screen and (max-width: ${theme.breakpoints.m})`,
		l: `@media only screen and (max-width: ${theme.breakpoints.l})`,
		xl: `@media only screen and (max-width: ${theme.breakpoints.xl})`,
		mobile: `@media only screen and (max-width: ${theme.breakpoints.s}), only screen and (max-height: ${theme.breakpoints.s})`,
	},
	gridColumn: {
		text: {
			width: '100%',
			maxWidth: '44rem',
			marginLeft: 'auto',
			marginRight: 'auto',
			gridColumn: '4 / -4',
			[`@media only screen and (max-width: ${theme.breakpoints.xl})`]: {
				gridColumn: '3 / -3',
			},
			[`@media only screen and (max-width: ${theme.breakpoints.m})`]: {
				gridColumn: '2 / -2',
			},
			[`@media only screen and (max-width: ${theme.breakpoints.s})`]: {
				gridColumn: '1 / -1',
			},
		},
		wide: {
			width: '100%',
			maxWidth: '74rem',
			marginLeft: 'auto',
			marginRight: 'auto',
			gridColumn: '2 / -2',
			[`@media only screen and (max-width: ${theme.breakpoints.m})`]: {
				gridColumn: '1 / -1',
			},
		},
		fullWidth: {
			width: '100%',
			gridColumn: '1 / -1',
		},
	},
	space: {
		paddingVertical: generateAdaptiveSpacing(theme, ['paddingTop', 'paddingBottom']),
		paddingTop: generateAdaptiveSpacing(theme, ['paddingTop']),
		paddingBottom: generateAdaptiveSpacing(theme, ['paddingBottom']),
		paddingHorizontal: {
			paddingLeft: `max(${paddingHorizontal * 2}rem, var(--sal, 0px))`,
			paddingRight: `max(${paddingHorizontal * 2}rem, var(--sar, 0px))`,
			[`@media only screen and (max-width: ${theme.breakpoints.s}), only screen and (max-height: ${theme.breakpoints.s})`]:
				{
					paddingLeft: `max(${paddingHorizontal}rem, var(--sal, 0px))`,
					paddingRight: `max(${paddingHorizontal}rem, var(--sar, 0px))`,
				},
			[`@media only screen and (max-width: ${theme.breakpoints.xs})`]: {
				paddingLeft: `max(${paddingHorizontal * 0.5}rem, var(--sal, 0px))`,
				paddingRight: `max(${paddingHorizontal * 0.5}rem, var(--sar, 0px))`,
			},
		},
		paddingHorizontalMobile: {
			[`@media only screen and (max-width: ${theme.breakpoints.s}), only screen and (max-height: ${theme.breakpoints.s})`]:
				{
					paddingLeft: `max(${paddingHorizontal}rem, var(--sal, 0px))`,
					paddingRight: `max(${paddingHorizontal}rem, var(--sar, 0px))`,
				},
			[`@media only screen and (max-width: ${theme.breakpoints.xs})`]: {
				paddingLeft: `max(${paddingHorizontal * 0.5}rem, var(--sal, 0px))`,
				paddingRight: `max(${paddingHorizontal * 0.5}rem, var(--sar, 0px))`,
			},
		},
		marginVertical: generateAdaptiveSpacing(theme, ['marginTop', 'marginBottom']),
		marginTop: generateAdaptiveSpacing(theme, ['marginTop']),
		marginBottom: generateAdaptiveSpacing(theme, ['marginBottom']),
		marginHorizontal: {
			marginLeft: `max(${paddingHorizontal * 2}rem, var(--sal, 0px))`,
			marginRight: `max(${paddingHorizontal * 2}rem, var(--sar, 0px))`,
			width: `calc(100% - max(${paddingHorizontal * 2}rem, var(--sal, 0px)) * 2)`,
			[`@media only screen and (max-width: ${theme.breakpoints.s}), only screen and (max-height: ${theme.breakpoints.s})`]:
				{
					marginLeft: `max(${paddingHorizontal}rem, var(--sal, 0px))`,
					marginRight: `max(${paddingHorizontal}rem, var(--sar, 0px))`,
					width: `calc(100% - max(${paddingHorizontal}rem, var(--sal, 0px)) * 2)`,
				},
			[`@media only screen and (max-width: ${theme.breakpoints.xs})`]: {
				marginLeft: `max(${paddingHorizontal * 0.5}rem, var(--sal, 0px))`,
				marginRight: `max(${paddingHorizontal * 0.5}rem, var(--sar, 0px))`,
				width: `calc(100% - max(${paddingHorizontal * 0.5}rem, var(--sal, 0px)) * 2)`,
			},
		},
		marginHorizontalMobile: {
			[`@media only screen and (max-width: ${theme.breakpoints.s}), only screen and (max-height: ${theme.breakpoints.s})`]:
				{
					marginLeft: `max(${paddingHorizontal}rem, var(--sal, 0px))`,
					marginRight: `max(${paddingHorizontal}rem, var(--sar, 0px))`,
					width: `calc(100% - max(${paddingHorizontal}rem, var(--sal, 0px)) * 2)`,
				},
			[`@media only screen and (max-width: ${theme.breakpoints.xs})`]: {
				marginLeft: `max(${paddingHorizontal * 0.5}rem, var(--sal, 0px))`,
				marginRight: `max(${paddingHorizontal * 0.5}rem, var(--sar, 0px))`,
				width: `calc(100% - max(${paddingHorizontal * 0.5}rem, var(--sal, 0px)) * 2)`,
			},
		},
	},
})
