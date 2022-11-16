import { useLocation } from '@reach/router'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface BreadcrumbsProps {
	pageTitle: string
}

const Breadcrumbs = ({ pageTitle }: BreadcrumbsProps) => {
	const [internalPageTitle, setInternalPageTitle] = useState(pageTitle)
	const location = useLocation()
	const disabled = location.pathname === '/'

	// Animate PageTitle when navigating via TransitionLink
	useEffect(() => {
		const shouldTransition = document.body.dataset.transitioning === 'true'
		const animations = {
			exit: { duration: 0.75, ease: 'power3.inOut' },
			entry: { duration: 0.75, ease: 'power3.inOut' },
		}
		if (shouldTransition) {
			gsap.to(`${PageTitle}`, {
				opacity: 0,
				...animations.exit,
				onComplete: () => {
					setInternalPageTitle(pageTitle)
					gsap.to(`${PageTitle}`, { opacity: 1, ...animations.entry })
				},
			})
			return
		}
		setInternalPageTitle(pageTitle)
	}, [pageTitle])

	return <PageTitle>{internalPageTitle}</PageTitle>
}

export default Breadcrumbs

const PageTitle = styled.span`
	position: absolute;
	bottom: ${(p) => p.theme.space[1]};
	left: 50%;
	transform-origin: left;
	transform: rotate(-90deg);

	${(p) => p.theme.text.viz.label};
	color: ${(p) => p.theme.heading};
	letter-spacing: 0.02em;
	white-space: nowrap;
	text-transform: uppercase;

	${(p) => p.theme.media.mobile} {
		display: none;
	}
`
