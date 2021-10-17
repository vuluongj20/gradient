import { easings } from './animation'
import { breakpoints } from './breakpoints'
import { colorPalettes } from './colors'
import { typeScales } from './text'
import { Theme } from './types'
import { generateUtils } from './utils'

export type ThemeSettings = {
	color: {
		appearance: 'light' | 'dark' | 'auto'
		lightPalette: keyof typeof colorPalettes
		darkPalette: keyof typeof colorPalettes
		increaseContrast: boolean
	}
	text: {
		ui: keyof typeof typeScales
		content: keyof typeof typeScales
	}
	alwaysShowVideoCaptions: boolean
}

const partialDefaultTheme: Omit<Theme, 'u'> = {
	c: colorPalettes.paper.colors,
	t: {
		rootSize: '16px',
		ui: typeScales.sohne,
		content: typeScales.domaine,
	},
	a: {
		...easings,
		reduced: false,
	},
	b: breakpoints,
}

const defaultTheme: Theme = {
	...partialDefaultTheme,
	u: generateUtils(partialDefaultTheme),
}

export const getColorPalette = (colorSettings: ThemeSettings['color']): string => {
	let appearance: ThemeSettings['color']['appearance']
	if (colorSettings.appearance === 'auto') {
		appearance = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	} else {
		appearance = colorSettings.appearance
	}

	if (appearance === 'dark') {
		return colorSettings.darkPalette
	} else {
		return colorSettings.lightPalette
	}
}

export const getTheme = (settings: ThemeSettings): Theme => {
	/**
	 * During the Gatsby build process, window and document are undefined
	 * so return the default theme instead
	 */
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return defaultTheme
	}

	/** Color */
	const colorPalette = getColorPalette(settings.color)

	/** Animation */
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	const partialTheme: Omit<Theme, 'u'> = {
		c: colorPalettes[colorPalette].colors,
		t: {
			rootSize: '16px',
			ui: typeScales[settings.text.ui],
			content: typeScales[settings.text.content],
		},
		a: {
			...easings,
			reduced: reducedMotion,
		},
		b: breakpoints,
	}

	return {
		...partialTheme,
		u: generateUtils(partialTheme),
	}
}
