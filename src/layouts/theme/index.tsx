import { colorPalettes } from './colors'
import { typeScales } from './typeScales'
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
		sizeOffset: number
	}
	reduceMotion: boolean
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

export const getTheme = (up: UserPreferences): Theme => {
	let colorPaletteName: keyof typeof colorPalettes
	if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
		colorPaletteName = up.color.darkPalette
	} else {
		colorPaletteName = up.color.lightPalette
	}
	document.body.classList.forEach((className) => {
		if (className.startsWith('palette-')) {
			document.body.classList.remove(className)
		}
	})
	document.body.classList.add(`palette-${colorPaletteName}`)

	return {
		colors: colorPalettes[colorPaletteName].colors,
		text: {
			ui: typeScales[up.text.content],
			content: typeScales[up.text.content],
		},
	}
}
