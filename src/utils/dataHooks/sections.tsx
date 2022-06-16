import { graphql, useStaticQuery } from 'gatsby'

import { Section } from '@types'

const useSections = (): Section[] => {
	const data = useStaticQuery<Queries.AllSectionsJsonQuery>(graphql`
		query AllSectionsJson {
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
		const section = edge.node as Section

		return {
			...section,
			path: `/section/${section.slug}`,
		}
	})
}

export default useSections
