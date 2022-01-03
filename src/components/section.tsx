import styled from 'styled-components'

import CardGroup from './cardGroup'

import { ThemeSettings } from '@theme'

import { Section as ISection, Story } from '@types'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	section: ISection
	stories: Story[]
	elevation?: ThemeSettings['color']['elevation']
}

const Section = ({ section, stories, elevation }: Props): JSX.Element => {
	return (
		<LocalThemeProvider elevation={elevation}>
			<Wrap>
				<TitleWrap>
					<TitleLink href={section.path}>
						<Title>{section.name}</Title>
					</TitleLink>
				</TitleWrap>
				<CardGroup stories={stories} />
			</Wrap>
		</LocalThemeProvider>
	)
}

export default Section

const Wrap = styled.section`
	background: ${(p) => p.theme.colors.background};
`

const TitleWrap = styled.div`
	margin-bottom: ${(p) => p.theme.space[3]};
	${(p) => p.theme.utils.space.paddingHorizontal};
`

const TitleLink = styled.a`
	display: inline-block;
`

const Title = styled.h2`
	${(p) => p.theme.text.ui.h3};
	display: inline;
`
