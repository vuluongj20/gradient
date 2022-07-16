import styled from 'styled-components'

import Grid from '@components/grid'
import { Abstract, Title } from '@components/text'

const Hero = () => (
  <Wrap as="header">
    <InnerWrap>
      <Title>Relational Learning with Conditional Random Fields</Title>
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
