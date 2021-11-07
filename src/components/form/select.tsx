import { useButton } from '@react-aria/button'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'

import ListBox from './listBox'
import Popover from './popover'

type Props = {
	name: string
	label: string
	defaultSelectedKey: string
	onChange: (name: string, value: string) => void
	children: ReactNode
	className: string
}

const Select = (props: Props) => {
	const ref = useRef()
	const state = useSelectState<Props>(props)
	const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref)
	const { buttonProps } = useButton(triggerProps, ref)

	useEffect(() => {
		props.onChange && props.onChange(props.name, state.selectedItem?.key as string)
	}, [props, state.selectedItem])

	return (
		<Wrap className={props.className}>
			<HiddenSelect
				state={state}
				triggerRef={ref}
				label={props.label}
				name={props.name}
			/>
			<Trigger {...buttonProps} ref={ref}>
				<span {...valueProps}>
					{state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
				</span>
				<TriggerArrow aria-hidden="true">▼</TriggerArrow>
			</Trigger>
			{state.isOpen && (
				<Popover isOpen={state.isOpen} onClose={state.close}>
					<ListBox {...menuProps} state={state} label={props.label} />
				</Popover>
			)}
		</Wrap>
	)
}

export default Select

const Wrap = styled.div`
	position: relative;
`

const Trigger = styled.button`
	padding: ${(p) => p.theme.s[1]} 0;
`

const TriggerArrow = styled.span`
	margin-left: ${(p) => p.theme.s[0]};
	font-size: 0.75em;
`
