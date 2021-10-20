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
				<TitleWrap>
					<TitleInnerWrap href={section.path}>
						<TypeWrap>
							<TypeText>Section</TypeText>
							<TypeLine />
						</TypeWrap>
						<Title>{section.title}</Title>
					</TitleInnerWrap>
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

const TitleWrap = styled.div`
	grid-column: 1 / 1;
	grid-row: 1 / -1;

	position: relative;
`

const TitleInnerWrap = styled.a`
	display: flex;
	align-items: flex-end;
	position: absolute;
	top: ${theme('s[1]')};
	right: 0;
	border-radius: ${theme('s[0]')};
	transform-origin: bottom right;
	transform: translate(0, -100%) rotate(-90deg);
`

const Title = styled.h2`
	${theme('t.ui.h3')}
`

const TypeWrap = styled.div`
	margin-bottom: 0.45em;
	margin-right: 0.25em;
`

const TypeText = styled.p`
	${theme('t.ui.label')}

	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${theme('c.heading')};
	transition: color 0.25s ${theme('a.easeOutQuad')};
`

const TypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${theme('c.heading')};
	transform-origin: right;
	transition: 0.375s ${theme('a.easeOutQuart')};
`
