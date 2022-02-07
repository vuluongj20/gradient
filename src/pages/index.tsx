// import { Fragment } from 'react'
// import CardGroup from '@components/cardGroup'
// import Header from '@components/header'
import { Item } from '@react-stately/collections'

import Page from '@components/page'
// import Section from '@components/section'
// import SectionDivider from '@components/sectionDivider'
import TabList from '@components/tabList'

import IconSettings from '@icons/Settings'

// import useFeaturedStories from '@pageComponents/home/useFeaturedStories'

// import { Section as ISection, Story } from '@types'

// import useSections from '@utils/dataHooks/sections'

const IndexPage = (): JSX.Element => {
  // const sections: ISection[] = useSections()
  // const featuredStories: Story[] = useFeaturedStories()

  // const topFeaturedStories = featuredStories.filter((story) => {
  //   return story.featuredIn?.includes('top')
  // })

  // const featuredSections = sections.map((section) => {
  //   const stories = featuredStories.filter((story) => {
  //     return story.featuredIn?.includes(section.slug)
  //   })
  //   return { section, stories }
  // })
  //
  const tabItems = [
    {
      key: 'hello',
      label: 'Appearance',
      content:
        'The bobcat (Lynx rufus), also known as the red lynx, is a medium-sized cat native to North America. It ranges from southern Canada through most of the contiguous United States to Oaxaca in Mexico. It is listed as Least Concern on the IUCN Red List since 2002, due to its wide distribution and large population. Although it has been hunted extensively both for sport and fur, populations have proven stable, though declining in some areas.',
      leadingItems: <IconSettings />,
    },
    {
      key: 'woah',
      label: 'Account',
      content:
        'It has distinctive black bars on its forelegs and a black-tipped, stubby (or "bobbed") tail, from which it derives its name. It reaches a body length of up to 125 cm (50 in). It is an adaptable predator inhabiting wooded areas, semidesert, urban edge, forest edge, and swampland environments.',
      leadingItems: <IconSettings />,
    },
  ]

  return (
    <Page>
      <TabList orientation="horizontal" items={tabItems} />
      {/*<section>
        <Header />
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
      })}*/}
    </Page>
  )
}

export default IndexPage
