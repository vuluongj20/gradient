import styled from 'styled-components'

import { Theme } from '@theme'

export default styled.div<{
	borderRadius: keyof Theme['radii']
	isHovered?: boolean
	isPressed?: boolean
	isExpanded?: boolean
	opacityFactor?: number
}>`
	${(p) => p.theme.utils.spread};
	z-index: 0;
	opacity: 0;
	background-color: currentcolor;
	filter: saturate(10%);
	border-radius: calc(${(p) => p.theme.radii[p.borderRadius]} - 1px);
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${(p) =>
		p.isHovered && `opacity: ${0.06 * p.theme.opacityFactor * (p.opacityFactor ?? 1)};`}
	${(p) =>
		(p.isPressed || p.isExpanded) &&
		`opacity: ${0.1 * p.theme.opacityFactor * (p.opacityFactor ?? 1)};`}
`
