import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useArchivePage = (): Page => {
	const data = useStaticQuery<Queries.AllArchiveJsonQuery>(graphql`
		query AllArchiveJson {
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

	const page = data.allArchiveJson.edges[0].node as Page
	return {
		slug: page.slug,
		title: page.title,
		path: `/${page.slug}`,
	}
}

export default useArchivePage
