import { Appearance, ThemeSettings } from './index'

import useMatchMedia from '@utils/hooks/useMatchMedia'

type ColorKeys =
	| 'white'
	| 'black'
	| 'surface1'
	| 'surface2'
	| 'surface3'
	| 'surface4'
	| 'surface5'
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
	| 'hoverBackground'
	| 'line'
	| 'oBackground'
	| 'oHoverBackground'
	| 'oLine'
	| 'iBackground'
	| 'iHoverBackground'
	| 'iLine'
	| 'focus'
	| 'heading'
	| 'body'
	| 'label'
	| 'activeText'
	| 'activeBackground'
	| 'onActiveBackground'
	| 'buttonLabel'
	| 'buttonLabelHover'
	| 'link'
	| 'linkUnderline'
	| 'linkHover'
	| 'linkUnderlineHover'
	| 'success'
	| 'error'

export type ColorAliases = Record<ColorAliasName, string>

const paper: ColorPalette = {
	id: 'paper',
	name: 'Paper',
	appearance: 'light',
	colors: {
		white: '#F1F2F4',
		black: '#212529',
		surface1: '#F2F2F2',
		surface2: '#FAFAFA',
		surface3: '#FFFFFF',
		surface4: '#FFFFFF',
		surface5: '#F2F2F2',
		gray1: '#212529',
		gray2: '#33383D',
		gray3: '#494F55',
		gray4: '#5C636A',
		gray5: '#71777F',
		gray6: '#898F94',
		gray7: 'rgba(148, 153, 158, 0.7)',
		gray8: 'rgba(148, 153, 158, 0.26)',
		gray9: 'rgba(148, 153, 158, 0.20)',
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
		white: '#F1F2F4',
		black: '#212529',
		surface1: '#131313',
		surface2: '#171717',
		surface3: '#1A1A1A',
		surface4: '#1F1F1F',
		surface5: '#292929',
		gray1: '#F1F2F4',
		gray2: '#D5D9DC',
		gray3: '#BDC2C7',
		gray4: '#A2A8AE',
		gray5: '#858C93',
		gray6: '#6D7378',
		gray7: 'rgba(102, 107, 112, 0.7)',
		gray8: 'rgba(102, 107, 112, 0.28)',
		gray9: 'rgba(102, 107, 112, 0.18)',
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
	colors: ColorPalette['colors'],
	elevation: number,
): ColorAliases => {
	const getBackground = (elevation: number) => {
		const blockedElevation = Math.min(Math.max(elevation, 0), 5)
		return colors[`surface${blockedElevation}`]
	}

	const getHoverBackground = (elevation: number) => {
		if (elevation > 2) {
			return colors.surface5
		}
		return colors.surface5
	}

	const getLine = (elevation: number) => {
		if (elevation > 3) {
			return colors.gray8
		}
		return colors.gray9
	}

	return {
		background: getBackground(elevation),
		hoverBackground: getHoverBackground(elevation),
		line: getLine(elevation),

		// Overlay
		oBackground: getBackground(elevation + 1),
		oHoverBackground: getHoverBackground(elevation + 1),
		oLine: getLine(elevation + 1),

		// Inset
		iBackground: getBackground(elevation - 1),
		iHoverBackground: getHoverBackground(elevation - 1),
		iLine: getHoverBackground(elevation - 1),

		// Text
		heading: colors.gray1,
		body: colors.gray2,
		label: colors.gray5,

		buttonLabel: colors.gray1,
		buttonLabelHover: colors.gray3,

		focus: colors.red3,

		activeText: colors.red1,
		activeBackground: colors.red2,
		onActiveBackground: colors.white,

		link: colors.red1,
		linkUnderline: colors.red5,

		linkHover: colors.red1,
		linkUnderlineHover: colors.red2,

		error: colors.red1,
		success: colors.green1,
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

export const useAppearance = (colorSettings: ThemeSettings['color']): Appearance => {
	const preferDark = useMatchMedia('(prefers-color-scheme: dark)')

	if (colorSettings.appearance === 'auto') {
		return preferDark ? 'dark' : 'light'
	}

	return colorSettings.appearance
}

export const useColorPalette = (
	colorSettings: ThemeSettings['color'],
): keyof typeof colorPalettes => {
	const appearance = useAppearance(colorSettings)

	if (appearance === 'dark') {
		return colorSettings.darkPalette
	} else {
		return colorSettings.lightPalette
	}
}
