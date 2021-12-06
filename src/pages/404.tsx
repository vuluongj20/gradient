import styled from 'styled-components'

import Page from '@components/page'
import TransitionLink from '@components/transitionLink'

const Page404 = () => (
  <Page>
    <Wrap>
      <Title>Page not found :(</Title>
      <Text>
        We couldn&apos;t find the page you&apos;re looking for. The sadness… Make sure you
        typed in the correct URL, or go back to the home page and start looking from
        there.
      </Text>
      <Link to="/">Take me home.</Link>
    </Wrap>
  </Page>
)

export default Page404

const Wrap = styled.div`
  flex: 1;
  flex-direction: column;
  ${(p) => p.theme.u.flexCenter};
  ${(p) => p.theme.u.spacing.paddingVertical[7]};
  ${(p) => p.theme.u.spacing.paddingHorizontal};

  ${(p) => p.theme.u.media.xs} {
    align-items: flex-start;
  }
`

const Title = styled.h1`
  ${(p) => p.theme.u.spacing.marginBottom[0]};
`

const Text = styled.p`
  max-width: 36em;
  ${(p) => p.theme.u.spacing.marginBottom[1]};
`

const Link = styled(TransitionLink)`
  text-decoration: underline;
  text-decoration-color: ${(p) => p.theme.c.label};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.c.text};
  }
`
