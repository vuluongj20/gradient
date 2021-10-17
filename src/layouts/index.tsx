import { CloudinaryContext } from 'cloudinary-react'
import { ReactNode, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Footer from './footer'
import GlobalStyles from './globalStyles'
import Nav from './nav'
import { getTheme } from './theme'

import { gridColCounts } from '@utils'
import LocalThemeProvider from '@utils/localTheme'
import SettingsContext, { SettingsProvider } from '@utils/settings'

type Props = { children: ReactNode }

const frameWidth = 2 // unit = em

const Layout = ({ children }: Props): JSX.Element => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

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
							<Nav frameWidth={frameWidth} />
							<PageContent id="page-content">{children}</PageContent>
							<LocalThemeProvider appearance="inverted">
								<Footer />
							</LocalThemeProvider>
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
	max-width: ${(p) => p.theme.b.xl};
	padding: ${frameWidth}em ${frameWidth}em 0;
	margin: 0 auto;

	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xl}, 1fr) [end];
	grid-gap: 1.25em;

	@media only screen and (max-width: ${(p) => p.theme.b.l}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.m}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		grid-gap: 1em;
	}

	@media only screen and (max-width: ${(p) => p.theme.b.s}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.xs}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		grid-gap: 0.75em;
	}
`
