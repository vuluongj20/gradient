import styled from 'styled-components'

import Grid from '@components/grid'

type Props = {
	mt?: [number, number, number]
	mb?: [number, number, number]
}

const SectionDivider = ({ mt = [7, 6, 4], mb = [7, 6, 4] }: Props): JSX.Element => (
	<Grid>
		<Divider mt={mt} mb={mb} />
	</Grid>
)

export default SectionDivider

const Divider = styled.hr<Props>`
	margin-top: ${(p) => p.theme.s[p.mt[0]]};
	margin-bottom: ${(p) => p.theme.s[p.mb[0]]};

	${(p) => p.theme.u.media.m} {
		margin-top: ${(p) => p.theme.s[p.mt[1]]};
		margin-bottom: ${(p) => p.theme.s[p.mb[1]]};
	}

	${(p) => p.theme.u.media.xs} {
		margin-top: ${(p) => p.theme.s[p.mt[2]]};
		margin-bottom: ${(p) => p.theme.s[p.mb[2]]};
	}
`
