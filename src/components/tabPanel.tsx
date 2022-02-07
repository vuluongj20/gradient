import { useTabPanel } from '@react-aria/tabs'
import { TabListState } from '@react-stately/tabs'
import { AriaTabPanelProps } from '@react-types/tabs'
import { useRef } from 'react'
import styled from 'styled-components'

import { TabItem } from '@components/tabList'

type TabPanelProps = AriaTabPanelProps & { state: TabListState<TabItem> }

const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef()
  const { tabPanelProps } = useTabPanel(props, state, ref)

  return (
    <Wrap {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </Wrap>
  )
}

export default TabPanel

const Wrap = styled.div`
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};

  &.enter {
    opacity: 0%;
  }
  &.enter-active,
  &.enter-done {
    transition: opacity ${(p) => p.theme.animation.fastOut};
    opacity: 100%;
  }
  &.exit-active {
    transition: opacity ${(p) => p.theme.animation.fastIn};
    opacity: 0%;
  }
`
