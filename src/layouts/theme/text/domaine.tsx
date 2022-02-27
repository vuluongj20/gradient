import { TextScaleDefinition } from './index'

const headingFontFamily =
	'"Domaine Display Condensed", "Palatino Linotype", Palatino, Garamond, "Apple Garamond", Georgia, serif'

const bodyFontFamily =
	'"Domaine Text", Palatino, Garamond, "Apple Garamond", Georgia, serif'

const domaine: TextScaleDefinition = {
	h1: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 4.75, l: 4.75, m: 3.875, s: 3, xs: 3 },
		fontWeight: 700,
		lineHeight: 1.1,
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 3.625, l: 3.625, m: 3.125, s: 2.5, xs: 2.5 },
		fontWeight: 700,
		lineHeight: 1.1,
		letterSpacing: '-0.02em',
	},
	h3: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 2.75, l: 2.75, m: 2.5, s: 2.125, xs: 2.125 },
		fontWeight: 600,
		lineHeight: 1.1,
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 2.125, l: 2.125, m: 2, s: 1.75, xs: 1.75 },
		fontWeight: 600,
		lineHeight: 1,
		letterSpacing: '-0.01em',
	},
	h5: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 1.625, l: 1.625, m: 1.625, s: 1.5, xs: 1.5 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.005em',
	},
	h6: {
		fontFamily: headingFontFamily,
		fontSizes: { xl: 1.25, l: 1.25, m: 1.25, s: 1.25, xs: 1.25 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.005em',
	},
	body: {
		fontFamily: bodyFontFamily,
		fontSizes: { xl: 1.125, l: 1.125, m: 1.125, s: 1, xs: 1 },
		fontWeight: 400,
		lineHeight: 1.4,
		letterSpacing: '-0.005em',
	},
	label: {
		fontFamily: bodyFontFamily,
		fontSizes: { xl: 1, l: 1, m: 1, s: 0.9375, xs: 0.9375 },
		fontWeight: 500,
		lineHeight: 1.2,
	},
}

export default domaine
