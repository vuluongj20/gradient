import { CloudinaryContext } from 'cloudinary-react'
import { ReactNode, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Footer from './footer'
import GlobalStyles from './globalStyles'
import Nav from './nav'
import { getTheme } from './theme'

import LocalThemeProvider from '@utils/localThemeProvider'
import SettingsContext, { SettingsProvider } from '@utils/settingsContext'
import { frameWidth } from '@utils/styling'

type Props = { children: ReactNode }

const Layout = ({ children }: Props): JSX.Element => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

	/**
	 * Only render when the component has fully mounted,
	 * to ensure the settings context and theme context
	 * have fully initialized.
	 */
	if (!mounted) {
		return null
	}

	return (
		<CloudinaryContext cloudName="vuluongj20" secure="true">
			<SettingsProvider>
				<SettingsContext.Consumer>
					{({ settings }) => (
						<ThemeProvider theme={getTheme(settings.theme)}>
							<GlobalStyles />
							<Nav />
							<PageContent id="page-content">
								{children}
								<LocalThemeProvider appearance="inverted">
									<Footer />
								</LocalThemeProvider>
							</PageContent>
						</ThemeProvider>
					)}
				</SettingsContext.Consumer>
			</SettingsProvider>
		</CloudinaryContext>
	)
}

export default Layout

const PageContent = styled('div')`
	position: relative;
	margin: 0 auto;
`
