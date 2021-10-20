import styled from 'styled-components'

import Grid from './grid'

const Header = (): JSX.Element => (
	<Wrap>
		<InnerWrap>
			<Title>Gradient\</Title>
			<DescWrap>
				<DescLine>On technology, design,</DescLine>
				<DescSecondLine>philosophy, and the law</DescSecondLine>
			</DescWrap>
		</InnerWrap>
	</Wrap>
)

export default Header

const Wrap = styled(Grid)`
	margin-bottom: ${(p) => p.theme.s[2]};
`

const InnerWrap = styled.header`
	grid-column: 2 / -1;

	display: flex;
	align-items: flex-end;

	${(p) => p.theme.u.media.s} {
		grid-column: 1 / -1;

		justify-content: center;
	}
`

const Title = styled.h1`
	${(p) => p.theme.t.content.h2}
	color: ${(p) => p.theme.c.heading};
`

const DescWrap = styled.div`
	margin-bottom: 0.75em;
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
	${(p) => p.theme.t.ui.label}
	font-weight: 500;
	line-height: 1.2;
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.7em;
`
