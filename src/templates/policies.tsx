import { useStaticQuery, graphql } from 'gatsby'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Grid from '@components/grid'
import Page from '@components/page'
import TOC from '@components/toc'

type Props = {
  children: ReactNode
}

const PlainText = ({ children }: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `)
  const { frontmatter } = data.allMdx.edges[0].node

  return (
    <Page footerProps={{ overlay: true }}>
      <Helmet title={frontmatter.title} />
      <StyledGrid>
        <Wrap>{children}</Wrap>
        <StyledTOC label="In this page" contentSelector={`${Wrap}`} />
      </StyledGrid>
    </Page>
  )
}

export default PlainText

const Wrap = styled.div`
  padding-top: ${(p) => p.theme.s[6]};
  padding-bottom: ${(p) => p.theme.s[7]};
  grid-column: 2 / -5;
  font-size: 1.125em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    :not(hr + *):not(:first-child) {
      margin-top: ${(p) => p.theme.s[4]};
    }
    margin-bottom: ${(p) => p.theme.s[1]};
  }
  p {
    margin-bottom: ${(p) => p.theme.s[2]};
  }
  h1 {
    ${(p) => p.theme.t.ui.h2}
  }
  h2 {
    ${(p) => p.theme.t.ui.h4}
  }
  h3 {
    ${(p) => p.theme.t.ui.h6}
  }
  h4 {
    ${(p) => p.theme.t.ui.h6}
  }
  h5 {
    ${(p) => p.theme.t.ui.h6}
  }
  h6 {
    ${(p) => p.theme.t.ui.h6}
  }
  hr {
    margin: ${(p) => p.theme.s[6]} 0;
  }
  li {
    margin-bottom: ${(p) => p.theme.s[1]};
  }

  ${(p) => p.theme.u.media.l} {
    grid-column: 2 / -3;
  }
  ${(p) => p.theme.u.media.m} {
    grid-column: 2 / -2;
  }
  ${(p) => p.theme.u.media.s} {
    grid-column: 1 / -1;
  }
`

const StyledGrid = styled(Grid)`
  align-items: flex-start;
`

const StyledTOC = styled(TOC)`
  grid-column: -4 / -1;
  position: sticky;
  top: ${(p) => p.theme.s[7]};

  ${(p) => p.theme.u.media.l} {
    display: none;
  }
`
