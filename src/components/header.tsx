import styled from 'styled-components'

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
	display: flex;
	align-items: flex-end;
	padding: ${(p) => p.theme.s[3]} 0;
	${(p) => p.theme.u.spacing.paddingHorizontal};

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const Title = styled.h1`
	${(p) => p.theme.t.content.h2};
	color: ${(p) => p.theme.c.heading};
`

const DescWrap = styled.div`
	margin-bottom: 0.6em;
	margin-left: ${(p) => p.theme.s[0]};
	transform: translateX(-0.25em);

	${(p) => p.theme.u.media.m} {
		margin-bottom: 0.4em;
	}

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const DescLine = styled.p`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.heading};

	&& {
		font-size: 0.875em;
		line-height: 1.2;
	}
`

const DescSecondLine = styled(DescLine)`
	text-indent: 0.6em;
`
