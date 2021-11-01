import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useIndexPage = (): Page => {
	const data = useStaticQuery(graphql`
		query {
			allIndexJson {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)

	const edge = data.allIndexJson.edges[0].node
	return {
		slug: edge.slug,
		title: edge.title,
		path: `/${edge.slug}`,
	}
}

export default useIndexPage
