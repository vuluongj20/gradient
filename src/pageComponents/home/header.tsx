import styled from 'styled-components'

const Header = (): JSX.Element => (
	<Wrap>
		<Title aria-label="Gradient">Gradient\</Title>
		<DescWrap>
			<DescLine>Forever</DescLine>
			<DescSecondLine>Learning</DescSecondLine>
		</DescWrap>
	</Wrap>
)

export default Header

const Wrap = styled.header`
	display: flex;
	align-items: flex-end;
	padding: ${(p) => p.theme.space[3]} 0;
	${(p) => p.theme.paddingHorizontal};

	${(p) => p.theme.media.mobile} {
		display: none;
	}
`

const Title = styled.h1`
	${(p) => p.theme.text.content.h2};
	color: ${(p) => p.theme.heading};
`

const DescWrap = styled.p`
	margin-bottom: 0.45em;
	margin-left: ${(p) => p.theme.space[0]};
	transform: translateX(-0.4rem);

	${(p) => p.theme.media.m} {
		margin-bottom: 0.35em;
	}

	${(p) => p.theme.media.s} {
		margin-bottom: 0.3em;
	}
`

const DescLine = styled.span`
	display: block;
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.heading};

	&& {
		line-height: 1;
	}
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.6rem;
`
