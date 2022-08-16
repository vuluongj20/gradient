import styled from 'styled-components'

import { Theme } from '@theme'

type Props = { gridColumn?: keyof Theme['utils']['gridColumn'] }

export const Title = styled.h1<Props>`
	${(p) => p.theme.text.content.h1};
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const Abstract = styled.p<Props>`
	${(p) => p.theme.text.content.h5}
	color: ${(p) => p.theme.heading};
	font-weight: 400;
	${(p) => p.theme.utils.space.marginTop[3]}
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const SectionHeading = styled.h2<Props>`
	${(p) => p.theme.text.content.h2}
	${(p) => p.theme.utils.space.marginBottom[5]}
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
	
	/* Force line breaks after each word */
	word-spacing: 100em;
	text-align: center;
`

export const SectionSubHeading = styled.h3<Props>`
	${(p) => p.theme.text.content.h5}
	${(p) => p.theme.utils.space.marginBottom[3]}
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const Body = styled.p<Props>`
	${(p) => p.theme.text.content.body};
	${(p) => p.theme.utils.space.marginBottom[3]}
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const Link = styled.a<Props>`
	${(p) => p.theme.text.content.body};
	color: ${(p) => p.theme.contentLinkText};
	text-decoration-color: ${(p) => p.theme.contentLinkUnderline};

	&:hover:not([data-no-underline='true']) {
		text-decoration-color: ${(p) => p.theme.contentLinkUnderlineHover};
	}
`
