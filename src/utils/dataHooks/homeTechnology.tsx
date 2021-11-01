import { graphql, useStaticQuery } from 'gatsby'

const useHomeTechnology = () => {
	const data = useStaticQuery(graphql`
		{
			allArticlesJson(filter: { featuredIn: { in: "home-technology" } }) {
				edges {
					node {
						slug
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

export default useHomeTechnology
