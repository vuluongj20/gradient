import { easings, Animation } from './animation'
import { colorPalettes, getColorAliases, ColorPalette, ColorAliases } from './colors'
import { textScales, TextScale } from './text'
import { generateUtils, Utils } from './utils'

import { Breakpoint } from '@types'

import {
	breakpoints,
	radii,
	boxShadowsLight,
	boxShadowsDark,
	space,
} from '@utils/styling'

export type Theme = ColorPalette['colors'] &
	ColorAliases & {
		/** Box shadow */
		shadows: Partial<Record<Breakpoint, string>>
		/** Text */
		text: {
			rootSize: string
			ui: TextScale
			content: TextScale
		}
		/** Animation */
		animation: Animation
		/** Breakpoints */
		breakpoints: Record<Breakpoint, string>
		/** Border radius */
		radii: Partial<Record<Breakpoint, string>>
		/** Spacing */
		space: string[]
		/** Utilities */
		utils: Utils
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
	colors: {
		...colorPalettes.paper.colors,
		...getColorAliases(colorPalettes.paper.colors, false),
	},
	shadows: boxShadowsLight,
	text: {
		rootSize: '100%',
		ui: textScales.sohne,
		content: textScales.domaine,
	},
	animation: {
		...easings,
		reduced: false,
	},
	breakpoints: breakpoints,
	space,
	radii,
}

const defaultTheme: Theme = {
	...partialDefaultTheme,
	u: generateUtils(partialDefaultTheme),
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

	const partialTheme: Omit<Theme, 'u'> = {
		colors: {
			...colorPalettes[colorPalette].colors,
			...getColorAliases(colorPalettes[colorPalette].colors, settings.color.overlay),
		},
		shadows: appearance === 'light' ? boxShadowsLight : boxShadowsDark,
		text: {
			rootSize: '100%',
			ui: textScales[settings.text.ui],
			content: textScales[settings.text.content],
		},
		animation: {
			...easings,
			reduced: reducedMotion,
		},
		breakpoints: breakpoints,
		space,
		radii,
	}

	return {
		...partialTheme,
		utils: generateUtils(partialTheme),
	}
}
