import { TextScaleDefinition } from './index'

const sohneFontFamily = 'Sohne, "Helvetica Neue", Helvetica, Tahoma, sans-serif'

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
		fontSizes: { xl: 1, l: 1, m: 1, s: 0.9375, xs: 0.9375 },
		lineHeight: 1.4,
	},
	label: {
		fontFamily: sohneFontFamily,
		fontSizes: { xl: 1, l: 1, m: 1, s: 0.9375, xs: 0.9375 },
		fontWeight: 500,
		textTransform: 'uppercase',
		lineHeight: 1.2,
	},
}

export default sohne
