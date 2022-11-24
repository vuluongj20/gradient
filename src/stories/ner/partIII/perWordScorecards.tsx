import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const MEMMPerWordScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Accuracy" number={93.1} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default MEMMPerWordScorecards

const Wrap = styled.div`
	display: flex;
	gap: ${(p) => p.theme.space[4]};
	${(p) => p.theme.marginBottom[3]}
	${(p) => p.theme.gridColumn.text};
`
