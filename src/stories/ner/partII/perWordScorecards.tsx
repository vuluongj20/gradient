import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const PerWordScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Accuracy" number={89.3} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default PerWordScorecards

const Wrap = styled.div`
	display: flex;
	gap: ${(p) => p.theme.space[4]};
	margin-bottom: ${(p) => p.theme.space[3]};
	${(p) => p.theme.gridColumn.text};
`
