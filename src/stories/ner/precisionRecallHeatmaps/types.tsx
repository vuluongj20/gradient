import { HeatmapProps } from '../heatmap'

export interface PrecisionRecallHeatmapProps {
	precision: HeatmapProps['data']
	recall: HeatmapProps['data']
	overlay?: {
		name: string
		precision: HeatmapProps['data']
		recall: HeatmapProps['data']
	}
}
