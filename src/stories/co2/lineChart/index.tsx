import { extent, line, min, scaleLinear, scaleTime, select } from 'd3'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Datum } from '../index'
import VizContent, { VizDesText } from '../vizContent'
import drawViz from './drawViz'
import updateViz from './updateViz'
import Wrap from './wrap'

import usePrevious from '@utils/usePrevious'
import useWindowHeight from '@utils/useWindowHeight'
import useWindowWidth from '@utils/useWindowWidth'

const trackHeight = '600vh'
const content = [
  {
    state: 'initial',
    des: 'Here is the data in its entirety. CO₂ is measured in ppm (parts-per-million). Hover over the plot for more details.',
  },
  {
    state: 'linear',
    des: 'There is a clear and consistent upward trend through the years. The average increase is +0.4% each year.',
    params: [306.06644452, 0.00430901514],
  },
  {
    state: 'quadratic',
    des: 'In fact, the regression line curves upward. This means that CO₂ levels are not only increasing but also accelerating at an alarming rate.',
    params: [314.574751, 0.00210065413, 0.0000000973625567],
  },
  {
    state: 'cosine',
    des: 'There are yearly peaks during winter months, when we burn more coal for energy, and plants naturally release more CO₂ when there is less sunlight.',
    params: [314.569048, 0.00210632696, 0.0000000970576557, 2.86111474, -0.554076698],
  },
]

interface LineChartProps {
  data: Datum[]
}

const LineChart = ({ data }: LineChartProps) => {
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
      line<Datum>()
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
    [data, x, y, xDays, margin],
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
    select('#line-chart svg').remove()
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
    <Wrap id="line-chart">
      <VizContent
        ref={vizRef}
        height={trackHeight}
        content={content}
        isResizing={isResizing}
      />
    </Wrap>
  )
}

export default LineChart
