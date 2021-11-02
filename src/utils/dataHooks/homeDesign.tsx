import { graphql, useStaticQuery } from 'gatsby'

const useHomeDesign = () => {
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
							src
							alt
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

export default useHomeDesign
