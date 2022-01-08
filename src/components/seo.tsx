import { useStaticQuery, graphql } from 'gatsby'
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
            lang
            dir
            title
            description
            author
            authorTwitter
            siteUrl
          }
        }
      }
    `,
  )

  const { siteMetadata } = data.site

  const metaLang = lang ?? siteMetadata.lang
  const metaDir = siteMetadata.dir ?? 'ltr'
  const metaTitle = title ? `${title} - Gradient` : `Gradient`
  const metaDescription = description ?? siteMetadata.description
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
      title={title ? `${title} - Gradient` : `Gradient`}
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
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:title`,
            content: metaTitle,
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
            property: `og:description`,
            content: metaDescription,
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
