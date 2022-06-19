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
				nodes {
					...Author
				}
			}
		}
	`)

	return data.allAuthorsJson.nodes.map((node) => {
		const author = node as Omit<Author, 'path'>
		return {
			...author,
			path: `/author/${author.slug}`,
		}
	})
}

export default useAuthorPages
