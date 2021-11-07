import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	color: string
	children: ReactNode
	className: string
}

const SVG = ({ color = 'text', children, className }: Props) => {
	return (
		<StyledSVG
			xmlns="http://www.w3.org/2000/svg"
			height="18px"
			viewBox="0 0 18 18"
			width="18px"
			color={color}
			className={className}
		>
			{children}
		</StyledSVG>
	)
}

export default SVG

const StyledSVG = styled.svg<{ color: string }>`
	fill: ${(p) => p.theme.c[p.color]};
`
