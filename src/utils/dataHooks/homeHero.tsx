import { graphql, useStaticQuery } from 'gatsby'

const useHomeHero = () => {
	const data = useStaticQuery(graphql`
		query {
			allHomeHeroJson {
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

	return data.allHomeHeroJson.edges.map((edge) => edge.node)
}

export default useHomeHero
