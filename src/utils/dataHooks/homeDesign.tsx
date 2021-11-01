import { graphql, useStaticQuery } from 'gatsby'

const useHomeDesign = () => {
	const data = useStaticQuery(graphql`
		{
			allArticlesJson(filter: { featuredIn: { in: "home-design" } }) {
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

	return data.allArticlesJson.edges.map((edge) => {
		const article = edge.node
		return { ...article, path: `/article/${article.slug}` }
	})
}

export default useHomeDesign
