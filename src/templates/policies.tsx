import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import Page from '@components/page'
import SectionDivider from '@components/sectionDivider'
import TOC from '@components/toc'

interface PolicyPageProps {
  children: ReactNode
  pageContext: {
    frontmatter: {
      title: string
      description: string
      lastEdited: string
    }
  }
}

const PolicyPage = ({ children, pageContext }: PolicyPageProps) => {
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
        <MDXProvider>
          <ContentWrap as="main">{children}</ContentWrap>
        </MDXProvider>
      </StyledGrid>
    </Page>
  )
}

export default PolicyPage

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
      margin-top: var(--space-4);
    }
    padding-top: var(--space-1);
    margin-bottom: var(--space-1);
  }
  .autolinked-header.before {
    padding-top: var(--space-1);
  }
  p {
    margin-bottom: var(--space-2);
  }
  h1 {
    ${(p) => p.theme.text.content.h2}
    margin-bottom: var(--space-4);
  }
  h2 {
    ${(p) => p.theme.text.content.h3}
    margin-bottom: var(--space-2);
  }
  h3,
  h4,
  h5,
  h6 {
    ${(p) => p.theme.text.content.h5}
    margin-bottom: var(--space-1);
  }
  hr {
    margin-top: var(--adaptive-space-6);
    margin-bottom: var(--adaptive-space-5);
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
    margin-left: var(--space-3);
  }
  ul > li {
    list-style-type: disc;
  }
  ol > li {
    list-style-type: decimal;
  }
  li {
    margin-bottom: var(--space-1);
  }

  ${(p) => p.theme.breakpoints.l} {
    grid-column: 1 / -3;
  }
  ${(p) => p.theme.breakpoints.m} {
    grid-column: 1 / -2;
  }
  ${(p) => p.theme.breakpoints.s} {
    grid-column: 1 / -1;
  }

  a {
    color: var(--color-primary-link-text);
  }
  a:hover {
    text-decoration-color: var(--color-primary-link-underline);
  }
`

const ContentWrap = styled(Wrap)``

const Header = styled.header`
  padding-top: var(--adaptive-space-6);

  h1 {
    padding-top: 0;
    margin-bottom: var(--space-2);
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
  padding-top: var(--adaptive-space-6);
  padding-bottom: var(--adaptive-space-4);

  ${(p) => p.theme.breakpoints.l} {
    display: none;
  }
`
