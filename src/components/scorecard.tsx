import styled from 'styled-components'

interface ScorecardProps {
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
	color: var(--color-label);
	margin-top: ${(p) => p.theme.space[0]};
	margin-bottom: ${(p) => p.theme.space[0]};
`

const Main = styled.p`
	line-height: 1;
`

const MainNumber = styled.span`
	${(p) => p.theme.text.system.h3};
	color: var(--color-heading);
	padding-right: ${(p) => p.theme.space[0]};
	line-height: 1;
`

const MainUnit = styled.span`
	${(p) => p.theme.text.system.h5};
	color: var(--color-label);
	line-height: 1;
`
