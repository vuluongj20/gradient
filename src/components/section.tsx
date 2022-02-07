import styled from 'styled-components'

import CardGroup from './cardGroup'

import { Section as ISection, Image, Story } from '@types'

type Props = {
	section: ISection
	stories: Story[]
	imageLoading?: Image['loading']
}

const Section = ({ section, stories, imageLoading }: Props): JSX.Element => {
	return (
		<Wrap>
			<TitleWrap>
				<TitleLink href={section.path}>
					<Title>{section.name}</Title>
				</TitleLink>
			</TitleWrap>
			<CardGroup stories={stories} imageLoading={imageLoading} />
		</Wrap>
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
