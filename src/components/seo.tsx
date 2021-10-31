import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

type Meta = {
  name?: string
  property?: string
  content: string
}

type Props = {
  lang?: string
  title?: string
  description?: string
  author?: string
  authorTwitter?: string
  image?: {
    url: string
    alt?: string
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
}: Props): JSX.Element => {
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
            image {
              url
              alt
              width
              height
            }
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
  const metaImage = image ?? siteMetadata.image

  return (
    <Helmet
      htmlAttributes={{
        lang: metaLang,
        dir: metaDir,
      }}
      title={title ? `${title} - Gradient` : `Gradient`}
      meta={[
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
          content: metaImage.url,
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
          content: metaImage.url,
        },
        {
          name: `twitter:image:alt`,
          content: metaImage.alt,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
}

export default SEO
