import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield'
import { mergeProps } from '@react-aria/utils'
import { useRef } from 'react'
import styled from 'styled-components'

import Field, { FieldProps } from '@components/fields/field'

interface TextFieldProps extends FieldProps, AriaTextFieldOptions<'input'> {
	size?: number
	small?: boolean
	inputWidth?: string
	className?: string
}

const TextInput = ({
	className,
	rowLayout,
	inputWidth,
	small = false,
	skipFieldWrapper = false,
	...props
}: TextFieldProps) => {
	const { label, description } = props
	const ref = useRef<HTMLInputElement>(null)

	const { labelProps, descriptionProps, inputProps } = useTextField(props, ref)

	return (
		<Field
			label={label}
			labelProps={labelProps}
			description={description}
			descriptionProps={descriptionProps}
			rowLayout={rowLayout}
			small={small}
			skipFieldWrapper={skipFieldWrapper}
			className={className}
		>
			<Input
				ref={ref}
				small={small}
				displayWidth={inputWidth}
				{...mergeProps(props, inputProps)}
			/>
		</Field>
	)
}

export default TextInput

const Input = styled.input<{ small: boolean; displayWidth?: string }>`
	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.s};
	border: solid 1px ${(p) => p.theme.line};
	padding: ${(p) =>
		p.small ? `${p.theme.space[0]} ${p.theme.space[1]}` : p.theme.space[1]};

	${(p) => p.displayWidth && `width: ${p.displayWidth}`}
`
