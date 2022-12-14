import { MDXProvider } from '@mdx-js/react'
import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

import Alert from '@components/alert'
import Figure from '@components/figure'
import Grid from '@components/grid'
import { Citation, References, ReferencesProvider } from '@components/references'
import SectionDivider from '@components/sectionDivider'
import * as Text from '@components/text'

interface MDXComponentProps {
	children?: ReactNode
}

const Header = ({ children, ...props }: MDXComponentProps) => (
	<HeaderWrap as="header" {...props}>
		{children}
	</HeaderWrap>
)
const Title = ({ children, ...props }: MDXComponentProps) => (
	<Grid>
		<Text.Title gridColumn="text" {...props}>
			{children}
		</Text.Title>
	</Grid>
)
const Abstract = ({ children, ...props }: MDXComponentProps) => (
	<Grid>
		<Text.Abstract gridColumn="text" {...props}>
			{children}
		</Text.Abstract>
	</Grid>
)
const SectionHeading = ({ children, ...props }: MDXComponentProps) => (
	<Grid>
		<Text.Heading gridColumn="text" {...props}>
			{children}
		</Text.Heading>
	</Grid>
)
const SectionSubHeading = ({ children, ...props }: MDXComponentProps) => (
	<Grid>
		<Text.Subheading gridColumn="text" {...props}>
			{children}
		</Text.Subheading>
	</Grid>
)
const Body = ({ children, ...props }: MDXComponentProps) => (
	<Grid role="presentation">
		<Text.Body gridColumn="text" {...props}>
			{children}
		</Text.Body>
	</Grid>
)

const WrappedAlert = ({ children, ...props }: MDXComponentProps) => (
	<Grid role="presentation">
		<Alert gridColumn="text" {...props}>
			{children}
		</Alert>
	</Grid>
)

interface MDXStoryProviderProps {
	children?: ReactNode
	references?: CSL.Data[]
}

const MDXStoryProvider = ({ references = [], children }: MDXStoryProviderProps) => (
	<MDXProvider
		components={{
			h1: Title,
			h2: SectionHeading,
			h3: SectionSubHeading,
			p: Body,
			a: Text.Link,
			sup: Text.Footnote,
			hr: () => <SectionDivider />,
			Alert: WrappedAlert,
			Header,
			Abstract,
			Figure,
			Grid,
			Citation,
			References,
		}}
	>
		<ReferencesProvider references={references}>{children}</ReferencesProvider>
	</MDXProvider>
)

export default MDXStoryProvider

const HeaderWrap = styled.header`
	padding-top: var(--adaptive-space-5);
	padding-bottom: var(--adaptive-space-5);
`
