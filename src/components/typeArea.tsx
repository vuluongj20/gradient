import styled from 'styled-components'

import { ThemeSettings } from '@theme'

const TypeArea = styled.div<{ type: keyof ThemeSettings['text'] }>`
	font-family: ${(p) => p.theme.text[p.type].body.fontFamily};

	h1 {
		font-family: ${(p) => p.theme.text[p.type].h1.fontFamily};
	}
	h2 {
		font-family: ${(p) => p.theme.text[p.type].h2.fontFamily};
	}
	h3 {
		font-family: ${(p) => p.theme.text[p.type].h3.fontFamily};
	}
	h4 {
		font-family: ${(p) => p.theme.text[p.type].h4.fontFamily};
	}
	h5 {
		font-family: ${(p) => p.theme.text[p.type].h5.fontFamily};
	}
	h6 {
		font-family: ${(p) => p.theme.text[p.type].h6.fontFamily};
	}

	p,
	a,
	li,
	button,
	input {
		font-family: ${(p) => p.theme.text[p.type].body.fontFamily};
	}

	small {
		font-family: ${(p) => p.theme.text.system.small.fontFamily};
	}
`

export default TypeArea
