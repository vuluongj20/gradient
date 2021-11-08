import styled from 'styled-components'

import { CardContent } from './card'
import CardGrid from './cardGrid'

import { Page } from '@types'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	sectionLink: Page
	cards: CardContent[]
	overlay?: boolean
}

const Section = ({ sectionLink, cards, overlay }: Props): JSX.Element => {
	return (
		<LocalThemeProvider overlay={overlay}>
			<Wrap>
				<TitleWrap>
					<TitleLink href={sectionLink.path}>
						<Title>{sectionLink.title}</Title>
					</TitleLink>
				</TitleWrap>
				<CardGrid cards={cards} />
			</Wrap>
		</LocalThemeProvider>
	)
}

export default Section

const Wrap = styled.section`
	background: ${(p) => p.theme.c.background};
`

const TitleWrap = styled.div`
	margin-bottom: ${(p) => p.theme.s[3]};
	${(p) => p.theme.u.spacing.paddingHorizontal};
`

const TitleLink = styled.a`
	display: inline-block;
`

const Title = styled.h2`
	${(p) => p.theme.t.ui.h3};
	display: inline;
`
