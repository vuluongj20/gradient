const path = require('path')
const StoryGroup = path.resolve(`./src/templates/storyGroup.tsx`)

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

exports.createPages = async function ({ actions, graphql }) {
  const storyResults = await graphql(
    `
      query {
        allStoriesJson {
          edges {
            node {
              slug
              title
              buildPage
            }
          }
        }
      }
    `,
  )
  storyResults.data.allStoriesJson.edges.forEach((edge) => {
    const story = edge.node
    const component = path.resolve(`./src/stories/${story.slug}/index.tsx`)

    story.buildPage &&
      actions.createPage({
        path: `/story/${story.slug}`,
        component,
        context: { slug: story.slug, title: story.title },
      })
  })

  const indexResult = await graphql(
    `
      query {
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
  indexResult.data.allArchiveJson.edges.forEach((edge) => {
    const page = edge.node
    actions.createPage({
      path: `/${page.slug}`,
      component: StoryGroup,
      context: { slug: page.slug, title: page.title },
    })
  })

  const sectionsResult = await graphql(
    `
      query {
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
  sectionsResult.data.allSectionsJson.edges.forEach((edge) => {
    const section = edge.node
    actions.createPage({
      path: `/section/${section.slug}`,
      component: StoryGroup,
      context: { filter: { sections: { in: [section.slug] } }, title: section.name },
    })
  })

  const authorsResult = await graphql(
    `
      query {
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
  authorsResult.data.allAuthorsJson.edges.forEach((edge) => {
    const author = edge.node
    actions.createPage({
      path: `/author/${author.slug}`,
      component: StoryGroup,
      context: { filter: { authors: { in: [author.slug] } }, title: author.name },
    })
  })
}
