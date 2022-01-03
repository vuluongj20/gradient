import { CSSObject } from 'styled-components'

import { Breakpoint } from '@types'

import { breakpoints } from '@utils/styling'

type TextCategoryStyles = {
	fontFamily: string
	fontWeight: number
	lineHeight: number
	fontSize?: string
	letterSpacing?: string
	textTransform?: 'capitalize' | 'uppercase' | 'lowercase'
}

type TextCategoryDefinition = TextCategoryStyles & {
	fontSizes: Record<Breakpoint, number>
}

type TextCategory = CSSObject

type TextCategoryName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label'

type TextScaleDefinition = Record<TextCategoryName, TextCategoryDefinition>

export type TextScale = Record<TextCategoryName, TextCategory>

const sohneFontFamily =
	'Sohne, Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif'

const sohne: TextScaleDefinition = {
	h1: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 4.25, l: 4.25, m: 3, s: 3, xs: 1.8125 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 3.25, l: 3.25, m: 2.375, s: 2.375, xs: 1.625 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h3: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 2.375, l: 2.375, m: 2, s: 2, xs: 1.4375 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 1.75, l: 1.75, m: 1.625, s: 1.625, xs: 1.25 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h5: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 1.375, l: 1.375, m: 1.25, s: 1.25, xs: 1.125 },
		fontWeight: 500,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h6: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 1.125, l: 1.125, m: 1.125, s: 1.125, xs: 1.0625 },
		fontWeight: 500,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	body: {
		fontFamily: sohneFontFamily,
		fontWeight: 400,
		fontSizes: { xl: 1, l: 1, m: 1, s: 1, xs: 1 },
		lineHeight: 1.5,
	},
	label: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 1, l: 1, m: 1, s: 1, xs: 1 },
		fontWeight: 500,
		textTransform: 'uppercase',
		lineHeight: 1.2,
	},
}

const domaineHeadingFontFamily =
	'"Domaine Display Narrow", "Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif'

const domaineBodyFontFamily =
	'"Domaine Text", Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif'

const domaine: TextScaleDefinition = {
	h1: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 4.25, l: 4.25, m: 3, s: 3, xs: 1.8125 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 3.25, l: 3.25, m: 2.375, s: 2.375, xs: 1.625 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h3: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 2.375, l: 2.375, m: 2, s: 2, xs: 1.4375 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 1.75, l: 1.75, m: 1.625, s: 1.625, xs: 1.25 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h5: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 1.375, l: 1.375, m: 1.25, s: 1.25, xs: 1.125 },
		fontWeight: 500,
		lineHeight: 1.2,
	},
	h6: {
		fontFamily: domaineHeadingFontFamily,
		fontSizes: { xl: 1.125, l: 1.125, m: 1.125, s: 1.125, xs: 1.0625 },
		fontWeight: 500,
		lineHeight: 1.2,
	},
	body: {
		fontFamily: domaineBodyFontFamily,
		fontSizes: { xl: 1.125, l: 1.125, m: 1.125, s: 1.125, xs: 1.125 },
		fontWeight: 400,
		lineHeight: 1.5,
	},
	label: {
		fontFamily: domaineBodyFontFamily,
		fontSizes: { xl: 1, l: 1, m: 1, s: 1, xs: 1 },
		fontWeight: 500,
		lineHeight: 1.2,
	},
}

const getCSSStyleObject = (scale: TextScaleDefinition): TextScale => {
	const result = {}

	Object.keys(scale).map((key) => {
		const { fontFamily, fontWeight, lineHeight, letterSpacing, fontSizes } = scale[key]
		result[key] = {
			fontFamily,
			fontWeight,
			lineHeight,
			letterSpacing,
			fontSize: `${fontSizes.xl}em`,
		}

		Object.keys(fontSizes).map((breakpoint) => {
			result[key][`@media only screen and (max-width: ${breakpoints[breakpoint]})`] = {
				fontSize: `${fontSizes[breakpoint]}em`,
			}
		})
	})

	return result as TextScale
}

export const textScales = {
	sohne: getCSSStyleObject(sohne),
	domaine: getCSSStyleObject(domaine),
}
