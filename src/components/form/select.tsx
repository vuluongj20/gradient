import { useButton } from '@react-aria/button'
import { HiddenSelect, useSelect } from '@react-aria/select'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useSelectState } from '@react-stately/select'
import { SelectProps } from '@react-types/select'
import { Fragment, useRef } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import ListBox from './listBox'
import Popover from './popover'

import Dialog from '@components/dialog'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints } from '@utils/styling'

type Props = SelectProps<object> & {
	name: string
	className?: string
	showDialogOnMobile?: boolean
}

const Select = ({ showDialogOnMobile = false, name, className, ...props }: Props) => {
	const ref = useRef()
	const state = useSelectState(props)
	const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref)
	const { buttonProps } = useButton(
		{
			...triggerProps,
			'aria-labelledby': null,
			'aria-label': `${props.label} (Filter) – ${
				state.selectedItem ? `selected ${state.selectedItem.rendered}` : 'none selected'
			}`,
		},
		ref,
	)

	const windowWidth = useWindowWidth()

	const shouldRenderAsDialog = showDialogOnMobile && windowWidth <= numericBreakpoints.xs

	const renderTrigger = () => {
		const label = state.selectedItem ? state.selectedItem.rendered : 'Select an option'

		return (
			<Trigger {...buttonProps} ref={ref}>
				<span {...valueProps} aria-hidden="true">
					{label}
				</span>
				<TriggerArrow aria-hidden="true">▼</TriggerArrow>
			</Trigger>
		)
	}

	const renderContent = () => (
		<ListBox state={state} label={props.label} shouldFocusWrap {...menuProps} />
	)

	const overlayForm = (
		<Fragment>
			{renderTrigger()}
			<Transition in={state.isOpen} timeout={200} unmountOnExit mountOnEnter>
				{(animationState) => (
					<Popover
						isOpen={state.isOpen}
						triggerRef={ref}
						onClose={state.close}
						offset={0}
						animationState={animationState}
					>
						{renderContent()}
					</Popover>
				)}
			</Transition>
		</Fragment>
	)

	const dialogForm = (
		<Dialog
			isOpen={state.isOpen}
			open={state.open}
			close={state.close}
			trigger={renderTrigger}
			triggerRef={ref}
			title={props.label as string}
			content={renderContent()}
			contentProps={{ compact: true, onClose: state.close }}
		/>
	)

	return (
		<Wrap className={className}>
			<HiddenSelect state={state} triggerRef={ref} label={props.label} name={name} />
			{shouldRenderAsDialog ? dialogForm : overlayForm}
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
	font-size: 0.75rem;
`
