import { graphql } from 'gatsby'
import { useState, useEffect } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import Card from '@components/card'
import FilterBar, { FilterProps } from '@components/filterBar'
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
	const filters = [
		...(showSectionFilters
			? [
					{
						id: 'section',
						label: 'Filter section',
						defaultValue: 'all',
						options: [
							{ value: 'all', label: 'All sections', selected: true },
							...sections.map((s) => ({ value: s.slug, label: s.name })),
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
	] as FilterProps[]
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedSection, selectedAuthor])

	return (
		<Page>
			<SEO title={pageContext.title} />
			<PageContent>
				<Header>
					<Title>{pageContext.title}</Title>
				</Header>
				<FilterBar filters={filters} onChange={onChange} />
				<SwitchTransition>
					<CSSTransition
						timeout={{
							enter: 500,
							exit: 375,
						}}
						key={`${selectedSection}-${selectedAuthor}`}
					>
						<Results>
							{filteredStories.map((story) => (
								<Card
									key={story.slug}
									path={`/story/${story.slug}`}
									{...story}
									rowLayout
								/>
							))}
						</Results>
					</CSSTransition>
				</SwitchTransition>
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
						src {
							childImageSharp {
								gatsbyImageData(layout: FULL_WIDTH)
							}
						}
					}
				}
			}
		}
	}
`

export default StoryGroupPage

const PageContent = styled.div`
	${(p) => p.theme.utils.space.paddingTop[6]};
`

const Header = styled.header`
	${(p) => p.theme.utils.space.paddingHorizontal};
	${(p) => p.theme.utils.space.marginBottom[4]};
`

const Title = styled.h1`
	grid-column: 1 / -1;
`

const Results = styled(Grid)`
	margin-top: ${(p) => p.theme.space[1]};
	grid-row-gap: ${(p) => p.theme.space[3]};

	&.enter {
		opacity: 0%;
	}
	&.enter-active,
	&.enter-done {
		transition: opacity ${(p) => p.theme.animation.mediumOut};
		opacity: 100%;
	}
	&.exit-active {
		transition: opacity 0.375s ${(p) => p.theme.animation.inOutQuart};
		opacity: 0%;
	}
`
