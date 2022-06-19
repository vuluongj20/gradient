import { graphql, useStaticQuery } from 'gatsby'

import { mapPageData } from './index'

const useHomePage = () =>
  mapPageData(
    useStaticQuery(graphql`
      query HomePage {
        allPagesJson(filter: { slug: { eq: "home" } }) {
          nodes {
            ...Page
          }
        }
      }
    `),
  )[0]

export default useHomePage
