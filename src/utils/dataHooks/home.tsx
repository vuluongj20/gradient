import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useHomePage = (): Page => {
	const data = useStaticQuery<Queries.AllHomeJsonQuery>(graphql`
		query AllHomeJson {
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

	const page = data.allHomeJson.edges[0].node as Page
	return {
		slug: page.slug,
		title: page.title,
		path: `/${page.slug}`,
	}
}

export default useHomePage
