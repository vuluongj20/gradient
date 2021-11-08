import { easings, Animation } from './animation'
import { colorPalettes, getColorAliases, ColorPalette, ColorAliases } from './colors'
import { spacing } from './spacing'
import { textScales, TextScale } from './text'
import { generateUtils, Utils } from './utils'

import { Breakpoint } from '@types'

import { breakpoints } from '@utils/styling'

export type Theme = {
	/** Color */
	c: ColorPalette['colors'] & ColorAliases
	/** Text */
	t: {
		rootSize: string
		ui: TextScale
		content: TextScale
	}
	/** Animation */
	a: Animation
	/** Breakpoints */
	b: Record<Breakpoint, string>
	/** Spacing */
	s: string[]
	/** Utilities */
	u: Utils
}

export type ThemeSettings = {
	color: {
		appearance: 'light' | 'dark' | 'auto'
		overlay: boolean
		lightPalette: keyof typeof colorPalettes
		darkPalette: keyof typeof colorPalettes
		increaseContrast: boolean
	}
	text: {
		ui: keyof typeof textScales
		content: keyof typeof textScales
	}
	alwaysShowVideoCaptions: boolean
}

const partialDefaultTheme: Omit<Theme, 'u'> = {
	c: {
		...colorPalettes.paper.colors,
		...getColorAliases(colorPalettes.paper.colors, false),
	},
	t: {
		rootSize: '100%',
		ui: textScales.sohne,
		content: textScales.domaine,
	},
	a: {
		...easings,
		reduced: false,
	},
	s: spacing,
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
		c: {
			...colorPalettes[colorPalette].colors,
			...getColorAliases(colorPalettes[colorPalette].colors, settings.color.overlay),
		},
		t: {
			rootSize: '100%',
			ui: textScales[settings.text.ui],
			content: textScales[settings.text.content],
		},
		a: {
			...easings,
			reduced: reducedMotion,
		},
		s: spacing,
		b: breakpoints,
	}

	return {
		...partialTheme,
		u: generateUtils(partialTheme),
	}
}
