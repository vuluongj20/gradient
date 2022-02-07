import { ThemeSettings } from '../layouts/theme'

export type Settings = {
	theme: ThemeSettings
}

export type Action =
	| { type: 'update-color'; key: string; value: string }
	| { type: 'update-text'; key: string; value: string }

export const defaultSettings: Settings = {
	theme: {
		color: {
			appearance: 'auto',
			elevation: 3,
			lightPalette: 'paper',
			darkPalette: 'charcoal',
			increaseContrast: false,
		},
		text: {
			ui: 'sohne',
			content: 'domaine',
		},
		alwaysShowVideoCaptions: false,
	},
}

export const init = (initialSettings): Settings => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return initialSettings
	}

	const localSettings = JSON.parse(localStorage.getItem('UP')) as Settings
	return { ...initialSettings, ...localSettings }
}

export const reducer = (state: Settings, action: Action): Settings => {
	switch (action.type) {
		case 'update-color':
			return {
				...state,
				theme: {
					...state.theme,
					color: {
						...state.theme.color,
						[action.key]: action.value,
					},
				},
			}
		case 'update-text':
			return {
				...state,
				theme: {
					...state.theme,
					text: {
						...state.theme.text,
						[action.key]: action.value,
					},
				},
			}
		default:
			return state
	}
}
