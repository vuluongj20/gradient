import styled from 'styled-components'

import Heatmap from '../heatmap'
import { precisionByBinaryOOV, recallByBinaryOOV } from './constants'

import Grid from '@components/grid'

const groups = ['No OOV', '1+ OOV']
const HMMBinaryOOVHeatmap = () => {
	return (
		<Grid>
			<Wrap>
				<Column>
					<ColumnTitle>Precision</ColumnTitle>
					<Heatmap groups={groups} data={precisionByBinaryOOV} />
				</Column>
				<Column>
					<ColumnTitle>Recall</ColumnTitle>
					<Heatmap groups={groups} data={recallByBinaryOOV} />
				</Column>
			</Wrap>
		</Grid>
	)
}

export default HMMBinaryOOVHeatmap

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	gap: ${(p) => p.theme.space[4]};
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}

	${(p) => p.theme.media.mobile} {
		gap: ${(p) => p.theme.space[2]};
	}
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${(p) => p.theme.space[0.5]};
	width: 100%;
	max-width: 14rem;
`

const ColumnTitle = styled.p`
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.label};
	margin-left: ${(p) => p.theme.space[4]};
`
