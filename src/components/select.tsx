import { HiddenSelect, useSelect } from '@react-aria/select'
import { mergeProps } from '@react-aria/utils'
import { Item } from '@react-stately/collections'
import { useSelectState } from '@react-stately/select'
import { SelectProps } from '@react-types/select'
import { ComponentProps, Fragment, Key, useCallback, useRef } from 'react'
import styled from 'styled-components'

import Button from '@components/button'
import Dialog from '@components/dialog'
import ListBox from '@components/listBox'
import Popover from '@components/popover'

import useBreakpoint from '@utils/useBreakpoint'

type BaseProps = SelectProps<object> & {
	name: string
	className?: string
	showDialogOnMobile?: boolean
	popoverProps?: Partial<ComponentProps<typeof Popover>>
	small?: boolean
}

type Props = Omit<
	BaseProps,
	'children' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'
> & {
	options: { value: Key; label: string }[]
	value?: BaseProps['selectedKey']
	defaultValue?: BaseProps['defaultSelectedKey']
	onChange?: BaseProps['onSelectionChange']
}

const BaseSelect = ({
	showDialogOnMobile = false,
	name,
	label,
	popoverProps,
	className,
	small = false,
	...props
}: BaseProps) => {
	const ref = useRef<HTMLButtonElement>(null)
	const state = useSelectState(props)
	const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref)

	const renderTrigger = useCallback(() => {
		const label = state.selectedItem ? state.selectedItem.rendered : 'Select an option'

		return (
			<Trigger
				ref={ref}
				small={small}
				showExpandIcon
				{...mergeProps(triggerProps, valueProps)}
			>
				{label}
			</Trigger>
		)
	}, [triggerProps, small, valueProps, state.selectedItem])

	const renderContent = useCallback(
		() => (
			<ListBox state={state} label={label} small={small} shouldFocusWrap {...menuProps} />
		),
		[label, menuProps, small, state],
	)

	const isXS = useBreakpoint('xs')

	return (
		<Wrap className={className} aria-label="hello">
			<HiddenSelect state={state} triggerRef={ref} label={label} name={name} />
			{showDialogOnMobile && isXS ? (
				<Dialog
					isOpen={state.isOpen}
					open={() => state.open()}
					close={() => state.close()}
					trigger={renderTrigger}
					triggerRef={ref}
					title={label as string}
					content={renderContent()}
					contentProps={{ compact: true, onClose: () => state.close() }}
				/>
			) : (
				<Fragment>
					{renderTrigger()}
					<Popover
						isOpen={state.isOpen}
						triggerRef={ref}
						onClose={() => state.close()}
						{...popoverProps}
					>
						{renderContent()}
					</Popover>
				</Fragment>
			)}
		</Wrap>
	)
}

const Select = ({ options, value, defaultValue, onChange, label, ...props }: Props) => (
	<BaseSelect
		selectedKey={value}
		defaultSelectedKey={defaultValue}
		onSelectionChange={onChange}
		aria-label={label}
		{...props}
	>
		{options.map((o) => (
			<Item key={o.value}>{o.label}</Item>
		))}
	</BaseSelect>
)

export default Select

const Wrap = styled.div``

const Trigger = styled(Button)`
	display: flex;
	align-items: center;
`
