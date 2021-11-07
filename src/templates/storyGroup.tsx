import { graphql } from 'gatsby'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import Card from '@components/card'
import FilterBar from '@components/filterBar'
import { FilterProps } from '@components/filterBar/filter'
import Grid from '@components/grid'
import Page from '@components/page'
import SEO from '@components/seo'

import { Story } from '@types'

import useAuthors from '@utils/dataHooks/authors'
import useSections from '@utils/dataHooks/sections'

type Props = {
	pageContext: {
		title: string
		section?: string
		author?: string
		filter?: {
			sections?: { in: string }
			authors?: { in: string }
		}
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

	const sections = useSections()
	const authors = useAuthors()
	const showSectionFilters = !pageContext.filter?.sections
	const showAuthorFilters = !pageContext.filter?.authors
	const filters: FilterProps[] = [
		...(showSectionFilters
			? [
					{
						id: 'section',
						label: 'Filter section',
						defaultValue: 'all',
						options: [
							{ value: 'all', label: 'All sections', selected: true },
							...sections.map((s) => ({ value: s.slug, label: s.title })),
						],
					},
			  ]
			: []),
		...(showAuthorFilters
			? [
					{
						id: 'author',
						label: 'Filter author',
						defaultValue: 'all',
						options: [
							{ value: 'all', label: 'All authors', selected: true },
							...authors.map((a) => ({ value: a.slug, label: a.title })),
						],
					},
			  ]
			: []),
	]
	const [selectedSection, setSelectedSection] = useState('all')
	const [selectedAuthor, setSelectedAuthor] = useState('all')
	const onChange = (filterName, value) => {
		switch (filterName) {
			case 'section':
				setSelectedSection(value)
				break
			case 'author':
				setSelectedAuthor(value)
				break
			default:
				break
		}
	}
	const [filteredStories, setFilteredStories] = useState(stories)
	useEffect(() => {
		const result = stories
			.filter((s) => selectedSection === 'all' || s.sections.includes(selectedSection))
			.filter((s) => selectedAuthor === 'all' || s.authors.includes(selectedAuthor))
		setFilteredStories(result)
	}, [selectedSection, selectedAuthor])

	return (
		<Page>
			<SEO title={pageContext.title} />
			<PageContent>
				<Header>
					<Title>{pageContext.title}</Title>
				</Header>
				<FilterBar filters={filters} onChange={onChange} />
				<Results>
					{filteredStories.map((story) => (
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

const Header = styled(Grid)`
	margin-bottom: ${(p) => p.theme.s[4]};
`

const Title = styled.h1`
	grid-column: 1 / -1;
`

const Results = styled(Grid)`
	margin-top: ${(p) => p.theme.s[1]};
	grid-row-gap: ${(p) => p.theme.s[2]};
`
