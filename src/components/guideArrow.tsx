import { nanoid } from 'nanoid'
import { ForwardRefRenderFunction, SVGAttributes, forwardRef, useMemo } from 'react'
import styled from 'styled-components'

type Position = 'top' | 'bottom' | 'left' | 'right'

type Props = SVGAttributes<SVGSVGElement> & {
  from: Position
  to: Position
}

const controlRatio = 0.7

const GuideArrow: ForwardRefRenderFunction<SVGSVGElement, Props> = (
  { from, to, ...props },
  ref,
) => {
  const markerId = useMemo(() => nanoid(), [])
  const linePath = useMemo(() => {
    let fromPath
    let toPath

    switch (from) {
      case 'top':
        fromPath = `M 50 0 C 50 ${controlRatio * 50}`
        break
      case 'bottom':
        fromPath = `M 50 100 C 50 ${100 - controlRatio * 50}`
        break
      case 'left':
        fromPath = `M 0 50 C ${controlRatio * 50} 50`
        break
      case 'right':
        fromPath = `M 100 50 C ${100 - controlRatio * 50} 50`
        break
    }

    switch (to) {
      case 'top':
        toPath = `, 50 ${controlRatio * 50}, 50 0`
        break
      case 'bottom':
        toPath = `, 50 ${100 - controlRatio * 50}, 50 100`
        break
      case 'left':
        toPath = `, ${controlRatio * 50} 50, 0 50`
        break
      case 'right':
        toPath = `, ${100 - controlRatio * 50} 50, 100 50`
        break
    }

    return `${fromPath}${toPath}`
  }, [from, to])

  return (
    <SVG
      ref={ref}
      overflow="visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      {...props}
    >
      <defs>
        <marker
          id={`marker-${markerId}`}
          viewBox="0 0 20 20"
          markerWidth="20"
          markerHeight="20"
          refX="16"
          refY="10"
          orient="auto-start-reverse"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M 4,4 L 16,10 L 4,16" vectorEffect="non-scaling-stroke" />
        </marker>
      </defs>

      <path
        d={linePath}
        markerEnd={`url(#marker-${markerId})`}
        vectorEffect="non-scaling-stroke"
      />
    </SVG>
  )
}

export default forwardRef(GuideArrow)

const SVG = styled.svg`
  flex-shrink: 0;
  fill: none;
  stroke: ${(p) => p.theme.bar};
  stroke-linecap: round;
  stroke-linejoin: round;
`
