import { useTabList } from '@react-aria/tabs'
import { Item } from '@react-stately/collections'
import { useTabListState } from '@react-stately/tabs'
import { AriaTabListProps } from '@react-types/tabs'
import { ReactNode, useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import Tab from '@components/tab'
import TabPanel from '@components/tabPanel'

export type TabItem = {
  key: string
  label: string
  content: ReactNode
  leadingItems?: ReactNode
  trailingItems?: ReactNode
}

type TabListProps = AriaTabListProps<TabItem> & {
  items: TabItem[]
  insetPanel?: boolean
  className?: string
}

const TabList = (props: TabListProps) => {
  return (
    <TabListInner {...props}>
      {props.items.map((item) => (
        <Item key={item.key} {...item}>
          {item.content}
        </Item>
      ))}
    </TabListInner>
  )
}

export default TabList

const TabListInner = ({
  className,
  orientation = 'horizontal',
  insetPanel = false,
  ...props
}: Omit<TabListProps, 'items'>) => {
  const ref = useRef()
  const state = useTabListState(props)
  const { tabListProps } = useTabList({ orientation, ...props }, state, ref)

  return (
    <Wrap className={className} orientation={orientation}>
      <TabsWrap orientation={orientation} ref={ref} {...tabListProps}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </TabsWrap>
      <PanelsWrap inset={insetPanel}>
        <SwitchTransition>
          <CSSTransition
            timeout={{
              enter: 250,
              exit: 125,
            }}
            key={state.selectedItem?.key}
          >
            <TabPanel key={state.selectedItem?.key} state={state} />
          </CSSTransition>
        </SwitchTransition>
      </PanelsWrap>
    </Wrap>
  )
}

const Wrap = styled.div<{ orientation: TabListProps['orientation'] }>`
  display: flex;
  gap: ${(p) => p.theme.space[1]};

  ${(p) => p.orientation === 'horizontal' && `flex-direction: column;`}
`

const TabsWrap = styled.ul<{ orientation: TabListProps['orientation'] }>`
  display: flex;
  gap: 1px;

  ${(p) => p.orientation === 'vertical' && `flex-direction: column;`}
`

const PanelsWrap = styled.div<{ inset: boolean }>`
  border-radius: ${(p) => p.theme.radii.m};

  ${(p) =>
    p.inset &&
    `
    background: ${p.theme.colors.iBackground};
    border: solid 1px ${p.theme.colors.line};
  `}
`
