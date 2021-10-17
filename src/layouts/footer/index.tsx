import styled from 'styled-components'

import { theme } from '@utils'

const Footer = (): JSX.Element => {
	return <Wrap></Wrap>
}

export default Footer

const Wrap = styled.footer`
	width: 100%;
	background-color: ${theme('c.surface2')};
`
