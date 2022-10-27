import { useState } from 'react'
import styled from 'styled-components'

import Heatmap from '../heatmap'
import { entityLengths, precisionByEntityLength, recallByEntityLength } from './constants'

import Grid from '@components/grid'
import SwitchBar, { Item } from '@components/switchBar'

const data = { precision: precisionByEntityLength, recall: recallByEntityLength }
type DataSource = keyof typeof data

const EntityLengthHeatmap = () => {
	const [dataSource, setDataSource] = useState<DataSource>('precision')

	return (
		<Grid>
			<Wrap>
				<SwitchBar
					value={dataSource}
					onChange={(source) => setDataSource(source as DataSource)}
				>
					<Item key="precision">Precision</Item>
					<Item key="recall">Recall</Item>
				</SwitchBar>
				<Heatmap
					groups={entityLengths}
					data={data[dataSource]}
					grouping="Entity Length"
				/>
			</Wrap>
		</Grid>
	)
}

export default EntityLengthHeatmap

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${(p) => p.theme.space[2]};
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`
