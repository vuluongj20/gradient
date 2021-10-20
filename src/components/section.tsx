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

	@media only screen and (max-width: ${theme('b.m')}) {
		grid-column: 2 / -1;
		grid-row: 1;

		display: flex;
	}

	@media only screen and (max-width: ${theme('b.s')}) {
		grid-column: 1 / -1;
	}
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

	@media only screen and (max-width: ${theme('b.m')}) {
		position: relative;
		top: initial;
		transform: none;
		flex-direction: row-reverse;
		justify-content: flex-end;
	}
`

const Title = styled.h2`
	${theme('t.ui.h3')}
`

const TypeWrap = styled.div`
	margin-bottom: 0.45em;
	margin-right: 0.25em;

	@media only screen and (max-width: ${theme('b.m')}) {
		margin-left: 0.25em;
		margin-right: 0;
		margin-bottom: 0.4em;
	}
`

const TypeText = styled.p`
	${theme('t.ui.label')}

	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${theme('c.heading')};

	@media only screen and (max-width: ${theme('b.m')}) {
		text-align: left;
	}
`

const TypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${theme('c.heading')};
`
