import { csv, timeParse } from 'd3'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import Section from './section'

import Grid from '@components/grid'
import Page from '@components/page'
import SectionDivider from '@components/sectionDivider'

import SettingsContext from '@utils/settingsContext'

export type Data = {
  date: Date
  level: number
}[]

export type VizData = {
  key: string
  height: string
  text: {
    des: { type: 'span' | 'sub'; content: string }[][]
  }
  vizContent: { state: string; des: string; params?: number[] }[]
}

const vizs: VizData[] = [
  {
    key: 'line-chart',
    height: '600vh',
    text: {
      des: [
        [
          {
            type: 'span',
            content:
              'Industrialization has led to astonishing economic growth in many countries in the world. At the same time, the ever rising demand in energy has led to more coal and fuel burning, animal farming, and artificial deforestation. All of these activities have resulted in significant increases in atmospheric carbon dioxide and other greenhouse gases. But just how quickly have CO₂ levels increased in the last few decades?',
          },
        ],
        [
          {
            type: 'span',
            content:
              'The Mauna Loa Observatory in Hawaii has been recording atmospheric CO₂ levels since 1958. The dataset offers great insights into the state of the earth in the past, present, and where it could be in the future.',
          },
        ],
      ],
    },
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
  const [animationObserver, setAnimationObserver] = useState<IntersectionObserver>()
  const { dispatch } = useContext(SettingsContext)

  useEffect(() => {
    dispatch({ type: 'update-color', key: 'appearance', value: 'dark' })

    const animationObserverInstance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on')
          }
        })
      },
      {
        threshold: 0.5,
      },
    )
    setAnimationObserver(animationObserverInstance)
    document.querySelectorAll('.parent.animate').forEach((el) => {
      animationObserverInstance.observe(el)
    })

    csv('/data/weekly_in_situ_co2_mlo.csv').then((resData) => {
      resData.forEach(function (d) {
        d.date = timeParse('%Y-%m-%d')(d.date)
        d.level = +d.level
      })
      setData(resData)
    })
  }, [dispatch])

  return (
    <Page>
      <Wrap id="App">
        <HeroWrap>
          <HeroInnerWrap>
            <HeroText>
              <HeroSpan>CO₂</HeroSpan>
            </HeroText>
          </HeroInnerWrap>
        </HeroWrap>
        {data &&
          animationObserver &&
          vizs.map((viz, i) => {
            return [
              <Section
                key={i}
                data={data}
                vizData={viz}
                animationObserver={animationObserver}
              />,
              i !== vizs.length - 1 ? <SectionDivider key={i + '-divider'} /> : null,
            ]
          })}
        <SectionDivider />
        <MetaWrap>
          <MetaInnerWrap>
            {mainContent.meta.map((column, index) => {
              return (
                <MetaColumn
                  className="animate parent blur"
                  key={index}
                  href={column.link}
                >
                  {column.name}
                </MetaColumn>
              )
            })}
          </MetaInnerWrap>
        </MetaWrap>
      </Wrap>
    </Page>
  )
}
export default Main

const Wrap = styled.article`
  --theme: ${(p) => p.theme.c.green1};
  --warm: ${(p) => p.theme.c.red1};
  --cool: ${(p) => p.theme.c.blue1};

  h1,
  h2 {
    font-family: Pitch, 'Courier New', monospace;
  }
  p,
  a {
    font-weight: 500;
    font-family: Pitch, 'Courier New', monospace;
  }
  text {
    font-family: Pitch, 'Courier New', monospace;
  }

  .animate {
    backface-visibility: hidden;
    will-change: transform, opacity, filter;
  }
  .animate.blur {
    opacity: 0%;
  }
  .animate.blur.on {
    animation: opacity 1s ${(p) => p.theme.a.easeOutQuad} forwards;
  }

  @keyframes blur {
    from {
      filter: blur(20px);
    }
    to {
      filter: blur(0);
    }
  }
  @keyframes opacity {
    from {
      opacity: 0%;
    }
    to {
      opacity: 100%;
    }
  }
`

const HeroWrap = styled.header`
  height: 100vh;
  min-height: 460px;
  ${(p) => p.theme.u.flexCenter};
`

const HeroInnerWrap = styled(Grid)`
  width: 100%;
`

const HeroText = styled.h1`
  grid-column: 2 / -2;
  ${(p) => p.theme.u.media.s} {
    text-align: left;
    grid-column: 1 / -1;
  }
`

const HeroSpan = styled.span`
  display: block;
  margin-bottom: 0.2em;
`

const MetaWrap = styled.section``

const MetaInnerWrap = styled(Grid)``

const MetaColumn = styled.a`
  grid-column-end: span 6;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.c.label};
  }
`
