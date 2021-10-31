import styled from 'styled-components'

import Grid from '@components/grid'
import Page from '@components/page'

type Props = {
	pageContext: {
		title: string
		section?: string
		author?: string
	}
}

const SiteIndexPage = ({ pageContext }: Props) => {
	return (
		<Page>
			<Grid>
				<PageContent>
					<h1>{pageContext.title}</h1>
				</PageContent>
			</Grid>
		</Page>
	)
}

export default SiteIndexPage

const PageContent = styled.div`
	grid-column: 1 / -1;
	padding-top: ${(p) => p.theme.s[6]};
`
