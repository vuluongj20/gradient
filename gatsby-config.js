module.exports = {
  siteMetadata: {
    lang: 'en',
    siteUrl: 'https://www.gradient.ooo',
    title: 'Gradient',
    description:
      'An online publication on the topics of technology, design, philosophy, and the law.',
    author: 'Vu Luong',
    authorTwitter: '@vuluongj20',
    image: {
      url: '/assets/images/og.png',
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
    'gatsby-plugin-mdx',
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
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-layout',
  ],
}
