import { ReactNode } from 'react'
import styled from 'styled-components'

import { ColorAliases, ColorPalette } from '@theme/colors'

type ColorProp = ColorPalette['colors'] | ColorAliases | 'currentColor'

export type IconProps = {
	color?: ColorProp
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
			className={className}
			$color={color}
			{...(useAlt && { alt })}
		>
			{children}
		</StyledSVG>
	)
}

export default SVG

const StyledSVG = styled.svg<{ $color: ColorProp }>`
	fill: ${(p) => (p.$color === 'currentColor' ? 'currentColor' : p.theme[p.color])};
	transition: color ${(p) => p.theme.animation.vFastOut};

	path {
		transition: color ${(p) => p.theme.animation.vFastOut};
	}
`
