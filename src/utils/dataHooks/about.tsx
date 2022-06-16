import { graphql, useStaticQuery } from 'gatsby'

import { Page } from '@types'

const useAboutPage = (): Page => {
	const data = useStaticQuery<Queries.AllAboutJsonQuery>(graphql`
		query AllAboutJson {
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

	const page = data.allAboutJson.edges[0].node as Page
	return {
		slug: page.slug,
		title: page.title,
		path: `/${page.slug}`,
	}
}

export default useAboutPage
