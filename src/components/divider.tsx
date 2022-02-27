import styled from 'styled-components'

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
	<Divider mt={mt} mb={mb} noMt={noMt} noMb={noMb} fullWidth={fullWidth} />
)

export default SectionDivider

const Divider = styled.hr<Props>`
	${(p) => !p.fullWidth && p.theme.utils.space.marginHorizontal};
	${(p) => (p.noMt ? `margin-top: 0;` : p.theme.utils.space.marginTop[p.mt])};
	${(p) => (p.noMb ? `margin-bottom: 0;` : p.theme.utils.space.marginBottom[p.mb])};
`
