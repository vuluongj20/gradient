import { Fragment } from 'react'
import styled from 'styled-components'

import CardGroup from '@components/cardGroup'
import Page from '@components/page'
import Section from '@components/section'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'

import Header from '@pageComponents/home/header'

import { Section as ISection, Story } from '@types'

import useSections from '@utils/data/sections'
import useFeaturedStories from '@utils/data/stories/featured'

const IndexPage = () => {
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
        <HeaderWrap>
          <HeaderText aria-label="Gradient">Gradient\</HeaderText>
        </HeaderWrap>
        <CardGroup stories={topFeaturedStories} imageLoading="eager" />
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

export const Head = () => <SEO />

const HeaderWrap = styled.header`
  display: flex;
  align-items: flex-end;
  padding: ${(p) => p.theme.space[3]} 0;
  ${(p) => p.theme.paddingHorizontal};

  ${(p) => p.theme.media.mobile} {
    display: none;
  }
`

const HeaderText = styled.h1`
  ${(p) => p.theme.text.content.h2};
  color: ${(p) => p.theme.heading};
`
