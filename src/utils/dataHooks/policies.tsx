import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

type PolicyMDX = {
	slug: string
	frontmatter: {
		title: string
	}
}

const usePoliciesPages = (): Page[] => {
	const data = useStaticQuery<Queries.AllMdxPoliciesQuery>(graphql`
		query AllMdxPolicies {
			allMdx(filter: { fileAbsolutePath: { regex: "/pages/policies/" } }) {
				edges {
					node {
						slug
						frontmatter {
							title
						}
					}
				}
			}
		}
	`)

	return data.allMdx.edges.map((edge) => {
		const page = edge.node as PolicyMDX

		return {
			slug: page.slug,
			title: page.frontmatter.title,
			path: `/policies/${page.slug}`,
		}
	})
}

export default usePoliciesPages
