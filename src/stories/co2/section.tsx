import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Data, VizData } from './index'
import LineChart from './lineChart'
import PolarPlot from './polarPlot'

import Grid from '@components/grid'

type Props = {
  data: Data
  vizData: VizData
  animationObserver: IntersectionObserver
}

const Section = ({ data, vizData, animationObserver }: Props): JSX.Element => {
  const wrapRef = useRef(null)

  const renderSwitch = (): JSX.Element => {
    switch (vizData.key) {
      case 'line-chart':
        return <LineChart data={data} content={vizData.vizContent} />
      case 'polar-plot':
        return <PolarPlot data={data} content={vizData.vizContent} />
      default:
        return null
    }
  }

  useEffect(() => {
    wrapRef.current?.querySelectorAll('.animate').forEach((el) => {
      animationObserver.observe(el)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrap className="section-wrap" ref={wrapRef} style={{ height: vizData.height }}>
      <ContentWrap>
        {vizData.text.des.map((para, index) => {
          return (
            <Para key={index} className="animate blur">
              {para.map((segment, index) => {
                switch (segment.type) {
                  case 'span':
                    return <span key={index}>{segment.content}</span>
                  case 'sub':
                    return <sub key={index}>{segment.content}</sub>
                  default:
                    return null
                }
              })}
            </Para>
          )
        })}
      </ContentWrap>
      {renderSwitch()}
    </Wrap>
  )
}

export default Section

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
`

const ContentWrap = styled(Grid)``

const Para = styled.p`
  grid-column: 2 / -2;
  margin-bottom: ${(p) => p.theme.s[2]};
  max-width: 40em;

  ${(p) => p.theme.u.media.s} {
    grid-column: 1 / -1;
  }
`
