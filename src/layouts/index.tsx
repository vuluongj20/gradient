import { OverlayProvider } from '@react-aria/overlays'
import { SSRProvider } from '@react-aria/ssr'
import { getSrc } from 'gatsby-plugin-image'
import { ReactNode, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import './fontFaces.css'
import GlobalStyles from './globalStyles'
import Nav from './nav'
import { getTheme } from './theme'

import SEO, { SEOProps } from '@components/seo'

import SettingsContext, { SettingsProvider } from '@utils/settingsContext'

type Props = {
	children: ReactNode
	pageContext: SEOProps
}

const Layout = ({
	children,
	pageContext: { title, description, author, image },
}: Props): JSX.Element => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const seo = {
		title,
		description,
		author,
		image: image && {
			src: typeof image.src === 'string' ? image.src : getSrc(image.src),
			alt: image.alt,
			width: image.width,
			height: image.height,
		},
	}

	const content = (
		<SettingsProvider>
			<SettingsContext.Consumer>
				{({ settings }) => (
					<ThemeProvider theme={getTheme(settings.theme)}>
						<SSRProvider>
							<OverlayProvider>
								<SEO {...seo} />
								<GlobalStyles />
								<Nav />
								<PageContent id="page-content">{children}</PageContent>
							</OverlayProvider>
						</SSRProvider>
					</ThemeProvider>
				)}
			</SettingsContext.Consumer>
		</SettingsProvider>
	)

	if (!mounted) {
		return <div style={{ visibility: 'hidden' }}>{content}</div>
	}

	return content
}

export default Layout

const PageContent = styled('main')`
	position: relative;
	margin: 0 auto;

	@media not print {
		padding-left: 3em;
	}

	${(p) => p.theme.utils.media.l} {
		padding-left: 2.5em;
	}

	${(p) => p.theme.utils.media.xs} {
		padding-left: 0;
		padding-top: 2.5em;
	}
`
