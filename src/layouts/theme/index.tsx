import { Animation, animation } from './animation'
import {
	ColorAliases,
	ColorPalette,
	colorPalettes,
	getColorAliases,
	useAppearance,
	useColorPalette,
} from './colors'
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

export type Appearance = 'light' | 'dark'

export type Theme = ColorPalette['colors'] &
	ColorAliases & {
		elevation: number
		appearance: Appearance
		reducedMotion: boolean
		/** Text */
		text: {
			system: TextScale
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
		appearance: Appearance | 'auto'
		elevation: number
		lightPalette: keyof typeof colorPalettes
		darkPalette: keyof typeof colorPalettes
		increaseContrast: boolean
	}
	text: {
		system: keyof typeof textScales
		content: keyof typeof textScales
	}
	alwaysShowVideoCaptions: boolean
}

export const useThemeObject = (settings: ThemeSettings): Theme => {
	const appearance = useAppearance(settings.color)
	const colorPalette = useColorPalette(settings.color)
	const elevation = settings.color.elevation

	const colors = colorPalettes[colorPalette].colors
	const colorAliases = getColorAliases(colorPalettes[colorPalette].colors, elevation)

	const shadows =
		appearance === 'light'
			? { ...boxShadowsLight, text: textShadows.light }
			: { ...boxShadowsDark, text: textShadows.dark }

	const text = {
		system: textScales[settings.text.system],
		content: textScales[settings.text.content],
	}

	const partialTheme: Omit<Theme, 'utils'> = {
		elevation,
		appearance,

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
