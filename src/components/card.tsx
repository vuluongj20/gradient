import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'

import Image from './image'

import { AdaptiveGridColumns } from '@types'

export type CardContent = {
	id: string
	to: string
	img: {
		src: string
		alt: string
	}
}

type Props = CardContent & {
	gridCols: AdaptiveGridColumns
}

const Card = ({ gridCols, to, img }: Props): JSX.Element => {
	return (
		<Wrap
			to={to}
			exit={{
				trigger: () => null,
				length: 1,
			}}
			entry={{
				delay: 0.6,
			}}
			$gridCols={gridCols}
		>
			<ImageWrap>
				<Image {...img} />
			</ImageWrap>

			<TitleWrap>
				<Title>
					<DummyTitle>B.L. v. Mahanoy School District</DummyTitle>
					B.L. v. Mahanoy School District
				</Title>
				<Tags>Law</Tags>
			</TitleWrap>
		</Wrap>
	)
}

export default Card

const Wrap = styled(TransitionLink)<{ $gridCols: AdaptiveGridColumns }>`
	position: relative;
	width: 100%;
	text-decoration: none;
	padding-bottom: ${(p) => p.theme.s[1]};

	grid-column-start: ${(p) => p.$gridCols.xl.start};
	grid-column-end: ${(p) => p.$gridCols.xl.end};
	align-self: start;

	border-radius: 1em 0 1em 0;

	&:focus-visible {
		${(p) => p.theme.u.focusVisible};
	}

	&:hover {
		text-decoration: none;
	}

	${(p) => p.theme.u.media.l} {
		grid-column-start: ${(p) => p.$gridCols.l.start};
		grid-column-end: ${(p) => p.$gridCols.l.end};
	}
	${(p) => p.theme.u.media.m} {
		grid-column-start: ${(p) => p.$gridCols.m.start};
		grid-column-end: ${(p) => p.$gridCols.m.end};
	}
	${(p) => p.theme.u.media.s} {
		grid-column-start: ${(p) => p.$gridCols.s.start};
		grid-column-end: ${(p) => p.$gridCols.s.end};
	}
	${(p) => p.theme.u.media.xs} {
		grid-column: 1 / -1;
	}
`

const ImageWrap = styled.div`
	${(p) => p.theme.u.flexCenter}
	width: 100%;
	max-height: 32em;
	border-radius: 1em 0 1em 0;
	overflow: hidden;

	${(p) => p.theme.u.media.m} {
		max-height: 26em;
	}
	${(p) => p.theme.u.media.s} {
		max-height: 20em;
	}
	${(p) => p.theme.u.media.xs} {
		max-height: 16em;
	}
`

const TitleWrap = styled.div`
	margin-top: 0.5em;
`

const Title = styled.p`
	${(p) => p.theme.t.content.h4}

	position: relative;

	color: ${(p) => p.theme.c.heading};
	transition: color 0.1s ${(p) => p.theme.a.easeOutQuad};

	${Wrap}:hover & {
		color: ${(p) => p.theme.c.linkHover};
	}
`

const DummyTitle = styled.span`
	${(p) => p.theme.u.spread};

	color: transparent;
	text-decoration: underline;
	text-decoration-color: ${(p) => p.theme.c.linkUnderlineHover};
	z-index: 0;
	opacity: 0;
	transition: opacity 0.125s ${(p) => p.theme.a.easeOutQuad};

	${Wrap}:hover & {
		opacity: 1;
	}
`

const Tags = styled.div`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.label};
	margin-top: ${(p) => p.theme.s[0]};
	transition: color 0.125s ${(p) => p.theme.a.easeOutQuad};

	${Wrap}:hover & {
		color: ${(p) => p.theme.c.linkHover};
	}
`
