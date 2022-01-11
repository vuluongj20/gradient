// A React context for global user settings.
// This context is provided in layouts/index.tsx and is available
// globally to all pages and components vis useContext().
import { Dispatch, ReactNode, createContext, useEffect, useReducer } from 'react'

import { getColorPalette } from '../layouts/theme'
import { Action, Settings, defaultSettings, init, reducer } from './settingsReducer'

type Props = {
	children: ReactNode
}

type ContextValue = {
	settings: Settings
	dispatch: Dispatch<Action>
}

const Context = createContext<ContextValue>({
	settings: defaultSettings,
	dispatch: () => false,
})

const SettingsProvider = ({ children }: Props): JSX.Element => {
	const [settings, dispatch] = useReducer(reducer, defaultSettings, init)

	// Update local storage on state change
	useEffect(() => {
		localStorage.setItem('UP', JSON.stringify(settings))
	}, [settings])

	// Update body background color, if needed, on state change
	useEffect(() => {
		const newColorPalette = getColorPalette(settings.theme.color)

		document.body.classList.forEach((className) => {
			if (className.startsWith('palette-')) {
				document.body.classList.remove(className)
			}
		})
		document.body.classList.add(`palette-${newColorPalette}`)
	}, [settings.theme.color])

	return <Context.Provider value={{ settings, dispatch }}>{children}</Context.Provider>
}

export { Context as default, SettingsProvider }
