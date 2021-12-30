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
		<SettingsProvider>
			<SettingsContext.Consumer>
				{({ settings }) => (
					<ThemeProvider theme={getTheme(settings.theme)}>
						<GlobalStyles />
						<Nav />
						<PageContent id="page-content">
							<TopAnchor id="page-top-anchor" />
							{children}
						</PageContent>
					</ThemeProvider>
				)}
			</SettingsContext.Consumer>
		</SettingsProvider>
	)
}

export default Layout

const PageContent = styled('div')`
	position: relative;
	margin: 0 auto;
	padding-left: 3em;

	${(p) => p.theme.utils.media.l} {
		padding-left: 2.5em;
	}

	${(p) => p.theme.utils.media.xs} {
		padding-left: 0;
		padding-top: 2.5em;
	}
`

const TopAnchor = styled.div`
	width: 100%;
	height: 0;
	position: absolute;
	top: 0;
`
