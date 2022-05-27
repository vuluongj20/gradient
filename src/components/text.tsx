import styled from 'styled-components'

export const Abstract = styled.p`
	&& {
		${(p) => p.theme.text.content.h5};
		color: ${(p) => p.theme.heading};
		font-weight: 400;
	}
	${(p) => p.theme.utils.space.marginTop[2]}
`
