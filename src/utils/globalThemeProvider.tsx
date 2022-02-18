// Theme provider for the entire app. This consumes the
// user settings context.
import { ReactNode, useContext } from 'react'
import { ThemeProvider } from 'styled-components'

import { useThemeObject } from '../layouts/theme'
import SettingsContext from './settingsContext'

type Props = {
	children: ReactNode
}

const GlobalThemeProvider = ({ children }: Props): JSX.Element => {
	const {
		settings: { theme: themeSettings },
	} = useContext(SettingsContext)

	const theme = useThemeObject(themeSettings)

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default GlobalThemeProvider
