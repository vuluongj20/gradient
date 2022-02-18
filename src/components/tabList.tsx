import { useTabList } from '@react-aria/tabs'
import { Item } from '@react-stately/collections'
import { useTabListState } from '@react-stately/tabs'
import { AriaTabListProps } from '@react-types/tabs'
import { ReactNode, useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import Tab from '@components/tab'
import TabPanel from '@components/tabPanel'

import useBreakpoint from '@utils/hooks/useBreakpoint'
import LocalThemeProvider from '@utils/localThemeProvider'

export type TabItem = {
  key: string
  label: string
  content: ReactNode
  leadingItems?: ReactNode
  trailingItems?: ReactNode
}

type TabListProps = Omit<AriaTabListProps<TabItem>, 'children'> & {
  items: TabItem[]
  insetPanel?: boolean
  height?: string
  className?: string
  children?: ReactNode
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

type TabListInnerProps = Omit<TabListProps, 'items'> & {
  children: AriaTabListProps<TabItem>['children']
}

const TabListInner = ({
  className,
  orientation = 'horizontal',
  insetPanel = false,
  height,
  ...props
}: TabListInnerProps) => {
  const ref = useRef()
  const state = useTabListState(props)
  const { tabListProps } = useTabList({ orientation, ...props }, state, ref)

  // Force horizontal orientation on small screens
  const breakpointSmall = useBreakpoint('s')
  const modifiedOrientation = breakpointSmall ? 'horizontal' : orientation

  return (
    <Wrap className={className} orientation={modifiedOrientation} height={height}>
      <TabsWrap orientation={modifiedOrientation} ref={ref} {...tabListProps}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </TabsWrap>
      <LocalThemeProvider inset={insetPanel}>
        <PanelsWrap>
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
      </LocalThemeProvider>
    </Wrap>
  )
}

const Wrap = styled.div<{ orientation: TabListProps['orientation']; height: string }>`
  display: flex;
  gap: ${(p) => p.theme.space[2]};

  ${(p) => p.height && `height: ${p.height};`}
  ${(p) =>
    p.orientation === 'horizontal'
      ? `
        flex-direction: column;
        align-items: center;
        gap: ${p.theme.space[1]};
      `
      : `gap: ${p.theme.space[2]};`};
`

const TabsWrap = styled.ul<{ orientation: TabListProps['orientation'] }>`
  display: flex;
  gap: 1px;

  ${(p) => p.orientation === 'vertical' && `flex-direction: column;`}
`

const PanelsWrap = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${(p) => p.theme.radii.m};
  background: ${(p) => p.theme.background};
  border: solid 1px ${(p) => p.theme.line};
`
