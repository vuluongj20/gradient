import styled from 'styled-components'

import Grid from '@components/grid'
import { Abstract } from '@components/text'

const Hero = () => (
  <Wrap as="header">
    <InnerWrap>
      <Heading>Sequence Learning with Conditional Random Fields</Heading>
      <Abstract>
        Probabilistic graphical models like Conditional Random Fields are powerful
        frameworks for solving sequence modeling problems.
      </Abstract>
    </InnerWrap>
  </Wrap>
)

export default Hero

const Wrap = styled(Grid)`
  ${(p) => p.theme.utils.space.paddingVertical[5]}
`

const InnerWrap = styled.div`
  ${(p) => p.theme.utils.gridColumn.text};
`

const Heading = styled.h1``
