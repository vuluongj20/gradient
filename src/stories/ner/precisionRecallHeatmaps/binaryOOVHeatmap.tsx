import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { MODEL, MODEL_SHORT } from '../constants'
import Heatmap from '../heatmap'

import Grid from '@components/grid'
import SwitchBar, { Item } from '@components/switchBar'

const groups = ['No OOV', '1+ OOV']

const hmmPrecisionByBinaryOOV = [
	[0.8, 0.21],
	[0.85, 0.62],
	[0.87, 0.06],
	[0.78, 0.12],
	[0.84, 0.39],
]
const hmmRecallByBinaryOOV = [
	[0.64, 0.33],
	[0.58, 0.59],
	[0.71, 0.05],
	[0.54, 0.06],
	[0.64, 0.41],
]

const memmPrecisionByBinaryOOV = [
	[0.81, 0.36],
	[0.82, 0.8],
	[0.82, 0.17],
	[0.74, 0.14],
	[0.8, 0.54],
]
const memmRecallByBinaryOOV = [
	[0.68, 0.12],
	[0.72, 0.57],
	[0.89, 0.29],
	[0.78, 0.02],
	[0.79, 0.37],
]

interface BinaryOOVHeatmapProps {
	models: MODEL[]
}

const BinaryOOVHeatmap = ({ models }: BinaryOOVHeatmapProps) => {
	const [selectedModel, setSelectedModel] = useState<MODEL>(models[0])

	const precision = useMemo(() => {
		switch (selectedModel) {
			case MODEL.HMM:
				return hmmPrecisionByBinaryOOV
			case MODEL.MEMM:
			default:
				return memmPrecisionByBinaryOOV
		}
	}, [selectedModel])

	const recall = useMemo(() => {
		switch (selectedModel) {
			case MODEL.HMM:
				return hmmRecallByBinaryOOV
			case MODEL.MEMM:
			default:
				return memmRecallByBinaryOOV
		}
	}, [selectedModel])

	return (
		<Grid>
			<Wrap>
				{models.length > 1 && (
					<SwitchBar aria-label="Model" value={selectedModel} onChange={setSelectedModel}>
						{models.map((model) => (
							<Item key={model}>{MODEL_SHORT[model]}</Item>
						))}
					</SwitchBar>
				)}
				<ContentWrap>
					<Column>
						<ColumnTitle>Precision</ColumnTitle>
						<Heatmap groups={groups} data={precision} />
					</Column>
					<Column>
						<ColumnTitle>Recall</ColumnTitle>
						<Heatmap groups={groups} data={recall} />
					</Column>
				</ContentWrap>
			</Wrap>
		</Grid>
	)
}

export default BinaryOOVHeatmap

export const Wrap = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
	gap: ${(p) => p.theme.space[1.5]};
`

const ControlWrap = styled.div`
	display: flex;
	justify-content: center;
	gap: ${(p) => p.theme.space[2]};
`

const ContentWrap = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	gap: ${(p) => p.theme.space[4]};

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
	color: var(--color-label);
	margin-left: 3em;
`
