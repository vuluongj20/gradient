import { colorPalettes } from './colors'
import { typeScales } from './text'
import { Theme } from './types'

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

const defaultTheme: Theme = {
	c: colorPalettes.paper.colors,
	t: {
		rootSize: '16px',
		ui: typeScales.sohne,
		content: typeScales.domaine,
	},
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

	// todo: add animation to theme object & implement reduced motion
	// const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	return {
		c: colorPalettes[paletteName].colors,
		t: {
			rootSize: '16px',
			ui: typeScales[up.text.ui],
			content: typeScales[up.text.content],
		},
	}
}
