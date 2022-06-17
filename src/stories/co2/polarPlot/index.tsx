import { max, min, scaleLinear, select } from 'd3'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Data, VizData } from '../index'
import VizContent, { VizDesText } from '../vizContent'
import drawViz from './drawViz'
import updateViz from './updateViz'
import Wrap from './wrap'

import usePrevious from '@utils/hooks/usePrevious'
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
  const [radius, setRadius] = useState<number>(0)
  const [windowWidth, isResizing] = useWindowWidth()
  const [windowHeight] = useWindowHeight()
  const vizRef = useRef<HTMLDivElement>(null)

  const prevRadius = usePrevious(radius)
  const prevIntersectionIndex = usePrevious(intersectionIndex)

  const margin = radius > 280 ? 40 : 20,
    innerRadius = radius - margin,
    a = scaleLinear()
      .domain([0, 365.25])
      .range([0, 2 * Math.PI]),
    r = scaleLinear()
      .domain([0, max(data, (d) => d.level) ?? 0])
      .range([0, innerRadius])
      .nice(),
    minDate = min(data, (d) => d.date) as Date,
    xDays = data.map(
      (d) => (d.date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
    xDaysParsed = xDays.map((d) => Math.floor(d % 365.25)),
    // polarToCartesian & describeArc from wdebeaum,
    // @stackoverflow: https://stackoverflow.com/a/5737245
    polarToCartesian = function (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number,
    ) {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      }
    },
    describeArc = useCallback(
      (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
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
      [],
    )
  const selections = useRef<ReturnType<typeof drawViz>>()

  /**
   * Draw visualization, should be called
   * on init and resize
   */
  const createViz = useCallback(() => {
    const viz = drawViz({ innerRadius, r, radius })
    selections.current = viz
    setVizCreated(true)
  }, [innerRadius, r, radius])

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
            data,
            radius,
            innerRadius,
            a,
            r,
            xDaysParsed,
            describeArc,
          })
        }
      } else if (to < from) {
        for (let i = from; i > to; i--) {
          updateViz(i - 1, {
            selections: selections.current,
            data,
            radius,
            innerRadius,
            a,
            r,
            xDaysParsed,
            describeArc,
          })
        }
      }
      setCurrentState(to)
    },
    [innerRadius, radius, a, r, data, describeArc, xDaysParsed],
  )

  // Initialize visualization once the section becomes visible
  const prevVisible = usePrevious(visible)
  useEffect(() => {
    if (visible && visible !== prevVisible) {
      createViz()
    }
  }, [visible, prevVisible, createViz])

  // Watch for updates to the container's width. When this happens,
  // re-render the entire viz.
  useLayoutEffect(() => {
    const newContainerWidth = vizRef.current?.offsetWidth ?? 0
    const newRadius = Math.min(newContainerWidth - 15, windowHeight * 0.85) / 2
    newRadius && setRadius(newRadius)
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if (!visible || radius === prevRadius) {
      return
    }
    select('#polar-plot svg').remove()
    createViz()
    updateFunc(currentState, -1)
  }, [radius, prevRadius, visible, currentState, createViz, updateFunc])

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
    createViz,
    currentState,
    updateFunc,
    vizCreated,
  ])

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
    document.querySelectorAll(`#polar-plot ${VizDesText}`).forEach((el) => {
      vizScrollObserver.observe(el)
    })
  }, [visible])

  return (
    <Wrap id="polar-plot" className="viz-outer-wrap" ref={vizRef}>
      <VizContent content={content} isResizing={isResizing} />
    </Wrap>
  )
}

export default PolarPlot
