import { cross, extent } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import styled from 'styled-components'

import { getValueDomain } from './model/distributions/utils'
import SamplingGraph from './model/graph'

import useEffectOnceDefined from '@utils/useEffectOnceDefined'
import useSize from '@utils/useSize'

type Props = {
	graph: SamplingGraph
}

const gridGap = 24
/**
 * Inner padding for subplots, counted as distance between the origin and the
 * x-coordinate of the lowest value.
 */
const subPlotPadding = 12
const marginLeft = 60
const marginBottom = 56

const PairGrid = ({ graph }: Props) => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const { width, height } = useSize(wrapRef)
	// const [outdated, setOutdated] = useState(false)

	useEffectOnceDefined(() => {
		if (!width || !height || !svgRef.current) return
		const { nodes } = graph

		const samples = graph.sample(50)

		const subPlotWidth =
			(width - marginLeft - (nodes.length - 1) * gridGap) / nodes.length
		const subPlotHeight =
			(height - marginBottom - (nodes.length - 1) * gridGap) / nodes.length

		const domains = Object.fromEntries(
			nodes.map((node) => {
				const nodeExtent = extent(samples[node.id])
				if (!nodeExtent[0]) return [node.id, [0, 0]]
				return [node.id, nodeExtent]
			}),
		)

		const svg = select(svgRef.current).attr('viewBox', [0, 0, width, height])
		nodes.forEach((node, nodeIndex) => {
			const xScale = scaleLinear()
				.domain(domains[node.id])
				.range([subPlotPadding, subPlotWidth - subPlotPadding])
			const xAxis = axisBottom(xScale)

			// console.log(domains[node.id])

			nodes.forEach((crossNode, crossNodeIndex) => {
				const yScale = scaleLinear()
					.domain(domains[crossNode.id])
					.range([subPlotHeight - subPlotPadding, subPlotPadding])
				const yAxis = axisLeft(yScale)

				// X-axes
				const xAxisTranslateX =
					marginLeft + nodeIndex * subPlotWidth + nodeIndex * gridGap
				const xAxisTranslateY =
					crossNodeIndex * subPlotHeight + crossNodeIndex * gridGap + subPlotHeight
				const xAxisTickValues =
					crossNodeIndex === nodes.length - 1 ? domains[node.id] : []
				svg
					.append('g')
					.classed('axis x-axis', true)
					.attr('id', `pair-grid-x-axis-${node.label}-${crossNode.label}`)
					.attr('transform', `translate(${xAxisTranslateX} ${xAxisTranslateY})`)
					.call(
						xAxis
							.tickValues(xAxisTickValues)
							.tickFormat(format('.1f'))
							.tickPadding(4)
							.tickSizeInner(6)
							.tickSizeOuter(0),
					)
					// Extend domain line
					.select('path.domain')
					.attr('d', `M${-subPlotPadding / 2},0H${subPlotWidth}`)

				// Y-axes
				const yAxisTranslateX =
					marginLeft + nodeIndex * subPlotWidth + nodeIndex * gridGap
				const yAxisTranslateY = crossNodeIndex * subPlotHeight + crossNodeIndex * gridGap
				const yAxisTickValues = nodeIndex === 0 ? domains[crossNode.id] : []
				svg
					.append('g')
					.classed('axis y-axis', true)
					.attr('id', `pair-grid-y-axis-${node.label}-${crossNode.label}`)
					.attr('transform', `translate(${yAxisTranslateX} ${yAxisTranslateY})`)
					.call(
						yAxis
							.tickValues(yAxisTickValues)
							.tickFormat(format('.1f'))
							.tickPadding(4)
							.tickSizeInner(6)
							.tickSizeOuter(0),
					)
					// Extend domain line
					.select('path.domain')
					.attr('d', `M0,${subPlotHeight + subPlotPadding / 2}V0`)

				// Row labels
				if (nodeIndex === 0) {
					const labelTranslateY =
						crossNodeIndex * subPlotHeight + crossNodeIndex * gridGap + subPlotHeight / 2
					svg
						.append('text')
						.classed('row-label', true)
						.text(crossNode.label)
						.attr(
							'transform',
							`translate(${-subPlotPadding} ${labelTranslateY}) rotate(-90)`,
						)
				}

				// Column labels
				if (crossNodeIndex === nodes.length - 1) {
					const labelTranslateX =
						marginLeft + nodeIndex * subPlotWidth + nodeIndex * gridGap + subPlotWidth / 2
					svg
						.append('text')
						.classed('column-label', true)
						.text(node.label)
						.attr('text-anchor', 'middle')
						.attr('transform', `translate(${labelTranslateX} ${height - 12}) `)
				}

				// Data
				// A complement node is a node that is not being plotted in the current subplot
				const complementIndex = new Array(nodes.length)
					.fill(0)
					.map((_, i) => i)
					.filter((i) => i !== nodeIndex && i !== crossNodeIndex)[0]
				const data = samples[node.id].map((x, i) => ({
					x,
					y: samples[crossNode.id][i],
					/**
					 * Correpsonding value of the complement node - the node that is
					 * not one of the node pair in the subplot.
					 */
					complement: samples[nodes[complementIndex].id][i],
				}))
				// .filter((s) => s.complement < 0.5 && s.complement > -0.5)
				const dataTranslateX = marginLeft + nodeIndex * subPlotWidth + nodeIndex * gridGap
				const dataTranslateY = crossNodeIndex * subPlotHeight + crossNodeIndex * gridGap
				svg
					.append('g')
					.classed('data', true)
					.attr('id', `pair-grid-data-${node.label}-${crossNode.label}`)
					.attr('transform', `translate(${dataTranslateX} ${dataTranslateY})`)
					.selectAll('dot')
					.data(data)
					.enter()
					.append('circle')
					.attr('cx', (d) => xScale(d.x))
					.attr('cy', (d) => yScale(d.y))
					.attr('r', 1.5)
			})
		})
	}, [width, height])

	return (
		<Wrap ref={wrapRef}>
			<SVG ref={svgRef} />
		</Wrap>
	)
}

export default observer(PairGrid)

const Wrap = styled.div`
	width: 100%;
	height: 28rem;
	border-top: solid 1px ${(p) => p.theme.line};
	padding-top: ${(p) => p.theme.space[2]};
`

const SVG = styled.svg`
	${(p) => p.theme.text.viz.body};

	g.axis {
		path.domain {
			stroke: ${(p) => p.theme.label};
			stroke-opacity: 0.5;
			stroke-width: 1.5;
			stroke-linecap: round;
		}

		&.x-axis .tick line {
			transform: translateY(-3px);
		}
		&.y-axis .tick line {
			transform: translateX(3px);
		}

		.tick {
			line {
				stroke: ${(p) => p.theme.label};
				stroke-opacity: 0.5;
				stroke-width: 1.5;
				stroke-linecap: round;
			}
			text {
				${(p) => p.theme.text.viz.small};
				fill: ${(p) => p.theme.label};
			}
		}
	}

	g.data circle {
		fill: ${(p) => p.theme.body};
	}

	text.row-label,
	text.column-label {
		fill: ${(p) => p.theme.label};
		transform-box: fill-box;
		transform-origin: center;
	}
`
