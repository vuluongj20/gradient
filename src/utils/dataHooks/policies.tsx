import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const usePoliciesPages = (): Page[] => {
	const data = useStaticQuery(graphql`
		query {
			allPoliciesJson {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)

	return data.allPoliciesJson.edges.map((edge) => {
		const page = edge.node

		return {
			slug: page.slug,
			title: page.title,
			path: `/policies/${page.slug}`,
		}
	})
}

export default usePoliciesPages
