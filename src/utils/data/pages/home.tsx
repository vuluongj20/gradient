import { graphql, useStaticQuery } from 'gatsby'

import { mapPageData } from '@utils/data/pages'

const useHomePage = () =>
  mapPageData(
    useStaticQuery(graphql`
      query HomePage {
        allPagesJson(filter: { slug: { eq: "" } }) {
          nodes {
            ...Page
          }
        }
      }
    `),
  )[0]

export default useHomePage
