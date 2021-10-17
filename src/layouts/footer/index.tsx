import styled from 'styled-components'

import { sections, writers, other, policies, Page } from '@data/siteStructure'

import Grid from '@components/grid'

import { theme } from '@utils/styling'

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
	padding-top: ${theme('s[5]')};
	background: ${theme('c.background')};
`

const DummyCol = styled.div`
	grid-column-end: span 1;

	@media only screen and (max-width: ${theme('b.s')}) {
		display: none;
	}
`

const Link = styled.a`
	color: ${theme('c.heading')};

	&:hover {
		text-decoration: underline;
		text-decoration-color: ${theme('c.label')};
	}
`

const SiteMap = styled(Grid)`
	padding-bottom: ${theme('s[5]')};
	justify-items: start;
`

const Column = styled.div`
	grid-column-end: span 2;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media only screen and (max-width: ${theme('b.s')}) {
		&:not(:last-child) {
			margin-bottom: ${theme('s[4]')};
		}
	}
`

const ColLabel = styled.p`
	${theme('t.ui.label')};
	text-transform: uppercase;
	color: ${theme('c.label')};

	margin-bottom: ${theme('s[2]')};
`

const ColLink = styled(Link)`
	&:not(:last-child) {
		margin-bottom: ${theme('s[1]')};
	}
	text-decoration: none;
`

const DisclosuresDivider = styled.hr`
	grid-column: 2 / -2;
	margin-bottom: ${theme('s[2]')};

	@media only screen and (max-width: ${theme('b.s')}) {
		grid-column: 1 / -1;
	}
`

const Policies = styled(Grid)`
	padding-bottom: ${theme('s[3]')};
	justify-items: start;
`

const PolicyText = styled.p`
	grid-column-end: span 2;
	color: ${theme('c.label')};

	@media only screen and (max-width: ${theme('b.xs')}) {
		grid-column-end: span 4;
		margin-bottom: ${theme('s[1]')};
	}
`

const PolicyLink = styled(Link)`
	grid-column-end: span 1;
`
