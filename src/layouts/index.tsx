import { OverlayProvider } from '@react-aria/overlays'
import { SSRProvider } from '@react-aria/ssr'
import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import './fontFaces.css'
import GlobalStyles from './globalStyles'
import Nav from './nav'

import GlobalThemeProvider from '@utils/globalThemeProvider'
import { SettingsProvider } from '@utils/settingsContext'
import { navSize } from '@utils/style'

type Props = {
	children: ReactNode
	pageContext: {
		title?: string
		frontmatter?: { title?: string }
	}
}

const Layout = ({ children, pageContext }: Props): JSX.Element => {
	const { title = '' } = pageContext.frontmatter ?? pageContext

	const content = (
		<SSRProvider>
			<SettingsProvider>
				<GlobalThemeProvider>
					<OverlayProvider>
						<GlobalStyles />
						<Nav pageTitle={title} />
						<PageContent id="page-content">{children}</PageContent>
					</OverlayProvider>
				</GlobalThemeProvider>
			</SettingsProvider>
		</SSRProvider>
	)

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div style={{ visibility: 'hidden' }}>{content}</div>
	}
	return content
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
