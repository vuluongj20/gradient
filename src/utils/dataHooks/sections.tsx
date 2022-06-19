import { graphql, useStaticQuery } from 'gatsby'

import { Section } from '@types'

export const sectionFragment = graphql`
	fragment Section on SectionsJson {
		slug
		name
	}
`

const useSections = (): Section[] => {
	const data = useStaticQuery<Queries.AllSectionsJsonQuery>(graphql`
		query AllSectionsJson {
			allSectionsJson {
				edges {
					node {
						...Section
					}
				}
			}
		}
	`)

	return data.allSectionsJson.edges.map((edge) => {
		const section = edge.node as Omit<Section, 'path'>

		return {
			...section,
			path: `/section/${section.slug}`,
		}
	})
}

export default useSections
