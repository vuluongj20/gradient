import styled from 'styled-components'

export default styled.div<{
	isHovered?: boolean
	isPressed?: boolean
	isExpanded?: boolean
}>`
	${(p) => p.theme.utils.spread};
	z-index: 0;
	opacity: 0;
	background-color: ${(p) => p.theme.body};
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${(p) => p.isHovered && `opacity: 0.08;`}
	${(p) => (p.isPressed || p.isExpanded) && `opacity: 0.12;`}
`
