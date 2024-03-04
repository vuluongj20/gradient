import { OverlayProvider } from '@react-aria/overlays'
import { SSRProvider } from '@react-aria/ssr'
import { Script } from 'gatsby'
import { ReactNode } from 'react'
import styled from 'styled-components'

import GlobalStyles from './globalStyles'
import Nav from './nav'

import GlobalThemeProvider from '@utils/globalThemeProvider'
import { SettingsProvider } from '@utils/settingsContext'
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

	const storyTitle = pageContext.frontmatter?.title ?? pageContext.title

	return (
		<SSRProvider>
			<SettingsProvider>
				<GlobalThemeProvider>
					<OverlayProvider>
						<GlobalStyles />
						<Script src="https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js" />
						<Nav storyTitle={storyTitle} />
						<PageContent id="page-content" isStory={!!storyTitle}>
							{children}
						</PageContent>
					</OverlayProvider>
				</GlobalThemeProvider>
			</SettingsProvider>
		</SSRProvider>
	)
}

export default Layout

const PageContent = styled('main')<{ isStory?: boolean }>`
	position: relative;
	margin: 0 auto;
	max-width: var(--max-site-width);
	${(p) => p.isStory && 'padding-top: var(--nav-height);'}
`
