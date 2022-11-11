import { useState } from 'react'
import styled from 'styled-components'

import Heatmap from '../heatmap'
import { entityLengths, precisionByEntityLength, recallByEntityLength } from './constants'

import Grid from '@components/grid'
import SwitchBar, { Item } from '@components/switchBar'

const data = { precision: precisionByEntityLength, recall: recallByEntityLength }
type DataSource = keyof typeof data

const HMMEntityLengthHeatmap = () => {
	const [dataSource, setDataSource] = useState<DataSource>('precision')

	return (
		<Grid>
			<Wrap>
				<SwitchBar
					aria-label="Metric to Display in Heatmap"
					value={dataSource}
					onChange={(source) => setDataSource(source as DataSource)}
				>
					<Item key="precision">Precision</Item>
					<Item key="recall">Recall</Item>
				</SwitchBar>
				<Heatmap
					data={data[dataSource]}
					groups={entityLengths}
					groupLabel="Entity Length"
				/>
			</Wrap>
		</Grid>
	)
}

export default HMMEntityLengthHeatmap

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${(p) => p.theme.space[1]};
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
	max-width: 32rem;
`
