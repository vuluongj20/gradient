import { useRef } from 'react'
import styled from 'styled-components'

import { Data, VizData } from './index'
import LineChart from './lineChart'
import PolarPlot from './polarPlot'

import Grid from '@components/grid'

type Props = {
  data: Data
  vizData: VizData
}

const Section = ({ data, vizData }: Props): JSX.Element => {
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

  return (
    <Grid
      as="section"
      className="section-wrap"
      ref={wrapRef}
      style={{ height: vizData.height }}
    >
      <InnerWrap>
        <ContentWrap>
          {vizData.text?.des?.map((para, index) => {
            return (
              <Para key={index}>
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
      </InnerWrap>
    </Grid>
  )
}

export default Section

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2 / -2;
  width: 100%;

  ${(p) => p.theme.utils.media.m} {
    grid-column: 1 / -1;
  }
`

const ContentWrap = styled.div``

const Para = styled.p`
  grid-column: 2 / -2;
  margin-bottom: ${(p) => p.theme.space[2]};
  max-width: 40em;

  ${(p) => p.theme.utils.media.s} {
    grid-column: 1 / -1;
  }
`
