import styled from 'styled-components'

import Grid from '@components/grid'

const SectionDivider = (): JSX.Element => (
	<Grid>
		<Divider />
	</Grid>
)

export default SectionDivider

const Divider = styled.hr`
	margin: ${(p) => p.theme.s[7]} 0;

	${(p) => p.theme.u.media.m} {
		margin: ${(p) => p.theme.s[6]} 0;
	}

	${(p) => p.theme.u.media.xs} {
		margin: ${(p) => p.theme.s[4]} 0;
	}
`
