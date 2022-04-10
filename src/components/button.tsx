import { useButton } from '@react-aria/button'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { AriaButtonProps } from '@react-types/button'
import { ReactNode, useRef } from 'react'
import styled from 'styled-components'

type Props = AriaButtonProps & { children: ReactNode; className?: string }

const Button = ({ children, className, ...props }: Props) => {
	const ref = useRef()
	const { buttonProps, isPressed } = useButton(props, ref)
	const { hoverProps, isHovered } = useHover({})

	return (
		<Wrap ref={ref} className={className} {...mergeProps(buttonProps, hoverProps)}>
			<StateLayer isPressed={isPressed} isHovered={isHovered} />
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

const StateLayer = styled.div<{ isHovered: boolean; isPressed: boolean }>`
	${(p) => p.theme.utils.spread};
	z-index: 0;
	opacity: 0;
	background-color: ${(p) => p.theme.body};
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${(p) => p.isHovered && `&& {opacity: 0.12;}`}
	${(p) => p.isPressed && `&& {opacity: 0.24;}`}
`
