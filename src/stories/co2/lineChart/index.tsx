import { extent, line, min, scaleLinear, scaleTime, select } from 'd3'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { Data, VizData } from '../index'
import VizContent, { VizDesText } from '../vizContent'
import drawViz from './drawViz'
import updateViz from './updateViz'

import usePrevious from '@utils/hooks/usePrevious'
import useWindowHeight from '@utils/hooks/useWindowHeight'
import useWindowWidth from '@utils/hooks/useWindowWidth'

type Props = {
  data: Data
  content: VizData['vizContent']
}

const LineChart = ({ data, content }: Props) => {
  const [intersectionIndex, setIntersectionIndex] = useState(-1)
  const [currentState, setCurrentState] = useState(-1)
  const [vizCreated, setVizCreated] = useState(false)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [windowWidth, isResizing] = useWindowWidth()
  const [windowHeight] = useWindowHeight()
  const vizRef = useRef<HTMLDivElement>(null)
  const selections = useRef<ReturnType<typeof drawViz>>()

  const prevIntersectionIndex = usePrevious(intersectionIndex)
  const prevWidth = usePrevious(width)
  const prevHeight = usePrevious(height)

  const margin = useMemo(
      () => ({
        top: 20,
        right: width > 700 ? 60 : 36,
        bottom: width > 700 ? 40 : 24,
        left: 0,
      }),
      [width],
    ),
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    x = scaleTime()
      .domain(
        extent(data, (d) => {
          return d.date
        }) as [Date, Date],
      )
      .range([0, innerWidth])
      .nice(),
    y = scaleLinear()
      .domain(
        extent(data, (d) => {
          return d.level
        }) as [number, number],
      )
      .range([innerHeight, 0])
      .nice(),
    minDate = min(data, function (d) {
      return d.date
    }) as Date,
    xDays = data.map((d) =>
      Math.ceil((d.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)),
    )

  /**
   * Draw visualization, should be called
   * on init and resize
   */
  const createViz = useCallback(() => {
    const viz = drawViz({
      height,
      innerHeight,
      width,
      innerWidth,
      x,
      y,
      margin,
    })

    const { dataLine, regLine, svg } = viz

    // Attach data to initial elements
    regLine.datum(data)
    dataLine.datum(data).attr(
      'd',
      line<Data[0]>()
        .x(function (d) {
          return x(d.date) + margin.left
        })
        .y(function (d) {
          return y(d.level) + margin.top
        })(data),
    )

    // Prepare data line for path animation
    const dataLineLength = dataLine.node()?.getTotalLength() ?? 0
    dataLine
      .attr('stroke-dasharray', `${dataLineLength} ${dataLineLength}`)
      .attr('stroke-dashoffset', dataLineLength)

    svg.on('mouseleave', () => svg.classed('hover-initiated', false))

    selections.current = viz
    setVizCreated(true)
  }, [data, height, innerHeight, width, innerWidth, x, y, margin])

  /**
   * Update visualization based on the current
   * and next step number
   */
  const updateFunc = useCallback(
    (to: number, from: number) => {
      if (!selections.current) return

      if (to > from) {
        for (let i = from; i < to; i++) {
          updateViz(i + 1, {
            selections: selections.current,
            content,
            data,
            x,
            y,
            xDays,
            margin,
          })
        }
      } else if (to < from) {
        for (let i = from; i > to; i--) {
          updateViz(i - 1, {
            selections: selections.current,
            content,
            data,
            x,
            y,
            xDays,
            margin,
          })
        }
      }
      setCurrentState(to)
    },
    [content, data, x, y, xDays, margin],
  )

  // Initialize visualization once the section becomes visible
  const [visible, setVisible] = useState(false)
  const prevVisible = usePrevious(visible)
  useEffect(() => {
    if (visible && visible !== prevVisible) {
      createViz()
    }
  }, [visible, prevVisible, createViz])

  // Watch for updates to the container's width. When this happens,
  // re-render the entire viz.
  useLayoutEffect(() => {
    setTimeout(() => {
      const newWidth = vizRef.current?.offsetWidth
      newWidth && setWidth(newWidth)

      const newHeight = Math.min(windowHeight * 0.85, windowWidth * 1.2)
      setHeight(newHeight)
    })
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if ((width === prevWidth && height === prevHeight) || !visible) {
      return
    }
    select('#line-chart .viz').remove()
    createViz()
    updateFunc(currentState, -1)
  }, [width, prevWidth, height, prevHeight, visible, createViz, currentState, updateFunc])

  // Add intersection observers once component mounts
  useEffect(() => {
    if (visible) {
      return
    }

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
    vizRef.current && vizObserver.observe(vizRef.current)

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
    document.querySelectorAll(`#line-chart ${VizDesText}`).forEach((el) => {
      vizScrollObserver.observe(el)
    })
  }, [visible])

  useEffect(() => {
    if (intersectionIndex === prevIntersectionIndex) {
      return
    }

    if (intersectionIndex > -1) {
      if (!vizCreated) {
        createViz()
      }
      updateFunc(intersectionIndex, currentState)
    } else if (vizCreated) {
      updateFunc(intersectionIndex, currentState)
    }
  }, [
    intersectionIndex,
    prevIntersectionIndex,
    vizCreated,
    createViz,
    currentState,
    updateFunc,
  ])

  return (
    <Wrap id="line-chart" className="viz-outer-wrap" ref={vizRef}>
      <VizContent content={content} isResizing={isResizing} />
    </Wrap>
  )
}

export default LineChart

const Wrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints.l};
  margin: 0 auto;

  .viz-svg-wrap {
    width: 85%;
    overflow: visible;
  }

  /* Axes */
  .axis > .domain {
    display: none;
  }
  .axis text {
    font-size: 0.875rem;
    color: ${(p) => p.theme.label};
    ${(p) => p.theme.utils.media.s} {
      font-size: 0.75rem;
    }
  }

  .axis.x text {
    transform: translateX(1.6rem);
  }
  .axis.y text {
    transform: translateY(-0.8rem);
  }
  .bottom-axis {
    stroke: ${(p) => p.theme.label};
    stroke-linecap: round;
    stroke-width: 2;
  }

  /* Grid lines */
  .grid > .domain {
    display: none;
  }
  .grid line {
    stroke: ${(p) => p.theme.line};
    opacity: 0.8;
  }

  /* Data line */
  .data-line {
    stroke: ${(p) => p.theme.body};
    stroke-width: 2;
    stroke-linejoin: round;
    fill: none;
    transition: stroke 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    ${(p) => p.theme.utils.media.xs} {
      stroke-width: 1.5;
    }
  }
  .data-line.faded {
    opacity: 0.2;
  }

  /* Regression line */
  .reg-line {
    stroke: var(--theme);
    stroke-width: 3;
    stroke-linejoin: round;
    fill: none;
    ${(p) => p.theme.utils.media.xs} {
      stroke-width: 2;
    }
  }

  /* Hover elements */
  .hover-line,
  .hover-data-circle,
  .hover-text-group,
  .hover-reg-circle,
  .hover-reg-label,
  .hover-reg-text,
  .hover-diff-line,
  .hover-diff-label,
  .hover-diff-text {
    opacity: 0;
    transition: opacity ${(p) => p.theme.animation.fastOut};
  }
  svg.hover-initiated:hover {
    .hover-line.visible,
    .hover-data-circle.visible,
    .hover-text-group.visible,
    .hover-reg-circle.visible,
    .hover-reg-label.visible,
    .hover-reg-text.visible,
    .hover-diff-line.visible,
    .hover-diff-label.visible,
    .hover-diff-text.visible {
      opacity: 1;
    }
  }
  .hover-line {
    stroke: ${(p) => p.theme.label};
    stroke-width: 2;
  }
  .hover-data-circle {
    fill: var(--theme);
  }
  .hover-data-circle.out {
    fill: var(--warm);
  }
  .hover-text-group {
    font-size: 0.875rem;
    ${(p) => p.theme.utils.media.s} {
      font-size: 0.75rem;
    }
  }
  .hover-rect {
    width: 13.1em;
    height: 2.8em;
    fill: ${(p) => p.theme.oBackground};
    stroke: ${(p) => p.theme.line};
    transform: translate(-14.6em, -4.72em);
    transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    will-change: transform, width, height;
    filter: drop-shadow(${(p) => p.theme.shadows.s});
  }
  .hover-text-group.big > .hover-rect {
    width: 17.8em;
    height: 6.4em;
    transform: translate(-19em, -8.75em);
  }

  .hover-data-label,
  .hover-reg-label,
  .hover-diff-label {
    fill: ${(p) => p.theme.label};
  }

  .hover-data-label {
    transform: translate(-13.46em, -3em);
  }
  .hover-data-text {
    fill: ${(p) => p.theme.heading};
    transform: translate(-8.8em, -3em);
    font-weight: 700;
  }
  .hover-data-label.big {
    transform: translate(-13.46em, -7em);
  }
  .hover-data-text.big {
    transform: translate(-8.8em, -7em);
  }
  .hover-data-text.out {
    fill: ${(p) => p.theme.body};
  }

  .hover-reg-circle {
    fill: var(--theme);
  }
  .hover-reg-label {
    transform: translate(-15.9em, -5.2em);
  }
  .hover-reg-text {
    fill: var(--theme);
    transform: translate(-8.8em, -5.2em);
    font-weight: 700;
  }

  .hover-diff-line {
    stroke: ${(p) => p.theme.errorText};
    stroke-width: 2;
  }
  .hover-diff-label {
    transform: translate(-17.7em, -3.4em);
  }
  .hover-diff-text {
    fill: ${(p) => p.theme.errorText};
    transform: translate(-8.8em, -3.4em);
    font-weight: 700;
  }

  /* MSE */
  .mse-group {
    font-size: 0.875rem;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
  ${(p) => p.theme.utils.media.s} {
    .mse-group {
      display: none;
    }
  }
  .mse-rect {
    fill: ${(p) => p.theme.oBackground};
    stroke: ${(p) => p.theme.line};
    stroke-width: 1;
    rx: 0.4rem;
    ry: 0.4rem;
    width: 12.6em;
    height: 5.8em;
    transform: translate(-1.2em, -1.65em);
    will-change: width;
    transition: width 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    filter: drop-shadow(${(p) => p.theme.shadows.s});
  }
  .mse-rect.quadratic {
    width: 14.8em;
  }
  .mse-rect.cosine {
    width: 24em;
  }
  .mse-title {
    fill: ${(p) => p.theme.label};
  }
  .mse-equation-label {
    fill: ${(p) => p.theme.label};
    transform: translateY(1.6em);
  }
  .mse-equation {
    position: absolute;
    fill: ${(p) => p.theme.label};
    transform: translate(3.6em, 1.6em);
  }
  .mse-equation > tspan {
    fill: ${(p) => p.theme.body};
    font-weight: 700;
    visibility: hidden;
    &.linear,
    &.visible {
      visibility: visible;
    }
  }
  .mse-equation > .span.off {
    fill: ${(p) => p.theme.label};
  }
  .mse-acc-label {
    fill: ${(p) => p.theme.label};
    transform: translateY(3.2em);
  }
  .mse-acc-text {
    fill: ${(p) => p.theme.errorText};
    transform: translate(3.2em, 3.2em);
    font-weight: 700;
  }
`
