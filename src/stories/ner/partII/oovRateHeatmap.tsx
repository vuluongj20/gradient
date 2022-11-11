import { useState } from 'react'
import styled from 'styled-components'

import Heatmap from '../heatmap'
import { precisionByOOVRate, recallByOOVRate } from './constants'

import Grid from '@components/grid'
import SwitchBar, { Item } from '@components/switchBar'

const entityLengths = [1, 2, 3, 4, 5]
const oovRates = [0, 0.2, 0.25, 0.33, 0.4, 0.5, 0.6, 0.66, 0.75, 0.8, 1]
const data = { precision: precisionByOOVRate, recall: recallByOOVRate }
type DataSource = keyof typeof data
const HMMOOVRateHeatmap = () => {
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
					groups={oovRates}
					groupLabel="OOV Rate"
					rows={entityLengths}
					rowLabel="Entity Length"
					separateLastRow={false}
				/>
			</Wrap>
		</Grid>
	)
}

export default HMMOOVRateHeatmap

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${(p) => p.theme.space[1]};
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
	max-width: 36rem;
`
