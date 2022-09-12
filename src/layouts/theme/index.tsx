import { Animation, animation } from '@theme/animation'
import { ColorAliases, ColorPalette, colorPalettes, getColorAliases } from '@theme/colors'
import { TextScale, textScales } from '@theme/text'
import { Utils, generateUtils } from '@theme/utils'

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
	ColorAliases &
	Utils & {
		elevation: number
		appearance: Appearance
		colorPalette: keyof typeof colorPalettes
		opacityFactor: number
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
		space: Record<number, string>
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

	const opacityFactor = appearance === 'dark' ? 1.2 : 1

	const shadows =
		appearance === 'light'
			? { ...boxShadowsLight, text: textShadows.light }
			: { ...boxShadowsDark, text: textShadows.dark }

	const text = {
		system: textScales[settings.text.system],
		content: textScales[settings.text.content],
		viz: textScales[settings.text.viz],
	}

	const partialTheme: Omit<Theme, keyof Utils> = {
		elevation,
		appearance,
		colorPalette,
		opacityFactor,

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
		...generateUtils(partialTheme),
	}
}
