import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import authorIndices from '@data/pages/authorIndices'
import other from '@data/pages/other'
import policies from '@data/pages/policies'
import sectionIndices from '@data/pages/sectionIndices'
import siteIndex from '@data/pages/siteIndex'

import Grid from '@components/grid'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	overlay?: boolean
	inverted?: boolean
}

const Footer = ({ overlay = false, inverted = false }: Props): JSX.Element => {
	const location = useLocation()

	const mapSiteLinks = (pages: Page[], Link) =>
		pages.map((page) => {
			const disabled = location.pathname.startsWith(page.path)
			return (
				<Link key={page.id} to={page.path} disabled={disabled}>
					{page.name}
				</Link>
			)
		})

	const footer = (
		<Wrap overlay={overlay}>
			<SiteMap>
				<Column>
					<ColLabel>Sections</ColLabel>
					{mapSiteLinks(sectionIndices, ColLink)}
				</Column>
				<Column>
					<ColLabel>Authors</ColLabel>
					{mapSiteLinks(authorIndices, ColLink)}
				</Column>
				<Column>
					<ColLabel>More</ColLabel>
					{mapSiteLinks([siteIndex, ...other], ColLink)}
				</Column>
			</SiteMap>
			<Grid>
				<DisclosuresDivider />
			</Grid>
			<Policies>
				<PolicyText>© {new Date().getFullYear()} Gradient</PolicyText>
				{mapSiteLinks(policies, PolicyLink)}
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
	padding-bottom: ${(p) => p.theme.s[4]};
	justify-items: start;

	${(p) => p.theme.u.media.m} {
		padding-bottom: ${(p) => p.theme.s[3]};
	}
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
	text-transform: uppercase;
	color: ${(p) => p.theme.c.label};

	margin-bottom: ${(p) => p.theme.s[2]};
`

const ColLink = styled(Link)`
	text-decoration: none;

	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.s[1]};
	}
`

const DisclosuresDivider = styled.hr`
	grid-column: 1 / -1;
	margin-bottom: ${(p) => p.theme.s[2]};
	border-bottom-width: 1px;
`

const Policies = styled(Grid)`
	padding-bottom: ${(p) => p.theme.s[3]};
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
