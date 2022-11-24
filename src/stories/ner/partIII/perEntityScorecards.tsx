import styled from 'styled-components'

import Grid from '@components/grid'
import Scorecard from '@components/scorecard'

const MEMMPerEntityScorecards = () => {
	return (
		<Grid>
			<Wrap>
				<Scorecard label="Precision" number={72.9} unit="%" />
				<Scorecard label="Recall" number={63.5} unit="%" />
			</Wrap>
		</Grid>
	)
}

export default MEMMPerEntityScorecards

const Wrap = styled.div`
	display: flex;
	gap: ${(p) => p.theme.space[4]};
	${(p) => p.theme.marginBottom[3]}
	${(p) => p.theme.gridColumn.text};
`
