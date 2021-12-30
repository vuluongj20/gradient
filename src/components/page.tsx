import { ReactNode } from 'react'
import styled from 'styled-components'

import Footer from './footer'

import { Theme } from '@theme'

import SectionDivider from '@components/sectionDivider'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	children: ReactNode
	elevation?: Theme['colors']['elevation']
	footerProps?: {
		inverted?: boolean
		elevation?: Theme['colors']['elevation']
	}
}

const Page = ({ children, elevation, footerProps }: Props): JSX.Element => {
	return (
		<LocalThemeProvider elevation={elevation}>
			<PageContent>
				{children}
				<SectionDivider mb={0} />
				<LocalThemeProvider>
					<Footer {...footerProps} />
				</LocalThemeProvider>
			</PageContent>
		</LocalThemeProvider>
	)
}

export default Page

const PageContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	background: ${(p) => p.theme.colors.background};
`
