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

type ListBoxProps = AriaListBoxOptions<unknown> & {
  state: SelectState<unknown>
}

const ListBox = ({ state, ...props }: ListBoxProps) => {
  const ref = useRef()
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <StyledListBox ref={ref} {...listBoxProps}>
      {[...state.collection].map((item) => (
        <Item key={item.key} item={item} state={state} />
      ))}
    </StyledListBox>
  )
}

export default ListBox

type ItemProps = AriaOptionProps & {
  item: Node<unknown>
  state: SelectState<unknown>
}

type StyledItemProps = {
  isSelected: boolean
  isFocused: boolean
  isDisabled: boolean
}

const Item = (props: ItemProps) => {
  const ref = useRef()
  const { item, state } = props
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref,
  )

  return (
    <StyledItem
      {...optionProps}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      ref={ref}
    >
      {item.rendered}
    </StyledItem>
  )
}

const StyledListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  min-width: 8rem;
  border-radius: ${(p) => p.theme.radii.m};
`

const StyledItem = styled.li<StyledItemProps>`
  ${(p) => p.theme.text.system.label};
  cursor: pointer;
  outline: none;
  color: ${(p) => p.theme.body};
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
  border-radius: ${(p) => p.theme.radii.m};
  transition: ${(p) => p.theme.utils.defaultTransitions}, background-color 0s;
  white-space: nowrap;

  && {
    margin: 0;
  }

  ${(p) => p.isFocused && `background: ${p.theme.oHoverBackground};`}

  ${(p) => p.isSelected && `color: ${p.theme.activeText};`}
`
