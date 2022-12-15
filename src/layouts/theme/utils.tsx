import { CSSObject } from 'styled-components'

import { Theme } from '@theme'

import { Breakpoint, breakpoints, paddingHorizontal } from '@utils/style'

type CSSUtilName =
	| 'spread'
	| 'flexCenter'
	| 'absCenter'
	| 'focusVisible'
	| 'svgFocusVisible'
	| 'transitionGroupFade'

type CSSUtil = Record<CSSUtilName, CSSObject>

type CSSStringUtilName = 'defaultTransitions' | 'lineHeight'

type CSSStringUtil = Record<CSSStringUtilName, string>

type MediaUtil = { media: Record<Breakpoint | 'mobile', string> }

type GridColumnUtil = { gridColumn: Record<'text' | 'wide' | 'fullWidth', CSSObject> }

type ComplexSpacingName =
	| 'paddingHorizontal'
	| 'paddingHorizontalMobile'
	| 'marginHorizontal'
	| 'marginHorizontalMobile'

export type SpacingUtil = Record<ComplexSpacingName, CSSObject>

export type Utils = CSSUtil & CSSStringUtil & MediaUtil & GridColumnUtil & SpacingUtil

type PartialTheme = Omit<Theme, keyof Utils>

export const generateUtils = (theme: PartialTheme): Utils => ({
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
	lineHeight: `calc(1rem * ${String(theme.text.system.body.lineHeight)})`,
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
			maxWidth: '60rem',
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
})
