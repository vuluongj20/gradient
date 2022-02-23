import styled from 'styled-components'

type Props = {
	mt?: number
	mb?: number
	noMt?: boolean
	noMb?: boolean
}

const SectionDivider = ({
	mt = 7,
	mb = 7,
	noMt = false,
	noMb = false,
}: Props): JSX.Element => (
	<Wrap>
		<Divider mt={mt} mb={mb} noMt={noMt} noMb={noMb} />
	</Wrap>
)

export default SectionDivider

const Wrap = styled.div`
	${(p) => p.theme.utils.space.paddingHorizontal};
`

const Divider = styled.hr<Props>`
	${(p) => !p.noMt && p.theme.utils.space.marginTop[p.mt]};
	${(p) => !p.noMb && p.theme.utils.space.marginBottom[p.mb]};

	${(p) => p.noMt && `margin-top: 0;`}
	${(p) => p.noMb && `margin-bottom: 0;`}
`
