import { useLocale } from '@react-aria/i18n'
import { useNumberField } from '@react-aria/numberfield'
import { NumberFieldStateProps, useNumberFieldState } from '@react-stately/numberfield'
import { AriaNumberFieldProps } from '@react-types/numberfield'
import { useRef } from 'react'
import styled from 'styled-components'

import Button from '@components/button'
import Field, { FieldProps } from '@components/fields/field'

import IconChevronDown from '@icons/chevronDown'
import IconChevronUp from '@icons/chevronUp'

type Props = FieldProps &
	AriaNumberFieldProps &
	Omit<NumberFieldStateProps, 'locale'> & {
		small?: boolean
		className?: string
	}

const TextInput = ({ className, rowLayout, small = false, ...props }: Props) => {
	const { label } = props
	const { locale } = useLocale()
	const inputRef = useRef<HTMLInputElement>(null)
	const incrRef = useRef<HTMLButtonElement>(null)
	const decRef = useRef<HTMLButtonElement>(null)

	const state = useNumberFieldState({ ...props, locale })
	const {
		labelProps,
		groupProps,
		inputProps,
		incrementButtonProps,
		decrementButtonProps,
	} = useNumberField(props, state, inputRef)

	return (
		<Field
			label={label}
			labelProps={labelProps}
			rowLayout={rowLayout}
			small={small}
			className={className}
		>
			<Group {...groupProps}>
				<Input ref={inputRef} small={small} {...inputProps} />
				<IncDecWrap>
					<IncDecButton ref={incrRef} {...incrementButtonProps}>
						<IconChevronUp size="xs" />
					</IncDecButton>
					<IncDecButton ref={decRef} {...decrementButtonProps}>
						<IconChevronDown size="xs" />
					</IncDecButton>
				</IncDecWrap>
			</Group>
		</Field>
	)
}

export default TextInput

const Group = styled.div`
	position: relative;
`

const IncDecWrap = styled.div`
	position: absolute;
	right: ${(p) => p.theme.space[0]};
	top: 50%;
	transform: translateY(-50%);
	height: calc(100% - 2px);
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const IncDecButton = styled(Button)`
	height: 40%;
	padding: 0;
	:not(:first-child) {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	:not(:last-child) {
		border-bottom-width: 0;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
`

const Input = styled.input<{ small: boolean }>`
	appearance: none;
	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.s};
	border: solid 1px ${(p) => p.theme.line};
	padding: ${(p) =>
		p.small ? `${p.theme.space[0]} ${p.theme.space[1]}` : p.theme.space[1]};
`
