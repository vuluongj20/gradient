import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import Divider from '@components/divider'
import Figure from '@components/figure'
import Grid from '@components/grid'
import * as Text from '@components/text'

type Props = { children: ReactNode }

const Header = ({ children }: Props) => <HeaderWrap as="header">{children}</HeaderWrap>
const Title = ({ children }: Props) => (
	<Text.Title gridColumn="text">{children}</Text.Title>
)
const Abstract = ({ children }: Props) => (
	<Text.Abstract gridColumn="text">{children}</Text.Abstract>
)
const Body = ({ children }: Props) => (
	<Grid>
		<Text.Body gridColumn="text">{children}</Text.Body>
	</Grid>
)

const components = {
	h1: Title,
	p: Body,
	a: Text.Link,
	hr: Divider,
	Header,
	Abstract,
	Figure,
	Grid,
}

const MDXStoryProvider = ({ children }: Props) => (
	<MDXProvider components={components}>{children}</MDXProvider>
)

export default MDXStoryProvider

const HeaderWrap = styled(Grid)`
	${(p) => p.theme.utils.space.paddingVertical[5]}
`
