import { curveBasis, easeCubicIn, easeCubicOut, extent, lineRadial, max } from 'd3'
import { ScaleLinear } from 'd3-scale'

import { Datum } from '../index'
import drawViz from './drawViz'

interface UpdateVizProps {
	selections: ReturnType<typeof drawViz>
	data: Datum[]
	radius: number
	innerRadius: number
	a: ScaleLinear<number, number>
	r: ScaleLinear<number, number>
	xDaysParsed: number[]
	describeArc: (
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
	) => string
}

const updateViz = (
	to: number,
	{ selections, data, innerRadius, a, r, xDaysParsed, describeArc }: UpdateVizProps,
) => {
	const { svg, rAxisCircles, rAxisTicks, dataLine, winterStretch, summerStretch } =
		selections

	if (to === -1) {
		const totalLength = dataLine.node()?.getTotalLength() ?? 0
		dataLine
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('stroke-dashoffset', totalLength)
	}

	// One
	if (to === 0) {
		// If we're moving from step 1 back to step 0
		if (rAxisCircles.filter('.secondary').classed('on')) {
			r.domain([0, max(data, (d) => d.level) ?? 0]).nice()
			// Remove unneeded circles and ticks
			rAxisCircles
				.filter(':not(.secondary, [data-value="400"])')
				.classed('off', false)
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr('r', r)
			rAxisTicks
				.filter(':not(.secondary, [data-value="400"])')
				.classed('off', false)
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr(
					'transform',
					(d) =>
						`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
							r(d) * Math.sin((-11 * Math.PI) / 12)
						})`,
				)
			// Move 400 circle and tick
			rAxisCircles
				.filter('[data-value="400"]')
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr('r', r)
			rAxisTicks
				.filter('[data-value="400"]')
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr(
					'transform',
					(d) =>
						`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
							r(d) * Math.sin((-11 * Math.PI) / 12)
						})`,
				)
			// Add new circles and ticks
			rAxisCircles
				.filter('.secondary')
				.classed('on', false)
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr('r', r)
			rAxisTicks
				.filter('.secondary')
				.classed('on', false)
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr(
					'transform',
					(d) =>
						`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
							r(d) * Math.sin((-11 * Math.PI) / 12)
						})`,
				)
		}

		dataLine.datum(data.slice(0, 37)).attr(
			'd',
			lineRadial<Datum>()
				.angle(function (_, index) {
					return a(xDaysParsed[index])
				})
				.radius(function (d) {
					return r(d.level)
				})
				.curve(curveBasis)(data.slice(0, 37)),
		)

		const totalLength = dataLine.node()?.getTotalLength() ?? 0
		dataLine
			.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
			.attr('stroke-dashoffset', totalLength)
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('stroke-dashoffset', 0)

		return
	}

	// All
	if (to === 1) {
		r.domain(
			extent(data, (data) => {
				return data.level
			}) as [number, number],
		).nice()

		// Remove unneeded circles and ticks
		rAxisCircles
			.filter(':not(.secondary, [data-value="400"])')
			.classed('off', true)
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr('r', 0)
		rAxisTicks
			.filter(':not(.secondary, [data-value="400"])')
			.classed('off', true)
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr('transform', 'translate(0 0)')
		// Move 400 circle and tick
		rAxisCircles
			.filter('[data-value="400"]')
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr('r', r)
		rAxisTicks
			.filter('[data-value="400"]')
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr(
				'transform',
				(d) =>
					`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
						r(d) * Math.sin((-11 * Math.PI) / 12)
					})`,
			)
		// Add new circles and ticks
		rAxisCircles
			.filter('.secondary')
			.classed('on', true)
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr('r', r)
		rAxisTicks
			.filter('.secondary')
			.classed('on', true)
			.transition()
			.duration(750)
			.ease(easeCubicIn)
			.attr(
				'transform',
				(d) =>
					`translate(${r(d) * Math.cos((-11 * Math.PI) / 12)} ${
						r(d) * Math.sin((-11 * Math.PI) / 12)
					})`,
			)

		if (winterStretch.classed('on')) {
			winterStretch.classed('on', false)
			summerStretch.classed('on', false)

			svg
				.select('#winter-polar-clip rect')
				.transition()
				.duration(750)
				.ease(easeCubicOut)
				.attr('transform', 'rotate(-180)')
			svg
				.select('#summer-polar-clip rect')
				.transition()
				.duration(750)
				.ease(easeCubicOut)
				.attr('transform', 'rotate(0)')
		} else {
			dataLine
				.transition()
				.duration(750)
				.ease(easeCubicIn)
				.attr(
					'd',
					lineRadial<Datum>()
						.angle(function (_, index) {
							return a(xDaysParsed[index])
						})
						.radius(function (d) {
							return r(d.level)
						})
						.curve(curveBasis)(data.slice(0, 37)),
				)
				.on('end', () => {
					dataLine.datum(data).attr(
						'd',
						lineRadial<Datum>()
							.angle(function (_, index) {
								return a(xDaysParsed[index])
							})
							.radius(function (d) {
								return r(d.level)
							})
							.curve(curveBasis)(data),
					)

					const newTotalLength = dataLine.node()?.getTotalLength() ?? 0
					dataLine
						.attr('stroke-dasharray', `${newTotalLength} ${newTotalLength}`)
						.attr('stroke-dashoffset', newTotalLength)
						.transition()
						.duration(750)
						.ease(easeCubicOut)
						.attr('stroke-dashoffset', 0)
				})
		}

		return
	}
	// Stretches
	if (to === 2) {
		r.domain(
			extent(data, (data) => {
				return data.level
			}) as [number, number],
		).nice()

		const winterShell = describeArc(0, 0, innerRadius, 0, 90)
		winterStretch
			.classed('on', true)
			.datum(data.slice(3112, 3126))
			.attr('d', (d) => {
				const line = lineRadial<Datum>()
					.angle((_, index) => {
						return a(xDaysParsed[index + 3112])
					})
					.radius((d) => {
						return r(d.level)
					})
					.curve(curveBasis)
				return `${line(d) ?? ''}${winterShell}`
			})

		const summerShell = describeArc(0, 0, innerRadius, 180, 270)
		summerStretch
			.classed('on', true)
			.datum(data.slice(3086, 3100))
			.attr('d', (d) => {
				const line = lineRadial<Datum>()
					.angle(function (_, index) {
						return a(xDaysParsed[index + 3086])
					})
					.radius(function (d) {
						return r(d.level)
					})
					.curve(curveBasis)
				return `${line(d) ?? ''}${summerShell}`
			})

		svg
			.select('#winter-polar-clip rect')
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('transform', 'rotate(-90)')
		svg
			.select('#summer-polar-clip rect')
			.transition()
			.duration(750)
			.ease(easeCubicOut)
			.attr('transform', 'rotate(90)')

		return
	}
}

export default updateViz
