import { Fragment } from 'react'

import CardGroup from '@components/cardGroup'
import Header from '@components/header'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

import useFeaturedStories from '@pageComponents/home/useFeaturedStories'

import { Section as ISection, Story } from '@types'

import useSections from '@utils/dataHooks/sections'

const IndexPage = (): JSX.Element => {
  const sections: ISection[] = useSections()
  const featuredStories: Story[] = useFeaturedStories()

  const topFeaturedStories = featuredStories.filter((story) => {
    return story.featuredIn?.includes('top')
  })

  const featuredSections = sections.map((section) => {
    const stories = featuredStories.filter((story) => {
      return story.featuredIn?.includes(section.slug)
    })
    return { section, stories }
  })

  return (
    <Page>
      <section>
        <Header />
        <CardGroup stories={topFeaturedStories} />
      </section>

      {featuredSections.map((s) => {
        if (s.stories.length === 0) return null
        return (
          <Fragment key={s.section.slug}>
            <SectionDivider />
            <Section section={s.section} stories={s.stories} />
          </Fragment>
        )
      })}
    </Page>
  )
}

export default IndexPage
