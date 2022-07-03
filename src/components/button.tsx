import { useButton } from '@react-aria/button'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import { ForwardRefRenderFunction, ReactNode, RefObject, forwardRef, useRef } from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

import IconExpandMore from '@icons/expandMore'

type Props = AriaButtonProps & {
	children: ReactNode
	small?: boolean
	showExpandIcon?: boolean
	className?: string
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
	{ children, className, small = false, showExpandIcon = false, ...props }: Props,
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
			small={small}
			showExpandIcon={showExpandIcon}
			className={className}
			{...mergeProps(buttonProps, hoverProps)}
		>
			<StateLayer isPressed={isPressed} isHovered={isHovered} isExpanded={isExpanded} />
			{children}
			{showExpandIcon && <IconExpandMore aria-hidden="true" />}
		</Wrap>
	)
}

export default forwardRef(BaseButton)

const Wrap = styled.button<{ small: boolean; showExpandIcon: boolean }>`
	display: flex;
	align-items: center;
	position: relative;
	border-radius: ${(p) => p.theme.radii.s};
	padding: ${(p) =>
		p.small ? `${p.theme.space[0]} ${p.theme.space[1]}` : p.theme.space[1]};
	${(p) => p.showExpandIcon && `padding-right: ${p.theme.space[0]};`}
`
