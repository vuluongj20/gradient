import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const usePoliciesPages = (): Page[] => {
	const data = useStaticQuery<Queries.AllPoliciesJsonQuery>(graphql`
		query AllPoliciesJson {
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
		const page = edge.node as Page

		return {
			slug: page.slug,
			title: page.title,
			path: `/policies/${page.slug}`,
		}
	})
}

export default usePoliciesPages
