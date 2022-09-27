type ColorKey =
	| 'white'
	| 'black'
	| 'surface1'
	| 'surface2'
	| 'surface3'
	| 'surface4'
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
	colors: Record<ColorKey, string>
}

type ColorAliasName =
	| 'background'
	| 'line'
	| 'oBackground'
	| 'oLine'
	| 'iBackground'
	| 'iLine'
	| 'focus'
	| 'heading'
	| 'body'
	| 'label'
	| 'primaryText'
	| 'primaryBackground'
	| 'primaryOpaqueBackground'
	| 'onPrimaryBackground'
	| 'activeText'
	| 'activeBackground'
	| 'onActiveBackground'
	| 'successText'
	| 'successBackground'
	| 'onSuccessBackground'
	| 'errorText'
	| 'errorBackground'
	| 'onErrorBackground'
	| 'linkText'
	| 'linkUnderline'
	| 'contentLinkText'
	| 'contentLinkUnderline'
	| 'contentLinkUnderlineHover'
	| 'primaryLinkText'
	| 'primaryLinkUnderline'
	| 'buttonLabel'
	| 'buttonLabelHover'
	| 'bar'

export type ColorAliases = Record<ColorAliasName, string>

const paper: ColorPalette = {
	id: 'paper',
	name: 'Paper',
	appearance: 'light',
	colors: {
		white: '#F1F2F4',
		black: '#212529',
		surface1: '#F8EAEC',
		surface2: '#FAF0F2',
		surface3: '#FCF5F7',
		surface4: '#FDFCFC',
		gray1: '#161213',
		gray2: '#2F2729',
		gray3: '#4A3F41',
		gray4: '#65585A',
		gray5: '#7C6E71',
		gray6: '#A19798',
		gray7: '#C5BFC0',
		gray8: 'rgba(148, 137, 139, 0.22)',
		gray9: 'rgba(148, 137, 139, 0.16)',
		red1: '#CB3510',
		red2: '#ED4921',
		red3: '#F17456',
		red4: '#F59A84',
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
		white: '#F1F2F4',
		black: '#212529',
		surface1: '#131313',
		surface2: '#171717',
		surface3: '#1B1B1B',
		surface4: '#1F1F1F',
		gray1: '#F1F2F4',
		gray2: '#D5D9DC',
		gray3: '#BDC2C7',
		gray4: '#A2A8AE',
		gray5: '#858C93',
		gray6: '#686E73',
		gray7: '#494D50',
		gray8: 'rgba(102, 107, 112, 0.24)',
		gray9: 'rgba(102, 107, 112, 0.14)',
		red1: 'rgba(255, 115, 82, 1)',
		red2: 'rgba(255, 115, 82, 0.9)',
		red3: 'rgba(255, 115, 82, 0.8)',
		red4: 'rgba(255, 115, 82, 0.6)',
		red5: 'rgba(255, 115, 82, 0.4)',
		red6: 'rgba(255, 115, 82, 0.12)',
		yellow1: 'rgba(184, 229, 0, 1)',
		yellow2: 'rgba(184, 229, 0, 0.9)',
		yellow3: 'rgba(184, 229, 0, 0.8)',
		yellow4: 'rgba(184, 229, 0, 0.6)',
		yellow5: 'rgba(184, 229, 0, 0.4)',
		yellow6: 'rgba(184, 229, 0, 0.08)',
		green1: 'rgba(0, 204, 59, 1)',
		green2: 'rgba(0, 204, 59, 0.9)',
		green3: 'rgba(0, 204, 59, 0.8)',
		green4: 'rgba(0, 204, 59, 0.6)',
		green5: 'rgba(0, 204, 59, 0.4)',
		green6: 'rgba(0, 204, 59, 0.14)',
		teal1: 'rgba(15, 209, 255, 1)',
		teal2: 'rgba(15, 209, 255, 0.9)',
		teal3: 'rgba(15, 209, 255, 0.8)',
		teal4: 'rgba(15, 209, 255, 0.6)',
		teal5: 'rgba(15, 209, 255, 0.4)',
		teal6: 'rgba(15, 209, 255, 0.12)',
		blue1: 'rgba(153, 128, 255, 1)',
		blue2: 'rgba(153, 128, 255, 0.9)',
		blue3: 'rgba(153, 128, 255, 0.8)',
		blue4: 'rgba(153, 128, 255, 0.6)',
		blue5: 'rgba(153, 128, 255, 0.4)',
		blue6: 'rgba(153, 128, 255, 0.12)',
		purple1: 'rgba(255, 92, 223, 1)',
		purple2: 'rgba(255, 92, 223, 0.9)',
		purple3: 'rgba(255, 92, 223, 0.8)',
		purple4: 'rgba(255, 92, 223, 0.6)',
		purple5: 'rgba(255, 92, 223, 0.4)',
		purple6: 'rgba(255, 92, 223, 0.14)',
	},
}

export const getColorAliases = (
	colors: ColorPalette['colors'],
	elevation: number,
): ColorAliases => {
	const getBackground = (elevation: number) => {
		const blockedElevation = Math.min(Math.max(elevation, 0), 4)
		return colors[`surface${blockedElevation}` as ColorKey]
	}

	const getLine = (elevation: number) => {
		if (elevation > 3) {
			return colors.gray8
		}
		return colors.gray9
	}

	return {
		background: getBackground(elevation),
		line: getLine(elevation),

		// Overlay
		oBackground: getBackground(elevation + 1),
		oLine: getLine(elevation + 1),

		// Inset
		iBackground: getBackground(elevation - 1),
		iLine: getLine(elevation - 1),

		// Text
		heading: colors.gray1,
		body: colors.gray1,
		label: colors.gray5,

		buttonLabel: colors.gray1,
		buttonLabelHover: colors.gray3,

		focus: colors.red3,

		primaryText: colors.red1,
		primaryBackground: colors.red2,
		primaryOpaqueBackground: colors.red6,
		onPrimaryBackground: colors.white,

		activeText: colors.red1,
		activeBackground: colors.red2,
		onActiveBackground: colors.white,

		successText: colors.red1,
		successBackground: colors.red2,
		onSuccessBackground: colors.white,

		errorText: colors.red1,
		errorBackground: colors.red2,
		onErrorBackground: colors.white,

		linkText: colors.gray1,
		linkUnderline: colors.gray7,

		contentLinkText: colors.gray1,
		contentLinkUnderline: colors.gray6,
		contentLinkUnderlineHover: colors.gray5,

		primaryLinkText: colors.red1,
		primaryLinkUnderline: colors.red4,

		// For handle bars, line connectors,…
		bar: colors.gray7,
	}
}

export const colorPalettes = {
	paper,
	charcoal,
}

export const colorAliases = {
	paper: getColorAliases(paper.colors, 3),
	charcoal: getColorAliases(charcoal.colors, 3),
}
