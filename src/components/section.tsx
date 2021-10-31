import styled from 'styled-components'

import { CardContent } from './card'
import CardArea, { Offsets } from './cardArea'
import Grid from './grid'

import { Page } from '@data/pages/types'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	section: Page
	cards: CardContent[]
	offsets: Offsets
	overlay?: boolean
}

const Section = ({ section, cards, offsets, overlay }: Props): JSX.Element => {
	return (
		<LocalThemeProvider overlay={overlay}>
			<Wrap>
				<StyledGrid>
					<TitleWrap href={section.path}>
						<Title>{section.name}</Title>
					</TitleWrap>
					<CardArea cards={cards} offsets={offsets} />
				</StyledGrid>
			</Wrap>
		</LocalThemeProvider>
	)
}

export default Section

const Wrap = styled.section`
	background: ${(p) => p.theme.c.background};
`

const StyledGrid = styled(Grid)`
	row-gap: ${(p) => p.theme.s[4]};
`

const TitleWrap = styled.a`
	position: relative;
	margin-right: auto;
	border-radius: ${(p) => p.theme.s[0]};

	grid-column: 1 / -1;
	grid-row: 1;

	${(p) => p.theme.u.media.s} {
		grid-column: 1 / -1;
	}
`

const Title = styled.h2`
	${(p) => p.theme.t.ui.h3};

	position: relative;
	display: flex;
	align-items: flex-end;
`
