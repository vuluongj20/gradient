import styled from 'styled-components'

import { sections, writers, other, policies, Page } from '@data/siteStructure'

import Grid from '@components/grid'

const Footer = (): JSX.Element => {
	const mapSiteLinks = (pages: Page[], Link) =>
		pages.map((page) => (
			<Link key={page.id} href={page.path}>
				{page.title}
			</Link>
		))

	return (
		<Wrap>
			<SiteMap>
				<DummyCol />
				<Column>
					<ColLabel>Sections</ColLabel>
					{mapSiteLinks(sections, ColLink)}
				</Column>
				<Column>
					<ColLabel>Writers</ColLabel>
					{mapSiteLinks(writers, ColLink)}
				</Column>
				<Column>
					<ColLabel>More</ColLabel>
					{mapSiteLinks(other, ColLink)}
				</Column>
			</SiteMap>
			<Grid>
				<DisclosuresDivider />
			</Grid>
			<Policies>
				<DummyCol />
				<PolicyText>© {new Date().getFullYear()} Gradient</PolicyText>
				{mapSiteLinks(policies, PolicyLink)}
			</Policies>
		</Wrap>
	)
}

export default Footer

const Wrap = styled.footer`
	padding-top: ${(p) => p.theme.s[5]};
	background: ${(p) => p.theme.c.background};
`

const DummyCol = styled.div`
	grid-column-end: span 1;

	${(p) => p.theme.u.media.s} {
		display: none;
	}
`

const Link = styled.a`
	color: ${(p) => p.theme.c.heading};

	&:hover {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.c.label};
	}
`

const SiteMap = styled(Grid)`
	padding-bottom: ${(p) => p.theme.s[5]};
	justify-items: start;
`

const Column = styled.div`
	grid-column-end: span 2;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	${(p) => p.theme.u.media.s} {
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
	grid-column: 2 / -2;
	margin-bottom: ${(p) => p.theme.s[2]};

	${(p) => p.theme.u.media.s} {
		grid-column: 1 / -1;
	}
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
	grid-column-end: span 1;
`
