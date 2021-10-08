import styled from 'styled-components'

import { theme } from '@utils'

const Header = (): JSX.Element => (
	<Wrap>
		<Title>Gradient\</Title>
		<DescWrap>
			<DescLine>On technology, design,</DescLine>
			<DescSecondLine>philosophy, and the law</DescSecondLine>
		</DescWrap>
	</Wrap>
)

export default Header

const Wrap = styled.header`
	grid-column: 2 / -1;

	display: flex;
	align-items: flex-end;

	@media only screen and (max-width: ${theme('b.s')}) {
		grid-column: 1 / -1;

		justify-content: center;
	}
`

const Title = styled.p`
	${theme('t.content.h2')}

	color: ${theme('c.gray1')};
`

const DescWrap = styled.div`
	margin-bottom: 0.75em;
	transform: translateX(-0.25em);

	@media only screen and (max-width: ${theme('b.m')}) {
		margin-bottom: 0.5em;
	}

	@media only screen and (max-width: ${theme('b.s')}) {
		margin-bottom: 0.5em;
	}

	@media only screen and (max-width: ${theme('b.xs')}) {
		display: none;
	}
`

const DescLine = styled.p`
	${theme('t.ui.label')}
	font-weight: 500;
	line-height: 1.2;
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.7em;
`
