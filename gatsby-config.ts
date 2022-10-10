import { citePlugin } from '@benrbray/remark-cite'
import dotenv from 'dotenv'
import { GatsbyConfig } from 'gatsby'
import path from 'path'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? ''}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    lang: 'en-US',
    dir: 'ltr',
    siteUrl: 'https://www.gradient.pub',
    title: 'Gradient – Ideas on Technology, Design, Philosophy, and the Law',
    description:
      'An online publication on the topics of technology, design, philosophy, and the law.',
    type: 'website',
    author: 'Vu Luong',
    authorTwitter: '@vuluongj20',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gradient',
        short_name: 'Gradient',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [remarkMath, [citePlugin, {}]],
          rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-references',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'autolinked-header',
              elements: ['h2', 'h3'],
            },
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
        name: 'stories',
        path: './src/stories/',
      },
      __key: 'stories',
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
          '@icons': path.resolve(__dirname, 'src/icons'),
          '@data': path.resolve(__dirname, 'src/data'),
          '@types': path.resolve(__dirname, 'src/types'),
          '@layouts': path.resolve(__dirname, 'src/layouts'),
          '@theme': path.resolve(__dirname, 'src/layouts/theme'),
          '@templates': path.resolve(__dirname, 'src/templates'),
          '@images': path.resolve(__dirname, 'src/images'),
        },
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: path.resolve(`./src/layouts/index.tsx`),
        injectPageProps: false,
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/fonts/*': [
            'Cache-Control: public,max-age=31536000,s-maxage=31536000,immutable',
          ],
        },
      },
    },
  ],
}

export default config
