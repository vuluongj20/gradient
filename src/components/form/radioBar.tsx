import { useRadioGroup, useRadio } from '@react-aria/radio'
import { useRadioGroupState, RadioGroupState } from '@react-stately/radio'
import { AriaRadioProps, AriaRadioGroupProps } from '@react-types/radio'
import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

type RadioProps = AriaRadioProps & {
	state: RadioGroupState
	nextValue?: string
}

const Radio = ({ nextValue, state, ...props }: RadioProps) => {
	const ref = useRef(null)
	const { inputProps } = useRadio(props, state, ref)
	const isSelected = state.selectedValue === props.value
	const nextOptionIsSelected = state.selectedValue === nextValue

	return (
		<RadioWrap data-radio-value={props.value} isSelected={isSelected}>
			<RadioInput {...inputProps} ref={ref} />
			{props.children}
			<Divider visible={!isSelected && !nextOptionIsSelected} />
		</RadioWrap>
	)
}

type RadioBarProps = AriaRadioGroupProps & {
	options: { value: string; label: string }[]
}

type HandleStyles = { left: number; width: number }

const RadioBar = (props: RadioBarProps) => {
	const ref = useRef(null)
	const state = useRadioGroupState(props)
	const { radioGroupProps } = useRadioGroup(props, state)
	const [handleLookup, setHandleLookup] = useState<Record<string, HandleStyles>>([])
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
		<GroupWrap {...radioGroupProps} ref={ref}>
			{props.options.map((option, i) => (
				<Radio
					key={option.value}
					state={state}
					{...option}
					nextValue={props.options[i + 1]?.value}
				>
					{option.label}
				</Radio>
			))}
			<Handle {...handleStyles} />
		</GroupWrap>
	)
}

export default RadioBar

const RadioWrap = styled.label<{ isSelected: boolean }>`
	position: relative;
	display: block;
	padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[2]};
	cursor: pointer;

	${(p) =>
		p.isSelected &&
		`
		color: ${p.theme.colors.onActiveBackground};
		text-shadow: ${p.theme.shadows.text};
		z-index: 1;
	`}
`

const Divider = styled.div<{ visible: boolean }>`
	position: absolute;
	top: 50%;
	right: 0;
	width: 0;
	height: 50%;
	transform: translateY(-50%);
	border-right: solid 1px ${(p) => p.theme.colors.line};
	transition: opacity 0.5s ${(p) => p.theme.animation.easeOutQuart};

	${(p) => !p.visible && `opacity: 0%;`}
	${/* sc-selector*/ RadioWrap}:last-of-type > & {
		display: none;
	}
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
	transition: box-shadow 0.25s ${(p) => p.theme.animation.easeOutQuart};
	cursor: pointer;
	z-index: -1;

	/*&.focus-visible {
		box-shadow: inset 0 0 0 1px ${(p) => p.theme.colors.focus},
			0 0 0 4px ${(p) => p.theme.colors.focus};
	}*/
`

const GroupWrap = styled.div`
	position: relative;
	display: inline-flex;
	background: ${(p) => p.theme.colors.iBackground};
	box-shadow: inset 0 0 0 1px ${(p) => p.theme.colors.line},
		inset ${(p) => p.theme.shadows.s};
	border-radius: ${(p) => p.theme.radii.m};
`

const Handle = styled.div<{ left?: number; width?: number }>`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: ${(p) => p.theme.colors.activeBackground};
	border-radius: ${(p) => p.theme.radii.m};
	box-shadow: ${(p) => p.theme.shadows.m};
	width: 0;
	transform: translateX(0);
	opacity: 0%;
	transition: transform 0.5s ${(p) => p.theme.animation.easeOutQuart},
		width 0.5s ${(p) => p.theme.animation.easeOutQuart},
		opacity 0.5s ${(p) => p.theme.animation.easeOutQuart};

	${(p) =>
		(p.left || p.width) &&
		`
		opacity: 100%;
		transform: translateX(${p.left}px);
		width: ${p.width}px;
	`}
`
