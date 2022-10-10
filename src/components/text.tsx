import styled from 'styled-components'

import { Theme } from '@theme'

type Props = { gridColumn?: keyof Theme['gridColumn'] }

export const Title = styled.h1<Props>`
	${(p) => p.theme.text.content.h1};
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Abstract = styled.p<Props>`
	${(p) => p.theme.text.content.h6}
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	color: ${(p) => p.theme.heading};
	line-height: 1.3;
	letter-spacing: -0.03em;

	${(p) => p.theme.marginTop[3]}
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Heading = styled.h2<Props>`
	${(p) => p.theme.text.content.h2}
	${(p) => p.theme.marginBottom[5]}
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
	
	/* Force line breaks after each word */
	word-spacing: 100em;
	text-align: center;

	.autolinked-header.before {
		position: absolute;
		width: 100%;
		height: auto;
		top: auto;
		bottom: 0;
		left: 0;
		padding-top: ${(p) => p.theme.space[0.5]};
		transform: translateY(100%);

		${(p) => p.theme.media.xs} {
			padding-top: 0;
		}
	}
`

export const Subheading = styled.h3<Props>`
	${(p) => p.theme.text.content.h5}
	${(p) => p.theme.marginBottom[3]}
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Body = styled.p<Props>`
	${(p) => p.theme.text.content.body};
	${(p) => p.theme.marginBottom[3]}
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Link = styled.a<Props>`
	${(p) => p.theme.text.content.body};
	color: ${(p) => p.theme.contentLinkText};
	text-decoration-color: ${(p) => p.theme.contentLinkUnderline};

	&:hover:not([data-no-underline='true']) {
		text-decoration-color: ${(p) => p.theme.contentLinkUnderlineHover};
	}
`

export const Footnote = styled.sup`
	font-size: 0.5em;
`
