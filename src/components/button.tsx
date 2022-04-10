import { useButton } from '@react-aria/button'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import { ReactNode, RefObject, useRef } from 'react'
import styled from 'styled-components'

import StateLayer from '@components/stateLayer'

type Props = AriaButtonProps & {
	children: ReactNode
	forwardRef?: RefObject<HTMLButtonElement>
	className?: string
}

const Button = ({ children, forwardRef, className, ...props }: Props) => {
	const innerRef = useRef()
	const ref = forwardRef ?? innerRef
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

export default Button

const Wrap = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
	border-radius: ${(p) => p.theme.radii.s};
	padding: ${(p) => p.theme.space[0]};
`
