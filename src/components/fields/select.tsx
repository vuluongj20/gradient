import { AriaSelectOptions, HiddenSelect, useSelect } from '@react-aria/select'
import { mergeProps } from '@react-aria/utils'
import { Item, Section } from '@react-stately/collections'
import { useSelectState } from '@react-stately/select'
import { ComponentProps, Fragment, Key, useCallback } from 'react'
import styled from 'styled-components'

import Button from '@components/button'
import Dialog from '@components/dialog'
import Field, { FieldProps } from '@components/fields/field'
import ListBox from '@components/listBox'
import Popover, { usePopover } from '@components/popover'

import { isDefined } from '@utils/functions'
import useBreakpoint from '@utils/useBreakpoint'

type BaseProps = AriaSelectOptions<object> &
	FieldProps & {
		className?: string
		showDialogOnMobile?: boolean
		popoverProps?: Partial<ComponentProps<typeof Popover>>
	}

const BaseSelect = ({
	className,
	rowLayout,
	small = false,
	skipFieldWrapper = false,
	showDialogOnMobile = false,
	...props
}: BaseProps) => {
	const { label, name } = props

	const state = useSelectState(props)

	const { refs, triggerProps, popoverProps } = usePopover<HTMLButtonElement>({
		placement: rowLayout ? 'bottom-end' : 'bottom-start',
		isOpen: state.isOpen,
		onClose: () => state.close(),
	})

	const {
		triggerProps: selectTriggerProps,
		valueProps,
		menuProps,
		labelProps,
	} = useSelect(props, state, refs.trigger)

	const renderTrigger = useCallback(() => {
		return (
			<StyledButton
				small={small}
				showBorder={isDefined(label)}
				showExpandIcon
				{...mergeProps(selectTriggerProps, triggerProps, valueProps)}
			>
				{state.selectedItem ? state.selectedItem.rendered : 'Select an option'}
			</StyledButton>
		)
	}, [triggerProps, selectTriggerProps, small, valueProps, label, state.selectedItem])

	const renderContent = useCallback(
		() => (
			<ListBox state={state} label={label} small={small} shouldFocusWrap {...menuProps} />
		),
		[label, menuProps, small, state],
	)

	const isXS = useBreakpoint('xs')
	return (
		<Field
			label={label}
			labelProps={labelProps}
			rowLayout={rowLayout}
			small={small}
			skipFieldWrapper={skipFieldWrapper}
			className={className}
		>
			<HiddenSelect state={state} triggerRef={refs.trigger} label={label} name={name} />
			{showDialogOnMobile && isXS ? (
				<Dialog
					isOpen={state.isOpen}
					open={() => state.open()}
					close={() => state.close()}
					trigger={renderTrigger}
					triggerRef={refs.trigger}
					title={label as string}
					content={renderContent()}
					contentProps={{ compact: true, onClose: () => state.close() }}
				/>
			) : (
				<Fragment>
					{renderTrigger()}
					<Popover isOpen={state.isOpen} {...popoverProps}>
						{renderContent()}
					</Popover>
				</Fragment>
			)}
		</Field>
	)
}

type SelectItem<Value extends Key> = { value: Value; label: string }
type SelectSection<Value extends Key> = { title: string; options: SelectItem<Value>[] }

type Props<Value extends Key> = Omit<
	BaseProps,
	'children' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'
> & {
	options: (SelectItem<Value> | SelectSection<Value>)[]
	value?: Value
	defaultValue?: Value
	onChange?: (value: Value) => void
}

const isSection = <Value extends Key>(
	el: SelectItem<Value> | SelectSection<Value>,
): el is SelectSection<Value> =>
	isDefined((el as SelectSection<Value>).title) &&
	Array.isArray((el as SelectSection<Value>).options)

/**
 * Select component with simpler prop names: options, value, default value,
 * and onChange.
 */
const Select = <Value extends Key>({
	options,
	value,
	defaultValue,
	onChange,
	...props
}: Props<Value>) => (
	<BaseSelect
		selectedKey={value}
		defaultSelectedKey={defaultValue}
		onSelectionChange={onChange as BaseProps['onSelectionChange']}
		{...props}
	>
		{options.map((el) => {
			if (isSection(el)) {
				return (
					<Section key={el.title} title={el.title}>
						{el.options.map((c) => (
							<Item key={c.value}>{c.label}</Item>
						))}
					</Section>
				)
			}
			return <Item key={el.value}>{el.label}</Item>
		})}
	</BaseSelect>
)

export default Select

const StyledButton = styled(Button)`
	font-weight: 400;
`
