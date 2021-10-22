import { CloudinaryContext } from 'cloudinary-react'
import { ReactNode, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import './fontFaces.css'
import GlobalStyles from './globalStyles'
import Nav from './nav'
import { getTheme } from './theme'

import SettingsContext, { SettingsProvider } from '@utils/settingsContext'

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
							<PageContent id="page-content">{children}</PageContent>
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
