import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

export const pageFragment = graphql`
  fragment Page on PagesJson {
    slug
    title
  }
`

export const mapPageData = (data: Queries.AllPagesQuery): Page[] =>
  data.allPagesJson.edges.map((edge) => {
    const page = edge.node as Omit<Page, 'path'>

    return {
      ...page,
      path: `/${page.slug}`,
    }
  })

const usePages = () =>
  mapPageData(
    useStaticQuery(graphql`
      query AllPages {
        allPagesJson {
          edges {
            node {
              ...Page
            }
          }
        }
      }
    `),
  )

export default usePages
