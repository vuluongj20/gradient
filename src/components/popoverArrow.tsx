import { PlacementAxis } from '@react-types/overlays'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: 's' | 'm' | 'l'
  strokeWidth?: number
  placement: PlacementAxis
}

function getArrowWidth(size: Props['size']) {
  switch (size) {
    case 's':
      return 16
    case 'l':
      return 32
    case 'm':
    default:
      return 24
  }
}

export function getArrowHeight(size: Props['size']) {
  return Math.round(getArrowWidth(size) / 3)
}

const Arrow = ({ size = 'm', strokeWidth = 1, placement, ...props }: Props) => {
  /**
   * Width
   */
  const w = getArrowWidth(size)
  /**
   * Height
   */
  const h = getArrowHeight(size)

  /**
   * Stroke width
   */
  const s = strokeWidth
  const arrowPath = [
    `M 0 ${h - s / 2}`,
    `C ${w * 0.4} ${h - s / 2} ${w * 0.45} 0 ${w / 2} 0`,
    `C ${w * 0.55} 0 ${w * 0.6} ${h - s / 2} ${w} ${h - s / 2}`,
  ].join('')

  return (
    <Wrap placement={placement} {...props}>
      <SVG overflow="visible" width={w} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <mask id="stroke-mask">
            <rect x="0" y={-strokeWidth} width="100%" height="100%" fill="white" />
          </mask>
          <mask id="fill-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <path d={arrowPath} vectorEffect="non-scaling-stroke" stroke="black" />
          </mask>
        </defs>

        <path d={`${arrowPath} V ${h} H 0 Z`} mask="url(#fill-mask)" className="fill" />
        <path d={arrowPath} mask="url(#stroke-mask)" className="stroke" />
      </SVG>
    </Wrap>
  )
}

export default Arrow

const Wrap = styled.div<{ placement: PlacementAxis }>`
  width: 0;
  height: 0;
  position: absolute;
  display: flex;
  align-items: end;
  justify-content: center;
  transform-origin: center bottom;

  ${(p) => p.placement === 'top' && `bottom: 0; transform: rotate(180deg);`}
  ${(p) => p.placement === 'bottom' && `top: 0;`}
  ${(p) => p.placement === 'left' && `right: 0; transform: rotate(90deg);`}
  ${(p) => p.placement === 'right' && `left: 0; transform: rotate(-90deg);`}
`

const SVG = styled.svg`
  flex-shrink: 0;
  fill: none;
  stroke: none;

  /* Fix SVG rendering issue in Safari */
  transform: translate3d(0, 0, 0);

  path.stroke {
    stroke: ${(p) => p.theme.oLine};
  }
  path.fill {
    fill: ${(p) => p.theme.oBackground};
  }
`
