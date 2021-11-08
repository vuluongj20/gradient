import { ReactNode } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import Page from '@components/page'
import SectionDivider from '@components/sectionDivider'
import SEO from '@components/seo'
import TOC from '@components/toc'

type Props = {
  children: ReactNode
  pageContext: {
    frontmatter: {
      title: string
      description: string
      lastEdited: string
    }
  }
}

const PlainText = ({ children, pageContext }: Props): JSX.Element => {
  const { frontmatter } = pageContext
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const lastEdited = new Date(frontmatter.lastEdited).toLocaleDateString(
    'en-US',
    dateOptions,
  )

  return (
    <Page>
      <SEO title={frontmatter.title} />
      <Header>
        <Grid>
          <Wrap>
            <h1>{frontmatter.title}</h1>
            <p>
              <em>Last updated {lastEdited}</em>
            </p>
            <p>{frontmatter.description}</p>
          </Wrap>
        </Grid>
      </Header>
      <SectionDivider />
      <StyledGrid>
        <StyledTOC label="In this page" contentSelector={`${ContentWrap}`} />
        <ContentWrap>{children}</ContentWrap>
      </StyledGrid>
    </Page>
  )
}

export default PlainText

const Wrap = styled.div`
  grid-column: 1 / -5;
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
    padding-top: ${(p) => p.theme.s[1]};
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
    ${(p) => p.theme.u.spacing.marginTop[6]};
    ${(p) => p.theme.u.spacing.marginBottom[5]};
  }
  li {
    margin-bottom: ${(p) => p.theme.s[1]};
  }

  ${(p) => p.theme.u.media.l} {
    grid-column: 1 / -3;
  }
  ${(p) => p.theme.u.media.m} {
    grid-column: 1 / -2;
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

const ContentWrap = styled(Wrap)``

const Header = styled.header`
  ${(p) => p.theme.u.spacing.paddingTop[6]};

  h1 {
    padding-top: 0;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
`

const StyledGrid = styled(Grid)`
  align-items: flex-start;
  position: relative;
  grid-auto-flow: dense;
`

const StyledTOC = styled(TOC)`
  grid-column: -4 / -1;
  position: sticky;
  top: 0;
  ${(p) => p.theme.u.spacing.paddingTop[6]};
  ${(p) => p.theme.u.spacing.paddingBottom[4]};

  ${(p) => p.theme.u.media.l} {
    display: none;
  }
`
