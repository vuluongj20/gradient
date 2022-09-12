import { useLocation } from '@reach/router'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

type Props = { pageTitle: string }

const Breadcrumbs = ({ pageTitle }: Props): JSX.Element => {
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

	return (
		<Section aria-hidden={disabled ? true : false}>
			<Wrap>
				<EmDash role="presentation">–</EmDash>
				<Link
					to="/"
					disabled={disabled}
					tabIndex={disabled ? -1 : 0}
					aria-label="Return to home page"
				>
					Gradient
				</Link>
				<PageTitleWrap>
					<PageTitle>{internalPageTitle ? ` / ${internalPageTitle}` : ''}</PageTitle>
				</PageTitleWrap>
			</Wrap>
		</Section>
	)
}

export default Breadcrumbs

const Section = styled.li`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	position: relative;
	width: 100%;
	height: 100%;

	${(p) => p.theme.media.mobile} {
		display: none;
	}
`

const Wrap = styled.span`
	transform-origin: left;
	transform: translate(50%, calc(-50% + 0.75em)) rotate(-90deg);

	${(p) => p.theme.text.viz.label};
	color: ${(p) => p.theme.heading};
	letter-spacing: 0.02em;
	white-space: nowrap;
	text-transform: uppercase;
`

const EmDash = styled.span`
	display: inline-block;
	position: relative;
	width: 2.375em;
	transform-origin: left;
	transform: scaleX(4);
	pointer-events: none;
`

const Link = styled(TransitionLink)<{ disabled: boolean }>`
	font-family: inherit;
	font-size: inherit;
	color: inherit;

	${(p) => p.disabled && `&& {color: inherit}`}
`

const PageTitleWrap = styled.span``

const PageTitle = styled.span``
