import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { Selection } from 'd3-selection'

import SamplingNode from '../model/node'

const gridGap = 24
const marginLeft = 60
const marginBottom = 56
/**
 * Inner padding for subplots, counted as distance between the origin and the
 * x-coordinate of the lowest value.
 */
const subPlotPadding = 12

type SubplotSizeProps = {
	width: number
	height: number
	numNodes: number
}

const getSubplotSize = ({ width, height, numNodes }: SubplotSizeProps) => ({
	width: (width - marginLeft - (numNodes - 1) * gridGap) / numNodes,
	height: (height - marginBottom - (numNodes - 1) * gridGap) / numNodes,
})

const renderXAxis = (
	axisSelection: Selection<SVGGElement, null, SVGSVGElement, undefined>,
	{
		xScale,
		nodeIndex,
		crossNodeIndex,
		...subplotSizeProps
	}: SubplotSizeProps & {
		xScale: ScaleLinear<number, number>
		nodeIndex: number
		crossNodeIndex: number
	},
) => {
	const xAxis = axisBottom(xScale)
	const { numNodes } = subplotSizeProps
	const { width: subplotWidth, height: subplotHeight } = getSubplotSize(subplotSizeProps)

	const tickValues = crossNodeIndex === numNodes - 1 ? xAxis.scale().domain() : []
	const translateX = marginLeft + nodeIndex * subplotWidth + nodeIndex * gridGap
	const translateY =
		crossNodeIndex * subplotHeight + crossNodeIndex * gridGap + subplotHeight

	return axisSelection
		.attr('transform', `translate(${translateX} ${translateY})`)
		.call(
			xAxis
				.tickValues(tickValues)
				.tickFormat(format('.1f'))
				.tickPadding(4)
				.tickSizeInner(6)
				.tickSizeOuter(0),
		) // Extend domain line
		.select('path.domain')
		.attr('d', `M${-subPlotPadding / 2},0H${subplotWidth}`)
}

const renderYAxis = (
	axisSelection: Selection<SVGGElement, null, SVGSVGElement, undefined>,
	{
		yScale,
		nodeIndex,
		crossNodeIndex,
		...subplotSizeProps
	}: SubplotSizeProps & {
		yScale: ScaleLinear<number, number>
		nodeIndex: number
		crossNodeIndex: number
	},
) => {
	const yAxis = axisLeft(yScale)
	const { width: subplotWidth, height: subplotHeight } = getSubplotSize(subplotSizeProps)

	const tickValues = nodeIndex === 0 ? yAxis.scale().domain() : []
	const translateX = marginLeft + nodeIndex * subplotWidth + nodeIndex * gridGap
	const translateY = crossNodeIndex * subplotHeight + crossNodeIndex * gridGap

	return axisSelection
		.attr('transform', `translate(${translateX} ${translateY})`)
		.call(
			yAxis
				.tickValues(tickValues)
				.tickFormat(format('.1f'))
				.tickPadding(4)
				.tickSizeInner(6)
				.tickSizeOuter(0),
		) // Extend domain line
		.select('path.domain')
		.attr('d', `M0,${subplotHeight + subPlotPadding / 2}V0`)
}

const renderRowLabel = (
	labelSelection: Selection<SVGTextElement, null, SVGSVGElement, undefined>,
	{
		label,
		crossNodeIndex,
		...subplotSizeProps
	}: SubplotSizeProps & {
		label: string
		crossNodeIndex: number
	},
) => {
	const { height: subplotHeight } = getSubplotSize(subplotSizeProps)
	const translateY =
		crossNodeIndex * subplotHeight + crossNodeIndex * gridGap + subplotHeight / 2

	return labelSelection
		.text(label)
		.attr('transform', `translate(${-subPlotPadding} ${translateY}) rotate(-90)`)
}

const renderColumnLabel = (
	labelSelection: Selection<SVGTextElement, null, SVGSVGElement, undefined>,
	{
		label,
		nodeIndex,
		...subplotSizeProps
	}: SubplotSizeProps & {
		label: string
		nodeIndex: number
	},
) => {
	const { height } = subplotSizeProps
	const { width: subPlotWidth } = getSubplotSize(subplotSizeProps)
	const translateX =
		marginLeft + nodeIndex * subPlotWidth + nodeIndex * gridGap + subPlotWidth / 2

	return labelSelection
		.text(label)
		.attr('text-anchor', 'middle')
		.attr('transform', `translate(${translateX} ${height - 12}) `)
}

