// A reusable theme provider that allows for local theming.
// This is useful for small, contained areas that need to have
// a separate appearance from the rest of the UI. One example is
// theme inversion in the footer of some pages.
import { ReactNode, useContext } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'

import { ThemeSettings, useThemeObject } from '../layouts/theme'
import { deepMerge } from './functions'
import SettingsContext from './settingsContext'

type Props = {
	children?: ReactNode
	inset?: boolean
	overlay?: boolean
}

const LocalThemeProvider = ({ children, inset, overlay }: Props): JSX.Element => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)
	const { appearance, elevation } = useTheme()
	const localElevation = elevation + (overlay ? 1 : 0) + (inset ? -1 : 0)

	/**
	 * Falls back to current settings if
	 * appearance is not defined
	 */
	const localColorSettings = { elevation: localElevation }

	const mergedThemeSettings = deepMerge(themeSettings, {
		color: localColorSettings,
	}) as ThemeSettings

	const localTheme = useThemeObject(mergedThemeSettings, appearance)

	return <ThemeProvider theme={localTheme}>{children}</ThemeProvider>
}

export default LocalThemeProvider
