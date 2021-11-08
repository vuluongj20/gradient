import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import Grid from '@components/grid'

import useArchivePage from '@utils/dataHooks/archive'
import useAuthorPages from '@utils/dataHooks/authors'
import usePoliciesPages from '@utils/dataHooks/policies'
import useSectionPages from '@utils/dataHooks/sections'
import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	overlay?: boolean
	inverted?: boolean
}

const Footer = ({ overlay = false, inverted = false }: Props): JSX.Element => {
	const location = useLocation()
	const sectionPages = useSectionPages()
	const authorPages = useAuthorPages()
	const archivePage = useArchivePage()
	const policiesPages = usePoliciesPages()

	const mapSiteLinks = (pages: Page[], Link) =>
		pages.map((page) => {
			const disabled = location.pathname.startsWith(page.path)
			return (
				<Link key={page.slug} to={page.path} disabled={disabled}>
					{page.title}
				</Link>
			)
		})

	const footer = (
		<Wrap overlay={overlay}>
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
	)

	if (inverted) {
		return <LocalThemeProvider appearance="inverted">{footer}</LocalThemeProvider>
	}

	return footer
}

export default Footer

const Wrap = styled.footer<{ overlay: boolean }>`
	background: ${(p) => (p.overlay ? p.theme.c.oBackground : p.theme.c.background)};
`

const Link = styled(TransitionLink)`
	color: ${(p) => p.theme.c.heading};

	&:hover {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.c.label};
	}
`

const SiteMap = styled(Grid)`
	justify-items: start;
	${(p) => p.theme.u.spacing.paddingVertical[4]};
`

const Column = styled.div`
	grid-column-end: span 2;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	${(p) => p.theme.u.media.xs} {
		&:not(:last-child) {
			margin-bottom: ${(p) => p.theme.s[4]};
		}
	}
`

const ColLabel = styled.p`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.label};

	margin-bottom: ${(p) => p.theme.s[1]};
`

const ColLink = styled(Link)`
	text-decoration: none;

	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.s[1]};
	}
`

const DisclosuresDivider = styled.hr`
	grid-column: 1 / -1;
	border-bottom-width: 1px;
	margin: 0;
`

const Policies = styled(Grid)`
	padding-top: ${(p) => p.theme.s[2]};
	padding-bottom: ${(p) => p.theme.s[2]};
	justify-items: start;
`

const PolicyText = styled.p`
	grid-column-end: span 2;
	color: ${(p) => p.theme.c.label};

	${(p) => p.theme.u.media.xs} {
		grid-column-end: span 4;
		margin-bottom: ${(p) => p.theme.s[1]};
	}
`

const PolicyLink = styled(Link)`
	grid-column-end: span 2;
`
