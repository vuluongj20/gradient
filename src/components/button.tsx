import { useButton } from '@react-aria/button'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import { ForwardRefRenderFunction, ReactNode, RefObject, forwardRef, useRef } from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

type Props = AriaButtonProps & {
	children: ReactNode
	className?: string
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
	{ children, className, ...props }: Props,
	forwardedRef,
) => {
	const innerRef = useRef<HTMLButtonElement>(null)
	const ref = (forwardedRef ?? innerRef) as RefObject<HTMLButtonElement>

	const { buttonProps, isPressed } = useButton(props, ref)
	const { hoverProps, isHovered } = useHover({})
	const isExpanded = !!props['aria-expanded']

	return (
		<Wrap ref={ref} className={className} {...mergeProps(buttonProps, hoverProps)}>
			<StateLayer isPressed={isPressed} isHovered={isHovered} isExpanded={isExpanded} />
			{children}
		</Wrap>
	)
}

export default forwardRef(BaseButton)

const Wrap = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	border-radius: ${(p) => p.theme.radii.s};
	padding: ${(p) => p.theme.space[0]};
`
