// A React context for global user settings.
// This context is provided in layouts/index.tsx and is available
// globally to all pages and components vis useContext().
import { createContext, ReactNode, useEffect, useState } from 'react'

import { ThemeSettings, getColorPalette } from '../layouts/theme'

type Props = {
	children: ReactNode
}

export type Settings = {
	theme: ThemeSettings
}

const defaultSettings: Settings = {
	theme: {
		color: {
			appearance: 'auto',
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

const Context = createContext({
	settings: defaultSettings,
	updateSettings: () => null,
})

const SettingsProvider = ({ children }: Props): JSX.Element => {
	const [settings, updateSettings] = useState<Settings>(defaultSettings)

	useEffect(() => {
		localStorage.setItem('UP', JSON.stringify(settings))
	}, [settings])

	useEffect(() => {
		const newColorPalette = getColorPalette(settings.theme.color)

		document.body.classList.forEach((className) => {
			if (className.startsWith('palette-')) {
				document.body.classList.remove(className)
			}
		})
		document.body.classList.add(`palette-${newColorPalette}`)
	}, [settings.theme.color])

	return (
		<Context.Provider value={{ settings, updateSettings }}>{children}</Context.Provider>
	)
}

export { Context as default, SettingsProvider }
