// A React context for global user settings.
// This context is provided in layouts/index.tsx and is available
// globally to all pages and components vis useContext().
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react'

import { getColorPalette } from '../layouts/theme'
import { defaultSettings, reducer, Action, State } from './settingsReducer'

type Props = {
	children: ReactNode
}

type ContextValue = {
	settings: State
	dispatch: Dispatch<Action>
}

const Context = createContext<ContextValue>({
	settings: defaultSettings,
	dispatch: () => false,
})

const SettingsProvider = ({ children }: Props): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, defaultSettings)

	useEffect(() => {
		localStorage.setItem('UP', JSON.stringify(state))
	}, [state])

	useEffect(() => {
		const newColorPalette = getColorPalette(state.theme.color)

		document.body.classList.forEach((className) => {
			if (className.startsWith('palette-')) {
				document.body.classList.remove(className)
			}
		})
		document.body.classList.add(`palette-${newColorPalette}`)
	}, [state.theme.color])

	return (
		<Context.Provider value={{ settings: state, dispatch }}>{children}</Context.Provider>
	)
}

export { Context as default, SettingsProvider }
