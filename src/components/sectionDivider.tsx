import styled from 'styled-components'

type Props = {
	mt?: number
	mb?: number
}

const SectionDivider = ({ mt = 7, mb = 7 }: Props): JSX.Element => (
	<Wrap>
		<Divider mt={mt} mb={mb} />
	</Wrap>
)

export default SectionDivider

const Wrap = styled.div`
	${(p) => p.theme.utils.spacing.paddingHorizontal};
`

const Divider = styled.hr<Props>`
	${(p) => p.theme.utils.spacing.marginTop[p.mt]};
	${(p) => p.theme.utils.spacing.marginBottom[p.mb]};
`
