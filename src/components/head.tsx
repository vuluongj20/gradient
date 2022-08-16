import SEO, { SEOProps } from '@components/seo'

type Props = {
	pageContext: SEOProps
}

const Head = ({ pageContext: { title, description, author, image } }: Props) => {
	const seo = {
		title,
		description,
		author,
		image,
	}

	return <SEO {...seo} />
}

export default Head
