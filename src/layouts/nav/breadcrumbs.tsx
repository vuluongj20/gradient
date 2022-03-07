import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

const Breadcrumbs = (): JSX.Element => {
	const location = useLocation()
	const disabled = location.pathname === '/'

	return (
		<Section aria-hidden={disabled ? true : false}>
			<Wrap>
				<EmDash role="presentation">–</EmDash>
				<Link to="/" tabIndex={disabled ? -1 : 0} aria-label="Return to home page">
					Gradient
				</Link>
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

	${(p) => p.theme.utils.media.mobile} {
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

const Link = styled(TransitionLink)`
	font-family: inherit;
	font-size: inherit;
	color: inherit;
`
