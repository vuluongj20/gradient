import styled from 'styled-components'

export const Title = styled.h1`
	${(p) => p.theme.text.content.h1};
`

export const Abstract = styled.p`
	${(p) => p.theme.text.content.h5};
	color: ${(p) => p.theme.heading};
	font-weight: 400;
	${(p) => p.theme.utils.space.marginTop[3]}
`
3
export const Body = styled.p`
	${(p) => p.theme.text.content.body};
`
