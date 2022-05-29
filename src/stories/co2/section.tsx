import { useRef } from 'react'
import styled from 'styled-components'

import { Data, VizData } from './content'
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
    <Grid as="section" className="section-wrap" ref={wrapRef}>
      <ContentWrap>
        {vizData.description?.map((para, index) => (
          <Para key={index}>{para}</Para>
        ))}
      </ContentWrap>
      <VizWrap style={{ height: vizData.height }}>{renderSwitch()}</VizWrap>
    </Grid>
  )
}

export default Section

const ContentWrap = styled.div`
  ${(p) => p.theme.utils.gridColumn.text};
`

const VizWrap = styled.div`
  display: flex;
  ${(p) => p.theme.utils.gridColumn.wide};
`

const Para = styled.p`
  grid-column: 2 / -2;
  margin-bottom: ${(p) => p.theme.space[2]};
  max-width: 40em;

  ${(p) => p.theme.utils.media.s} {
    grid-column: 1 / -1;
  }
`
