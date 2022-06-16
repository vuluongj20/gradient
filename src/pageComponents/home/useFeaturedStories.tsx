import { graphql, useStaticQuery } from 'gatsby'

import { Story } from '@types'

const useFeaturedStories = (): Story[] => {
	const data = useStaticQuery<Queries.AllFeaturedStoriesQuery>(graphql`
		query AllFeaturedStories {
			allStoriesJson(filter: { featuredIn: { ne: null } }) {
				edges {
					node {
						slug
						title
						sections
						featuredIn
						featuredSize
						authors
						cover {
							image {
								childImageSharp {
									gatsbyImageData(layout: FULL_WIDTH)
								}
							}
							alt
						}
					}
				}
			}
		}
	`)

	return data.allStoriesJson.edges.map((edge) => {
		const story = edge.node as Story
		return { ...story, path: `/story/${story.slug}` }
	})
}

export default useFeaturedStories
