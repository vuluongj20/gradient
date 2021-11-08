import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

import useDesignStories from '@pageComponents/home/useDesignStories'
import useFeaturedStories from '@pageComponents/home/useFeaturedStories'
import useTechnologyStories from '@pageComponents/home/useTechnologyStories'

import useSections from '@utils/dataHooks/sections'

const IndexPage = (): JSX.Element => {
  const sections = useSections()
  const technologySection = sections.find((s) => s.slug === 'technology')
  const designSection = sections.find((s) => s.slug === 'design')

  const featuredStories = useFeaturedStories()
  const technologyStories = useTechnologyStories()
  const designStories = useDesignStories()

  return (
    <Page>
      <SEO />
      <section>
        <Header />
        <CardGrid cards={featuredStories} />
      </section>
      <SectionDivider />
      <Section sectionLink={technologySection} cards={technologyStories} />
      <SectionDivider />
      <Section sectionLink={designSection} cards={designStories} />
    </Page>
  )
}

export default IndexPage
