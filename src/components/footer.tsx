import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import { ThemeSettings } from '@theme'

import Grid from '@components/grid'

import { Page } from '@types'

import useArchivePage from '@utils/dataHooks/archive'
import useAuthorPages from '@utils/dataHooks/authors'
import usePoliciesPages from '@utils/dataHooks/policies'
import useSections from '@utils/dataHooks/sections'
import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	elevation?: ThemeSettings['color']['elevation']
	inverted?: boolean
}

const Footer = ({ elevation = 'default', inverted = false }: Props): JSX.Element => {
	const location = useLocation()
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

	const mapSiteLinks = (pages: Page[], Wrap) =>
		pages.map((page) => {
			const disabled = location.pathname.startsWith(page.path)
			return (
				<Wrap key={page.slug}>
					<StyledLink to={page.path} disabled={disabled}>
						{page.title}
					</StyledLink>
				</Wrap>
			)
		})

	return (
		<LocalThemeProvider appearance={inverted ? 'inverted' : null} elevation={elevation}>
			<Wrap>
				<SiteMap>
					<Column>
						<ColLabel>Sections</ColLabel>
						{mapSiteLinks(sectionPages, ColLink)}
					</Column>
					<Column>
						<ColLabel>Authors</ColLabel>
						{mapSiteLinks(authorPages, ColLink)}
					</Column>
					<Column>
						<ColLabel>More</ColLabel>
						{mapSiteLinks([archivePage], ColLink)}
					</Column>
				</SiteMap>
				<Grid>
					<DisclosuresDivider />
				</Grid>
				<Policies>
					<PolicyText>Gradient</PolicyText>
					{mapSiteLinks(policiesPages, PolicyLink)}
				</Policies>
			</Wrap>
		</LocalThemeProvider>
	)
}

export default Footer

const Wrap = styled.footer`
	background: ${(p) => p.theme.colors.background};
`

const Link = styled(TransitionLink)`
	color: ${(p) => p.theme.colors.heading};

	&:hover {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.colors.label};
	}
`

const SiteMap = styled(Grid)`
	justify-items: start;
	${(p) => p.theme.utils.space.paddingVertical[4]};
`

const Column = styled.ul`
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

const ColLabel = styled.p`
	${(p) => p.theme.text.ui.label};
	color: ${(p) => p.theme.colors.label};

	margin-bottom: ${(p) => p.theme.space[1]};
`

const ColLink = styled.li`
	margin-bottom: ${(p) => p.theme.space[0]};
`

const DisclosuresDivider = styled.hr`
	grid-column: 1 / -1;
	border-bottom-width: 1px;
	margin: 0;
`

const Policies = styled(Grid)`
	padding-top: ${(p) => p.theme.space[2]};
	padding-bottom: ${(p) => p.theme.space[2]};
	justify-items: start;
`

const PolicyText = styled.p`
	grid-column-end: span 2;
	color: ${(p) => p.theme.colors.label};

	${(p) => p.theme.utils.media.xs} {
		grid-column-end: span 4;
		margin-bottom: ${(p) => p.theme.space[1]};
	}
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
