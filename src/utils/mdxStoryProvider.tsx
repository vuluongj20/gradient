import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import Figure from '@components/figure'
import Grid from '@components/grid'
import SectionDivider from '@components/sectionDivider'
import * as Text from '@components/text'

type Props = { children: ReactNode }

const Header = ({ children, ...props }: Props) => (
	<HeaderWrap as="header" {...props}>
		{children}
	</HeaderWrap>
)
const Title = ({ children, ...props }: Props) => (
	<Grid>
		<Text.Title gridColumn="text" {...props}>
			{children}
		</Text.Title>
	</Grid>
)
const Abstract = ({ children, ...props }: Props) => (
	<Grid>
		<Text.Abstract gridColumn="text" {...props}>
			{children}
		</Text.Abstract>
	</Grid>
)
const SectionHeading = ({ children, ...props }: Props) => (
	<Grid>
		<Text.Heading gridColumn="text" {...props}>
			{children}
		</Text.Heading>
	</Grid>
)
const SectionSubHeading = ({ children, ...props }: Props) => (
	<Grid>
		<Text.Subheading gridColumn="text" {...props}>
			{children}
		</Text.Subheading>
	</Grid>
)
const Body = ({ children, ...props }: Props) => (
	<Grid role="presentation">
		<Text.Body gridColumn="text" {...props}>
			{children}
		</Text.Body>
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
	${(p) => p.theme.paddingVertical[5]}
`