const renderData = (
	dataSelection: Selection<SVGGElement, null, SVGSVGElement, undefined>,
	{
		data,
		xScale,
		yScale,
		nodeIndex,
		crossNodeIndex,
		...subplotSizeProps
	}: SubplotSizeProps & {
		xScale: ScaleLinear<number, number>
		yScale: ScaleLinear<number, number>
		data: { x: number; y: number }[]
		nodeIndex: number
		crossNodeIndex: number
	},
) => {
	const { width: subplotWidth, height: subplotHeight } = getSubplotSize(subplotSizeProps)
	const translateX = marginLeft + nodeIndex * subplotWidth + nodeIndex * gridGap
	const translateY = crossNodeIndex * subplotHeight + crossNodeIndex * gridGap

	dataSelection
		.attr('transform', `translate(${translateX} ${translateY})`)
		.selectAll('circle')
		.data(data)
		.join(
			(enter) =>
				enter
					.append('circle')
					.attr('cx', (d) => xScale(d.x))
					.attr('cy', (d) => yScale(d.y))
					.attr('r', 1.5),
			(update) => update.attr('cx', (d) => xScale(d.x)).attr('cy', (d) => yScale(d.y)),
		)
}

export const renderSVG = (
	svg: Selection<SVGSVGElement, unknown, null, undefined>,
	{
		samples,
		nodes,
		domains,
		...subplotSizeProps
	}: SubplotSizeProps & {
		nodes: SamplingNode[]
		samples: Record<string, number[]>
		domains: Record<string, number[]>
	},
) => {
	const { width, height } = subplotSizeProps
	const { width: subplotWidth, height: subplotHeight } = getSubplotSize(subplotSizeProps)

	svg.attr('viewBox', [0, 0, width, height])

	nodes.forEach((node, nodeIndex) => {
		const xScale = scaleLinear()
			.domain(domains[node.id])
			.range([subPlotPadding, subplotWidth - subPlotPadding])

		nodes.forEach((crossNode, crossNodeIndex) => {
			const posClass = `pos-${nodeIndex}-${crossNodeIndex}`
			const yScale = scaleLinear()
				.domain(domains[crossNode.id])
				.range([subplotHeight - subPlotPadding, subPlotPadding])

			// X-axes
			svg
				.selectAll<SVGGElement, null>(`.x-axis.${posClass}`)
				.data([null])
				.join((enter) => enter.append('g').classed(`axis x-axis ${posClass}`, true))
				.call(renderXAxis, {
					xScale,
					nodeIndex,
					crossNodeIndex,
					...subplotSizeProps,
				})

			// Y-axes
			svg
				.selectAll<SVGGElement, null>(`.y-axis.${posClass}`)
				.data([null])
				.join((enter) =>
					enter
						.append('g')
						.classed(`axis y-axis pos-${nodeIndex}-${crossNodeIndex}`, true),
				)
				.call(renderYAxis, {
					yScale,
					nodeIndex,
					crossNodeIndex,
					...subplotSizeProps,
				})

			// Row labels
			if (nodeIndex === 0) {
				svg
					.selectAll<SVGTextElement, null>(`.row-label.${posClass}`)
					.data([null])
					.join((enter) => enter.append('text').classed(`row-label ${posClass}`, true))
					.call(renderRowLabel, {
						label: crossNode.label,
						crossNodeIndex,
						...subplotSizeProps,
					})
			}

			// Column labels
			if (crossNodeIndex === nodes.length - 1) {
				svg
					.selectAll<SVGTextElement, null>(`.column-label.${posClass}`)
					.data([null])
					.join((enter) => enter.append('text').classed(`column-label ${posClass}`, true))
					.call(renderColumnLabel, {
						label: node.label,
						nodeIndex,
						...subplotSizeProps,
					})
			}

			// Data
			const data = samples[node.id].map((x, i) => ({ x, y: samples[crossNode.id][i] }))
			svg
				.selectAll<SVGGElement, null>(`.data.${posClass}`)
				.data([null])
				.join((enter) => enter.append('g').classed(`data ${posClass}`, true))
				.call(renderData, {
					data,
					nodeIndex,
					crossNodeIndex,
					xScale,
					yScale,
					...subplotSizeProps,
				})
		})
	})
}
