import styled from 'styled-components'

import { ThemeSettings } from '@theme'

const TypeArea = styled.div<{ type: keyof ThemeSettings['text'] }>`
	${(p) => p.theme.text[p.type].body};

	h1 {
		${(p) => p.theme.text[p.type].h1}
	}
	h2 {
		${(p) => p.theme.text[p.type].h2}
	}
	h3 {
		${(p) => p.theme.text[p.type].h3}
	}
	h4 {
		${(p) => p.theme.text[p.type].h4}
	}
	h5 {
		${(p) => p.theme.text[p.type].h5}
	}
	h6 {
		${(p) => p.theme.text[p.type].h6}
	}

	p,
	a,
	li,
	button,
	input {
		${(p) => p.theme.text[p.type].body};
	}

	small {
		${(p) => p.theme.text.system.small};
	}
`

export default TypeArea
