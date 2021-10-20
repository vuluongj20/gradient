import styled from 'styled-components'

import { CardContent } from './card'
import CardArea, { Offsets } from './cardArea'
import Grid from './grid'

import { Page } from '@data/siteStructure'

type Props = {
	section: Page
	cards: CardContent[]
	offsets: Offsets
	overlay?: boolean
}

const Section = ({ section, cards, offsets, overlay }: Props): JSX.Element => {
	return (
		<Wrap overlay={overlay}>
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

const Wrap = styled.section<{ overlay: boolean }>`
	padding: ${(p) => p.theme.s[7]} 0;
	background: ${(p) => (p.overlay ? p.theme.c.oBackground : p.theme.c.background)};
`

const StyledGrid = styled(Grid)`
	row-gap: ${(p) => p.theme.s[4]};
`

const TitleWrap = styled.a`
	position: relative;
	border-radius: ${(p) => p.theme.s[0]};

	grid-column: 2 / -1;
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

const TypeLine = styled.div`
	width: 2em;
	height: 4px;
	margin-left: 0.125em;
	margin-bottom: 0.2em;
	background-color: ${(p) => p.theme.c.oLine};
	transform-origin: left;
	transition: transform 0.25s ${(p) => p.theme.a.easeOutQuad};

	${TitleWrap}:hover & {
		transform: scaleX(1.5);
	}

	${(p) => p.theme.u.media.s} {
		height: 3px;
	}
`
