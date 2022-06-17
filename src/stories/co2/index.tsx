import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import { DataProvider } from './dataContext'
import Section from './section'

import Divider from '@components/divider'
import Figure from '@components/figure'
import Grid from '@components/grid'
import Page from '@components/page'
import { Abstract } from '@components/text'
import TypeArea from '@components/typeArea'

export type Data = {
  date: Date
  level: number
}[]

export type VizData = {
  key: string
  height: string
  description?: string[]
  vizContent: { state: string; des: string; params?: number[] }[]
}

const heroText =
  'The Mauna Loa Observatory in Hawaii has been recording atmospheric CO₂ levels since 1958. The dataset offers great insights into the state of the earth in the past, present, and where it could be in the future.'

const mainContent = {
  meta: [
    {
      name: 'Atmospheric Carbon Dioxide Data from NOAA',
      link: 'https://www.esrl.noaa.gov/gmd/ccgg/trends/data.html',
    },
  ],
}

const vizs: VizData[] = [
  {
    key: 'line-chart',
    height: '600vh',
    description: [
      'On the northern flank of Mauna Loa volcano in Hawaii, at 11,000 feet above sea level, sits the Mauna Loa Baseline Observatory, which has been recording atmospheric carbon dioxide levels since 1958.',
      "The high altitude and remote location means that the air around the observatory is relatively undisturbed. There is little vegetation and human activity to influence the air's composition, making it ideal to measure atmospheric constituents there.",
      'The National Oceanic and Atmospheric Administration (NOAA), which operates the observatory, provides such measurements as publicly accessible datasets. Its carbon dioxide data in particular paints a worrying picture of the rise in greenhouse gases in recent decades.',
    ],
    vizContent: [
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
    ],
  },
  {
    key: 'polar-plot',
    height: '440vh',
    description: [
      'Another way to look at data with cyclic, seasonal patterns is with polar plots, a type of visualization that presents data on a polar coordinate system.',
      'When the full, 360-degree range of the plot matches the length of the cycle (in this case 1 year), we get a data line whose shape reveals seasonal variations and whose the outward/inward movement better demonstrates the yearly increase/decrease with less seasonal noise.',
    ],
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

const Main = () => {
  const imageQueryResult = useStaticQuery<Queries.CO2MaunaLoaObservatoryImageQuery>(
    graphql`
      query CO2MaunaLoaObservatoryImage {
        file(name: { eq: "mauna-loa-observatory" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, quality: 90)
          }
        }
      }
    `,
  )
  const imageData = imageQueryResult.file?.childImageSharp?.gatsbyImageData

  return (
    <Page>
      <Wrap id="App" type="content" as="article">
        <HeroWrap as="header">
          <HeroInnerWrap>
            <Title>Carbon&nbsp;Dioxide Trends Since&nbsp;1958</Title>
            <Abstract>{heroText}</Abstract>
          </HeroInnerWrap>
        </HeroWrap>

        <FigureWrap noPaddingOnMobile>
          {imageData && (
            <Figure
              gridColumn="wide"
              image={imageData}
              alt="White dome of the Mauna Loa Observatory, with the Mauna Kea mountain in the background"
              backgroundColor="#fff"
              loading="eager"
              sizes="100vw"
              caption="The Mauna Loa Observatory in Hawaii, where atmotpheric carbon dioxide levels have been measured and recorded since 1958."
              from="National Oceanic and Atmospheric Administration"
            />
          )}
        </FigureWrap>

        <DataProvider>
          {vizs.map((viz, i) => {
            return [
              <Section key={i} vizData={viz} />,
              i !== vizs.length - 1 ? <Divider key={`${i}-divider`} /> : null,
            ]
          })}
          <Divider />
          <MetaWrap as="section">
            {mainContent.meta.map((column, index) => {
              return (
                <MetaColumn key={index} href={column.link}>
                  {column.name}
                </MetaColumn>
              )
            })}
          </MetaWrap>
        </DataProvider>
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
  ${(p) => p.theme.utils.space.paddingVertical[5]}
`

const HeroInnerWrap = styled.div`
  ${(p) => p.theme.utils.gridColumn.text};
`

const FigureWrap = styled(Grid)`
  ${(p) => p.theme.utils.space.marginBottom[5]};
`

const Title = styled.h1``

const MetaWrap = styled(Grid)``

const MetaColumn = styled.a`
  grid-column-end: span 6;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.label};
  }
`
