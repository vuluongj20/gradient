import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const PerEntityScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Precision" number={63.1} unit="%" />
				<Scorecard label="Recall" number={59.4} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default PerEntityScorecards

const Wrap = styled.div`
	display: flex;
	gap: ${(p) => p.theme.space[4]};
	margin-bottom: ${(p) => p.theme.space[3]};
	${(p) => p.theme.gridColumn.text};
`
