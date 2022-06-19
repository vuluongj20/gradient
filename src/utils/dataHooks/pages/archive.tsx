import { graphql, useStaticQuery } from 'gatsby'

import { mapPageData } from './index'

const useArchivePage = () =>
  mapPageData(
    useStaticQuery(graphql`
      query ArchivePage {
        allPagesJson(filter: { slug: { eq: "archive" } }) {
          edges {
            node {
              ...Page
            }
          }
        }
      }
    `),
  )[0]

export default useArchivePage
