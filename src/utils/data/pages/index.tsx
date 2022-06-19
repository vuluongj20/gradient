import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

export const pageFragment = graphql`
  fragment Page on PagesJson {
    slug
    title
  }
`

export const mapPageData = (data: Queries.AllPagesQuery): Page[] =>
  data.allPagesJson.nodes.map((node) => {
    const page = node as Omit<Page, 'path'>
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
          nodes {
            ...Page
          }
        }
      }
    `),
  )

export default usePages
