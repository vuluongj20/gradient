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
  ${(p) => p.theme.t.ui.label};
  cursor: pointer;
  outline: none;
  color: ${(p) => p.theme.c.text};
  padding: ${(p) => p.theme.s[1]} ${(p) => p.theme.s[2]};
  border-radius: ${(p) => p.theme.r[1]};

  && {
    margin: 0;
  }

  ${(p) => p.isFocused && `background: ${p.theme.c.oHoverBackground};`}

  ${(p) => p.isSelected && `color: ${p.theme.c.red1};`}
`

const StyledListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
