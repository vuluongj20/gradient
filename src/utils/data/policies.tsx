import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

interface PolicyMDX {
	frontmatter: {
		slug: string
		title: string
	}
}

const usePoliciesPages = (): Page[] => {
	const data = useStaticQuery<Queries.AllMdxPoliciesQuery>(graphql`
		query AllMdxPolicies {
			allMdx(filter: { internal: { contentFilePath: { regex: "/pages/policies/" } } }) {
				nodes {
					frontmatter {
						slug
						title
					}
				}
			}
		}
	`)

	return data.allMdx.nodes.map((node) => {
		const page = node as PolicyMDX
		return {
			slug: page.frontmatter.slug,
			title: page.frontmatter.title,
			path: `/policies/${page.frontmatter.slug}`,
		}
	})
}

export default usePoliciesPages
