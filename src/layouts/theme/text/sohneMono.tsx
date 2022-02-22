import { TextScaleDefinition } from './index'

const fontFamily = '"Sohne Mono", Courier, "Andale Mono", "Courier New", monospace'

const sohneMono: TextScaleDefinition = {
	h1: {
		fontFamily,
		fontSizes: { xl: 4.75, l: 4.75, m: 3.875, s: 3, xs: 3 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h2: {
		fontFamily,
		fontSizes: { xl: 3.625, l: 3.625, m: 3.125, s: 2.5, xs: 2.5 },
		fontWeight: 700,
		lineHeight: 1.2,
		letterSpacing: '-0.02em',
	},
	h3: {
		fontFamily,
		fontSizes: { xl: 2.75, l: 2.75, m: 2.5, s: 2.125, xs: 2.125 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h4: {
		fontFamily,
		fontSizes: { xl: 2.125, l: 2.125, m: 2, s: 1.75, xs: 1.75 },
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h5: {
		fontFamily,
		fontSizes: { xl: 1.625, l: 1.625, m: 1.625, s: 1.5, xs: 1.5 },
		fontWeight: 500,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	h6: {
		fontFamily,
		fontSizes: { xl: 1.25, l: 1.25, m: 1.25, s: 1.25, xs: 1.25 },
		fontWeight: 500,
		lineHeight: 1.2,
		letterSpacing: '-0.01em',
	},
	body: {
		fontFamily,
		fontWeight: 400,
		fontSizes: { xl: 1, l: 1, m: 1, s: 0.9375, xs: 0.9375 },
		lineHeight: 1.4,
	},
	label: {
		fontFamily,
		fontSizes: { xl: 1, l: 1, m: 1, s: 0.9375, xs: 0.9375 },
		fontWeight: 500,
		textTransform: 'uppercase',
		lineHeight: 1.2,
	},
}

export default sohneMono
