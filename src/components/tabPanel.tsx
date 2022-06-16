import { useTabPanel } from '@react-aria/tabs'
import { TabListState } from '@react-stately/tabs'
import { AriaTabPanelProps } from '@react-types/tabs'
import { useRef } from 'react'
import styled from 'styled-components'

import { TabItem } from '@components/tabList'

type TabPanelProps = AriaTabPanelProps & { state: TabListState<TabItem> }

const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)

  console.log(state.selectedItem)

  return (
    <Wrap {...tabPanelProps} ref={ref}>
      {state.selectedItem?.rendered}
    </Wrap>
  )
}

export default TabPanel

const Wrap = styled.div`
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[3]};

  &.enter {
    opacity: 0;
  }
  &.enter-active,
  &.enter-done {
    transition: opacity ${(p) => p.theme.animation.fastOut};
    opacity: 1;
  }
  &.exit-active {
    transition: opacity ${(p) => p.theme.animation.fastIn};
    opacity: 0;
  }
`
