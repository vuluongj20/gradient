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
			<DescWrap>
				<DescLine>On technology, design,</DescLine>
				<DescSecondLine>philosophy, and the law</DescSecondLine>
			</DescWrap>
		</Wrap>
	)
}

export default Logo

const Wrap = styled(TransitionLink)`
	display: flex;
	align-items: flex-end;
	justify-content: center;
`

const Title = styled.h1`
	${(p) => p.theme.t.content.h3};
	font-weight: 700;
	color: ${(p) => p.theme.c.heading};
	margin-bottom: 0.1em;
`

const DescWrap = styled.div`
	margin-bottom: 0.6em;
	transform: translateX(-0.25em);

	${(p) => p.theme.u.media.m} {
		margin-bottom: 0.5em;
	}

	${(p) => p.theme.u.media.s} {
		margin-bottom: 0.5em;
	}

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const DescLine = styled.p`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.heading};
	line-height: 1.2;
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.6em;
`
