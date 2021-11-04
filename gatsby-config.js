const path = require('path')

module.exports = {
  siteMetadata: {
    lang: 'en-US',
    dir: 'ltr',
    siteUrl: 'https://www.gradient.ooo',
    title: 'Gradient',
    description:
      'An online publication on the topics of technology, design, philosophy, and the law.',
    author: 'Vu Luong',
    authorTwitter: '@vuluongj20',
    image: {
      url: '/images/og.png',
      alt: 'Wordmark logo that says Gradient \\',
      width: 1200,
      height: 630,
    },
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          policies: require.resolve('./src/templates/policies.tsx'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-slug`,
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'policies',
        path: './src/pages/policies',
      },
      __key: 'policies',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/',
      },
      __key: 'data',
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@components': path.resolve(__dirname, 'src/components'),
          '@pageComponents': path.resolve(__dirname, 'src/pageComponents'),
          '@data': path.resolve(__dirname, 'src/data'),
          '@types': path.resolve(__dirname, 'src/types'),
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: require.resolve(`./src/layouts/index.tsx`),
        injectPageProps: false,
      },
    },
  ],
}
