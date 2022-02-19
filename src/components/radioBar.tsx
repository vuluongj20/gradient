import { useRadio, useRadioGroup } from '@react-aria/radio'
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio'
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio'
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Tooltip from '@components/tooltip'

type Option = {
	value: string
	label: string
	tooltip?: ReactNode
}
type RadioBarProps = AriaRadioGroupProps & {
	options: Option[]
	moveLeft?: boolean
}

type HandleStyles = { left: number; width: number }

const RadioBar = ({ moveLeft, ...props }: RadioBarProps) => {
	const ref = useRef(null)
	const state = useRadioGroupState(props)
	const { radioGroupProps } = useRadioGroup(props, state)
	const [handleLookup, setHandleLookup] = useState<Record<string, HandleStyles>>({})
	const [handleStyles, setHandleStyles] = useState<HandleStyles>(null)

	/**
	 * Initialize lookup table (handleLookup) that describes the position
	 * of each render radio element, useful for animating <Handle />
	 */
	useEffect(() => {
		const handleLookupTable = {}
		ref.current?.childNodes?.forEach((node) => {
			const radioValue = node.dataset?.radioValue
			if (!radioValue) return
			handleLookupTable[radioValue] = {
				left: node.offsetLeft,
				width: node.offsetWidth,
			}
		})
		setHandleLookup(handleLookupTable)
	}, [])

	useEffect(() => {
		setHandleStyles(handleLookup[state.selectedValue])
	}, [handleLookup, state.selectedValue])

	return (
		<GroupWrap moveLeft={moveLeft} {...radioGroupProps} ref={ref}>
			{props.options.map((option, i) => (
				<Radio
					key={option.value}
					state={state}
					nextValue={props.options[i + 1]?.value}
					lastValue={props.options[props.options.length - 1].value}
					{...option}
				>
					{option.label}
				</Radio>
			))}
			<Handle {...handleStyles} />
		</GroupWrap>
	)
}

type RadioProps = AriaRadioProps &
	Option & {
		state: RadioGroupState
		lastValue: string
		nextValue?: string
		children: ReactNode
	}

const Radio = ({ lastValue, nextValue, state, ...props }: RadioProps) => {
	const ref = useRef(null)
	const { inputProps } = useRadio(props, state, ref)
	const isSelected = state.selectedValue === props.value
	const isLastOption = props.value === lastValue
	const nextOptionIsSelected = state.selectedValue === nextValue

	return (
		<Tooltip content={props.tooltip} data-radio-value={props.value}>
			{({ props: tProps, ref: tRef }) => (
				<RadioWrap
					isSelected={isSelected}
					ref={tRef as RefObject<HTMLLabelElement>}
					{...tProps}
				>
					<RadioInput {...inputProps} ref={ref} />
					{props.children}
					<Divider visible={!isSelected && !nextOptionIsSelected && !isLastOption} />
				</RadioWrap>
			)}
		</Tooltip>
	)
}

export default RadioBar

const GroupWrap = styled.div<{ moveLeft?: boolean }>`
	position: relative;
	display: inline-flex;
	background: ${(p) => p.theme.iBackground};
	box-shadow: inset 0 0 0 1px ${(p) => p.theme.line}, inset ${(p) => p.theme.shadows.s};
	border-radius: ${(p) => p.theme.radii.m};

	${(p) => p.moveLeft && `transform: translateX(-${p.theme.space[0]})`}
`

const Handle = styled.div<{ left?: number; width?: number }>`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: ${(p) => p.theme.activeBackground};
	border-radius: ${(p) => p.theme.radii.m};
	box-shadow: ${(p) => p.theme.shadows.m};
	opacity: 0%;
	transition: transform ${(p) => p.theme.animation.fastOut},
		width ${(p) => p.theme.animation.fastOut}, opacity ${(p) => p.theme.animation.fastOut};

	${(p) =>
		(p.left || p.width) &&
		`
		opacity: 100%;
		transform: translateX(${p.left}px);
		width: ${p.width}px;
	`}

	@media (prefers-reduced-motion) {
		display: none;
	}
`

const RadioWrap = styled.label<{ isSelected: boolean }>`
	position: relative;
	display: block;
	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
	cursor: pointer;

	@media (prefers-reduced-motion) {
		&::after {
			content: '';
			${(p) => p.theme.utils.spread};
			border-radius: ${(p) => p.theme.radii.m};
			background: ${(p) => p.theme.activeBackground};
			z-index: -1;
			opacity: 0;
			transition: opacity ${(p) => p.theme.animation.mediumOut};
		}
	}

	${(p) =>
		p.isSelected &&
		`
		color: ${p.theme.onActiveBackground};
		text-shadow: ${p.theme.shadows.text};
		z-index: 1;

		@media (prefers-reduced-motion) {
			&::after {
				opacity: 1;
			}
		}
	`}
`

const Divider = styled.div<{ visible: boolean }>`
	position: absolute;
	top: 50%;
	right: 0;
	width: 0;
	height: 50%;
	transform: translateY(-50%);
	border-right: solid 1px ${(p) => p.theme.line};
	transition: opacity ${(p) => p.theme.animation.mediumOut};

	${(p) => !p.visible && `opacity: 0%;`}
`

const RadioInput = styled.input`
	appearance: none;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	padding: 0;
	margin: 0 1px;
	border-radius: ${(p) => p.theme.radii.m};
	transition: box-shadow ${(p) => p.theme.animation.fastOut};
	cursor: pointer;
	z-index: -1;
`
