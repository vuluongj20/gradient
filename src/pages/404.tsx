import styled from 'styled-components'

import Page from '@components/page'
import SEO from '@components/seo'
import TransitionLink from '@components/transitionLink'

const Page404 = () => (
  <Page>
    <Wrap>
      <Title>Page Not Found…</Title>
      <Text>
        We couldn&apos;t find the page you&apos;re looking for. Make sure you typed in the
        correct URL, or go back to the home page and start looking from there.
      </Text>
      <Link to="/">Take me home.</Link>
    </Wrap>
  </Page>
)

export default Page404

const Wrap = styled.div`
  flex: 1;
  flex-direction: column;
  ${(p) => p.theme.flexCenter};
  ${(p) => p.theme.paddingVertical[7]};
  ${(p) => p.theme.paddingHorizontal};

  ${(p) => p.theme.media.xs} {
    align-items: flex-start;
  }
`

const Title = styled.h1`
  ${(p) => p.theme.marginBottom[4]};
`

const Text = styled.p`
  max-width: 24rem;
  text-align: center;
  ${(p) => p.theme.marginBottom[1]};
`

const Link = styled(TransitionLink)`
  text-decoration: underline;
  text-decoration-color: ${(p) => p.theme.label};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.body};
  }
`

export const Head = () => <SEO title="Page Not Found" />
