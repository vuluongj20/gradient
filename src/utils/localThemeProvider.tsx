// A reusable theme provider that allows for local theming.
// This is useful for small, contained areas that need to have
// a separate appearance from the rest of the UI. One example is
// theme inversion in the footer of some pages.
import { ReactNode, useContext } from 'react'
import { ThemeProvider } from 'styled-components'

import { getTheme, ThemeSettings } from '../layouts/theme'
import { deepMerge } from './functions'
import SettingsContext from './settingsContext'

type Props = {
	children: ReactNode
	appearance?: ThemeSettings['color']['appearance'] | 'inverted'
	overlay: boolean
	/** Type scale for UI text */
	uiScale?: ThemeSettings['text']['ui']
	/** Type scale for main text content */
	contentScale?: ThemeSettings['text']['content']
}

const LocalThemeProvider = ({
	children,
	appearance,
	overlay,
	uiScale,
	contentScale,
}: Props): JSX.Element => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)

	const getInvertedAppearance = (appearance) => (appearance === 'light' ? 'dark' : 'dark')

	const localAppearance =
		appearance === 'inverted'
			? getInvertedAppearance(themeSettings.color.appearance)
			: appearance ?? themeSettings.color.appearance

	/**
	 * Falls back to current settings if
	 * appearance is not defined
	 */
	const localColor = { appearance: localAppearance, overlay }

	/**
	 * Falls back to current settings if
	 * uiScale/contentScale is not defined
	 */
	const localText = {
		...(uiScale && { ui: uiScale }),
		...(contentScale && { content: contentScale }),
	}

	const mergedThemeSettings = deepMerge(themeSettings, {
		color: localColor,
		text: localText,
	}) as ThemeSettings

	const localTheme = getTheme(mergedThemeSettings)

	return <ThemeProvider theme={localTheme}>{children}</ThemeProvider>
}

export default LocalThemeProvider
