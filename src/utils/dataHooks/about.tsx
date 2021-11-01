import { graphql, useStaticQuery } from 'gatsby'

import { Page } from './types'

const useAboutPage = (): Page => {
	const data = useStaticQuery(graphql`
		query {
			allAboutJson {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)

	const edge = data.allAboutJson.edges[0].node

	return {
		slug: edge.slug,
		title: edge.title,
		path: `/${edge.slug}`,
	}
}

export default useAboutPage
