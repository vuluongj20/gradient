import { TextScale, textScales } from '@theme/text'
import { Utils, generateUtils } from '@theme/utils'

import { breakpoints } from '@utils/style'

export type Appearance = 'light' | 'dark'

export type Theme = Utils & {
	elevation: number
	appearance: Appearance
	opacityFactor: number
	/** Text */
	text: {
		system: TextScale
		content: TextScale
		viz: TextScale
	}
	/** Breakpoints */
	breakpoints: typeof breakpoints
}

export type ThemeSettings = {
	color: {
		appearance: Appearance | 'auto'
		elevation: number
		increaseContrast: boolean
	}
	text: {
		system: keyof typeof textScales
		content: keyof typeof textScales
		viz: keyof typeof textScales
	}
	alwaysShowVideoCaptions: boolean
}

export const getTheme = (settings: ThemeSettings, appearance: Appearance): Theme => {
	const elevation = settings.color.elevation
	const opacityFactor = appearance === 'dark' ? 1.2 : 1

	const text = {
		system: textScales[settings.text.system],
		content: textScales[settings.text.content],
		viz: textScales[settings.text.viz],
	}

	const partialTheme: Omit<Theme, keyof Utils> = {
		elevation,
		appearance,
		opacityFactor,

		text,
		breakpoints,
	}

	return {
		...partialTheme,
		...generateUtils(partialTheme),
	}
}
