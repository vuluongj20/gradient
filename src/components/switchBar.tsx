import { useRadio, useRadioGroup } from '@react-aria/radio'
import { useCollection } from '@react-stately/collections'
import { ListCollection } from '@react-stately/list'
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio'
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio'
import { CollectionBase, Node } from '@react-types/shared'
import {
	Dispatch,
	Key,
	SetStateAction,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import styled from 'styled-components'

import { isDefined } from '@utils/functions'
import useSize from '@utils/useSize'

export { Item } from '@react-stately/collections'

type Position = { left: number; width: number }
type PositionMap = Record<string, Position>

const factory = (nodes: Iterable<Node<object>>) => new ListCollection(nodes)

type SwitchBarProps = AriaRadioGroupProps &
	CollectionBase<object> & { moveLeft?: boolean }
const SwitchBar = ({ moveLeft, ...props }: SwitchBarProps) => {
	const ref = useRef<HTMLDivElement>(null)

	const collection = useCollection(props, factory)
	const collectionList = useMemo(() => [...collection], [collection])
	const lastKey = useMemo(() => collection.getLastKey(), [collection])

	const state = useRadioGroupState(props)
	const { radioGroupProps } = useRadioGroup(props, state)

	// Initialize lookup table that describes the position
	// of each render radio element, useful for animating <Handle />
	const [positionMap, setPositionMap] = useState<PositionMap>({})
	const indicatorPosition = useMemo(
		() =>
			positionMap[state.selectedValue as keyof PositionMap] ?? {
				width: 0,
				height: 0,
			},
		[positionMap, state.selectedValue],
	)

	return (
		<SwitchBarWrap moveLeft={moveLeft} {...radioGroupProps} ref={ref}>
			{[...collectionList].map((option, i) => (
				<SwitchItem
					{...option}
					key={option.key}
					value={String(option.key)}
					state={state}
					nextKey={collectionList[i + 1]?.key}
					lastKey={lastKey}
					setPositionMap={setPositionMap}
				/>
			))}
			<Indicator {...indicatorPosition} />
		</SwitchBarWrap>
	)
}

export default SwitchBar

type SwitchItemProps = Omit<Node<object>, 'value'> &
	AriaRadioProps & {
		state: RadioGroupState
		lastKey: Key
		nextKey?: Key
		setPositionMap: Dispatch<SetStateAction<PositionMap>>
	}
const SwitchItem = ({
	lastKey,
	nextKey,
	state,
	setPositionMap,
	...props
}: SwitchItemProps) => {
	const wrapRef = useRef<HTMLLabelElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const { inputProps } = useRadio(props, state, inputRef)

	const isSelected = useMemo(
		() => state.selectedValue === props.value,
		[state.selectedValue, props.value],
	)
	const isLastOption = useMemo(() => props.value === lastKey, [lastKey, props.value])
	const nextOptionIsSelected = useMemo(
		() => state.selectedValue === nextKey,
		[state.selectedValue, nextKey],
	)

	const { width } = useSize(wrapRef)
	useLayoutEffect(() => {
		if (!wrapRef.current || !width) return
		const parentLeft = wrapRef.current.offsetParent?.getBoundingClientRect().left ?? 0
		const left = wrapRef.current.getBoundingClientRect().left ?? 0

		setPositionMap((cur) => ({
			...cur,
			[props.value]: {
				left: Math.round((left - parentLeft) * 100) / 100,
				width: Math.round(width * 100) / 100,
			},
		}))
	}, [width, props.value, setPositionMap])

	return (
		<SwitchItemWrap isSelected={isSelected} ref={wrapRef}>
			<SwitchItemInput {...inputProps} ref={inputRef} />
			{props.rendered}
			<Divider visible={!isSelected && !nextOptionIsSelected && !isLastOption} />
		</SwitchItemWrap>
	)
}

const SwitchBarWrap = styled.div<{ moveLeft?: boolean }>`
	position: relative;
	display: inline-flex;
	background: ${(p) => p.theme.iiBackground};
	box-shadow: inset ${(p) => p.theme.shadows.s};
	border-radius: ${(p) => p.theme.radii.m};

	${(p) => p.moveLeft && `transform: translateX(-${p.theme.space[0]})`}
`

const Indicator = styled.div<{ left?: number; width?: number }>`
	position: absolute;
	top: 2px;
	left: 2px;
	height: calc(100% - 4px);
	background: ${(p) => p.theme.ooBackground};
	border-radius: calc(${(p) => p.theme.radii.m} - 2px);
	box-shadow: ${(p) => p.theme.shadows.m};
	opacity: 0;
	transition: transform ${(p) => p.theme.animation.fastOut},
		width ${(p) => p.theme.animation.fastOut}, opacity ${(p) => p.theme.animation.fastOut};

	${(p) =>
		isDefined(p.left) &&
		isDefined(p.width) &&
		`
		opacity: 1;
		transform: translateX(${p.left}px);
		width: ${p.width - 4}px;
	`}

	@media (prefers-reduced-motion) {
		display: none;
	}
`

const SwitchItemWrap = styled.label<{ isSelected: boolean }>`
	position: relative;
	display: block;
	padding: ${(p) => p.theme.space[0.5]} ${(p) => p.theme.space[2]};
	cursor: pointer;
	user-select: none;

	@media (prefers-reduced-motion) {
		&::after {
			content: '';
			${(p) => p.theme.spread};
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
		text-shadow: ${p.theme.shadows.text};
		z-index: 1;

		@media (prefers-reduced-motion) {
			&::after {
				opacity: 1;
			}
		}
	`}
`

const SwitchItemInput = styled.input`
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

	&.focus-visible {
		box-shadow: inset 0 0 0 2px ${(p) => p.theme.focus}, 0 0 0 1px ${(p) => p.theme.focus};
	}
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

	${(p) => !p.visible && `opacity: 0;`}
`
