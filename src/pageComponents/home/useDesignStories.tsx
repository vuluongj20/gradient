import { graphql, useStaticQuery } from 'gatsby'

const useDesignStories = () => {
	const data = useStaticQuery(graphql`
		{
			allStoriesJson(filter: { featuredIn: { in: "home-design" } }) {
				edges {
					node {
						slug
						title
						sections
						featuredSize
						img {
							src {
								childImageSharp {
									gatsbyImageData(
										placeholder: BLURRED
										formats: [AUTO, WEBP, AVIF]
										layout: FULL_WIDTH
									)
								}
							}
							alt
							aspectRatio
						}
					}
				}
			}
		}
	`)

	return data.allStoriesJson.edges.map((edge) => {
		const story = edge.node
		return { ...story, path: `/story/${story.slug}` }
	})
}

export default useDesignStories
