import { useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import Heatmap from '../heatmap'
import { OverlayTrigger, OverlayWrap } from './components'
import { PrecisionRecallHeatmapProps } from './types'

import Grid from '@components/grid'
import SwitchBar, { Item } from '@components/switchBar'

const groups = [1, 2, 3, 4, 5]
const EntityLengthHeatmap = ({
	precision,
	recall,
	overlay,
}: PrecisionRecallHeatmapProps) => {
	const [dataSource, setDataSource] = useState<'precision' | 'recall'>('precision')

	const [isHovered, setIsHovered] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const showOverlay = useMemo(() => isClicked || isHovered, [isHovered, isClicked])

	return (
		<Grid>
			<Wrap>
				<ControlWrap>
					<SwitchBar
						aria-label="Metric to Display in Heatmap"
						value={dataSource}
						onChange={(source) => setDataSource(source)}
					>
						<Item key="precision">Precision</Item>
						<Item key="recall">Recall</Item>
					</SwitchBar>
					{overlay && (
						<OverlayTrigger
							small
							onHoverChange={setIsHovered}
							onPress={() => setIsClicked((cur) => !cur)}
							hideStateLayer
							isClicked={isClicked}
						>
							Superpose {overlay.name}
						</OverlayTrigger>
					)}
				</ControlWrap>
				<ContentWrap>
					<Heatmap
						data={dataSource === 'precision' ? precision : recall}
						groups={groups}
						groupLabel="Entity Length"
					/>
					{overlay && (
						<CSSTransition in={showOverlay} timeout={500} unmountOnExit appear>
							<OverlayWrap>
								<Heatmap
									data={dataSource === 'precision' ? overlay.precision : overlay.recall}
									groups={groups}
									groupLabel="Entity Length"
								/>
							</OverlayWrap>
						</CSSTransition>
					)}
				</ContentWrap>
			</Wrap>
		</Grid>
	)
}

export default EntityLengthHeatmap

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginTop[1]}
	${(p) => p.theme.marginBottom[3]}
	gap: ${(p) => p.theme.space[1.5]};
	max-width: 32rem;
`

const ContentWrap = styled.div`
	position: relative;
	width: 100%;
`

const ControlWrap = styled.div`
	display: flex;
	justify-content: center;
	gap: ${(p) => p.theme.space[2]};
`
