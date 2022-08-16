import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent'
import { GatsbyNode } from 'gatsby'
import { ImageDataLike, getSrc } from 'gatsby-plugin-image'
import path from 'path'

import graphQLTypes from './src/types/graphql'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions,
}) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new RelativeCiAgentWebpackPlugin({
          enabled: process.env.NODE_ENV === 'production' && process.env.RELATIVE_CI,
        }),
      ],
    })
  }
}

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
          nodes {
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
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  )

  const siteUrl = storyResults.data?.site?.siteMetadata.siteUrl

  storyResults.data?.allStoriesJson.nodes.forEach((node) => {
    const story = node
    const component = path.resolve(`./src/stories/${story.slug}/index.tsx`)

    !story.isMock &&
      actions.createPage({
        path: `/story/${story.slug}`,
        component: component,
        context: {
          slug: story.slug,
          title: story.title,
          description: story.description,
          ...(story.cover?.image && {
            image: {
              src: `${siteUrl ?? ''}${getSrc(story.cover.image as ImageDataLike) ?? ''}`,
              alt: story.cover?.alt,
              width: 1200,
              height: 630,
            },
          }),
        },
      })
  })

  const indexResult = await graphql<Queries.CreatePagesArchiveQuery>(
    `
      query CreatePagesArchive {
        allPagesJson(filter: { slug: { eq: "archive" } }) {
          nodes {
            slug
            title
          }
        }
      }
    `,
  )
  indexResult.data?.allPagesJson.nodes.forEach((node) => {
    const page = node
    actions.createPage({
      path: `/${page.slug ?? ''}`,
      component: StoryGroup,
      context: page,
    })
  })

  const sectionsResult = await graphql<Queries.CreatePagesAllSectionsQuery>(
    `
      query CreatePagesAllSections {
        allSectionsJson {
          nodes {
            slug
            name
          }
        }
      }
    `,
  )
  sectionsResult.data?.allSectionsJson.nodes.forEach((node) => {
    const section = node
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
          nodes {
            slug
            name
          }
        }
      }
    `,
  )
  authorsResult.data?.allAuthorsJson.nodes.forEach((node) => {
    const author = node
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
