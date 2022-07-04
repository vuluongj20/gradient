import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield'
import { useRef } from 'react'
import styled from 'styled-components'

import Field, { FieldProps } from '@components/fields/field'

type Props = FieldProps &
	AriaTextFieldOptions<'input'> & {
		small?: boolean
		className?: string
	}

const TextInput = ({ className, rowLayout, small = false, ...props }: Props) => {
	const { label } = props
	const ref = useRef<HTMLInputElement>(null)

	const { labelProps, inputProps } = useTextField(props, ref)

	return (
		<Field
			label={label}
			labelProps={labelProps}
			rowLayout={rowLayout}
			small={small}
			className={className}
		>
			<Input ref={ref} small={small} {...inputProps} />
		</Field>
	)
}

export default TextInput

const Input = styled.input<{ small: boolean }>`
	appearance: none;
	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.s};
	border: solid 1px ${(p) => p.theme.line};
	padding: ${(p) =>
		p.small ? `${p.theme.space[0]} ${p.theme.space[1]}` : p.theme.space[1]};
`
