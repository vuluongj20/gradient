// A React context for global user settings.
// This context is provided in layouts/index.tsx and is available
// globally to all pages and components vis useContext().
import { Dispatch, ReactNode, createContext, useEffect, useReducer } from 'react'

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

	return <Context.Provider value={{ settings, dispatch }}>{children}</Context.Provider>
}

export { Context as default, SettingsProvider }
