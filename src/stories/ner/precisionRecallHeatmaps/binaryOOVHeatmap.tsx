import { useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import Heatmap from '../heatmap'
import { OverlayTrigger, OverlayWrap } from './components'
import { PrecisionRecallHeatmapProps } from './types'

import Grid from '@components/grid'

const groups = ['No OOV', '1+ OOV']
const BinaryOOVHeatmap = ({
	precision,
	recall,
	overlay,
}: PrecisionRecallHeatmapProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const showOverlay = useMemo(() => isClicked || isHovered, [isHovered, isClicked])

	return (
		<Grid>
			<Wrap>
				<ContentWrap>
					<Column>
						<ColumnTitle>Precision</ColumnTitle>
						<Heatmap groups={groups} data={precision} />
					</Column>
					<Column>
						<ColumnTitle>Recall</ColumnTitle>
						<Heatmap groups={groups} data={recall} />
					</Column>
					{overlay && (
						<CSSTransition in={showOverlay} timeout={500} unmountOnExit appear>
							<OverlayWrap>
								<ContentWrap>
									<Column>
										<ColumnTitle>Precision</ColumnTitle>
										<Heatmap groups={groups} data={overlay.precision} />
									</Column>
									<Column>
										<ColumnTitle>Recall</ColumnTitle>
										<Heatmap groups={groups} data={overlay.recall} />
									</Column>
								</ContentWrap>
							</OverlayWrap>
						</CSSTransition>
					)}
				</ContentWrap>
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
	color: ${(p) => p.theme.label};
	margin-left: 3em;
`
