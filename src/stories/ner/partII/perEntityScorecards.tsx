import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const PerEntityScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Precision" number={64.2} unit="%" />
				<Scorecard label="Recall" number={55.8} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default PerEntityScorecards

const Wrap = styled.div`
	display: flex;
	gap: ${(p) => p.theme.space[4]};
	${(p) => p.theme.marginBottom[3]}
	${(p) => p.theme.gridColumn.text};
`
