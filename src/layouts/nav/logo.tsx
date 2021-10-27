import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

const Logo = (): JSX.Element => {
	const location = useLocation()
	const scrollToTop = location.pathname === '/'

	const onClick = (e) => {
		if (scrollToTop) {
			e.preventDefault()
			window.scrollTo(0, 0)
		}
	}

	return (
		<Wrap to="/" onClick={onClick}>
			<Title>Gradient\</Title>
		</Wrap>
	)
}

export default Logo

const Wrap = styled(TransitionLink)`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Title = styled.h1`
	${(p) => p.theme.t.content.h4};
	font-weight: 700;
	color: ${(p) => p.theme.c.heading};
	margin-bottom: 0.05em;
`
