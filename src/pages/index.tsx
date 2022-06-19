import { Fragment } from 'react'

import CardGroup from '@components/cardGroup'
import Divider from '@components/divider'
import Page from '@components/page'
import Section from '@components/section'

import Header from '@pageComponents/home/header'

import { Section as ISection, Story } from '@types'

import useSections from '@utils/data/sections'
import useFeaturedStories from '@utils/data/stories/featured'

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
        <CardGroup stories={topFeaturedStories} imageLoading="eager" />
      </section>

      {featuredSections.map((s) => {
        if (s.stories.length === 0) return null
        return (
          <Fragment key={s.section.slug}>
            <Divider />
            <Section section={s.section} stories={s.stories} />
          </Fragment>
        )
      })}
    </Page>
  )
}

export default IndexPage
