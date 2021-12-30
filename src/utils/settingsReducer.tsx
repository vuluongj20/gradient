import { ThemeSettings } from '../layouts/theme'

export type State = {
	theme: ThemeSettings
}

export type Action =
	| { type: 'update-color'; key: string; value: string }
	| { type: 'update-text'; key: string; value: string }

export const defaultSettings: State = {
	theme: {
		color: {
			appearance: 'auto',
			elevation: 'default',
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

export const reducer = (state: State, action: Action): State => {
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
