import styled from 'styled-components'

import { Offsets } from '@components/cardArea'
import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

import useHomeFeatured from '@utils/dataHooks/homeFeatured'
import useHomeHero from '@utils/dataHooks/homeHero'
import useSectionPages from '@utils/dataHooks/sections'

const offsets: Offsets = { xl: [0, 0], l: [0, 0], m: [0, 0], s: [0, 0], xs: [0, 0] }

const IndexPage = (): JSX.Element => {
  const sectionPages = useSectionPages()
  const technology = sectionPages.find((s) => s.slug === 'technology')
  const design = sectionPages.find((s) => s.slug === 'design')

  const hero = useHomeHero()
  const featured = useHomeFeatured()

  return (
    <Page>
      <SEO />
      <HeroSection>
        <Header />
        <HeroGrid>
          <CardGrid cards={hero} offsets={offsets} />
        </HeroGrid>
        <HeroGrid>
          <CardGrid cards={featured} offsets={offsets} />
        </HeroGrid>
      </HeroSection>
      <SectionDivider />
      <Section sectionLink={technology} cards={featured} offsets={offsets} />
      <SectionDivider />
      <Section sectionLink={design} cards={featured} offsets={offsets} />
    </Page>
  )
}

export default IndexPage

const HeroSection = styled.div``

const HeroGrid = styled.div`
  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.s[4]};
  }
`
