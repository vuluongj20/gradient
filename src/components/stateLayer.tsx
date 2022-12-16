import styled from 'styled-components'

import { isDefined } from '@utils/functions'

const getPosition = ({ borderWidth = 0 }) => {
	return `
		position: absolute;
		top: 50%;
		left: 50%;
		width: calc(100% + ${borderWidth * 2}px);
		height: calc(100% + ${borderWidth * 2}px);
		transform: translate(-50%, -50%);
	`
}

export default styled.div<{
	borderWidth?: number
	isHovered?: boolean
	isPressed?: boolean
	isExpanded?: boolean
	opacityFactor?: number
}>`
	${getPosition}
	z-index: 0;
	opacity: 0;
	background-color: currentcolor;
	border-radius: inherit;
	border: solid ${(p) => p.borderWidth ?? 0}px transparent;
	transition: opacity var(--animation-v-fast-out);
	filter: saturate(10%);

	${(p) =>
		isDefined(p.isHovered)
			? `
				opacity: calc(${p.isHovered ? '0.06' : '0'} * var(--opacity-factor) * ${
					p.opacityFactor ?? 1
			  });
			`
			: `
				*:hover > & {
					opacity: calc(0.06 * var(--opacity-factor) * ${p.opacityFactor ?? 1});
				}
			`}

	${(p) =>
		isDefined(p.isPressed) || isDefined(p.isExpanded)
			? `
				opacity: calc(${p.isPressed || p.isExpanded ? '0.1' : '0'} 
					* var(--opacity-factor) 
					* ${p.opacityFactor ?? 1}
				);
			`
			: `
				*:active > &,
				*[aria-expanded="true"] > & {
					opacity: calc(0.1 * var(--opacity-factor) * ${p.opacityFactor ?? 1});
				}
			`}
`
