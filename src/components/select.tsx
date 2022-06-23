import { HiddenSelect, useSelect } from '@react-aria/select'
import { useSelectState } from '@react-stately/select'
import { SelectProps } from '@react-types/select'
import { Fragment, useRef } from 'react'
import styled from 'styled-components'

import Button from '@components/button'
import Dialog from '@components/dialog'
import ListBox from '@components/listBox'
import Popover from '@components/popover'

import IconExpandMore from '@icons/expandMore'

import useBreakpoint from '@utils/useBreakpoint'

type Props = SelectProps<object> & {
	name: string
	className?: string
	showDialogOnMobile?: boolean
}

const Select = ({ showDialogOnMobile = false, name, className, ...props }: Props) => {
	const ref = useRef<HTMLButtonElement>(null)
	const state = useSelectState(props)
	const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref)
	const buttonProps = {
		...triggerProps,
		'aria-labelledby': undefined,
		'aria-label': `${props.label ? String(props.label) : ''} (Filter) – ${
			state.selectedItem
				? `selected ${String(state.selectedItem.rendered)}`
				: 'none selected'
		}`,
	}

	const isXS = useBreakpoint('xs')

	const shouldRenderAsDialog = showDialogOnMobile && isXS

	const renderTrigger = () => {
		const label = state.selectedItem ? state.selectedItem.rendered : 'Select an option'

		return (
			<Trigger ref={ref} {...buttonProps}>
				<span aria-hidden="true" {...valueProps}>
					{label}
				</span>
				<IconExpandMore aria-hidden="true" />
			</Trigger>
		)
	}

	const renderContent = () => (
		<ListBox state={state} label={props.label} shouldFocusWrap {...menuProps} />
	)

	const overlayForm = (
		<Fragment>
			{renderTrigger()}
			<Popover isOpen={state.isOpen} triggerRef={ref} onClose={() => state.close()}>
				{renderContent()}
			</Popover>
		</Fragment>
	)

	const dialogForm = (
		<Dialog
			isOpen={state.isOpen}
			open={() => state.open()}
			close={() => state.close()}
			trigger={renderTrigger}
			triggerRef={ref}
			title={props.label as string}
			content={renderContent()}
			contentProps={{ compact: true, onClose: () => state.close() }}
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
	transform: translateX(-${(p) => p.theme.space[1]});
`

const Trigger = styled(Button)`
	display: flex;
	align-items: center;
	padding: ${(p) => p.theme.space[1]};
	padding-right: ${(p) => p.theme.space[0]};
`
