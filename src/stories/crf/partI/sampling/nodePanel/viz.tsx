import { axisBottom } from 'd3-axis'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { Selection, select } from 'd3-selection'
import { curveBasis, line } from 'd3-shape'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'

import { isContinuousDistribution } from '../model/distributions/types'
import SamplingNode from '../model/node'

import useMountEffect from '@utils/useMountEffect'

type Props = {
	node: SamplingNode
}

type Render = {
	xAxis: Selection<SVGGElement, unknown, null, undefined>
	dataLine: Selection<SVGPathElement, number[], null, undefined>
}

const width = 320
const height = 80
const paddingBottom = 16
const innerHeight = height - paddingBottom

const renderXAxis = (
	xAxis: Render['xAxis'],
	{ x }: { x: ScaleLinear<number, number> },
) => {
	return xAxis.call(axisBottom(x).ticks(5).tickSize(0))
}

type DataLineProps = {
	isContinuous: boolean
	probabilityFn: (value: number) => number
	x: ScaleLinear<number, number>
	y: ScaleLinear<number, number>
}

const renderDataLine = (
	dataLine: Render['dataLine'],
	{ isContinuous, probabilityFn, x, y }: DataLineProps,
) => {
	const lined = line<number>()
		.x((d) => x(d))
		.y((d) => y(probabilityFn(d)))
	isContinuous && lined.curve(curveBasis)

	dataLine
		.attr('d', lined)
		.classed('continuous', isContinuous)
		.classed('discrete', !isContinuous)
		.attr('marker-start', isContinuous ? 'none' : 'url(#dot)')
		.attr('marker-mid', isContinuous ? 'none' : 'url(#dot)')
		.attr('marker-end', isContinuous ? 'none' : 'url(#dot)')

	return dataLine
}

const NodeDistributionCurve = ({ node }: Props) => {
	const svgRef = useRef<SVGSVGElement>(null)
	const render = useRef<Render>()

	const { distribution } = node

	const { x, y, probabilityFn, values } = useMemo(
		() =>
			computed(() => {
				const { support, mean, variance } = distribution

				const std = Math.sqrt(variance)
				const valueDomainLower = support[0] !== -Infinity ? support[0] : mean - 4 * std
				const valueDomainUpper = support[1] !== Infinity ? support[1] : mean + 4 * std
				const valueDomain = [valueDomainLower, valueDomainUpper]

				const isContinuous = isContinuousDistribution(distribution)
				const probabilityFn = (x: number) =>
					isContinuous ? distribution.pdf(x) : distribution.pmf(x)
				const probabilityDomain = [0, probabilityFn(distribution.mode)]

				const valueIncrements = isContinuous
					? (valueDomainUpper - valueDomainLower) / 100
					: 1
				const values = new Array(
					isContinuous ? 100 : Math.round(valueDomainUpper - valueDomainLower + 1),
				)
					.fill(0)
					.map((_, i) => valueDomainLower + i * valueIncrements)

				const x = scaleLinear().domain(valueDomain).range([0, width])
				const y = scaleLinear()
					.domain(probabilityDomain)
					.range([0, -(height - 16)])

				return { x, y, probabilityFn, values }
			}),
		[distribution],
	).get()

	useMountEffect(() => {
		if (!svgRef.current) return
		const isContinuous = isContinuousDistribution(distribution)

		const svg = select(svgRef.current).attr('viewBox', [0, 0, width, height])
		svg
			.append('defs')
			.append('marker')
			.attr('viewBox', [0, 0, 3, 3])
			.attr('refX', 1.5)
			.attr('refY', 1.5)
			.attr('markerWidth', 3)
			.attr('markerHeight', 3)
			.attr('id', 'dot')
			.append('circle')
			.attr('cx', 1.5)
			.attr('cy', 1.5)
			.attr('r', 1.5)

		const xAxis = svg
			.append('g')
			.classed('axis x-axis', true)
			.attr('transform', `translate(0 ${innerHeight})`)
			.call(renderXAxis, { x })

		const dataLine = svg
			.append('path')
			.datum(values)
			.classed('curve', true)
			.attr('transform', `translate(0 ${innerHeight})`)
			.call(renderDataLine, { isContinuous, probabilityFn, x, y })

		render.current = { xAxis, dataLine }
	})

	// Re-render when distribution parameters change
	useEffect(() => {
		if (!render.current) return
		const { xAxis, dataLine } = render.current
		const isContinuous = isContinuousDistribution(distribution)

		xAxis.call(renderXAxis, { x })
		dataLine.datum(values).call(renderDataLine, { isContinuous, probabilityFn, x, y })
	}, [distribution, x, y, probabilityFn, values])

	return <Wrap ref={svgRef} />
}

export default observer(NodeDistributionCurve)

const Wrap = styled.svg`
	width: 100%;
	height: auto;

	g.axis {
		path {
			stroke: ${(p) => p.theme.line};
		}
		text {
			${(p) => p.theme.text.viz.small}
			fill: ${(p) => p.theme.label};
			transform: translateY(2px);
		}
	}

	path.curve {
		fill: none;
		stroke: ${(p) => p.theme.body};
		stroke-width: 1.5;

		&.continuous {
			stroke-opacity: 0.5;
		}
		&.discrete {
			stroke-opacity: 0;
		}
	}

	marker#dot {
		fill: ${(p) => p.theme.body};
		fill-opacity: 0.5;
	}
`
