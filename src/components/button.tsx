import { useButton } from '@react-aria/button'
import { HoverProps, useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import { ForwardRefRenderFunction, ReactNode, RefObject, forwardRef, useRef } from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

import IconChevronDown from '@icons/chevronDown'

interface ButtonProps extends AriaButtonProps, HoverProps {
	children: ReactNode
	title?: string
	primary?: boolean
	filled?: boolean
	small?: boolean
	showBorder?: boolean
	showExpandIcon?: boolean
	hideStateLayer?: boolean
	className?: string
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
	{
		children,
		title,
		className,
		primary = false,
		filled = false,
		small = false,
		showBorder = false,
		showExpandIcon = false,
		hideStateLayer = false,
		...props
	},
	forwardedRef,
) => {
	const innerRef = useRef<HTMLButtonElement>(null)
	const ref = (forwardedRef ?? innerRef) as RefObject<HTMLButtonElement>

	const { buttonProps, isPressed } = useButton(props, ref)
	const { hoverProps, isHovered } = useHover(props)
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
			{...mergeProps(buttonProps, hoverProps)}
		>
			{!hideStateLayer && (
				<StateLayer
					borderWidth={showBorder ? 1 : 0}
					isPressed={isPressed}
					isHovered={isHovered}
					isExpanded={isExpanded}
				/>
			)}
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
	border-radius: var(--border-radius-s);
	padding: ${(p) =>
		p.small ? `var(--space-0-5) var(--space-1)` : `var(--space-1) var(--space-1-5)`};
	background-color: ${(p) =>
		p.filled
			? p.primary
				? 'var(--color-primary-opaque-background)'
				: 'var(--color-line)'
			: 'transparent'};
	transition:
		color,
		box-shadow var(--animation-v-fast-out);

	${(p) => p.theme.text.label};
	color: ${(p) =>
		p.primary ? 'var(--color-primary-text)' : 'var(--color-button-label)'};

	&:hover {
		color: ${(p) => (p.primary ? 'var(--color-primary-text)' : 'var(--color-heading)')};
	}

	&:focus {
		outline: none;
	}
	&.focus-visible {
		${(p) => p.theme.focusVisible};
	}

	${(p) => p.showExpandIcon && `padding-right: var(--space-0);`}
	${(p) =>
		p.showBorder &&
		`border: solid 1px ${p.isExpanded ? 'var(--color-line)' : 'var(--color-line)'}`}
`
