import { GatsbyImageProps } from 'gatsby-plugin-image'
import styled from 'styled-components'

import CardGroup from '@components/cardGroup'

import { Section as ISection, Story } from '@types'

interface SectionProps {
	section: ISection
	stories: Story[]
	imageLoading?: GatsbyImageProps['loading']
}

const Section = ({ section, stories, imageLoading }: SectionProps) => {
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
	background: ${(p) => p.theme.background};
`

const TitleWrap = styled.div`
	margin-bottom: ${(p) => p.theme.space[3]};
	${(p) => p.theme.paddingHorizontal};
`

const TitleLink = styled.a`
	display: inline-block;
`

const Title = styled.h2`
	${(p) => p.theme.text.system.h3};
	display: inline;
`
