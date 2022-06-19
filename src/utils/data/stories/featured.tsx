import { graphql, useStaticQuery } from 'gatsby'

import { mapStoryData } from '@utils/data/stories'

const useFeaturedStories = () =>
  mapStoryData(
    useStaticQuery(graphql`
      query FeaturedStories {
        allStoriesJson(filter: { featuredIn: { ne: null } }) {
          nodes {
            ...Story
          }
        }
      }
    `),
  )

export default useFeaturedStories
