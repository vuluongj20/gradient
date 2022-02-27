import styled from 'styled-components'

const Header = (): JSX.Element => (
	<Wrap>
		<Title aria-label="Gradient">Gradient\</Title>
		<DescWrap>
			<DescLine>Ideas on technology, design,</DescLine>
			<DescSecondLine>language, and philosophy</DescSecondLine>
		</DescWrap>
	</Wrap>
)

export default Header

const Wrap = styled.header`
	display: flex;
	align-items: flex-end;
	padding: ${(p) => p.theme.space[3]} 0;
	${(p) => p.theme.utils.space.paddingHorizontal};

	${(p) => p.theme.utils.media.mobile} {
		display: none;
	}
`

const Title = styled.h1`
	${(p) => p.theme.text.content.h2};
	color: ${(p) => p.theme.heading};
`

const DescWrap = styled.p`
	margin-bottom: 0.6rem;
	margin-left: ${(p) => p.theme.space[0]};
	transform: translateX(-0.25rem);

	@media ${(p) => p.theme.utils.media.m} {
		margin-bottom: 0.45rem;
	}

	@media ${(p) => p.theme.utils.media.s} {
		margin-bottom: 0.3rem;
	}
`

const DescLine = styled.span`
	display: block;
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.heading};

	&& {
		line-height: 1.1;
	}
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.6rem;
`
