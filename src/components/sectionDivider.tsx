import styled from 'styled-components'

import Grid from '@components/grid'

type Props = {
	mt?: number
	mb?: number
}

const SectionDivider = ({ mt = 7, mb = 7 }: Props): JSX.Element => (
	<Grid>
		<Divider mt={mt} mb={mb} />
	</Grid>
)

export default SectionDivider

const Divider = styled.hr<Props>`
	${(p) => p.theme.u.spacing.marginTop[p.mt]};
	${(p) => p.theme.u.spacing.marginBottom[p.mb]};
`
