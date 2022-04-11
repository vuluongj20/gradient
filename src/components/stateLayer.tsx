import styled from 'styled-components'

import { Theme } from '@theme'

export default styled.div<{
	isHovered?: boolean
	isPressed?: boolean
	isExpanded?: boolean
	radius?: keyof Theme['radii']
}>`
	${(p) => p.theme.utils.spread};
	z-index: 0;
	opacity: 0;
	background-color: ${(p) => p.theme.body};
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	border-radius: ${(p) => p.theme.radii[p.radius ?? 's']};

	${(p) => p.isHovered && `opacity: 0.08;`}
	${(p) => (p.isPressed || p.isExpanded) && `opacity: 0.12;`}
`
