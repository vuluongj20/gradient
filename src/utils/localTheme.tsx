// A reusable theme provider that allows for local theming.
// This is useful for small, contained areas that need to have
// a separate appearance from the rest of the UI. One example is
// theme inversion in the footer of some pages.
import { ReactNode, useContext } from 'react'
import { ThemeProvider } from 'styled-components'

import { getTheme, ThemeSettings } from '../layouts/theme'
import { deepMerge } from './index'
import SettingsContext from './settings'

type Props = {
	children: ReactNode
	appearance?: 'light' | 'dark' | 'inverted'
	uiText: ThemeSettings['text']['ui']
	contentText: ThemeSettings['text']['content']
}

const LocalThemeProvider = ({ children, appearance }: Props): JSX.Element => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)

	const getInvertedAppearance = (appearance) => (appearance === 'light' ? 'dark' : 'dark')

	const localAppearance =
		appearance === 'inverted'
			? getInvertedAppearance(themeSettings.color.appearance)
			: appearance ?? themeSettings.color.appearance

	const mergedThemeSettings = deepMerge(themeSettings, {
		color: { appearance: localAppearance },
	}) as ThemeSettings

	const localTheme = getTheme(mergedThemeSettings)

	return <ThemeProvider theme={localTheme}>{children}</ThemeProvider>
}

export default LocalThemeProvider
