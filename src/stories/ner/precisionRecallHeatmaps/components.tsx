import styled from 'styled-components'

import Button from '@components/button'

export const OverlayWrap = styled.div`
	${(p) => p.theme.spread};
	background: ${(p) => p.theme.background};

	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.mediumOut};
`

export const OverlayTrigger = styled(Button)<{ isClicked: boolean }>`
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.label};
	white-space: nowrap;

	border: dashed 1px ${(p) => p.theme.oLine};
	cursor: initial;

	&:hover {
		color: ${(p) => p.theme.label};
		border-style: solid;
	}

	${(p) =>
		p.isClicked &&
		`
		background: ${p.theme.iiBackground};
		border-style: solid;
	`}
`
