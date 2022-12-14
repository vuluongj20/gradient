import styled from 'styled-components'

import { Theme } from '@theme'

interface TextProps {
	gridColumn?: keyof Theme['gridColumn']
}

export const Title = styled.h1<TextProps>`
	${(p) => p.theme.text.content.h1};
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Abstract = styled.p<TextProps>`
	${(p) => p.theme.text.content.h6}
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	color: var(--color-heading);
	line-height: 1.3;
	letter-spacing: -0.03em;

	margin-top: var(--adaptive-space-3);
	margin-bottom: var(--adaptive-space-5);
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Heading = styled.h2<TextProps>`
	${(p) => p.theme.text.content.h2}
	margin-bottom: var(--adaptive-space-5);
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
		padding-top: var(--space-0);
		transform: translateY(100%);

		${(p) => p.theme.media.xs} {
			padding-top: 0;
		}
	}
`

export const Subheading = styled.h3<TextProps>`
	${(p) => p.theme.text.content.h5}
	margin-bottom: var(--adaptive-space-3);
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Body = styled.p<TextProps>`
	${(p) => p.theme.text.content.body};
	margin-bottom: var(--adaptive-space-3);
	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
`

export const Link = styled.a<TextProps>`
	${(p) => p.theme.text.content.body};
	color: var(--color-content-link-text);
	text-decoration-color: var(--color-content-link-underline);

	&:hover:not([data-no-underline='true']) {
		text-decoration-color: var(--color-content-link-underline-hover);
	}
`

export const Footnote = styled.sup`
	font-size: 0.5em;
`
