import { graphql, useStaticQuery } from 'gatsby'

import { Page } from './types'

const useAuthorPages = (): Page[] => {
	const data = useStaticQuery(graphql`
		query {
			allAuthorsJson {
				edges {
					node {
						slug
						name
					}
				}
			}
		}
	`)

	return data.allAuthorsJson.edges.map((edge) => {
		const page = edge.node

		return {
			slug: page.slug,
			title: page.name,
			path: `/author/${page.slug}`,
		}
	})
}

export default useAuthorPages
