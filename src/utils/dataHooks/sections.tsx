import { graphql, useStaticQuery } from 'gatsby'

import { Section } from '@types'

const useSections = (): Section[] => {
	const data = useStaticQuery(graphql`
		query {
			allSectionsJson {
				edges {
					node {
						slug
						name
					}
				}
			}
		}
	`)

	return data.allSectionsJson.edges.map((edge) => {
		const page = edge.node

		return {
			...page,
			path: `/section/${page.slug}`,
		}
	})
}

export default useSections
