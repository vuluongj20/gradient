import { OverlayProvider } from '@react-aria/overlays'
import { SSRProvider } from '@react-aria/ssr'
import { Script } from 'gatsby'
import { ReactNode } from 'react'
import styled from 'styled-components'

import './fontFaces.css'
import GlobalStyles from './globalStyles'
import Nav from './nav'

import GlobalThemeProvider from '@utils/globalThemeProvider'
import { SettingsProvider } from '@utils/settingsContext'
import { navSize } from '@utils/style'
import useMountEffect from '@utils/useMountEffect'

type Props = {
	children: ReactNode
	pageContext: {
		title?: string
		frontmatter?: { title?: string }
	}
}

const Layout = ({ children, pageContext }: Props): JSX.Element => {
	useMountEffect(() => {
		// Disable browser scroll restoration in favor of Gatsby's
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual'
		}

		// Remove the tabIndex attribute from .gatsby-focus-wrapper, to restore
		// normal tab focus behavior
		const gatsbyFocusWrapper = document.getElementById('gatsby-focus-wrapper')
		if (gatsbyFocusWrapper) {
			gatsbyFocusWrapper.removeAttribute('style')
			gatsbyFocusWrapper.removeAttribute('tabIndex')
		}
	})

	return (
		<SSRProvider>
			<SettingsProvider>
				<GlobalThemeProvider>
					<OverlayProvider>
						<GlobalStyles />
						<Script src="https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js" />
						<Nav pageTitle={pageContext.frontmatter?.title ?? pageContext.title ?? ''} />
						<PageContent id="page-content">{children}</PageContent>
					</OverlayProvider>
				</GlobalThemeProvider>
			</SettingsProvider>
		</SSRProvider>
	)
}

export default Layout

const PageContent = styled('main')`
	position: relative;
	margin: 0 auto;

	/* Leave space for nav bar */
	padding-left: ${navSize.width};

	${(p) => p.theme.media.mobile} {
		padding-left: 0;
		padding-top: ${navSize.mobileHeight};
	}
`
