import styled from 'styled-components'

import Grid from '@components/grid'

const Header = (): JSX.Element => (
	<Grid>
		<Wrap>
			<Title>Gradient\</Title>
			<DescWrap>
				<DescLine>On technology, design,</DescLine>
				<DescSecondLine>philosophy, and the law</DescSecondLine>
			</DescWrap>
		</Wrap>
	</Grid>
)

export default Header

const Wrap = styled.header`
	grid-column: 1 / 6;
	display: flex;
	align-items: flex-end;
	padding: ${(p) => p.theme.s[3]} 0;

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const Title = styled.a`
	${(p) => p.theme.t.content.h2};
`

const DescWrap = styled.div`
	margin-bottom: 0.6em;
	margin-left: ${(p) => p.theme.s[0]};
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
	margin-bottom: 0.05em;
`
