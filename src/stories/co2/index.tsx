import { csv, timeParse } from 'd3'
import { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import Section from './section'

import Grid from '@components/grid'
import Page from '@components/page'
import SectionDivider from '@components/sectionDivider'
import TypeArea from '@components/typeArea'

import SettingsContext from '@utils/settingsContext'

export type Data = {
  date: Date
  level: number
}[]

export type VizData = {
  key: string
  height: string
  text?: {
    des?: { type: 'span' | 'sub'; content: string }[][]
  }
  vizContent: { state: string; des: string; params?: number[] }[]
}

const dataUrl =
  'https://storage.googleapis.com/vl-gradient/co2/weekly_in_situ_co2_mlo.csv'

const heroText = [
  'The Mauna Loa Observatory in Hawaii has been recording atmospheric CO₂ levels since 1958. The dataset offers great insights into the state of the earth in the past, present, and where it could be in the future.',
]

const vizs: VizData[] = [
  {
    key: 'line-chart',
    height: '600vh',
    vizContent: [
      {
        state: 'initial',
        des: 'Here is the data in its entirety. CO₂ is measured in ppm (parts-per-million). Hover over the plot for more details.',
        params: null,
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
    ],
  },
  {
    key: 'polar-plot',
    height: '440vh',
    text: {
      des: [
        [
          {
            type: 'span',
            content:
              "There's another way to look at this data: on a polar plot, a type of visualization that presents data on a polar coordinate system. Polar plots work great for time series with recurring patterns, like this one.",
          },
        ],
      ],
    },
    vizContent: [
      {
        state: 'one',
        des: "Each circle corresponds to a full year. Here's what the data for 1958 looks like.",
      },
      {
        state: 'all',
        des: 'And here is the whole dataset. Notice the gradual trend outward, indicating a yearly increase in CO₂ levels.',
      },
      {
        state: 'stretches',
        des: 'The circles stretch outward in winter months (blue) and inward in summer months (red), due to the yearly cycles we saw above.',
      },
    ],
  },
]
const mainContent = {
  meta: [
    {
      name: 'Atmospheric Carbon Dioxide Data from NOAA',
      link: 'https://www.esrl.noaa.gov/gmd/ccgg/trends/data.html',
    },
  ],
}

const Main = (): JSX.Element => {
  const [data, setData] = useState<Data>(null)
  const { dispatch } = useContext(SettingsContext)

  useEffect(() => {
    csv(dataUrl).then((resData) => {
      resData.forEach(function (d) {
        d.date = timeParse('%Y-%m-%d')(d.date)
        d.level = +d.level
      })
      setData(resData)
    })
  }, [dispatch])

  return (
    <Page>
      <Wrap id="App" type="content" as="article">
        <HeroWrap as="header">
          <HeroInnerWrap>
            <HeroHeading>
              <HeroHeadingSpan>Carbon Dioxide&nbsp;</HeroHeadingSpan>
              <HeroHeadingSpan>Trends Since 1958</HeroHeadingSpan>
            </HeroHeading>
            {heroText.map((para, i) => {
              return <HeroText key={i}>{para}</HeroText>
            })}
          </HeroInnerWrap>
        </HeroWrap>
        {data && (
          <Fragment>
            {vizs.map((viz, i) => {
              return [
                <Section key={i} data={data} vizData={viz} />,
                i !== vizs.length - 1 ? <SectionDivider key={i + '-divider'} /> : null,
              ]
            })}
            <SectionDivider />
            <MetaWrap>
              <MetaInnerWrap>
                {mainContent.meta.map((column, index) => {
                  return (
                    <MetaColumn key={index} href={column.link}>
                      {column.name}
                    </MetaColumn>
                  )
                })}
              </MetaInnerWrap>
            </MetaWrap>
          </Fragment>
        )}
      </Wrap>
    </Page>
  )
}
export default Main

const Wrap = styled(TypeArea)`
  --theme: ${(p) => p.theme.green1};
  --warm: ${(p) => p.theme.red1};
  --cool: ${(p) => p.theme.blue1};
  min-height: 100vh;

  svg {
    margin: 0 auto;
    overflow: visible;
  }
`

const HeroWrap = styled(Grid)`
  ${(p) => p.theme.utils.space.paddingVertical[8]}
`

const HeroInnerWrap = styled.div`
  grid-column: 2 / -2;

  ${(p) => p.theme.utils.media.m} {
    grid-column: 1 / -2;
  }

  ${(p) => p.theme.utils.media.s} {
    grid-column: 1 / -1;
  }
`

const HeroHeading = styled.h1`
  margin-bottom: ${(p) => p.theme.space[4]};
`

const HeroHeadingSpan = styled.span`
  display: block;
  margin-bottom: 0.2rem;

  ${(p) => p.theme.utils.media.m} {
    display: inline;
    white-space: prewrap;
  }
`

const HeroText = styled.p`
  margin-bottom: ${(p) => p.theme.space[2]};
  max-width: 48rem;
`

const MetaWrap = styled.section``

const MetaInnerWrap = styled(Grid)``

const MetaColumn = styled.a`
  grid-column-end: span 6;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.label};
  }
`
