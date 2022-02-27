import styled from 'styled-components'

import TransitionLink from './transitionLink'

import Grid from '@components/grid'

import { Page } from '@types'

import useArchivePage from '@utils/dataHooks/archive'
import useAuthorPages from '@utils/dataHooks/authors'
import usePoliciesPages from '@utils/dataHooks/policies'
import useSections from '@utils/dataHooks/sections'
import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	inset?: boolean
	inverted?: boolean
}

const Footer = ({ inset = false, inverted = false }: Props): JSX.Element => {
	const sections = useSections()
	const sectionPages = sections.map((section) => ({
		slug: section.slug,
		path: section.path,
		title: section.name,
		type: 'section',
	}))
	const authorPages = useAuthorPages()
	const archivePage = useArchivePage()
	const policiesPages = usePoliciesPages()

	const mapSiteLinks = (pages: Page[], OuterWrap, LinkWrap) => (
		<OuterWrap>
			{pages.map((page) => {
				return (
					<LinkWrap key={page.slug}>
						<StyledLink to={page.path}>{page.title}</StyledLink>
					</LinkWrap>
				)
			})}
		</OuterWrap>
	)

	return (
		<LocalThemeProvider inverted={inverted} inset={inset}>
			<Wrap>
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
				</SiteMap>
				<Grid>
					<DisclosuresDivider />
				</Grid>
				<Policies>
					<PolicyText aria-hidden="true">Gradient</PolicyText>
					{mapSiteLinks(policiesPages, PolicyContent, PolicyLink)}
				</Policies>
			</Wrap>
		</LocalThemeProvider>
	)
}

export default Footer

const Wrap = styled.footer`
	background: ${(p) => p.theme.background};
`

const Link = styled(TransitionLink)`
	color: ${(p) => p.theme.heading};

	&:hover {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.label};
	}
`

const SiteMap = styled(Grid)`
	justify-items: start;
	${(p) => p.theme.utils.space.paddingVertical[4]};
`

const Column = styled.div`
	grid-column-end: span 2;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	${(p) => p.theme.utils.media.xs} {
		&:not(:last-child) {
			margin-bottom: ${(p) => p.theme.space[4]};
		}
	}
`

const ColLabel = styled.label`
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.label};

	margin-bottom: ${(p) => p.theme.space[1]};
`

const ColContent = styled.ul``

const ColLink = styled.li`
	margin-bottom: ${(p) => p.theme.space[0]};

	&:last-of-type {
		margin-bottom: 0;
	}
`

const DisclosuresDivider = styled.hr`
	grid-column: 1 / -1;
	border-bottom-width: 1px;
	margin: 0;
`

const Policies = styled(Grid)`
	padding-top: ${(p) => p.theme.space[2]};
	padding-bottom: calc(${(p) => p.theme.space[2]} + var(--sab, 0));
	justify-items: start;
`

const PolicyText = styled.p`
	grid-column-end: span 2;
	color: ${(p) => p.theme.label};

	${(p) => p.theme.utils.media.xs} {
		grid-column-end: span 4;
		margin-bottom: ${(p) => p.theme.space[1]};
	}
`

const PolicyContent = styled.ul`
	display: contents;
`

const PolicyLink = styled.li`
	grid-column-end: span 2;
`

const StyledLink = styled(Link)`
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}

	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space[1]};
	}
`
