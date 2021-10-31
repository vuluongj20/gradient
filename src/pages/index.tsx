import styled from 'styled-components'

import { hero, featured } from '@data/home'
import { sectionIndices } from '@data/pages/sectionIndices'

import { Offsets } from '@components/cardArea'
import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

const offsets: Offsets = { xl: [0, 0], l: [0, 0], m: [0, 0], s: [0, 0], xs: [0, 0] }

const IndexPage = (): JSX.Element => {
  const technology = sectionIndices.find((s) => s.id === 'technology')
  const design = sectionIndices.find((s) => s.id === 'design')

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
      <Section section={technology} cards={featured} offsets={offsets} />
      <SectionDivider />
      <Section section={design} cards={featured} offsets={offsets} />
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
