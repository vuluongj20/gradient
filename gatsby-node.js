const path = require('path')
const SiteIndex = path.resolve(`./src/templates/site-index.tsx`)
const sections = require(`./src/data/sections.json`)
const authors = require(`./src/data/authors.json`)

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

exports.createPages = async function ({ actions }) {
  actions.createPage({
    path: '/site-index',
    component: SiteIndex,
    context: { title: 'Index' },
  })

  sections.forEach((section) => {
    actions.createPage({
      path: `/section/${section.id}`,
      component: SiteIndex,
      context: { title: section.name, section: section.id },
    })
  })
  authors.forEach((author) => {
    actions.createPage({
      path: `/author/${author.id}`,
      component: SiteIndex,
      context: { title: author.name, author: author.id },
    })
  })
}
