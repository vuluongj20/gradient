import styled from 'styled-components'

import Grid from '@components/grid'

const SectionDivider = (): JSX.Element => (
	<Grid>
		<Divider />
	</Grid>
)

export default SectionDivider

const Divider = styled.hr`
	border-bottom-width: 2px;
`
