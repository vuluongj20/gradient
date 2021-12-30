import {
  useListBox,
  useOption,
  AriaListBoxOptions,
  AriaOptionProps,
} from '@react-aria/listbox'
import { SelectState } from '@react-stately/select'
import { Node } from '@react-types/shared'
import { useRef } from 'react'
import styled from 'styled-components'

type ListBoxProps = AriaListBoxOptions<unknown> & {
  state: SelectState<unknown>
}

type OptionProps = AriaOptionProps & {
  item: Node<unknown>
  state: SelectState<unknown>
}

type StyledOptionProps = {
  isSelected: boolean
  isFocused: boolean
  isDisabled: boolean
}

const Option = (props: OptionProps) => {
  const ref = useRef()
  const { item, state } = props
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref,
  )

  return (
    <StyledOption
      {...optionProps}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      ref={ref}
    >
      {item.rendered}
    </StyledOption>
  )
}

const ListBox = (props: ListBoxProps) => {
  const ref = useRef()
  const { state } = props
  const { listBoxProps } = useListBox(props, state, ref)

  return (
    <StyledListBox {...listBoxProps} ref={ref}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </StyledListBox>
  )
}

export default ListBox

const StyledOption = styled.li<StyledOptionProps>`
  ${(p) => p.theme.text.ui.label};
  cursor: pointer;
  outline: none;
  color: ${(p) => p.theme.colors.text};
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
  border-radius: ${(p) => p.theme.radii.m};

  && {
    margin: 0;
  }

  ${(p) => p.isFocused && `background: ${p.theme.colors.oHoverBackground};`}

  ${(p) => p.isSelected && `color: ${p.theme.colors.red1};`}
`

const StyledListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
