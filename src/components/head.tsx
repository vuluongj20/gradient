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

	console.log(seo.image)

	return <SEO {...seo} />
}

export default Head
