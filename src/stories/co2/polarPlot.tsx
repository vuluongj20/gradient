import {
  curveBasis,
  easeCubic,
  easeCubicIn,
  easeCubicOut,
  extent,
  lineRadial,
  max,
  min,
  scaleLinear,
  select,
} from 'd3'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Data, VizData } from './content'
import VizContent, { VizDesText, VizScrollBox, VizSvgWrap } from './vizContent'

import useWindowHeight from '@utils/hooks/useWindowHeight'
import useWindowWidth from '@utils/hooks/useWindowWidth'

type Props = {
  data: Data
  content: VizData['vizContent']
}

const PolarPlot = ({ data, content }: Props) => {
  const [visible, setVisible] = useState(false)
  const [intersectionIndex, setIntersectionIndex] = useState(-1)
  const [currentState, setCurrentState] = useState(-1)
  const [vizCreated, setVizCreated] = useState(false)
  const [radius, setRadius] = useState<number>()
  const [windowWidth, isResizing] = useWindowWidth()
  const [windowHeight] = useWindowHeight()
  const vizRef = useRef(null)

  const margin = radius > 280 ? 40 : 20,
    innerRadius = radius - margin,
    a = scaleLinear()
      .domain([0, 365.25])
      .range([0, 2 * Math.PI]),
    r = scaleLinear()
      .domain([0, max(data, (d) => d.level)])
      .range([0, innerRadius])
      .nice(),
    minDate = min(data, (d) => d.date),
    xDays = data.map(
      (d) => (d.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
    xDaysParsed = xDays.map((d) => Math.floor(d % 365.25)),
    // polarToCartesian & describeArc from wdebeaum,
    // @stackoverflow: https://stackoverflow.com/a/5737245
    polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      }
    },
    describeArc = function (x, y, radius, startAngle, endAngle) {
      const start = polarToCartesian(x, y, radius, endAngle)
      const end = polarToCartesian(x, y, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
      const d = [
        'L',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        'Z',
      ].join(' ')
      return d
    },
    strokeWidth = radius / 200
  let totalLength = null

  /**
   * Draw visualization, should be called
   * on init and resize
   */
  const createViz = () => {
    const grandDaddy = select('#polar-plot'),
      svg = grandDaddy
        .select(`${VizSvgWrap}`)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + radius * 2 + ' ' + radius * 2)
        .attr('width', radius * 2)
        .attr('height', radius * 2)
        .attr('class', 'viz')
        .attr(
          'aria-label',
          'Polar plot that presents the same carbon dioxide data but as a circular swirl expanding outward',
        ),
      defs = svg.append('defs')

    grandDaddy.select('.viz-divider').attr('class', 'viz-divider on')

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

    const rAxis = svg
        .append('g')
        .attr('class', 'r axis')
        .attr('aria-hidden', 'true')
        .attr('transform', 'translate(' + radius + ' ' + radius + ')'),
      aAxis = svg
        .append('g')
        .attr('class', 'a axis')
        .attr('aria-hidden', 'true')
        .attr('transform', 'translate(' + radius + ' ' + radius + ')')

    rAxis
      .selectAll('circle')
      .data([...r.ticks(5), 320, 340, 360, 380])
      .enter()
      .append('circle')
      .attr('class', (d) => {
        return 'grid-circle' + (d > 300 && d < 400 ? ' secondary' : '')
      })
      .attr('stroke-width', strokeWidth / 2)
      .attr('transform', 'rotate(-90)')
      .attr('r', r)
      .attr('stroke-dasharray', (d) => {
        return 2 * Math.PI * r(d) + ' ' + 2 * Math.PI * r(d)
      })
      .attr('stroke-dashoffset', (d) => {
        return 2 * Math.PI * r(d)
      })
      .transition()
      .duration(800)
      .ease(easeCubic)
      .attr('stroke-dashoffset', 0)
    rAxis
      .append('circle')
      .attr('class', 'grid-circle')
      .attr('stroke-width', strokeWidth / 2)
      .attr('transform', 'rotate(-90)')
      .attr('r', innerRadius)
      .attr(
        'stroke-dasharray',
        2 * Math.PI * innerRadius + ' ' + 2 * Math.PI * innerRadius,
      )
      .attr('stroke-dashoffset', 2 * Math.PI * innerRadius)
      .transition()
      .duration(800)
      .ease(easeCubic)
      .attr('stroke-dashoffset', 0)

    rAxis
      .selectAll('g')
      .data([...r.ticks(5).slice(1), 320, 340, 360, 380])
      .enter()
      .append('text')
      .attr('class', (d) => {
        return 'r tick' + (d > 300 && d < 400 ? ' secondary' : '')
      })
      .attr('transform', function (d) {
        return (
          'translate(' +
          r(d) * Math.cos((-11 * Math.PI) / 12) +
          ' ' +
          r(d) * Math.sin((-11 * Math.PI) / 12) +
          ')'
        )
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .text(function (d) {
        return d
      })

    aAxis
      .selectAll('line')
      .data(Array(6))
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('stroke-width', strokeWidth / 2)
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -innerRadius)
      .attr('y2', innerRadius)
      .attr('transform', function (_, i) {
        return 'rotate(' + 30 * i + ')'
      })
      .attr('stroke-dasharray', 2 * innerRadius + ' ' + 2 * innerRadius)
      .attr('stroke-dashoffset', 2 * innerRadius)
      .transition()
      .duration(800)
      .ease(easeCubic)
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

    setVizCreated(true)
  }

  /**
   * Update visualization based on the current
   * and next step number
   */
  const updateFunc = (to: number, from: number) => {
    const grandDaddy = select('#polar-plot'),
      svg = grandDaddy.select('svg')

    const newText =
      to !== -1
        ? vizRef.current?.querySelector(`${VizDesText}:nth-child(${to + 1})`)
        : null
    if (to > from) {
      if (newText) {
        newText.classList.add('on')
      }
      const increment = (target) => {
        switch (target) {
          case 0: // One
            // Main data line
            svg
              .append('path')
              .attr('class', 'data-line')
              .datum(data.slice(0, 37))
              .attr('transform', 'translate(' + radius + ' ' + radius + ')')
              .attr('stroke-width', strokeWidth * 1.5)
              .attr(
                'd',
                lineRadial()
                  .angle(function (_, index) {
                    return a(xDaysParsed[index])
                  })
                  .radius(function (d) {
                    return r(d.level)
                  })
                  .curve(curveBasis),
              )
            totalLength = grandDaddy.select('.data-line').node().getTotalLength()
            grandDaddy
              .select('.data-line')
              .attr('stroke-dasharray', totalLength + ' ' + totalLength)
              .attr('stroke-dashoffset', totalLength)
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('stroke-dashoffset', 0)
            break
          case 1: // All
            r.domain(
              extent(data, (data) => {
                return data.level
              }),
            ).nice()
            // Remove unneeded circles and ticks
            grandDaddy
              .selectAll('.grid-circle')
              .filter((_, i) => {
                return i < 4
              })
              .attr('class', 'grid-circle off')
              .transition()
              .duration(1200)
              .ease(easeCubicIn)
              .attr('r', 0)
            grandDaddy
              .selectAll('.r.tick')
              .filter((_, i) => {
                return i < 3
              })
              .attr('class', 'r tick off')
              .transition()
              .duration(1200)
              .ease(easeCubicIn)
              .attr('transform', 'translate(0 0)')
            // Move 400 circle and tick
            grandDaddy
              .selectAll('.grid-circle:nth-child(5)')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('r', r)
            grandDaddy
              .selectAll('.r.tick:nth-child(4)')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('transform', function (d) {
                return (
                  'translate(' +
                  r(d) * Math.cos((-11 * Math.PI) / 12) +
                  ' ' +
                  r(d) * Math.sin((-11 * Math.PI) / 12) +
                  ')'
                )
              })
            // Add new circles and ticks
            grandDaddy
              .selectAll('.grid-circle.secondary')
              .attr('class', 'grid-circle secondary on')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('r', r)
            grandDaddy
              .selectAll('.r.tick.secondary')
              .attr('class', 'r tick secondary on')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('transform', function (d) {
                return (
                  'translate(' +
                  r(d) * Math.cos((-11 * Math.PI) / 12) +
                  ' ' +
                  r(d) * Math.sin((-11 * Math.PI) / 12) +
                  ')'
                )
              })

            grandDaddy
              .select('.data-line')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr(
                'd',
                lineRadial()
                  .angle(function (_, index) {
                    return a(xDaysParsed[index])
                  })
                  .radius(function (d) {
                    return r(d.level)
                  })
                  .curve(curveBasis),
              )
              .on('end', () => {
                const dataLine = grandDaddy
                    .select('.data-line')
                    .datum(data)
                    .attr(
                      'd',
                      lineRadial()
                        .angle(function (_, index) {
                          return a(xDaysParsed[index])
                        })
                        .radius(function (d) {
                          return r(d.level)
                        })
                        .curve(curveBasis),
                    ),
                  newTotalLength = dataLine.node().getTotalLength()
                dataLine
                  .attr('stroke-dasharray', newTotalLength + ' ' + newTotalLength)
                  .attr('stroke-dashoffset', newTotalLength)
                  .transition()
                  .duration(800)
                  .ease(easeCubicOut)
                  .attr('stroke-dashoffset', 0)
              })
            break
          case 2: // Stretches
            r.domain(
              extent(data, (data) => {
                return data.level
              }),
            ).nice()
            svg
              .append('path')
              .attr('class', 'winter stretch')
              .attr('clip-path', 'url(#winter-polar-clip)')
              .datum(data.slice(3112, 3126))
              .attr('transform', 'translate(' + radius + ' ' + radius + ')')
              .attr('stroke-width', strokeWidth / 2)
              .attr('d', (data) => {
                const line = lineRadial()
                    .angle((_, index) => {
                      return a(xDaysParsed[index + 3112])
                    })
                    .radius((d) => {
                      return r(d.level)
                    })
                    .curve(curveBasis),
                  shell = describeArc(0, 0, innerRadius, 0, 90)
                return line(data) + shell
              })
            svg
              .append('path')
              .attr('class', 'summer stretch')
              .attr('clip-path', 'url(#summer-polar-clip)')
              .datum(data.slice(3086, 3100))
              .attr('transform', 'translate(' + radius + ' ' + radius + ')')
              .attr('stroke-width', strokeWidth / 2)
              .attr('d', (data) => {
                const line = lineRadial()
                    .angle(function (_, index) {
                      return a(xDaysParsed[index + 3086])
                    })
                    .radius(function (d) {
                      return r(d.level)
                    })
                    .curve(curveBasis),
                  shell = describeArc(0, 0, innerRadius, 180, 270)
                return line(data) + shell
              })

            grandDaddy
              .select('#winter-polar-clip rect')
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('transform', 'rotate(-90)')
            grandDaddy
              .select('#summer-polar-clip rect')
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('transform', 'rotate(90)')
            break
          default:
        }
      }
      for (let i = from; i < to; i++) {
        const prevText = vizRef.current?.querySelector(
          `${VizDesText}:nth-child(${to + 1})`,
        )
        increment(i + 1)
        if (prevText) {
          prevText.classList.remove('on')
          prevText.classList.remove('on-reverse')
        }
      }
    } else if (to < from) {
      if (newText) {
        newText.classList.add('on-reverse')
      }
      const decrement = (target) => {
        switch (target) {
          case -1: // Init
            const dataLine = grandDaddy.select('.data-line')
            totalLength = dataLine.node().getTotalLength()

            dataLine
              .attr('stroke-dasharray', totalLength + ' ' + totalLength)
              .attr('stroke-dashoffset', 0)
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('stroke-dashoffset', totalLength)
              .remove()
            break
          case 0: // One
            r.domain([
              0,
              max(data, (d) => {
                return d.level
              }),
            ]).nice()
            // Remove unneeded circles and ticks
            grandDaddy
              .selectAll('.grid-circle')
              .filter((_, i) => {
                return i < 4
              })
              .attr('class', 'grid-circle')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('r', r)
            grandDaddy
              .selectAll('.r.tick')
              .filter((_, i) => {
                return i < 3
              })
              .attr('class', 'r tick')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('transform', function (d) {
                return (
                  'translate(' +
                  r(d) * Math.cos((-11 * Math.PI) / 12) +
                  ' ' +
                  r(d) * Math.sin((-11 * Math.PI) / 12) +
                  ')'
                )
              })
            // Move 400 circle and tick
            grandDaddy
              .selectAll('.grid-circle:nth-child(5)')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('r', r)
            grandDaddy
              .selectAll('.r.tick:nth-child(4)')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('transform', function (d) {
                return (
                  'translate(' +
                  r(d) * Math.cos((-11 * Math.PI) / 12) +
                  ' ' +
                  r(d) * Math.sin((-11 * Math.PI) / 12) +
                  ')'
                )
              })
            // Add new circles and ticks
            grandDaddy
              .selectAll('.grid-circle.secondary')
              .attr('class', 'grid-circle secondary')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('r', r)
            grandDaddy
              .selectAll('.r.tick.secondary')
              .attr('class', 'r tick secondary')
              .transition()
              .duration(800)
              .ease(easeCubicIn)
              .attr('transform', function (d) {
                return (
                  'translate(' +
                  r(d) * Math.cos((-11 * Math.PI) / 12) +
                  ' ' +
                  r(d) * Math.sin((-11 * Math.PI) / 12) +
                  ')'
                )
              })

            grandDaddy
              .select('.data-line')
              .datum(data.slice(0, 37))
              .transition()
              .duration(400)
              .ease(easeCubicIn)
              .style('opacity', 0)
              .on('end', () => {
                const dataLine = grandDaddy
                    .select('.data-line')
                    .datum(data.slice(0, 37))
                    .style('opacity', 1)
                    .attr(
                      'd',
                      lineRadial()
                        .angle(function (_, index) {
                          return a(xDaysParsed[index])
                        })
                        .radius(function (d) {
                          return r(d.level)
                        })
                        .curve(curveBasis),
                    ),
                  newTotalLength = dataLine.node().getTotalLength()

                dataLine
                  .attr('stroke-dasharray', newTotalLength + ' ' + newTotalLength)
                  .attr('stroke-dashoffset', newTotalLength)
                  .transition()
                  .duration(800)
                  .ease(easeCubic)
                  .attr('stroke-dashoffset', 0)
              })
            break
          case 1: // All
            grandDaddy
              .select('#winter-polar-clip rect')
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('transform', 'rotate(-180)')
            grandDaddy
              .select('#summer-polar-clip rect')
              .transition()
              .duration(800)
              .ease(easeCubic)
              .attr('transform', 'rotate(0)')

            grandDaddy.select('.summer.stretch').transition().delay(800).remove()
            grandDaddy.select('.winter.stretch').transition().delay(800).remove()
            break
          default:
        }
      }
      for (let i = from; i > to; i--) {
        const prevText = vizRef.current?.querySelector(
          `${VizDesText}:nth-child(${to + 1})`,
        )
        decrement(i - 1)
        if (prevText) {
          prevText.classList.remove('on')
          prevText.classList.remove('on-reverse')
        }
      }
    }
    setCurrentState(to)
  }

  // Initialize visualization once the section becomes visible
  useEffect(() => {
    if (visible) {
      createViz()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  // Watch for updates to the container's width. When this happens,
  // re-render the entire viz.
  useEffect(() => {
    setTimeout(() => {
      const newContainerWidth = vizRef.current?.offsetWidth
      const newRadius = Math.min(newContainerWidth - 15, windowHeight * 0.85) / 2
      newRadius && setRadius(newRadius)
    })
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if (!visible) {
      return
    }
    select('#polar-plot .viz').remove()
    createViz()
    updateFunc(currentState, -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius])

  useEffect(() => {
    if (intersectionIndex > -1) {
      if (!vizCreated) {
        createViz()
      }
      updateFunc(intersectionIndex, currentState)
    } else if (vizCreated) {
      updateFunc(intersectionIndex, currentState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersectionIndex])

  // Add intersection observers once component mounts
  useEffect(() => {
    const vizObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          setVisible(true)
        }
      },
      {
        rootMargin: '-50%',
        threshold: 0,
      },
    )
    vizObserver.observe(vizRef.current)

    const vizScrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            setIntersectionIndex(index)
          }
        })
      },
      {
        threshold: 0,
      },
    )
    document.querySelectorAll(`#polar-plot ${VizDesText}`).forEach((el) => {
      vizScrollObserver.observe(el)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrap id="polar-plot" className="viz-outer-wrap" ref={vizRef}>
      <VizContent content={content} isResizing={isResizing} />
    </Wrap>
  )
}

export default PolarPlot

const Wrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints.m};
  margin: 0 auto;

  ${VizScrollBox} {
    right: 0;
  }

  /* Axes */
  .axis .tick,
  .ticks .tick {
    font-size: 0.875rem;
    position: relative;
    fill: ${(p) => p.theme.label};
    transition: opacity ${(p) => p.theme.animation.outCubic} 800ms;
  }

  ${(p) => p.theme.utils.media.s} {
    .axis .tick,
    .ticks .tick {
      font-size: 0.75rem;
    }
  }

  .tick:not(.secondary) {
    animation: opacity ${(p) => p.theme.animation.outCubic} 800ms;
  }
  .ticks .tick .text {
    fill: ${(p) => p.theme.label};
  }

  /* Grid lines */
  .grid-line,
  .grid-circle {
    fill: none;
    stroke: ${(p) => p.theme.line};
    opacity: 0.8;
    stroke-width: 1;
    transition: opacity ${(p) => p.theme.animation.outCubic} 800ms;
  }
  .grid-circle.secondary,
  .r.tick.secondary,
  .grid-circle.off,
  .r.tick.off {
    opacity: 0;
  }
  .grid-circle.secondary.on,
  .r.tick.secondary.on {
    opacity: 1;
  }

  .data-line {
    stroke-linejoin: round;
    fill: none;
    stroke: ${(p) => p.theme.label};
    opacity: 0.8;
    transition: stroke 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .stretch {
    stroke: ${(p) => p.theme.label};
  }
  .winter.stretch {
    fill: var(--cool);
    opacity: 0.4;
  }
  .summer.stretch {
    fill: var(--warm);
    opacity: 0.4;
  }
`
