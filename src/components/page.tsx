import { useTransitionState } from 'gatsby-plugin-transition-link/hooks'
import gsap from 'gsap'
import { ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Footer from './footer'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	children: ReactNode
	overlay?: boolean
	footerProps?: {
		inverted?: boolean
		overlay?: boolean
	}
}

const transition = { duration: 1, ease: 'power4.inOut' }

const Page = ({ children, overlay, footerProps }: Props): JSX.Element => {
	const { transitionStatus } = useTransitionState()

	useEffect(() => {
		if (transitionStatus === 'entering') {
			gsap.to(pageRef.current, { opacity: 1, ...transition })
		} else if (transitionStatus === 'exiting') {
			gsap.to(pageRef.current, { opacity: 0, ...transition })
		}
	}, [transitionStatus])

	const pageRef = useRef()
	const pageVisible = transitionStatus === 'entered' || transitionStatus === 'exiting'

	return (
		<LocalThemeProvider overlay={overlay}>
			<PageContent visible={pageVisible} ref={pageRef}>
				{children}
				<LocalThemeProvider>
					<Footer {...footerProps} />
				</LocalThemeProvider>
			</PageContent>
		</LocalThemeProvider>
	)
}

export default Page

const PageContent = styled.div<{ visible: boolean }>`
	background: ${(p) => p.theme.c.background};
	opacity: 0%;
	${(p) => p.visible && 'opacity: 1;'};
`
