import styled from 'styled-components'

import Divider from '@components/divider'

type Props = {
	mt?: number
	mb?: number
	noMt?: boolean
	noMb?: boolean
	fullWidth?: boolean
}

const SectionDivider = ({
	mt = 7,
	mb = 7,
	noMt = false,
	noMb = false,
	fullWidth = false,
}: Props): JSX.Element => (
	<StyledDivider mt={mt} mb={mb} noMt={noMt} noMb={noMb} fullWidth={fullWidth} />
)

export default SectionDivider

const StyledDivider = styled(Divider)<Required<Props>>`
	${(p) => !p.fullWidth && p.theme.marginHorizontal};
	${(p) => (p.noMt ? `margin-top: 0;` : p.theme.marginTop[p.mt])};
	${(p) => (p.noMb ? `margin-bottom: 0;` : p.theme.marginBottom[p.mb])};
`
