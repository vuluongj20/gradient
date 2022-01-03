import { animation, Animation } from './animation'
import { colorPalettes, getColorAliases, ColorPalette, ColorAliases } from './colors'
import { textScales, TextScale } from './text'
import { generateUtils, Utils } from './utils'

import { Breakpoint } from '@types'

import {
	breakpoints,
	radii,
	zIndices,
	boxShadowsLight,
	boxShadowsDark,
	textShadows,
	space,
} from '@utils/styling'

export type Theme = {
	colors: ColorPalette['colors'] & ColorAliases
	/** Text */
	text: {
		rootSize: string
		ui: TextScale
		content: TextScale
	}
	/** Box shadow */
	shadows: Partial<Record<Breakpoint, string>> & {
		text: string
	}
	/** Animation */
	animation: Animation
	/** Breakpoints */
	breakpoints: Record<Breakpoint, string>
	/** Border radius */
	radii: Partial<Record<Breakpoint, string>>
	/** z-indices */
	zIndices: Record<string, number>
	/** Spacing */
	space: string[]
	/** Utilities */
	utils: Utils
}

export type ThemeSettings = {
	color: {
		appearance: 'light' | 'dark' | 'auto'
		elevation?: 'default' | 'inset' | 'overlay'
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

const partialDefaultTheme: Omit<Theme, 'utils'> = {
	colors: {
		...colorPalettes.paper.colors,
		...getColorAliases(colorPalettes.paper.colors, 'default'),
	},
	shadows: { ...boxShadowsLight, text: textShadows.light },
	text: {
		rootSize: '100%',
		ui: textScales.sohne,
		content: textScales.domaine,
	},
	animation: {
		...animation,
		reduced: false,
	},
	breakpoints: breakpoints,
	space,
	radii,
	zIndices,
}

const defaultTheme: Theme = {
	...partialDefaultTheme,
	utils: generateUtils(partialDefaultTheme),
}

export const getAppearance = (colorSettings: ThemeSettings['color']): string => {
	let appearance: ThemeSettings['color']['appearance']
	if (colorSettings.appearance === 'auto') {
		appearance = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	} else {
		appearance = colorSettings.appearance
	}

	return appearance
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
	const appearance = getAppearance(settings.color)
	const colorPalette = getColorPalette(settings.color)

	/** Animation */
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	const partialTheme: Omit<Theme, 'utils'> = {
		colors: {
			...colorPalettes[colorPalette].colors,
			...getColorAliases(colorPalettes[colorPalette].colors, settings.color.elevation),
		},
		shadows:
			appearance === 'light'
				? { ...boxShadowsLight, text: textShadows.light }
				: { ...boxShadowsDark, text: textShadows.dark },
		text: {
			rootSize: '100%',
			ui: textScales[settings.text.ui],
			content: textScales[settings.text.content],
		},
		animation: {
			...animation,
			reduced: reducedMotion,
		},
		breakpoints: breakpoints,
		space,
		radii,
		zIndices,
	}

	return {
		...partialTheme,
		utils: generateUtils(partialTheme),
	}
}
