import { easeCubic, easeCubicOut, interpolate, line, pointer, select } from 'd3'
import { ScaleLinear, ScaleTime } from 'd3-scale'

import { Data, VizData } from '../index'
import drawViz from './drawViz'

type Props = {
  selections: ReturnType<typeof drawViz>
  data: Data
  content: VizData['vizContent']
  xDays: number[]
  x: ScaleTime<number, number>
  y: ScaleLinear<number, number>
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

const mse = [18.2, 5.06, 0.97]

const updateViz = (to, { selections, content, data, x, y, xDays, margin }: Props) => {
  const {
    svg,
    dataLine,
    hoverLine,
    hoverDataCircle,
    hoverGroup,
    hoverDataLabel,
    hoverDataText,
    regLine,
    hoverRegCircle,
    hoverDiffLine,
    hoverRegLabel,
    hoverRegText,
    hoverDiffLabel,
    hoverDiffText,
    mseGroup,
    mseRect,
    mseTitle,
    mseEquationText,
    mseAccuracyText,
  } = selections

  const yReg = xDays.map(
    (d) => (content[1]?.params?.[0] ?? 0) + (content[1]?.params?.[1] ?? 0) * d,
  )
  const yRegQuad = xDays.map(
    (d) =>
      (content[2]?.params?.[0] ?? 0) +
      (content[2]?.params?.[1] ?? 0) * d +
      (content[2]?.params?.[2] ?? 0) * d ** 2,
  )
  const yRegCosine = xDays.map(
    (d) =>
      (content[3]?.params?.[0] ?? 0) +
      (content[3]?.params?.[1] ?? 0) * d +
      (content[3]?.params?.[2] ?? 0) * d ** 2 +
      (content[3]?.params?.[3] ?? 0) *
        Math.cos((2 * Math.PI * d) / 365.25 + (content[3]?.params?.[4] ?? 0)),
  )

  const hover =
    (state: number) =>
    (e: PointerEvent | null = null) => {
      let coor: [number, number]
      if (!e) {
        coor = [+hoverLine.attr('transform')?.split('(')[1].split(' ')[0], 0]
      } else {
        coor = pointer(e, e.target)
        svg.classed('hover-initiated', true)
      }

      const hoverDate = x.invert(coor[0] - margin.left)
      const closestDatumIndex = data.findIndex((el) => el.date >= hoverDate)

      if (closestDatumIndex <= 0) return

      const hoverY = y(data[closestDatumIndex].level) + margin.top

      // Hover effects on data line
      hoverLine.attr('transform', `translate(${coor[0]} 0)`)
      hoverDataCircle.attr('transform', `translate(${coor[0]} ${hoverY})`)
      hoverGroup
        .select('.hover-data-text')
        .text(data[closestDatumIndex].level.toFixed(2) + ' ppm')
      hoverGroup.attr(
        'transform',
        `translate(${coor[0]} ${y(
          314.574751 +
            0.00210065413 * xDays[closestDatumIndex] +
            0.0000000973625567 * xDays[closestDatumIndex] ** 2,
        )})`,
      )

      if (state > 0) {
        let yRegFn: number[] = yReg
        if (state === 2) {
          yRegFn = yRegQuad
        } else if (state === 3) {
          yRegFn = yRegCosine
        }

        const regHoverY = y(yRegFn[closestDatumIndex]) + margin.top
        const squaredError =
          (data[closestDatumIndex].level - yRegFn[closestDatumIndex]) ** 2

        hoverRegCircle.attr('transform', `translate(${coor[0]} ${regHoverY})`)
        hoverRegText.text(yRegFn[closestDatumIndex].toFixed(2) + ' ppm')
        hoverDiffLine.attr('d', `M${coor[0]},${regHoverY} ${coor[0]},${hoverY}`)
        hoverDiffText.text(squaredError.toFixed(2))
      }
    }

  // Initial
  if (to === 0) {
    // Animate data line
    const dataLineLength = dataLine.node()?.getTotalLength() ?? 0

    // if we're moving from step 1 back to step 0
    if (dataLine.classed('faded')) {
      dataLine.classed('faded', false)

      const regLineLength = regLine.node()?.getTotalLength() ?? 0
      regLine
        .attr('stroke-dasharray', `${regLineLength} ${regLineLength}`)
        .attr('stroke-dashoffset', 0)
        .transition()
        .duration(800)
        .ease(easeCubicOut)
        .attr('stroke-dashoffset', regLineLength)

      // if we're moving from step -1 to step 0
    } else if (dataLine.attr('opacity') === '0') {
      dataLine
        .attr('opacity', 1)
        .attr('stroke-dasharray', `${dataLineLength} ${dataLineLength}`)
        .attr('stroke-dashoffset', dataLineLength)
        .transition()
        .duration(800)
        .ease(easeCubic)
        .attr('stroke-dashoffset', 0)
    }

    hoverLine.classed('visible', true)
    hoverDataCircle.classed('visible', true)
    hoverGroup.classed('visible', true)
    hoverDataLabel.classed('visible', true)
    hoverDataText.classed('visible', true)

    hoverRegCircle.classed('visible', false)
    hoverRegLabel.classed('visible', false)
    hoverRegText.classed('visible', false)
    hoverDiffLine.classed('visible', false)
    hoverDiffLabel.classed('visible', false)
    hoverDiffText.classed('visible', false)
    hoverGroup.classed('big', false)
    hoverDataLabel.classed('big', false)
    hoverDataText.classed('big', false)
    mseGroup.classed('visible', false)

    svg.on('mousemove', hover(0))
    hover(0)()
    return
  }
  // Linear
  if (to === 1) {
    // if we're moving from step 2 back to step 1
    if (dataLine.classed('faded')) {
      regLine
        .transition()
        .duration(800)
        .ease(easeCubicOut)
        .attr('d', (data) =>
          line<Data[0]>()
            .x(function (d) {
              return x(d.date) + margin.left
            })
            .y(function (d, i) {
              return y(yReg[i]) + margin.top
            })(data),
        )
      // if we're moving from step 0 to step 1
    } else {
      dataLine.classed('faded', true)

      regLine.attr('d', (data) =>
        line<Data[0]>()
          .x(function (d) {
            return x(d.date) + margin.left
          })
          .y(function (d, i) {
            return y(yReg[i]) + margin.top
          })(data),
      )
      const regLineLength = regLine.node()?.getTotalLength() ?? 0
      regLine
        .attr('stroke-dasharray', `${regLineLength} ${regLineLength}`)
        .attr('stroke-dashoffset', regLineLength)
        .transition()
        .duration(800)
        .ease(easeCubicOut)
        .attr('stroke-dashoffset', 0)
        .attr('opacity', 1)
    }

    hoverRegCircle.classed('visible', true)
    hoverRegLabel.classed('visible', true)
    hoverRegText.classed('visible', true)
    hoverDiffLine.classed('visible', true)
    hoverDiffLabel.classed('visible', true)
    hoverDiffText.classed('visible', true)
    hoverGroup.classed('big', true)
    hoverDataLabel.classed('big', true)
    hoverDataText.classed('big', true)

    mseGroup.classed('visible', true)
    mseRect.classed('quadratic', false)
    mseTitle.text('Linear regression')
    mseEquationText.select('tspan.quadratic').classed('visible', false)
    mseAccuracyText
      .transition()
      .duration(600)
      .ease(easeCubicOut)
      .tween('text', function () {
        const i = interpolate(0, mse[0])
        return function (t) {
          select(this).text(i(t).toFixed(2))
        }
      })

    svg.on('mousemove', hover(1))
    hover(1)()
    return
  }
  // Quadratic
  if (to === 2) {
    regLine
      .attr('stroke-dasharray', 0)
      .attr('stroke-dashoffset', 0)
      .transition()
      .duration(800)
      .ease(easeCubicOut)
      .attr(
        'd',
        line<Data[0]>()
          .x(function (d) {
            return x(d.date) + margin.left
          })
          .y(function (d, i) {
            return y(yRegQuad[i]) + margin.top
          })(data),
      )

    mseRect.classed('quadratic', true)
    mseRect.classed('cosine', false)
    mseTitle.text('Quadratic regression')
    mseEquationText.select('tspan.quadratic').classed('visible', true)
    mseEquationText.select('tspan.cosine').classed('visible', false)
    mseEquationText.select('tspan:not(.quadratic)').classed('off', true)
    mseAccuracyText
      .transition()
      .duration(600)
      .ease(easeCubicOut)
      .tween('text', function () {
        const i = interpolate(mse[0], mse[1])
        return function (t) {
          select(this).text(i(t).toFixed(2))
        }
      })

    svg.on('mousemove', hover(2))
    hover(2)()
    return
  }
  // Cosine
  if (to === 3) {
    regLine
      .transition()
      .duration(800)
      .ease(easeCubicOut)
      .attr(
        'd',
        line<Data[0]>()
          .x(function (d) {
            return x(d.date) + margin.left
          })
          .y(function (d, i) {
            return y(yRegCosine[i]) + margin.top
          })(data),
      )

    mseRect.classed('cosine', true)
    mseTitle.text('Quadratic regression w/ cosine term')
    mseEquationText.select('tspan.cosine').classed('visible', true)
    mseEquationText.select('tspan:not(.cosine)').classed('off', true)
    mseAccuracyText
      .transition()
      .duration(600)
      .ease(easeCubicOut)
      .tween('text', function () {
        const i = interpolate(mse[1], mse[2])
        return function (t) {
          select(this).text(i(t).toFixed(2))
        }
      })

    svg.on('mousemove', hover(3))
    hover(3)()
    return
  }
}

export default updateViz
