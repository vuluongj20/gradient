import styled from 'styled-components'

import Page from '@components/page'
import SEO from '@components/seo'
import TransitionLink from '@components/transitionLink'

const Page404 = () => (
  <Page>
    <SEO title={'Page Not Found'} />
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
  ${(p) => p.theme.utils.flexCenter};
  ${(p) => p.theme.utils.space.paddingVertical[7]};
  ${(p) => p.theme.utils.space.paddingHorizontal};

  ${(p) => p.theme.utils.media.xs} {
    align-items: flex-start;
  }
`

const Title = styled.h1`
  ${(p) => p.theme.utils.space.marginBottom[4]};
`

const Text = styled.p`
  max-width: 24em;
  text-align: center;
  ${(p) => p.theme.utils.space.marginBottom[1]};
`

const Link = styled(TransitionLink)`
  text-decoration: underline;
  text-decoration-color: ${(p) => p.theme.colors.label};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.colors.text};
  }
`
