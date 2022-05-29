import loadable from '@loadable/component'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Figure from '@components/figure'
import Grid from '@components/grid'
import Page from '@components/page'
import { Abstract } from '@components/text'
import TypeArea from '@components/typeArea'

const Content = loadable(() => import('./content'))

const heroText =
  'The Mauna Loa Observatory in Hawaii has been recording atmospheric CO₂ levels since 1958. The dataset offers great insights into the state of the earth in the past, present, and where it could be in the future.'

const Main = (): JSX.Element => {
  const {
    file: { childImageSharp },
  } = useStaticQuery(
    graphql`
      query {
        file(name: { eq: "mauna-loa-observatory" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, quality: 90)
          }
        }
      }
    `,
  )

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
          <Figure
            gridColumn="wide"
            image={childImageSharp}
            alt="White dome of the Mauna Loa Observatory, with the Mauna Kea mountain in the background"
            backgroundColor="#fff"
            loading="eager"
            sizes="100vw"
            caption="The Mauna Loa Observatory in Hawaii, where atmotpheric carbon dioxide levels have been measured and recorded since 1958."
            from="National Oceanic and Atmospheric Administration"
          />
        </FigureWrap>

        <Content />
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
