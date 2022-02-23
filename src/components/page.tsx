import { ReactNode } from 'react'
import styled from 'styled-components'

import Footer from './footer'

import SectionDivider from '@components/sectionDivider'

type Props = {
	children: ReactNode
	footerProps?: {
		inset?: boolean
		inverted?: boolean
	}
}

const Page = ({ children, footerProps }: Props): JSX.Element => {
	return (
		<PageContent>
			{children}
			<SectionDivider noMb />
			<Footer {...footerProps} />
		</PageContent>
	)
}

export default Page

const PageContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	background: ${(p) => p.theme.background};
`
