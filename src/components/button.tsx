import { useButton } from '@react-aria/button'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import {
	ForwardRefRenderFunction,
	HTMLAttributes,
	ReactNode,
	RefObject,
	forwardRef,
	useRef,
} from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

import IconChevronDown from '@icons/chevronDown'

type Props = HTMLAttributes<HTMLButtonElement> &
	AriaButtonProps & {
		children: ReactNode
		primary?: boolean
		filled?: boolean
		small?: boolean
		showBorder?: boolean
		showExpandIcon?: boolean
		className?: string
	}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
	{
		children,
		title,
		className,
		tooltipProps = {},
		primary = false,
		filled = false,
		small = false,
		showBorder = false,
		showExpandIcon = false,
		...props
	}: Props,
	forwardedRef,
) => {
	const innerRef = useRef<HTMLButtonElement>(null)
	const ref = (forwardedRef ?? innerRef) as RefObject<HTMLButtonElement>

	const { buttonProps, isPressed } = useButton(props, ref)
	const { hoverProps, isHovered } = useHover({})
	const isExpanded = !!props['aria-expanded']

	return (
		<Wrap
			ref={ref}
			primary={primary}
			filled={filled}
			small={small}
			showBorder={showBorder}
			showExpandIcon={showExpandIcon}
			isExpanded={isExpanded}
			className={className}
			title={title}
			{...mergeProps(buttonProps, tooltipProps, hoverProps)}
		>
			<StateLayer
				borderWidth={showBorder ? 1 : 0}
				isPressed={isPressed}
				isHovered={isHovered}
				isExpanded={isExpanded}
			/>
			{children}
			{showExpandIcon && <IconChevronDown aria-hidden="true" />}
		</Wrap>
	)
}

export default forwardRef(BaseButton)

const Wrap = styled.button<{
	primary: boolean
	filled: boolean
	small: boolean
	showBorder: boolean
	showExpandIcon: boolean
	isExpanded: boolean
}>`
	display: flex;
	align-items: center;
	position: relative;

	appearance: none;
	border: none;
	cursor: pointer;
	border-radius: ${(p) => p.theme.radii.s};
	padding: ${(p) =>
		p.small
			? `${p.theme.space[0.5]} ${p.theme.space[1]}`
			: `${p.theme.space[1]} ${p.theme.space[1.5]}`};
	background-color: ${(p) =>
		p.filled
			? p.primary
				? p.theme.primaryOpaqueBackground
				: p.theme.iLine
			: 'transparent'};
	transition: color, box-shadow ${(p) => p.theme.animation.vFastOut};

	${(p) => p.theme.text.system.label};
	color: ${(p) => (p.primary ? p.theme.primaryText : p.theme.buttonLabel)};

	&:hover {
		color: ${(p) => (p.primary ? p.theme.primaryText : p.theme.heading)};
	}

	&:focus {
		outline: none;
	}
	&.focus-visible {
		${(p) => p.theme.utils.focusVisible};
	}

	${(p) => p.showExpandIcon && `padding-right: ${p.theme.space[0]};`}
	${(p) =>
		p.showBorder && `border: solid 1px ${p.isExpanded ? p.theme.oLine : p.theme.line};`}
`
