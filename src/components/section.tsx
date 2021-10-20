import styled from 'styled-components'

import { CardContent } from './card'
import CardArea, { Offsets } from './cardArea'
import Grid from './grid'

import { Page } from '@data/siteStructure'

import { theme } from '@utils/styling'

type Props = {
	section: Page
	cards: CardContent[]
	offsets: Offsets
	background: string
}

const Section = ({ section, cards, offsets, background }: Props): JSX.Element => {
	return (
		<Wrap background={background}>
			<StyledGrid>
				<TitleWrap href={section.path}>
					<Title>
						{section.title}
						<TypeLine />
					</Title>
				</TitleWrap>
				<CardArea cards={cards} offsets={offsets} />
			</StyledGrid>
		</Wrap>
	)
}

export default Section

const Wrap = styled.section<{ background: string }>`
	padding: ${theme('s[7]')} 0;
	background: ${(p) => p.theme.c[p.background]};
`

const StyledGrid = styled(Grid)`
	row-gap: ${theme('s[4]')};
`

const TitleWrap = styled.a`
	position: relative;
	display: flex;
	align-items: flex-end;
	border-radius: ${theme('s[0]')};

	grid-column: 2 / -1;
	grid-row: 1;

	@media only screen and (max-width: ${theme('b.s')}) {
		grid-column: 1 / -1;
	}
`

const Title = styled.h2`
	${theme('t.ui.h3')}
	position: relative;
`

const TypeLine = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 2em;
	height: 0.1em;
	margin-left: 0.25em;
	margin-bottom: 0.2em;
	background-color: ${theme('c.lineOnSurface')};
	transform-origin: left;
	transform: translateX(calc(100% + 0.125em));
	transition: transform 0.25s ${theme('a.easeOutQuad')};

	${TitleWrap}:hover & {
		transform: translateX(calc(100% + 0.125em)) scaleX(1.5);
	}
`
