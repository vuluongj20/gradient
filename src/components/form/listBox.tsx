import { useListBox, useOption } from '@react-aria/listbox'
import { useRef } from 'react'
import styled from 'styled-components'

type ListBoxProps = {
  state: any
  label: string
}

type OptionProps = {
  item: any
  state: any
}

type StyledOptionProps = {
  isSelected: boolean
  isFocused: boolean
  isDisabled: boolean
}

const Option = ({ item, state }: OptionProps) => {
  const ref = useRef()
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

const ListBox = ({ state, label }: ListBoxProps) => {
  const ref = useRef()
  const { listBoxProps } = useListBox({ label }, state, ref)

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
  padding: ${(p) => p.theme.s[1]} 0;

  && {
    margin: 0;
  }

  &:hover {
    color: ${(p) => p.theme.c.red1};
  }

  ${(p) => (p.isSelected || p.isFocused) && `color: ${p.theme.c.red1};`}
`

const StyledListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
