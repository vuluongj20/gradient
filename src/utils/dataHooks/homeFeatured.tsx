import { graphql, useStaticQuery } from 'gatsby'

const useHomeFeatured = () => {
	const data = useStaticQuery(graphql`
		{
			allStoriesJson(filter: { featuredIn: { in: "home" } }) {
				edges {
					node {
						slug
						title
						sections
						featuredSize
						img {
							src
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

export default useHomeFeatured
