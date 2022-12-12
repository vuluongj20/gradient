// Theme provider for the entire app. This consumes the
// user settings context.
import { ReactNode, useContext, useEffect, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'

import { Appearance, ThemeSettings, getTheme } from '@theme'

import SettingsContext from '@utils/settingsContext'
import useMatchMedia from '@utils/useMatchMedia'

interface GlobalThemeProviderProps {
	children: ReactNode
}

const useAppearance = (colorSettings: ThemeSettings['color']): Appearance => {
	const preferDark = useMatchMedia('(prefers-color-scheme: dark)')

	if (colorSettings.appearance === 'auto') {
		return preferDark ? 'dark' : 'light'
	}

	return colorSettings.appearance
}

const GlobalThemeProvider = ({ children }: GlobalThemeProviderProps) => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)
	const appearance = useAppearance(themeSettings.color)
	const theme = useMemo(
		() => getTheme(themeSettings, appearance),
		[themeSettings, appearance],
	)

	// Update body background color, if needed, on state change
	useEffect(() => {
		document.body.classList.forEach((className) => {
			if (className.startsWith('palette-')) {
				document.body.classList.remove(className)
			}
		})
		document.body.classList.add(`palette-${theme.colorPalette}`)
	}, [theme.colorPalette])

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default GlobalThemeProvider
