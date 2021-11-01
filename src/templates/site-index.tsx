import { graphql } from 'gatsby'
import styled from 'styled-components'

import Grid from '@components/grid'
import Page from '@components/page'

import { Article } from '@types'

type Props = {
	pageContext: {
		title: string
		section?: string
		author?: string
	}
	data: {
		allArticlesJson: {
			edges: [
				{
					node: Article
				},
			]
		}
	}
}

const SiteIndexPage = ({ pageContext }: Props) => {
	return (
		<Page>
			<Grid>
				<PageContent>
					<h1>{pageContext.title}</h1>
				</PageContent>
			</Grid>
		</Page>
	)
}

export const query = graphql`
	query ($filter: ArticlesJsonFilterInput) {
		allArticlesJson(filter: $filter) {
			edges {
				node {
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

export default SiteIndexPage

const PageContent = styled.div`
	grid-column: 1 / -1;
	padding-top: ${(p) => p.theme.s[6]};
`
