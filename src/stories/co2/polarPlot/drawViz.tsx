import { easeCubicOut, select } from 'd3'
import { ScaleLinear } from 'd3-scale'

type Props = {
	radius: number
	innerRadius: number
	r: ScaleLinear<number, number>
}

const drawViz = ({ radius, innerRadius, r }: Props) => {
	const svg = select('#polar-plot .svg-wrap')
		.append('svg')
		.attr('preserveAspectRatio', 'xMidYMid meet')
		.attr('viewBox', [0, 0, radius * 2, radius * 2])
		.attr('width', radius * 2)
		.attr('height', radius * 2)
		.attr(
			'aria-label',
			'Polar plot that presents the same carbon dioxide data but as a circular swirl expanding outward',
		)
	const defs = svg.append('defs')

	//
	// Winter/summer polar clips
	//
	defs
		.append('clipPath')
		.attr('id', 'winter-polar-clip')
		.append('rect')
		.attr('x', 0)
		.attr('y', -1)
		.attr('width', '100%')
		.attr('height', '101%')
		.attr('transform', 'rotate(-180)')
	defs
		.append('clipPath')
		.attr('id', 'summer-polar-clip')
		.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', '100%')
		.attr('height', '100%')
		.attr('transform', 'rotate(0)')

	//
	// Axes
	//
	const rAxis = svg
		.append('g')
		.attr('class', 'r axis')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${radius} ${radius})`)
	const aAxis = svg
		.append('g')
		.attr('class', 'a axis')
		.attr('aria-hidden', 'true')
		.attr('transform', `translate(${radius} ${radius})`)

	//
	// Radial axis
	//
	const rAxisCircles = rAxis
		.selectAll('circle')
		.data([...r.ticks(5), 320, 340, 360, 380])
		.enter()
		.append('circle')
		.classed('grid-circle', true)
		.classed('secondary', (d) => d > 300 && d < 400)
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('transform', 'rotate(-90)')
		.attr('r', r)
		.attr('stroke-dasharray', (d) => {
			return `${2 * Math.PI * r(d)} ${2 * Math.PI * r(d)}`
		})
		.attr('stroke-dashoffset', (d) => {
			return 2 * Math.PI * r(d)
		})
		.attr('data-value', (d) => d)
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.attr('stroke-dashoffset', 0)
		.selection()
	rAxis
		.append('circle')
		.attr('class', 'grid-circle')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('transform', 'rotate(-90)')
		.attr('r', innerRadius)
		.attr('stroke-dasharray', `${2 * Math.PI * innerRadius} ${2 * Math.PI * innerRadius}`)
		.attr('stroke-dashoffset', 2 * Math.PI * innerRadius)
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.attr('stroke-dashoffset', 0)
	const rAxisTicks = rAxis
		.selectAll('g')
		.data([...r.ticks(5).slice(1), 320, 340, 360, 380])
		.enter()
		.append('text')
		.classed('r tick', true)
		.classed('secondary', (d) => d > 300 && d < 400)
		.attr(
			'transform',
			(d) =>
				`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
					r(d) * Math.sin((-11 * Math.PI) / 12)
				})`,
		)
		.attr('text-anchor', 'middle')
		.attr('alignment-baseline', 'central')
		.attr('data-value', (d) => d)
		.text((d) => d)

	//
	// Angular axis
	//
	aAxis
		.selectAll('line')
		.data(Array(6))
		.enter()
		.append('line')
		.attr('class', 'grid-line')
		.attr('vector-effect', 'non-scaling-stroke')
		.attr('x1', 0)
		.attr('x2', 0)
		.attr('y1', -innerRadius)
		.attr('y2', innerRadius)
		.attr('transform', (_, i) => `rotate(${30 * i})`)
		.attr('stroke-dasharray', `${2 * innerRadius} ${2 * innerRadius}`)
		.attr('stroke-dashoffset', 2 * innerRadius)
		.transition()
		.duration(750)
		.ease(easeCubicOut)
		.attr('stroke-dashoffset', (_, i) => {
			if (i % 2 === 0) {
				return 0
			} else {
				return 4 * innerRadius
			}
		})
	aAxis
		.selectAll('text')
		.data([
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		])
		.enter()
		.append('text')
		.attr('class', 'a tick')
		.attr('text-anchor', 'middle')
		.attr('alignment-baseline', 'central')
		.attr('dx', function (_, i) {
			return (
				(innerRadius + (radius > 280 ? 24 : 16)) * Math.cos((i / 6 - 1 / 2) * Math.PI)
			)
		})
		.attr('dy', function (_, i) {
			return (
				(innerRadius + (radius > 280 ? 24 : 16)) * Math.sin((i / 6 - 1 / 2) * Math.PI)
			)
		})
		.text(function (d) {
			return d
		})

	//
	// Data line
	//
	const dataLine = svg
		.append('path')
		.attr('class', 'data-line')
		.attr('transform', `translate(${radius} ${radius})`)
		.attr('vector-effect', 'non-scaling-stroke')

	//
	// Winter/summer stretches
	//
	const winterStretch = svg
		.append('path')
		.attr('class', 'winter stretch')
		.attr('clip-path', 'url(#winter-polar-clip)')
		.attr('transform', `translate(${radius} ${radius})`)
		.attr('vector-effect', 'non-scaling-stroke')

	const summerStretch = svg
		.append('path')
		.attr('class', 'summer stretch')
		.attr('clip-path', 'url(#summer-polar-clip)')
		.attr('transform', `translate(${radius} ${radius})`)
		.attr('vector-effect', 'non-scaling-stroke')

	return {
		svg,
		rAxis,
		aAxis,
		rAxisCircles,
		rAxisTicks,
		dataLine,
		winterStretch,
		summerStretch,
	}
}

export default drawViz
