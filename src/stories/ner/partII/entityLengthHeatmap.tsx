import styled from 'styled-components'

import Heatmap from '../heatmap'
import { entityLengths, precisionByEntityLength, recallByEntityLength } from './constants'

import Grid from '@components/grid'

const EntityLengthHeatmap = () => {
	return (
		<Grid>
			<Wrap>
				<Heatmap
					groups={entityLengths}
					data={precisionByEntityLength}
					grouping="Entity Length"
				/>
			</Wrap>
		</Grid>
	)
}

export default EntityLengthHeatmap

const Wrap = styled.div`
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`
