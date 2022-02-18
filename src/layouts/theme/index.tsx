import { Animation, animation } from './animation'
import { ColorAliases, ColorPalette, colorPalettes, getColorAliases } from './colors'
import { TextScale, textScales } from './text'
import { Utils, generateUtils } from './utils'

import useMatchMedia from '@utils/hooks/useMatchMedia'
import {
	Breakpoint,
	boxShadowsDark,
	boxShadowsLight,
	breakpoints,
	radii,
	space,
	textShadows,
	zIndices,
} from '@utils/style'

export type Theme = ColorPalette['colors'] &
	ColorAliases & {
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
		elevation?: number
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

export const useAppearance = (colorSettings: ThemeSettings['color']): string => {
	const preferDark = useMatchMedia('(prefers-color-scheme: dark)')

	if (colorSettings.appearance === 'auto') {
		return preferDark ? 'dark' : 'light'
	}

	return colorSettings.appearance
}

export const useColorPalette = (colorSettings: ThemeSettings['color']): string => {
	const appearance = useAppearance(colorSettings)

	if (appearance === 'dark') {
		return colorSettings.darkPalette
	} else {
		return colorSettings.lightPalette
	}
}

export const useThemeObject = (settings: ThemeSettings): Theme => {
	const appearance = useAppearance(settings.color)
	const colorPalette = useColorPalette(settings.color)

	// const reduceMotion = useMatchMedia('(prefers-reduced-motion)')

	const partialTheme: Omit<Theme, 'utils'> = {
		...colorPalettes[colorPalette].colors,
		...getColorAliases(colorPalettes[colorPalette].colors, settings.color.elevation),
		shadows:
			appearance === 'light'
				? { ...boxShadowsLight, text: textShadows.light }
				: { ...boxShadowsDark, text: textShadows.dark },
		text: {
			rootSize: '100%',
			ui: textScales[settings.text.ui],
			content: textScales[settings.text.content],
		},
		animation,
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
