import { TypeScale } from './types'

const sohneFontFamily =
	'Sohne, Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif'

const sohne: TypeScale = {
	h1: {
		fontFamily: sohneFontFamily,
		fontSize: '3.8em',
		fontWeight: 700,
		lineHeight: 1.2,
	},
	h2: {
		fontFamily: sohneFontFamily,
		fontSize: '3em',
		fontWeight: 700,
		lineHeight: 1.2,
	},
	h3: {
		fontFamily: sohneFontFamily,
		fontSize: '2.4em',
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h4: {
		fontFamily: sohneFontFamily,
		fontSize: '2em',
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h5: {
		fontFamily: sohneFontFamily,
		fontSize: '1.6em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
	h6: {
		fontFamily: sohneFontFamily,
		fontSize: '1.2em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
	text: {
		fontFamily: sohneFontFamily,
		fontSize: '0.8em',
		fontWeight: 400,
		lineHeight: 1.4,
	},
	label: {
		fontFamily: sohneFontFamily,
		fontSize: '0.8em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
}

const domaineHeadingFontFamily =
	'"Domaine Display Narrow", "Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif'

const domaineBodyFontFamily =
	'"Domaine Text", Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif'

const domaine: TypeScale = {
	h1: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '3.8em',
		fontWeight: 700,
		lineHeight: 1.2,
	},
	h2: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '3em',
		fontWeight: 700,
		lineHeight: 1.2,
	},
	h3: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '2.4em',
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h4: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '2em',
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h5: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '1.6em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
	h6: {
		fontFamily: domaineHeadingFontFamily,
		fontSize: '1.2em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
	text: {
		fontFamily: domaineBodyFontFamily,
		fontSize: '1em',
		fontWeight: 400,
		lineHeight: 1.4,
	},
	label: {
		fontFamily: domaineBodyFontFamily,
		fontSize: '1em',
		fontWeight: 500,
		lineHeight: 1.2,
	},
}

export const typeScales = {
	sohne,
	domaine,
}
