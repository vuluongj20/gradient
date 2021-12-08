import { ReactNode } from 'react'
import styled from 'styled-components'

import Footer from './footer'

import SectionDivider from '@components/sectionDivider'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	children: ReactNode
	overlay?: boolean
	footerProps?: {
		inverted?: boolean
		overlay?: boolean
	}
}

const Page = ({ children, overlay, footerProps }: Props): JSX.Element => {
	return (
		<LocalThemeProvider overlay={overlay}>
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
	background: ${(p) => p.theme.c.background};
`
