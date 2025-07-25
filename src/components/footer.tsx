// import { ElementType } from 'react'
import styled from 'styled-components'

import Divider from '@components/divider'
import Grid from '@components/grid'

// import {Link} from 'gatsby'
// import { Page } from '@types'
// import useAuthors from '@utils/data/authors'
// import useArchivePage from '@utils/data/pages/archive'
// import usePoliciesPages from '@utils/data/policies'
// import useSections from '@utils/data/sections'

const Footer = () => {
	// const sections = useSections()
	// const sectionPages = sections.map((section) => ({
	// 	slug: section.slug,
	// 	path: section.path,
	// 	title: section.name,
	// 	type: 'section',
	// }))
	// const authors = useAuthors()
	// const authorPages = authors.map((author) => ({
	// 	slug: author.slug,
	// 	path: author.path,
	// 	title: author.name,
	// 	type: 'author',
	// }))
	// const archivePage = useArchivePage()
	// const policiesPages = usePoliciesPages()

	// const mapSiteLinks = (pages: Page[], OuterWrap: ElementType, LinkWrap: ElementType) => (
	// 	<OuterWrap>
	// 		{pages.map((page) => {
	// 			return (
	// 				<LinkWrap key={page.slug}>
	// 					<StyledLink to={page.path}>{page.title}</StyledLink>
	// 				</LinkWrap>
	// 			)
	// 		})}
	// 	</OuterWrap>
	// )

	return (
		<Wrap>
			{/*<Grid>
					<StyledDivider />
				</Grid>
				<SiteMap as="nav">
					<Column>
						<ColLabel>Sections</ColLabel>
						{mapSiteLinks(sectionPages, ColContent, ColLink)}
					</Column>
					<Column>
						<ColLabel>Authors</ColLabel>
						{mapSiteLinks(authorPages, ColContent, ColLink)}
					</Column>
					<Column>
						<ColLabel>More</ColLabel>
						{mapSiteLinks([archivePage], ColContent, ColLink)}
					</Column>
				</SiteMap>*/}
			<Grid>
				<StyledDivider />
			</Grid>
			<Policies>
				<PolicyText aria-hidden="true">© Gradient {new Date().getFullYear()}</PolicyText>
				{/*{mapSiteLinks(policiesPages, PolicyContent, PolicyLink)}*/}
			</Policies>
		</Wrap>
	)
}

export default Footer

const Wrap = styled.footer`
	margin-top: var(--adaptive-space-7);
`

// const SiteMap = styled(Grid)`
// 	justify-items: start;
// 	padding-top: var(--adaptive-space-4);
//  padding-bottom: var(--adaptive-space-4);
// `

// const Column = styled.div`
// 	grid-column-end: span 2;

// 	display: flex;
// 	flex-direction: column;
// 	align-items: flex-start;

// 	${(p) => p.theme.breakpoints.xs} {
// 		&:not(:last-child) {
// 			margin-bottom: var(--space-4);
// 		}
// 	}
// `

// const ColLabel = styled.label`
// 	${(p) => p.theme.text.label};
// 	color: var(--color-label);

// 	margin-bottom: var(--space-1);
// `

// const ColContent = styled.ul``

// const ColLink = styled.li`
// 	margin-bottom: var(--space-0);

// 	&:last-of-type {
// 		margin-bottom: 0;
// 	}
// `

const StyledDivider = styled(Divider)`
	grid-column: 1 / -1;
`

const Policies = styled(Grid)`
	padding-top: var(--space-2);
	padding-bottom: calc(var(--space-2) + var(--sab, 0));
	justify-items: start;
`

const PolicyText = styled.p`
	grid-column-end: span 2;
	color: var(--color-label);

	${(p) => p.theme.breakpoints.xs} {
		grid-column-end: span 4;
		margin-bottom: var(--space-1);
	}
`

// const PolicyContent = styled.ul`
// 	display: contents;
// `

// const PolicyLink = styled.li`
// 	grid-column-end: span 2;
// `

// const StyledLink = styled(Link)`
// 	color: var(--color-label);
// 	&:hover {
// 		color: var(--color-body);
// 	}

// 	&:not(:last-child) {
// 		margin-bottom: var(--space-1);
// 	}
// `
