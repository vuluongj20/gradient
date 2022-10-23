import styled from 'styled-components'

type ScorecardProps = {
	label?: string
	number: string | number
	unit?: string
}
const Scorecard = ({ label, number, unit }: ScorecardProps) => {
	return (
		<Wrap>
			{label && <Label>{label}</Label>}
			<Main>
				<MainNumber>{number}</MainNumber>
				{unit && <MainUnit>{unit}</MainUnit>}
			</Main>
		</Wrap>
	)
}

export default Scorecard

const Wrap = styled.div``

const Label = styled.p`
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.label};
	margin-bottom: ${(p) => p.theme.space[0]};
`

const Main = styled.p``

const MainNumber = styled.span`
	${(p) => p.theme.text.system.h3};
	line-height: 1;
	color: ${(p) => p.theme.heading};
	padding-right: ${(p) => p.theme.space[0]};
`

const MainUnit = styled.span`
	${(p) => p.theme.text.system.h5};
	color: ${(p) => p.theme.label};
`
