import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

import Footer from '@components/footer'

interface PageProps {
	children: ReactNode
	footerProps?: ComponentProps<typeof Footer>
}

const Page = ({ children, footerProps }: PageProps) => {
	return (
		<PageContent>
			{children}
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
`
