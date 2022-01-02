import { ReactNode } from 'react'
import styled from 'styled-components'

export type IconProps = {
	color?: string
	className?: string
	useAlt?: boolean
}

type Props = IconProps & {
	alt: string
	children: ReactNode
}

const SVG = ({
	color = 'currentColor',
	className,
	alt,
	useAlt = false,
	children,
}: Props) => {
	return (
		<StyledSVG
			xmlns="http://www.w3.org/2000/svg"
			width="18px"
			height="18px"
			viewBox="0 0 24 24"
			color={color}
			className={className}
			{...(useAlt && { alt })}
		>
			{children}
		</StyledSVG>
	)
}

export default SVG

const StyledSVG = styled.svg<{ color: string }>`
	fill: ${(p) => (p.color === 'currentColor' ? 'currentColor' : p.theme.colors[p.color])};
	transition: color 0.125s ${(p) => p.theme.animation.easeOutQuad};

	path {
		transition: color 0.125s ${(p) => p.theme.animation.easeOutQuad};
	}
`
