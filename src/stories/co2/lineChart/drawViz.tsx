import { axisBottom, axisRight, easeCubicOut, select } from 'd3'
import { ScaleLinear, ScaleTime } from 'd3-scale'
import { Selection } from 'd3-selection'

import { Data } from '../index'

type Props = {
	height: number
	innerHeight: number
	width: number
	innerWidth: number
	margin: {
		top: number
		right: number
		bottom: number
		left: number
	}
	x: ScaleTime<number, number>
	y: ScaleLinear<number, number>
}

const drawViz = ({ height, innerHeight, width, innerWidth, x, y, margin }: Props) => {
	const grandDaddy = select('#line-chart'),
		svg = grandDaddy
			.select('.svg-wrap')
			.append('svg')
			.attr('preserveAspectRatio', 'xMidYMid meet')
			.attr('viewBox', [0, 0, width, height])
			.attr(
				'aria-label',
				'Time series showing the steady increase in atmospheric carbon dioxide levels from 1958 to 2020',
			)

	//
	// Grid lines
	//
	svg
		.append('g')
		.attr('class', 'y grid')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${margin.left} ${height})`)
		.call(
			axisBottom(x)
				.ticks(5)
				.tickSize(-height)
				.tickFormat(() => ''),
		)
	grandDaddy.selectAll('.y.grid > .tick').each(function (d, i) {
		select(this)
			.attr('stroke-dasharray', `${height} ${height}`)
			.attr('stroke-dashoffset', height)
			.attr('vector-effect', 'non-scaling-stroke')
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('stroke-dashoffset', function () {
				if (i % 2 === 0) {
					return 0
				} else {
					return 2 * height
				}
			})
	})
	svg
		.append('g')
		.attr('class', 'x grid')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${margin.left} ${margin.top})`)
		.call(
			axisRight(y)
				.ticks(5)
				.tickSize(width)
				.tickFormat(() => ''),
		)
	grandDaddy.selectAll('.x.grid>.tick').each(function (d, i) {
		select(this)
			.attr('stroke-dasharray', `${width} ${width}`)
			.attr('stroke-dashoffset', width)
			.attr('vector-effect', 'non-scaling-stroke')
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('stroke-dashoffset', function () {
				if (i % 2 === 0) {
					return 0
				} else {
					return 2 * width
				}
			})
	})

	//
	// Axes
	//
	svg
		.append('g')
		.attr('class', 'x axis')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${margin.left} ${innerHeight + margin.top})`)
		.style('opacity', 0)
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.style('opacity', 1)
		.call(
			axisBottom(x)
				.ticks(5)
				.tickSize(0)
				.tickPadding(width > 768 ? 24 : 12),
		)
	svg
		.append('g')
		.attr('class', 'y axis')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${innerWidth + margin.left} ${margin.top})`)
		.style('opacity', 0)
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.style('opacity', 1)
		.call(
			axisRight(y)
				.ticks(5)
				.tickSize(0)
				.tickPadding(width > 700 ? 32 : 8),
		)
	svg
		.append('line')
		.attr('class', 'bottom-axis')
		.attr('x1', 0)
		.attr('y1', height - margin.bottom)
		.attr('x2', width)
		.attr('y2', height - margin.bottom)
		.style('opacity', 0)
		.attr('vector-effect', 'non-scaling-stroke')
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.style('opacity', 1)

	//
	// Data line
	//
	const dataLine = svg
		.append('path')
		.attr('class', 'data-line')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('opacity', 0)
	const hoverLine = svg
		.insert('path', '.data-line')
		.attr('class', 'hover-line')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('stroke-opacity', 0.4)
		.attr('d', `M 0,0 0,${height}`)
	const hoverDataCircle = svg
		.append('circle')
		.attr('class', 'hover-data-circle')
		.attr('r', 4)
	const hoverGroup = svg
		.append('g')
		.attr('class', 'hover-text-group')
		.attr('transform', `translate(${margin.left + 24} ${margin.top + 24})`)
		.attr('aria-hidden', 'true')
	const hoverRect = hoverGroup
		.append('rect')
		.attr('class', 'hover-rect')
		.attr('rx', '8')
		.attr('ry', '8')
	const hoverDataLabel = hoverGroup
		.append('text')
		.attr('class', 'hover-data-label')
		.text('Record:')
	const hoverDataText = hoverGroup.append('text').attr('class', 'hover-data-text')

	//
	// Regression line
	//
	const regLine = svg
		.append('path')
		.attr('class', 'reg-line')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('opacity', 0)
	const hoverRegCircle = svg
		.append('circle')
		.attr('class', 'hover-reg-circle')
		.attr('r', 4)
	const hoverDiffLine = svg
		.insert('path', '.hover-data-circle')
		.attr('class', 'hover-diff-line')
		.attr('vector-effect', 'non-scaling-stroke')
	const hoverRegLabel = hoverGroup
		.append('text')
		.attr('class', 'hover-reg-label')
		.text('Regression:')
	const hoverRegText = hoverGroup.append('text').attr('class', 'hover-reg-text')
	const hoverDiffLabel = hoverGroup
		.append('text')
		.attr('class', 'hover-diff-label')
		.text('Squared error:')
	const hoverDiffText = hoverGroup.append('text').attr('class', 'hover-diff-text')

	//
	// MSE
	//
	const mseGroup = svg
		.append('g')
		.attr('class', 'mse-group')
		.attr(
			'transform',
			`translate(${
				width > 480 ? innerWidth + margin.left - 360 : innerWidth + margin.left - 200
			} ${width > 768 ? innerHeight + margin.top - 100 : innerHeight + margin.top - 86})`,
		)
	const mseRect = mseGroup
		.append('rect')
		.attr('class', 'mse-rect linear')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('rx', '4')
		.attr('ry', '4')
	const mseTitle = mseGroup
		.append('text')
		.attr('class', 'mse-title')
		.text('Linear regression')
	const mseEquationLabel = mseGroup
		.append('text')
		.attr('class', 'mse-equation-label')
		.text('Form:')
	const mseEquationText = mseGroup.append('text').attr('class', 'mse-equation')
	mseEquationText.append('tspan').attr('class', 'linear ').text('y = αx')
	mseEquationText.append('tspan').attr('class', 'quadratic').text(' + βx\u00b2')
	mseEquationText.append('tspan').attr('class', 'cosine').text(' + cos(2πt + φ)')
	const mseAccuracyLabel = mseGroup
		.append('text')
		.attr('class', 'mse-acc-label')
		.text('MSE:')
	const mseAccuracyText = mseGroup.append('text').attr('class', 'mse-acc-text').text(0)

	return {
		svg,
		dataLine: dataLine as Selection<SVGPathElement, Data, HTMLElement, unknown>,
		regLine: regLine as Selection<SVGPathElement, Data, HTMLElement, unknown>,
		hoverLine,
		hoverDataCircle,
		hoverGroup,
		hoverRect,
		hoverDataLabel,
		hoverDataText,
		hoverRegCircle,
		hoverDiffLine,
		hoverRegLabel,
		hoverRegText,
		hoverDiffLabel,
		hoverDiffText,
		mseGroup,
		mseRect,
		mseTitle,
		mseEquationLabel,
		mseEquationText,
		mseAccuracyLabel,
		mseAccuracyText,
	}
}

export default drawViz
