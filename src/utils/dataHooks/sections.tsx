import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useSectionPages = (): Page[] => {
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
			slug: page.slug,
			title: page.name,
			path: `/section/${page.slug}`,
		}
	})
}

export default useSectionPages
