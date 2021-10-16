import { easings } from './animation'
import { breakpoints } from './breakpoints'
import { colorPalettes } from './colors'
import { typeScales } from './text'
import { Theme } from './types'
import { generateUtils } from './utils'

export type UserPreferences = {
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

export type UserPreferencesKey =
	| keyof UserPreferences
	| keyof UserPreferences['color']
	| keyof UserPreferences['text']

export type UserPreferencesValue =
	| UserPreferences[keyof UserPreferences]
	| UserPreferences['color'][keyof UserPreferences['color']]
	| UserPreferences['text'][keyof UserPreferences['text']]

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

export const getTheme = (up: UserPreferences): Theme => {
	/**
	 * During the Gatsby build process, window and document are undefined
	 * so return the default theme instead
	 */
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return defaultTheme
	}

	/** Color */
	let appearance: UserPreferences['color']['appearance']
	let paletteName: keyof typeof colorPalettes
	if (up.color.appearance === 'auto') {
		appearance = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	} else {
		appearance = up.color.appearance
	}
	if (appearance === 'dark') {
		paletteName = up.color.darkPalette
	} else {
		paletteName = up.color.lightPalette
	}
	document.body.classList.forEach((className) => {
		if (className.startsWith('palette-')) {
			document.body.classList.remove(className)
		}
	})
	document.body.classList.add(`palette-${paletteName}`)

	/** Animation */
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	const partialTheme: Omit<Theme, 'u'> = {
		c: colorPalettes[paletteName].colors,
		t: {
			rootSize: '16px',
			ui: typeScales[up.text.ui],
			content: typeScales[up.text.content],
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
