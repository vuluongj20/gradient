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

	${(p) => p.theme.utils.media.xs} {
		padding: ${(p) => p.theme.space[1]} 0;
	}
`

const Title = styled.h1`
	${(p) => p.theme.text.content.h1};
	color: ${(p) => p.theme.colors.heading};

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const DescWrap = styled.p`
	margin-bottom: 0.6em;
	margin-left: ${(p) => p.theme.space[0]};
	transform: translateX(-0.25em);

	${(p) => p.theme.utils.media.m} {
		margin-bottom: 0.3em;
	}

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const DescLine = styled.span`
	display: block;
	${(p) => p.theme.text.ui.label};
	color: ${(p) => p.theme.colors.heading};

	&& {
		line-height: 1.2;
	}
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.6em;
`
