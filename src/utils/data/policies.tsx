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
				nodes {
					slug
					frontmatter {
						title
					}
				}
			}
		}
	`)

	return data.allMdx.nodes.map((node) => {
		const page = node as PolicyMDX
		return {
			slug: page.slug,
			title: page.frontmatter.title,
			path: `/policies/${page.slug}`,
		}
	})
}

export default usePoliciesPages
