import { TextScaleDefinition } from './index'

const sohneMonoFontFamily =
	'"Sohne Mono", Courier, "Andale Mono", "Courier New", monospace'

const sohneMono: TextScaleDefinition = {
	h1: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 4.25, l: 4.25, m: 3, s: 3, xs: 1.8125 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 3.25, l: 3.25, m: 2.375, s: 2.375, xs: 1.625 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h3: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 2.375, l: 2.375, m: 2, s: 2, xs: 1.4375 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 1.75, l: 1.75, m: 1.625, s: 1.625, xs: 1.25 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h5: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 1.375, l: 1.375, m: 1.25, s: 1.25, xs: 1.125 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h6: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 1.125, l: 1.125, m: 1.125, s: 1.125, xs: 1.0625 },
		fontWeight: 400,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	body: {
		fontFamily: sohneMonoFontFamily,
		fontWeight: 400,
		fontSizes: { xl: 0.9375, l: 0.9375, m: 0.9375, s: 0.9375, xs: 0.875 },
		lineHeight: 1.4,
	},
	label: {
		fontFamily: sohneMonoFontFamily,
		fontSizes: { xl: 0.9375, l: 0.9375, m: 0.9375, s: 0.9375, xs: 0.875 },
		fontWeight: 500,
		textTransform: 'uppercase',
		lineHeight: 1.2,
	},
}

export default sohneMono
