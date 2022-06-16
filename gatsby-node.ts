import { GatsbyNode } from 'gatsby'
import path from 'path'

import graphQLTypes from './src/types/graphql'

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  actions.createTypes(graphQLTypes)
}

export const createPages: GatsbyNode['createPages'] = async function ({
  actions,
  graphql,
}) {
  const StoryGroup = path.resolve('./src/templates/storyGroup.tsx')
  const storyResults = await graphql<Queries.CreatePagesAllStoriesQuery>(
    `
      query CreatePagesAllStories {
        allStoriesJson {
          edges {
            node {
              slug
              title
              description
              authors
              cover {
                image {
                  childImageSharp {
                    gatsbyImageData(width: 1200, height: 630)
                  }
                }
                alt
              }
              isMock
            }
          }
        }
      }
    `,
  )
  storyResults.data?.allStoriesJson.edges.forEach((edge) => {
    const story = edge.node
    const component = path.resolve(`./src/stories/${story.slug}/index.tsx`)

    !story.isMock &&
      actions.createPage({
        path: `/story/${story.slug}`,
        component: component,
        context: {
          slug: story.slug,
          title: story.title,
          description: story.description,
          image: { ...story.cover?.image, width: 1200, height: 630 },
        },
      })
  })

  const indexResult = await graphql<Queries.CreatePagesAllArchiveQuery>(
    `
      query CreatePagesAllArchive {
        allArchiveJson {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `,
  )
  indexResult.data?.allArchiveJson.edges.forEach((edge) => {
    const page = edge.node
    actions.createPage({
      path: `/${page.slug ?? ''}`,
      component: StoryGroup,
      context: { slug: page.slug, title: page.title },
    })
  })

  const sectionsResult = await graphql<Queries.CreatePagesAllSectionsQuery>(
    `
      query CreatePagesAllSections {
        allSectionsJson {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    `,
  )
  sectionsResult.data?.allSectionsJson.edges.forEach((edge) => {
    const section = edge.node
    actions.createPage({
      path: `/section/${section.slug ?? ''}`,
      component: StoryGroup,
      context: {
        filter: { sections: { in: [section.slug] } },
        title: section.name,
      },
    })
  })

  const authorsResult = await graphql<Queries.CreatePagesAllAuthorsQuery>(
    `
      query CreatePagesAllAuthors {
        allAuthorsJson {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    `,
  )
  authorsResult.data?.allAuthorsJson.edges.forEach((edge) => {
    const author = edge.node
    actions.createPage({
      path: `/author/${author.slug ?? ''}`,
      component: StoryGroup,
      context: {
        filter: { authors: { in: [author.slug] } },
        title: author.name,
      },
    })
  })
}
