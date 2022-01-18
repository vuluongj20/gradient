import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

import defaultOgImage from '@images/og.png'

type Meta = {
  name?: string
  property?: string
  content: string
}

export type SEOProps = {
  lang?: string
  title?: string
  description?: string
  type?: string
  author?: string
  authorTwitter?: string
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  meta?: Meta[]
}

const SEO = ({
  lang,
  title,
  description,
  type,
  author,
  authorTwitter,
  image,
  meta,
}: SEOProps): JSX.Element => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            dir
            lang
            title
            description
            type
            author
            authorTwitter
            siteUrl
          }
        }
      }
    `,
  )

  const { siteMetadata } = data.site

  const metaDir = siteMetadata.dir
  const metaLang = lang ?? siteMetadata.lang
  const metaTitle = title
    ? `${title} - Gradient`
    : `Gradient - Ideas on Technology, Design, Philosophy, and the Law`
  const metaDescription = description ?? siteMetadata.description
  const metaType = type ?? siteMetadata.type
  const metaAuthor = author ?? siteMetadata.author
  const metaAuthorTwitter = authorTwitter ?? siteMetadata.authorTwitter
  const metaImage = image ?? {
    src: defaultOgImage,
    alt: 'Wordmark logo that says Gradient \\',
    width: 1200,
    height: 630,
  }

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang: metaLang,
        dir: metaDir,
      }}
      title={metaTitle}
      meta={(
        [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, viewport-fit=cover',
          },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: `author`,
            content: metaAuthor,
          },
          {
            property: `og:site_name`,
            content: `Gradient`,
          },
          {
            property: `og:title`,
            content: metaTitle,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: metaType,
          },
          {
            property: `og:image`,
            content: metaImage.src,
          },
          {
            property: `og:image:alt`,
            content: metaImage.alt,
          },
          {
            property: `og:image:width`,
            content: metaImage.width,
          },
          {
            property: `og:image:height`,
            content: metaImage.height,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: metaAuthorTwitter,
          },
          {
            name: `twitter:title`,
            content: metaTitle,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: metaImage.src,
          },
          {
            name: `twitter:image:alt`,
            content: metaImage.alt,
          },
        ] as Meta[]
      ).concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
}

export default SEO
