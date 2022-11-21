// A reusable theme provider that allows for local theming.
// This is useful for small, contained areas that need to have
// a separate appearance from the rest of the UI. One example is
// theme inversion in the footer of some pages.
import deepMerge from 'deepmerge'
import { ReactNode, useContext, useMemo } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'

import { ThemeSettings, getTheme } from '@theme'

import SettingsContext from '@utils/settingsContext'

interface LocalThemeProviderProps {
	children?: ReactNode
	inset?: boolean
	overlay?: boolean
}

const LocalThemeProvider = ({ children, inset, overlay }: LocalThemeProviderProps) => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)
	const { appearance, elevation } = useTheme()

	// Falls back to current settings if
	// appearance is not defined
	const localTheme = useMemo(() => {
		const unboundedLocalElevation = elevation + (overlay ? 1 : 0) + (inset ? -1 : 0)
		const localElevation = Math.min(5, Math.max(0, unboundedLocalElevation))

		const localThemeSettings = deepMerge(themeSettings, {
			color: { elevation: localElevation },
		}) as ThemeSettings

		return getTheme(localThemeSettings, appearance)
	}, [themeSettings, elevation, overlay, inset, appearance])

	return <ThemeProvider theme={localTheme}>{children}</ThemeProvider>
}

export default LocalThemeProvider
