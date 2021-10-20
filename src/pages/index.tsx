import { Fragment } from 'react'
import styled from 'styled-components'

import { hero, featured } from '@data/home'
import { sections } from '@data/siteStructure'

import { Offsets } from '@components/cardArea'
import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import Section from '@components/section'
import SEO from '@components/seo'

const heroOffsets: Offsets = { xl: [0, 0], l: [0, 0], m: [0, 0], s: [0, 0], xs: [0, 0] }
const featuredOffsets: Offsets = {
  xl: [1, 1],
  l: [1, 1],
  m: [1, 1],
  s: [0, 0],
  xs: [0, 0],
}

const IndexPage = (): JSX.Element => {
  const technology = sections.find((s) => s.id === 'technology')
  const design = sections.find((s) => s.id === 'design')

  return (
    <Fragment>
      <SEO />
      <HeroSection>
        <Header />
        <HeroGrid>
          <CardGrid cards={hero} offsets={heroOffsets} />
        </HeroGrid>
        <HeroGrid>
          <CardGrid cards={featured} offsets={featuredOffsets} />
        </HeroGrid>
      </HeroSection>
      <Section section={technology} cards={featured} offsets={featuredOffsets} />
      <Section section={design} cards={featured} offsets={featuredOffsets} overlay />
    </Fragment>
  )
}

export default IndexPage

const HeroSection = styled.div`
  margin-bottom: ${(p) => p.theme.s[7]};
`

const HeroGrid = styled.div`
  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.s[4]};
  }
`
