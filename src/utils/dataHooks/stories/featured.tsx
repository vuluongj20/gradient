import { graphql, useStaticQuery } from 'gatsby'

import { mapStoryData } from './index'

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
