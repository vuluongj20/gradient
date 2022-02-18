import { useTab } from '@react-aria/tabs'
import { TabListState } from '@react-stately/tabs'
import { Node } from '@react-types/shared'
import { AriaTabProps } from '@react-types/tabs'
import { useRef } from 'react'
import styled from 'styled-components'

import { TabItem } from '@components/tabList'

type TabProps = AriaTabProps & { item: Node<TabItem>; state: TabListState<TabItem> }

const Tab = ({ item, state }: TabProps) => {
  const ref = useRef()
  const { key } = item

  const isDisabled = state.disabledKeys.has(key)
  const isSelected = state.selectedKey === key

  const { tabProps } = useTab({ key, isDisabled }, state, ref)

  const { label, leadingItems, trailingItems } = item.props

  return (
    <Wrap isSelected={isSelected} isDisabled={isDisabled} {...tabProps} ref={ref}>
      {leadingItems && <LeadingWrap aria-hidden="true">{leadingItems}</LeadingWrap>}
      <LabelWrap>{label}</LabelWrap>
      {trailingItems && <TrailingWrap>{trailingItems}</TrailingWrap>}
    </Wrap>
  )
}

export default Tab

const Wrap = styled.li<{ isSelected: boolean; isDisabled: boolean }>`
  position: relative;
  display: flex;
  gap: ${(p) => p.theme.space[1]};
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
  padding-right: ${(p) => p.theme.space[3]};
  border-radius: ${(p) => p.theme.radii.m};
  cursor: pointer;

  &:hover {
    background: ${(p) => p.theme.hoverBackground};
  }

  &:focus {
    outline: none;
  }
  &.focus-visible {
    ${(p) => p.theme.utils.focusVisible};
  }

  ${(p) =>
    p.isSelected &&
    `
    color: ${p.theme.activeText};
    background: ${p.theme.hoverBackground};
  `}
`

const LabelWrap = styled.span``

const LeadingWrap = styled.div`
  ${(p) => p.theme.utils.flexCenter};
  height: ${(p) => p.theme.utils.lineHeight};
  gap: ${(p) => p.theme.space[1]};
`

const TrailingWrap = styled.div`
  ${(p) => p.theme.utils.flexCenter};
  height: ${(p) => p.theme.utils.lineHeight};
  gap: ${(p) => p.theme.space[1]};
`
