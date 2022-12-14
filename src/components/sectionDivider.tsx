import styled from 'styled-components'

import Divider from '@components/divider'

interface SectionDividerProps {
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
}: SectionDividerProps) => (
	<StyledDivider mt={mt} mb={mb} noMt={noMt} noMb={noMb} fullWidth={fullWidth} />
)

export default SectionDivider

const StyledDivider = styled(Divider)<Required<SectionDividerProps>>`
	${(p) => !p.fullWidth && p.theme.marginHorizontal};
	margin-top: ${(p) => (p.noMt ? '0' : `var(--adaptive-space-${p.mt})`)};
	margin-bottom: ${(p) => (p.noMb ? '0' : `var(--adaptive-space-${p.mb})`)};
`
