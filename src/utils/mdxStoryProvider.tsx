import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import Figure from '@components/figure'
import Grid from '@components/grid'
import SectionDivider from '@components/sectionDivider'
import * as Text from '@components/text'

type Props = { children: ReactNode }

const Header = ({ children }: Props) => <HeaderWrap as="header">{children}</HeaderWrap>
const Title = ({ children }: Props) => (
	<Grid>
		<Text.Title gridColumn="text">{children}</Text.Title>
	</Grid>
)
const Abstract = ({ children }: Props) => (
	<Grid>
		<Text.Abstract gridColumn="text">{children}</Text.Abstract>
	</Grid>
)
const SectionHeading = ({ children }: Props) => (
	<Grid>
		<Text.SectionHeading gridColumn="text">{children}</Text.SectionHeading>
	</Grid>
)
const SectionSubHeading = ({ children }: Props) => (
	<Grid>
		<Text.SectionSubHeading gridColumn="text">{children}</Text.SectionSubHeading>
	</Grid>
)
const Body = ({ children }: Props) => (
	<Grid>
		<Text.Body gridColumn="text">{children}</Text.Body>
	</Grid>
)

const components = {
	h1: Title,
	h2: SectionHeading,
	h3: SectionSubHeading,
	p: Body,
	a: Text.Link,
	hr: SectionDivider,
	Header,
	Abstract,
	Figure,
	Grid,
}

const MDXStoryProvider = ({ children }: Props) => (
	<MDXProvider components={components}>{children}</MDXProvider>
)

export default MDXStoryProvider

const HeaderWrap = styled.header`
	${(p) => p.theme.utils.space.paddingVertical[5]}
`
