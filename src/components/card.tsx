import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'

import Image from './image'

import { AdaptiveGridColumns } from '@types'

import { theme } from '@utils/styling'

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
	margin-bottom: ${theme('s[4]')};
	padding-bottom: ${theme('s[1]')};

	grid-column-start: ${(p) => p.$gridCols.xl.start};
	grid-column-end: ${(p) => p.$gridCols.xl.end};
	align-self: start;

	border-radius: 1em 0 1em 0;

	&:focus-visible {
		${theme('u.focusVisible')};
	}

	@media only screen and (max-width: ${theme('b.l')}) {
		grid-column-start: ${(p) => p.$gridCols.l.start};
		grid-column-end: ${(p) => p.$gridCols.l.end};
	}
	@media only screen and (max-width: ${theme('b.m')}) {
		margin-bottom: ${theme('s[3]')};

		grid-column-start: ${(p) => p.$gridCols.m.start};
		grid-column-end: ${(p) => p.$gridCols.m.end};
	}
	@media only screen and (max-width: ${theme('b.s')}) {
		grid-column-start: ${(p) => p.$gridCols.s.start};
		grid-column-end: ${(p) => p.$gridCols.s.end};
	}
	@media only screen and (max-width: ${theme('b.xs')}) {
		margin-bottom: ${theme('s[2]')};

		grid-column: 1 / -1;
	}
`

const ImageWrap = styled.div`
	${theme('u.flexCenter')}
	width: 100%;
	max-height: 32em;
	border-radius: 1em 0 1em 0;
	overflow: hidden;

	@media only screen and (max-width: ${theme('b.m')}) {
		max-height: 26em;
	}
	@media only screen and (max-width: ${theme('b.s')}) {
		max-height: 20em;
	}
	@media only screen and (max-width: ${theme('b.xs')}) {
		max-height: 16em;
	}
`

const TitleWrap = styled.div`
	margin-top: 0.5em;
`

const Title = styled.p`
	${theme('t.content.h4')}

	position: relative;

	color: ${theme('c.gray1')};
	transition: color 0.1s ${theme('a.easeOutQuad')};

	${Wrap}:hover & {
		color: ${theme('c.red1')};
	}
`

const DummyTitle = styled.span`
	${theme('u.spread')};

	color: transparent;
	text-decoration: underline;
	text-decoration-color: ${theme('c.red3')};
	z-index: -1;
	opacity: 0;
	transition: opacity 0.125s ${theme('a.easeOutQuad')};

	${Wrap}:hover & {
		opacity: 1;
	}
`

const Tags = styled.div`
	${theme('t.ui.label')};
	color: ${theme('c.gray5')};
	transition: color 0.125s ${theme('a.easeOutQuad')};

	${Wrap}:hover & {
		color: ${theme('c.red1')};
	}
`
