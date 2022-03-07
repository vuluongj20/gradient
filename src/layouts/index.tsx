import { OverlayProvider } from '@react-aria/overlays'
import { SSRProvider } from '@react-aria/ssr'
import { getSrc } from 'gatsby-plugin-image'
import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import './fontFaces.css'
import GlobalStyles from './globalStyles'
import Nav from './nav'

import SEO, { SEOProps } from '@components/seo'

import GlobalThemeProvider from '@utils/globalThemeProvider'
import { SettingsProvider } from '@utils/settingsContext'
import { navSize } from '@utils/style'

type Props = {
	children: ReactNode
	pageContext: SEOProps & {
		frontmatter?: SEOProps
	}
}

const Layout = ({ children, pageContext }: Props): JSX.Element => {
	const { title, description, author, image } = pageContext.frontmatter ?? pageContext
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
		<SSRProvider>
			<SEO {...seo} />
			<SettingsProvider>
				<GlobalThemeProvider>
					<OverlayProvider>
						<GlobalStyles />
						<Nav />
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

	${(p) => p.theme.utils.media.mobile} {
		padding-left: 0;
		padding-top: ${navSize.mobileHeight};
	}
`
