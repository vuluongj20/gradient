import { Component, Fragment } from 'react'
import styled from 'styled-components'

import SEO from '../components/seo'

class IndexPage extends Component {
  render(): JSX.Element {
    return (
      <Fragment>
        <SEO />
        <Title>
          Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep
          Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep
          Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop
          Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop
          Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop
          Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep
          Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep
          Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop
          Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop
          Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop
          Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep
          Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep
          Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop
          Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop
          Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop
          Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep
          Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep
          Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop
          Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop
          Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep Bop Bop
          Beep Bop Beeep Bop Beepbedeep Beep Bop Bop Beep Bop Beeep Bop Beepbedeep Beep
          Bop Bop
        </Title>
      </Fragment>
    )
  }
}

const Title = styled.h1`
  grid-column: start / end;
`

export default IndexPage
