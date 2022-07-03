import styled from 'styled-components'

export default styled.div<{
	isHovered?: boolean
	isPressed?: boolean
	isExpanded?: boolean
	opacityFactor?: number
}>`
	${(p) => p.theme.utils.spread};
	z-index: 0;
	opacity: 0;
	border-radius: inherit;
	background-color: currentcolor;
	filter: saturate(10%);
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${(p) =>
		p.isHovered && `opacity: ${0.06 * p.theme.opacityFactor * (p.opacityFactor ?? 1)};`}
	${(p) =>
		(p.isPressed || p.isExpanded) &&
		`opacity: ${0.1 * p.theme.opacityFactor * (p.opacityFactor ?? 1)};`}
`
