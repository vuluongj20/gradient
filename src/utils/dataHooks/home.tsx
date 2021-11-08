import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useHomePage = (): Page => {
	const data = useStaticQuery(graphql`
		query {
			allHomeJson {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)

	const edge = data.allHomeJson.edges[0].node
	return {
		slug: edge.slug,
		title: edge.title,
		path: `/${edge.slug}`,
	}
}

export default useHomePage
