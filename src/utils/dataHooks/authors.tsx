import { graphql, useStaticQuery } from 'gatsby'

import { Author } from '@types'

const useAuthorPages = (): Author[] => {
	const data = useStaticQuery<Queries.AllAuthorsJsonQuery>(graphql`
		query AllAuthorsJson {
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
		const author = edge.node as Author

		return {
			...author,
			path: `/author/${author.slug}`,
		}
	})
}

export default useAuthorPages
