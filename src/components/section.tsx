import styled from 'styled-components'

import CardGrid from './cardGrid'

import { Section as ISection, Story } from '@types'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	section: ISection
	stories: Story[]
	overlay?: boolean
}

const Section = ({ section, stories, overlay }: Props): JSX.Element => {
	return (
		<LocalThemeProvider overlay={overlay}>
			<Wrap>
				<TitleWrap>
					<TitleLink href={section.path}>
						<Title>{section.name}</Title>
					</TitleLink>
				</TitleWrap>
				<CardGrid stories={stories} />
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
