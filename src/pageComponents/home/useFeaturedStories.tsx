import { graphql, useStaticQuery } from 'gatsby'

import { Story } from '@types'

const useFeaturedStories = (): Story[] => {
	const data = useStaticQuery(graphql`
		{
			allStoriesJson(filter: { featuredIn: { ne: null } }) {
				edges {
					node {
						slug
						title
						sections
						featuredIn
						featuredSize
						img {
							src {
								childImageSharp {
									gatsbyImageData(layout: FULL_WIDTH)
								}
							}
							alt
							aspectRatio
						}
					}
				}
			}
		}
	`)

	return data.allStoriesJson.edges.map((edge) => {
		const story = edge.node
		return { ...story, path: `/story/${story.slug}` }
	})
}

export default useFeaturedStories
