type ColorKeys =
	| 'surface1'
	| 'surface2'
	| 'surface3'
	| 'gray1'
	| 'gray2'
	| 'gray3'
	| 'gray4'
	| 'gray5'
	| 'gray6'
	| 'gray7'
	| 'gray8'
	| 'gray9'
	| 'red1'
	| 'red2'
	| 'red3'
	| 'red4'
	| 'red5'
	| 'red6'
	| 'yellow1'
	| 'yellow2'
	| 'yellow3'
	| 'yellow4'
	| 'yellow5'
	| 'yellow6'
	| 'green1'
	| 'green2'
	| 'green3'
	| 'green4'
	| 'green5'
	| 'green6'
	| 'teal1'
	| 'teal2'
	| 'teal3'
	| 'teal4'
	| 'teal5'
	| 'teal6'
	| 'blue1'
	| 'blue2'
	| 'blue3'
	| 'blue4'
	| 'blue5'
	| 'blue6'
	| 'purple1'
	| 'purple2'
	| 'purple3'
	| 'purple4'
	| 'purple5'
	| 'purple6'

export type ColorPalette = {
	id: string
	name: string
	appearance: 'light' | 'dark'
	colors: Record<ColorKeys, string>
}

type ColorAliasName =
	| 'background'
	| 'contentFill'
	| 'insetFill'
	| 'line'
	| 'oBackground'
	| 'oContentFill'
	| 'oLine'
	| 'focus'
	| 'heading'
	| 'text'
	| 'label'
	| 'buttonLabel'
	| 'buttonLabelHover'
	| 'link'
	| 'linkUnderline'
	| 'linkHover'
	| 'linkUnderlineHover'

export type ColorAliases = Record<ColorAliasName, string>

const paper: ColorPalette = {
	id: 'paper',
	name: 'Paper',
	appearance: 'light',
	colors: {
		surface1: '#FBF9F4',
		surface2: '#FEFDFB',
		surface3: '#F7F4EE',
		gray1: '#1A1A1A',
		gray2: '#333333',
		gray3: '#4A4A4A',
		gray4: '#616161',
		gray5: '#787878',
		gray6: '#8F8F8F',
		gray7: 'rgba(153, 153, 153, 0.7)',
		gray8: 'rgba(153, 153, 153, 0.4)',
		gray9: 'rgba(153, 153, 153, 0.18)',
		red1: '#E33B12',
		red2: '#EE542F',
		red3: '#F2775A',
		red4: '#F69E89',
		red5: '#F9C5B8',
		red6: '#FDECE7',
		yellow1: '#84A10D',
		yellow2: '#9BBD0F',
		yellow3: '#BAE312',
		yellow4: '#D3F155',
		yellow5: '#E5F79C',
		yellow6: '#F6FCDE',
		green1: '#04A934',
		green2: '#06D542',
		green3: '#1FFA5E',
		green4: '#65FB90',
		green5: '#96FDB4',
		green6: '#CDFEDB',
		teal1: '#0D88A5',
		teal2: '#0F9CBD',
		teal3: '#12BEE8',
		teal4: '#55D3F2',
		teal5: '#A0E7F8',
		teal6: '#DEF7FC',
		blue1: '#5D39EF',
		blue2: '#6847F0',
		blue3: '#927BF4',
		blue4: '#AA97F7',
		blue5: '#D4CBFB',
		blue6: '#EFECFD',
		purple1: '#C610A3',
		purple2: '#ED1CC4',
		purple3: '#F150D2',
		purple4: '#F580DE',
		purple5: '#F9B4EC',
		purple6: '#FDE3F8',
	},
}

const charcoal: ColorPalette = {
	id: 'charcoal',
	name: 'Charcoal',
	appearance: 'dark',
	colors: {
		surface1: '#141414',
		surface2: '#1A1A1A',
		surface3: '#212121',
		gray1: '#F3F3F1',
		gray2: '#DCDAD6',
		gray3: '#C6C4BE',
		gray4: '#AEABA3',
		gray5: '#928F87',
		gray6: '#77756E',
		gray7: 'rgba(107, 107, 107, 0.7)',
		gray8: 'rgba(107, 107, 107, 0.4)',
		gray9: 'rgba(107, 107, 107, 0.18)',
		red1: 'rgba(255, 115, 82, 1)',
		red2: 'rgba(255, 115, 82, 0.9)',
		red3: 'rgba(255, 115, 82, 0.8)',
		red4: 'rgba(255, 115, 82, 0.6)',
		red5: 'rgba(255, 115, 82, 0.4)',
		red6: 'rgba(255, 115, 82, 0.2)',
		yellow1: 'rgba(184, 229, 0, 1)',
		yellow2: 'rgba(184, 229, 0, 0.9)',
		yellow3: 'rgba(184, 229, 0, 0.8)',
		yellow4: 'rgba(184, 229, 0, 0.6)',
		yellow5: 'rgba(184, 229, 0, 0.4)',
		yellow6: 'rgba(184, 229, 0, 0.2)',
		green1: 'rgba(0, 224, 65, 1)',
		green2: 'rgba(0, 224, 65, 0.9)',
		green3: 'rgba(0, 224, 65, 0.8)',
		green4: 'rgba(0, 224, 65, 0.6)',
		green5: 'rgba(0, 224, 65, 0.4)',
		green6: 'rgba(0, 224, 65, 0.15)',
		teal1: 'rgba(15, 209, 255, 1)',
		teal2: 'rgba(15, 209, 255, 0.9)',
		teal3: 'rgba(15, 209, 255, 0.8)',
		teal4: 'rgba(15, 209, 255, 0.6)',
		teal5: 'rgba(15, 209, 255, 0.4)',
		teal6: 'rgba(15, 209, 255, 0.2)',
		blue1: 'rgba(153, 128, 255, 1)',
		blue2: 'rgba(153, 128, 255, 0.9)',
		blue3: 'rgba(153, 128, 255, 0.8)',
		blue4: 'rgba(153, 128, 255, 0.6)',
		blue5: 'rgba(153, 128, 255, 0.4)',
		blue6: 'rgba(153, 128, 255, 0.2)',
		purple1: 'rgba(255, 92, 223, 1)',
		purple2: 'rgba(255, 92, 223, 0.9)',
		purple3: 'rgba(255, 92, 223, 0.8)',
		purple4: 'rgba(255, 92, 223, 0.6)',
		purple5: 'rgba(255, 92, 223, 0.4)',
		purple6: 'rgba(255, 92, 223, 0.25)',
	},
}

export const getColorAliases = (
	c: ColorPalette['colors'],
	overlay?: boolean,
): ColorAliases => ({
	// Fills & borders
	background: overlay ? c.surface3 : c.surface2,
	contentFill: overlay ? c.surface2 : c.surface1,
	insetFill: overlay ? c.surface2 : c.surface1,
	line: c.gray9,

	// Overlay fills & borders,
	// for elements on overlays
	oBackground: c.surface3,
	oContentFill: c.surface2,
	oLine: c.gray8,

	// Text
	heading: c.gray1,
	text: c.gray2,
	label: c.gray5,

	buttonLabel: c.gray1,
	buttonLabelHover: c.gray3,

	focus: c.red3,

	link: c.red1,
	linkUnderline: c.red5,

	linkHover: c.red1,
	linkUnderlineHover: c.red2,

	error: c.red1,
	success: c.green1,
})

export const colorPalettes = {
	paper,
	charcoal,
}

export const colorAliases = {
	paper: getColorAliases(paper.colors),
	charcoal: getColorAliases(charcoal.colors),
}
