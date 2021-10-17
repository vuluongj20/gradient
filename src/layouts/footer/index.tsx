import styled from 'styled-components'

import Grid from '@components/grid'

import { theme } from '@utils/styling'

const Footer = (): JSX.Element => {
	return (
		<Wrap>
			<SiteStructure>
				<div />
				<Column>Topics</Column>
				<Column>Categories</Column>
				<Column>Writers</Column>
				<Column>More</Column>
			</SiteStructure>
		</Wrap>
	)
}

export default Footer

const Wrap = styled.footer`
	padding: ${theme('s[5]')} 0;
	background: ${theme('c.surface1')};
`

const SiteStructure = styled(Grid)``

const Column = styled.div``
