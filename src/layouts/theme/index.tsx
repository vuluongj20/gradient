import { Animation, animation } from './animation'
import { ColorAliases, ColorPalette, colorPalettes, getColorAliases } from './colors'
import { TextScale, textScales } from './text'
import { Utils, generateUtils } from './utils'

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

export type Appearance = 'light' | 'dark'

export type Theme = ColorPalette['colors'] &
	ColorAliases & {
		elevation: number
		appearance: Appearance
		colorPalette: keyof typeof colorPalettes
		/** Text */
		text: {
			system: TextScale
			content: TextScale
			viz: TextScale
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
		appearance: Appearance | 'auto'
		elevation: number
		lightPalette: keyof typeof colorPalettes
		darkPalette: keyof typeof colorPalettes
		increaseContrast: boolean
	}
	text: {
		system: keyof typeof textScales
		content: keyof typeof textScales
		viz: keyof typeof textScales
	}
	alwaysShowVideoCaptions: boolean
}

export const useThemeObject = (
	settings: ThemeSettings,
	appearance: Appearance,
): Theme => {
	const elevation = settings.color.elevation
	const colorPalette =
		appearance === 'dark' ? settings.color.darkPalette : settings.color.lightPalette

	const colors = colorPalettes[colorPalette].colors
	const colorAliases = getColorAliases(colorPalettes[colorPalette].colors, elevation)

	const shadows =
		appearance === 'light'
			? { ...boxShadowsLight, text: textShadows.light }
			: { ...boxShadowsDark, text: textShadows.dark }

	const text = {
		system: textScales[settings.text.system],
		content: textScales[settings.text.content],
		viz: textScales[settings.text.viz],
	}

	const partialTheme: Omit<Theme, 'utils'> = {
		elevation,
		appearance,
		colorPalette,

		...colors,
		...colorAliases,

		shadows,
		text,
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
