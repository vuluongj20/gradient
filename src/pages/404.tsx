import { Link } from 'gatsby'
import styled from 'styled-components'

import BalancedText from '@components/balancedText'
import Page from '@components/page'
import SEO from '@components/seo'

const Page404 = () => (
  <Page>
    <Wrap>
      <Title>Page Not Found…</Title>
      <Text>
        <BalancedText>
          We couldn&apos;t find the page you&apos;re looking for. Make sure you typed in
          the correct URL, or go back to the home page and start looking from there.
        </BalancedText>
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
  padding: var(--adaptive-space-7) var(--page-margin-right) var(--adaptive-space-7)
    var(--page-margin-left);

  ${(p) => p.theme.breakpoints.xs} {
    align-items: flex-start;
  }
`

const Title = styled.h1`
  margin-bottom: var(--adaptive-space-2);
`

const Text = styled.p`
  max-width: 32rem;
  text-align: center;
  margin-bottom: var(--space-1);

  ${(p) => p.theme.breakpoints.s} {
    max-width: 28rem;
  }

  ${(p) => p.theme.breakpoints.xs} {
    text-align: left;
  }
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
