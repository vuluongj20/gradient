import { useButton } from '@react-aria/button'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { SelectProps } from '@react-types/select'
import { useRef } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import ListBox from './listBox'
import Popover from './popover'

type Props = SelectProps<object> & {
	name: string
	className?: string
}

const Select = (props: Props) => {
	const ref = useRef()
	const state = useSelectState(props)
	const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref)
	const { buttonProps } = useButton(triggerProps, ref)

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
			<Transition in={state.isOpen} timeout={200} unmountOnExit mountOnEnter>
				{(animationState) => (
					<Popover
						isOpen={state.isOpen}
						triggerRef={ref}
						onClose={state.close}
						offset={0}
						animationState={animationState}
					>
						<ListBox {...menuProps} state={state} label={props.label} />
					</Popover>
				)}
			</Transition>
		</Wrap>
	)
}

export default Select

const Wrap = styled.div`
	position: relative;
`

const Trigger = styled.button`
	padding: ${(p) => p.theme.space[1]} 0;
`

const TriggerArrow = styled.span`
	margin-left: ${(p) => p.theme.space[0]};
	font-size: 0.75em;
`
