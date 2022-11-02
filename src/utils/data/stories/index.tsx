import { graphql, useStaticQuery } from 'gatsby'

import { Story } from '@types'

export const storyFragment = graphql`
  fragment Story on StoriesJson {
    slug
    title
    description
    sections
    featuredIn
    featuredSize
    authors
    cover {
      image {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, quality: 95)
        }
      }
      alt
    }
  }
`

export const mapStoryData = (data: Queries.AllStoriesQuery): Story[] =>
  data.allStoriesJson.nodes.map((node) => {
    // @ts-ignore
    const story = node as Omit<Story, 'path'>
    return { ...story, path: `/story/${story.slug}` }
  })

const useStories = () =>
  mapStoryData(
    useStaticQuery(graphql`
      query AllStories {
        allStoriesJson {
          nodes {
            ...Story
          }
        }
      }
    `),
  )

export default useStories
