import styled from 'styled-components'

import { hero, featured } from '@data/home'
import { sections } from '@data/siteStructure'

import { Offsets } from '@components/cardArea'
import CardGrid from '@components/cardGrid'
import Page from '@components/page'
import Section from '@components/section'
import SEO from '@components/seo'

const offsets: Offsets = { xl: [0, 0], l: [0, 0], m: [0, 0], s: [0, 0], xs: [0, 0] }

const IndexPage = (): JSX.Element => {
	const technology = sections.find((s) => s.id === 'technology')
	const design = sections.find((s) => s.id === 'design')

	return (
		<Page>
			<SEO />
			<HeroSection>
				<HeroGrid>
					<CardGrid cards={hero} offsets={offsets} />
				</HeroGrid>
				<HeroGrid>
					<CardGrid cards={featured} offsets={offsets} />
				</HeroGrid>
			</HeroSection>
			<Section section={technology} cards={featured} offsets={offsets} />
			<Section section={design} cards={featured} offsets={offsets} overlay />
		</Page>
	)
}

export default IndexPage

const HeroSection = styled.div`
	padding-top: 4.5em;
	padding-bottom: ${(p) => p.theme.s[7]};
	background: ${(p) => p.theme.c.oBackground};
`

const HeroGrid = styled.div`
	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.s[4]};
	}
`
