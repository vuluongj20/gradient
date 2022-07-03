import {
  AriaListBoxOptions,
  AriaOptionProps,
  useListBox,
  useOption,
} from '@react-aria/listbox'
import { SelectState } from '@react-stately/select'
import { Node } from '@react-types/shared'
import { useRef } from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

import IconDone from '@icons/done'

type ListBoxProps = AriaListBoxOptions<unknown> & {
  state: SelectState<unknown>
  small?: boolean
}

const ListBox = ({ state, small = false, ...props }: ListBoxProps) => {
  const ref = useRef<HTMLUListElement>(null)
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <StyledListBox ref={ref} {...listBoxProps}>
      {[...state.collection].map((item) => (
        <Item key={item.key} item={item} state={state} small={small} />
      ))}
    </StyledListBox>
  )
}

export default ListBox

type ItemProps = AriaOptionProps & {
  item: Node<unknown>
  state: SelectState<unknown>
  small: boolean
}

const Item = (props: ItemProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const { item, state, small } = props
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref,
  )

  return (
    <StyledItem
      {...optionProps}
      isSelected={isSelected}
      isDisabled={isDisabled}
      small={small}
      ref={ref}
    >
      <StateLayer isHovered={isFocused} opacityFactor={isSelected ? 1.4 : 1} />
      <CheckIndent aria-hidden="true" visible={isSelected}>
        <IconDone />
      </CheckIndent>
      <ItemLabel>{item.rendered}</ItemLabel>
    </StyledItem>
  )
}

const StyledListBox = styled.ul`
  padding: 0;
  margin: 0;
  min-width: 8rem;
  border-radius: ${(p) => p.theme.radii.m};
  list-style-type: none;

  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
  }
`

const StyledItem = styled.li<{
  isSelected: boolean
  isDisabled: boolean
  small: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;

  padding: ${(p) =>
    p.small
      ? `${p.theme.space[0]} ${p.theme.space[1]}`
      : `${p.theme.space[1]} ${p.theme.space[2]}`};
  padding-left: ${(p) => (p.small ? p.theme.space[0] : p.theme.space[1])};
  border-radius: ${(p) => p.theme.radii.s};
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  transition: ${(p) => p.theme.utils.defaultTransitions}, background-color 0s,
    color ${(p) => p.theme.animation.mediumIn};

  && {
    margin: 0;
  }

  ${(p) => p.isSelected && `color: ${p.theme.activeText};`}
`

const CheckIndent = styled.div<{ visible: boolean }>`
  ${(p) => p.theme.utils.flexCenter};
  width: 1.2rem;
  height: 1.2rem;
  margin-right: ${(p) => p.theme.space[0]};
  opacity: 0;
  transition: opacity ${(p) => p.theme.animation.mediumIn};

  ${(p) => p.visible && `opacity:100%;`};
`

const ItemLabel = styled.span``
