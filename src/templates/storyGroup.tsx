import { graphql } from 'gatsby'
import styled from 'styled-components'

import Card from '@components/card'
import Grid from '@components/grid'
import Page from '@components/page'
import SEO from '@components/seo'

import { Story } from '@types'

type Props = {
	pageContext: {
		title: string
		section?: string
		author?: string
	}
	data: {
		allStoriesJson: {
			edges: [
				{
					node: Story
				},
			]
		}
	}
}

const StoryGroupPage = ({ pageContext, data }: Props) => {
	const stories = data.allStoriesJson.edges.map((edge) => edge.node)

	return (
		<Page>
			<SEO title={pageContext.title} />
			<PageContent>
				<Grid>
					<h1>{pageContext.title}</h1>
				</Grid>
				<Results>
					{stories.map((story) => (
						<Card key={story.slug} path={`/story/${story.slug}`} {...story} rowLayout />
					))}
				</Results>
			</PageContent>
		</Page>
	)
}

export const query = graphql`
	query ($filter: StoriesJsonFilterInput) {
		allStoriesJson(filter: $filter) {
			edges {
				node {
					slug
					title
					sections
					authors
					img {
						alt
						src
					}
				}
			}
		}
	}
`

export default StoryGroupPage

const PageContent = styled.div`
	grid-column: 1 / -1;
	padding-top: ${(p) => p.theme.s[6]};
`

const Results = styled.div`
	margin-top: ${(p) => p.theme.s[4]};
`
