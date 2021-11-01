import styled from 'styled-components'

import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

import useHomeDesign from '@utils/dataHooks/homeDesign'
import useHomeFeatured from '@utils/dataHooks/homeFeatured'
import useHomeTechnology from '@utils/dataHooks/homeTechnology'
import useSectionPages from '@utils/dataHooks/sections'

const IndexPage = (): JSX.Element => {
  const sectionPages = useSectionPages()
  const technology = sectionPages.find((s) => s.slug === 'technology')
  const design = sectionPages.find((s) => s.slug === 'design')

  const featured = useHomeFeatured()
  const featuredTechnology = useHomeTechnology()
  const featuredDesign = useHomeDesign()

  return (
    <Page>
      <SEO />
      <HeroSection>
        <Header />
        <HeroGrid>
          <CardGrid cards={featured} />
        </HeroGrid>
      </HeroSection>
      <SectionDivider />
      <Section sectionLink={technology} cards={featuredTechnology} />
      <SectionDivider />
      <Section sectionLink={design} cards={featuredDesign} />
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
