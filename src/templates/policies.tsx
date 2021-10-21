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
              description
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
      <Header>
        <Grid>
          <Wrap>
            <h1>{frontmatter.title}</h1>
            <p>
              <em>Last updated {frontmatter.date}</em>
            </p>
            <p>{frontmatter.description}</p>
          </Wrap>
        </Grid>
      </Header>
      <StyledGrid>
        <ContentWrap>{children}</ContentWrap>
        <StyledTOC label="In this page" contentSelector={`${ContentWrap}`} />
      </StyledGrid>
    </Page>
  )
}

export default PlainText

const Wrap = styled.div`
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

  a {
    color: ${(p) => p.theme.c.link};
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.c.linkUnderline};
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.c.linkUnderlineHover};
  }
`

const ContentWrap = styled(Wrap)`
  padding-top: ${(p) => p.theme.s[6]};
  padding-bottom: ${(p) => p.theme.s[7]};
`

const Header = styled.header`
  padding: ${(p) => p.theme.s[6]} 0;
  background: ${(p) => p.theme.c.oBackground};
`

const StyledGrid = styled(Grid)`
  align-items: flex-start;
  position: relative;
`

const StyledTOC = styled(TOC)`
  grid-column: -4 / -1;
  position: sticky;
  top: 0;
  padding-top: ${(p) => p.theme.s[7]};

  ${(p) => p.theme.u.media.l} {
    display: none;
  }
`
