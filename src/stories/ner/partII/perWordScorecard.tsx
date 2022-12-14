import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const HMMPerWordScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Accuracy" number={90.1} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default HMMPerWordScorecards

const Wrap = styled.div`
	display: flex;
	gap: var(--space-4);
	margin-bottom: var(--adaptive-space-3);
	${(p) => p.theme.gridColumn.text};
`
