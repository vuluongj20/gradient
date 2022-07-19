import styled from 'styled-components'

import { Theme } from '@theme'

type Props = { gridColumn?: keyof Theme['utils']['gridColumn'] }

export const Title = styled.h1<Props>`
	${(p) => p.theme.text.content.h1};
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const Abstract = styled.p<Props>`
	${(p) => p.theme.utils.space.marginTop[3]}
	${(p) => p.theme.text.content.h5};
	color: ${(p) => p.theme.heading};
	font-weight: 400;
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`

export const Body = styled.p<Props>`
	${(p) => p.theme.utils.space.marginBottom[2]}
	${(p) => p.theme.text.content.body};
	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}
`
