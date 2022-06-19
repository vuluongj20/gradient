import { graphql, useStaticQuery } from 'gatsby'

import { Author } from '@types'

export const authorFragment = graphql`
	fragment Author on AuthorsJson {
		slug
		name
	}
`

const useAuthorPages = (): Author[] => {
	const data = useStaticQuery<Queries.AllAuthorsJsonQuery>(graphql`
		query AllAuthorsJson {
			allAuthorsJson {
				edges {
					node {
						...Author
					}
				}
			}
		}
	`)

	return data.allAuthorsJson.edges.map((edge) => {
		const author = edge.node as Omit<Author, 'path'>

		return {
			...author,
			path: `/author/${author.slug}`,
		}
	})
}

export default useAuthorPages
