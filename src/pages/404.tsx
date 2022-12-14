import { Link } from 'gatsby'
import styled from 'styled-components'

import Page from '@components/page'
import SEO from '@components/seo'

const Page404 = () => (
  <Page>
    <Wrap>
      <Title>Page Not Found…</Title>
      <Text>
        We couldn&apos;t find the page you&apos;re looking for. Make sure you typed in the
        correct URL, or go back to the home page and start looking from there.
      </Text>
      <HomeLink to="/">Take me home.</HomeLink>
    </Wrap>
  </Page>
)

export default Page404

const Wrap = styled.div`
  ${(p) => p.theme.flexCenter};
  flex: 1;
  flex-direction: column;
  padding-top: var(--adaptive-space-7);
  padding-bottom: var(--adaptive-space-7);
  ${(p) => p.theme.paddingHorizontal};

  ${(p) => p.theme.media.xs} {
    align-items: flex-start;
  }
`

const Title = styled.h1`
  margin-bottom: var(--adaptive-space-4);
`

const Text = styled.p`
  max-width: 24rem;
  text-align: center;
  margin-bottom: var(--adaptive-space-1);
`

const HomeLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: var(--color-label);
  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-body);
  }
`

export const Head = () => <SEO title="Page Not Found" />
