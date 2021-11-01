const path = require('path')
const SiteIndex = path.resolve(`./src/templates/site-index.tsx`)

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

exports.createPages = async function ({ actions, graphql }) {
  const indexResult = await graphql(
    `
      query {
        allIndexJson {
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
  indexResult.data.allIndexJson.edges.forEach((edge) => {
    const page = edge.node
    actions.createPage({
      path: `/${page.slug}`,
      component: SiteIndex,
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
      component: SiteIndex,
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
      component: SiteIndex,
      context: { filter: { authors: { in: [author.slug] } }, title: author.name },
    })
  })
}
