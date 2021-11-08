import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useArchivePage = (): Page => {
	const data = useStaticQuery(graphql`
		query {
			allArchiveJson {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	`)

	const edge = data.allArchiveJson.edges[0].node
	return {
		slug: edge.slug,
		title: edge.title,
		path: `/${edge.slug}`,
	}
}

export default useArchivePage
