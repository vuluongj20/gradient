import { graphql } from 'gatsby'
import { useMemo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import Card from '@components/card'
import FilterBar, { FilterProps } from '@components/filterBar'
import Grid from '@components/grid'
import Page from '@components/page'
import SEO, { SEOProps } from '@components/seo'

import { Story } from '@types'

import useAuthors from '@utils/data/authors'
import useSections from '@utils/data/sections'

interface StoryGroupPageProps {
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

const StoryGroupPage = ({ pageContext, data }: StoryGroupPageProps) => {
	const stories = data.allStoriesJson.edges.map((edge) => {
		const story = edge.node
		return { ...story, path: `/story/${story.slug}` }
	})

	const sections = useSections()
	const authors = useAuthors()
	const showSectionFilters = !pageContext.filter?.sections
	const showAuthorFilters = !pageContext.filter?.authors
	const filters = [
		...(showSectionFilters
			? [
					{
						name: 'section',
						'aria-label': 'Section',
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
						name: 'author',
						'aria-label': 'Author',
						defaultValue: 'all',
						options: [
							{ value: 'all', label: 'All authors', selected: true },
							...authors.map((a) => ({ value: a.slug, label: a.name })),
						],
					},
			  ]
			: []),
	] as FilterProps[]
	const [selectedSection, setSelectedSection] = useState('all')
	const [selectedAuthor, setSelectedAuthor] = useState('all')
	const onChange = (filterName: string, value: string) => {
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

	const filteredStories = useMemo(
		() =>
			stories
				.filter((s) => selectedSection === 'all' || s.sections.includes(selectedSection))
				.filter((s) => selectedAuthor === 'all' || s.authors.includes(selectedAuthor)),
		[stories, selectedSection, selectedAuthor],
	)

	return (
		<Page>
			<PageContent>
				<Header>
					<Title>{pageContext.title}</Title>
				</Header>
				<FilterBar filters={filters} onChange={onChange} aria-label="Filters" />
				<SwitchTransition>
					<CSSTransition
						timeout={{ enter: 250, exit: 0 }}
						key={filteredStories.map((s) => s.slug).join('')}
						appear
					>
						<Results>
							{filteredStories.map((story) => (
								<Card key={story.slug} rowLayout {...story} />
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
`

export default StoryGroupPage

interface HeadProps {
	pageContext: SEOProps
}

export const Head = ({ pageContext }: HeadProps) => <SEO {...pageContext} />

const PageContent = styled.div`
	padding-top: var(--adaptive-space-6);
`

const Header = styled.header`
	padding-left: var(--page-margin-left);
	padding-right: var(--page-margin-right);
	margin-bottom: var(--adaptive-space-4);
`

const Title = styled.h1`
	grid-column: 1 / -1;
`

const Results = styled(Grid)`
	margin-top: var(--space-1);
	grid-row-gap: var(--space-3);

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-fast-out);
`
