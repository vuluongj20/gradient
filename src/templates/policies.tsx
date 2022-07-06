import { ReactNode } from 'react'
import styled from 'styled-components'

import Divider from '@components/divider'
import Grid from '@components/grid'
import Page from '@components/page'
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
      <Divider />
      <StyledGrid>
        <StyledTOC label="In this page" contentSelector={`${ContentWrap}`} />
        <ContentWrap as="main">{children}</ContentWrap>
      </StyledGrid>
    </Page>
  )
}

export default PlainText

const Wrap = styled.div`
  grid-column: 1 / -5;

  ${(p) => p.theme.text.content.body};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    :not(hr + *, :first-child) {
      margin-top: ${(p) => p.theme.space[4]};
    }
    padding-top: ${(p) => p.theme.space[1]};
    margin-bottom: ${(p) => p.theme.space[1]};
  }
  .autolinked-header.before {
    padding-top: ${(p) => p.theme.space[1]};
  }
  p {
    margin-bottom: ${(p) => p.theme.space[2]};
  }
  h1 {
    ${(p) => p.theme.text.content.h2}
    margin-bottom: ${(p) => p.theme.space[4]};
  }
  h2 {
    ${(p) => p.theme.text.content.h3}
    margin-bottom: ${(p) => p.theme.space[2]};
  }
  h3,
  h4,
  h5,
  h6 {
    ${(p) => p.theme.text.content.h5}
    margin-bottom: ${(p) => p.theme.space[1]};
  }
  hr {
    ${(p) => p.theme.utils.space.marginTop[6]};
    ${(p) => p.theme.utils.space.marginBottom[5]};
  }
  p,
  a,
  li,
  button,
  input {
    ${(p) => p.theme.text.content.body};
  }
  small {
    ${(p) => p.theme.text.system.small};
  }
  ul,
  ol {
    margin-left: ${(p) => p.theme.space[3]};
  }
  ul > li {
    list-style-type: disc;
  }
  ol > li {
    list-style-type: decimal;
  }
  li {
    margin-bottom: ${(p) => p.theme.space[1]};
  }

  ${(p) => p.theme.utils.media.l} {
    grid-column: 1 / -3;
  }
  ${(p) => p.theme.utils.media.m} {
    grid-column: 1 / -2;
  }
  ${(p) => p.theme.utils.media.s} {
    grid-column: 1 / -1;
  }

  a {
    color: ${(p) => p.theme.primaryLinkText};
  }
  a:hover {
    text-decoration-color: ${(p) => p.theme.primaryLinkUnderline};
  }
`

const ContentWrap = styled(Wrap)``

const Header = styled.header`
  ${(p) => p.theme.utils.space.paddingTop[6]};

  h1 {
    padding-top: 0;
    margin-bottom: ${(p) => p.theme.space[2]};
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
  ${(p) => p.theme.utils.space.paddingTop[6]};
  ${(p) => p.theme.utils.space.paddingBottom[4]};

  ${(p) => p.theme.utils.media.l} {
    display: none;
  }
`
