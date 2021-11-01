import { graphql, useStaticQuery } from 'gatsby'

const useHomeFeatured = () => {
	const data = useStaticQuery(graphql`
		query {
			allHomeFeaturedJson {
				edges {
					node {
						slug
						to
						size
						img {
							src
							alt
						}
					}
				}
			}
		}
	`)

	return data.allHomeFeaturedJson.edges.map((edge) => edge.node)
}

export default useHomeFeatured
