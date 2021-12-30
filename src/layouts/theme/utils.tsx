import * as CSS from 'csstype'

import { Theme } from './index'

import { Breakpoint } from '@types'

import { paddingHorizontal, breakpoints } from '@utils/styling'

type CSSObject = Record<keyof CSS.Properties, CSS.Properties>

type CSSGroup = CSSObject | CSS.Properties

type CSSUtilName = 'spread' | 'flexCenter' | 'absCenter' | 'focusVisible'

type CSSUtil = Record<CSSUtilName, CSS.Properties>

type MediaUtil = { media: Record<Breakpoint, string> }

type SpacingName =
	| 'paddingVertical'
	| 'paddingTop'
	| 'paddingBottom'
	| 'marginVertical'
	| 'marginTop'
	| 'marginBottom'
	| 'paddingHorizontal'

export type SpacingUtil = { spacing: Record<SpacingName, CSSGroup[] | CSSGroup> }

export type Utils = CSSUtil & MediaUtil & SpacingUtil

const breakpointNames = Object.keys(breakpoints)

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
	theme: Omit<Theme, 'u'>,
	properties: string[],
): CSSGroup[] => {
	const generateCSSProperties = (props: string[], value: string): CSSGroup =>
		Object.fromEntries(props.map((p) => [p, value]))

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

export const generateUtils = (theme: Omit<Theme, 'u'>): Utils => ({
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
		boxShadow: `0 0 0 4px ${theme.colors.focus}`,
	},
	media: {
		xs: `@media only screen and (max-width: ${theme.breakpoints.xs})`,
		s: `@media only screen and (max-width: ${theme.breakpoints.s})`,
		m: `@media only screen and (max-width: ${theme.breakpoints.m})`,
		l: `@media only screen and (max-width: ${theme.breakpoints.l})`,
		xl: `@media only screen and (max-width: ${theme.breakpoints.xl})`,
	},
	spacing: {
		paddingVertical: generateAdaptiveSpacing(theme, ['paddingTop', 'paddingBottom']),
		paddingTop: generateAdaptiveSpacing(theme, ['paddingTop']),
		paddingBottom: generateAdaptiveSpacing(theme, ['paddingBottom']),
		marginVertical: generateAdaptiveSpacing(theme, ['marginTop', 'marginBottom']),
		marginTop: generateAdaptiveSpacing(theme, ['marginTop']),
		marginBottom: generateAdaptiveSpacing(theme, ['marginBottom']),
		paddingHorizontal: {
			paddingLeft: `${paddingHorizontal * 2}em`,
			paddingRight: `${paddingHorizontal * 2}em`,
			[`@media only screen and (max-width: ${theme.breakpoints.s})`]: {
				paddingLeft: `${paddingHorizontal}em`,
				paddingRight: `${paddingHorizontal}em`,
			},
			[`@media only screen and (max-width: ${theme.breakpoints.xs})`]: {
				paddingLeft: `${paddingHorizontal * 0.75}em`,
				paddingRight: `${paddingHorizontal * 0.75}em`,
			},
		},
	},
})
