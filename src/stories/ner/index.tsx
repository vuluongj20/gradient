import { PageProps } from 'gatsby'
import { Fragment } from 'react'

import Content from './content.mdx'
import { references } from './references'

import AsyncStylesheet from '@components/asyncStyleSheet'
import Page from '@components/page'
import SEO from '@components/seo'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider references={references}>
				<Content />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component

export const Head = ({ pageContext }: PageProps) => (
	<Fragment>
		<SEO {...pageContext} />
		<AsyncStylesheet href="/katex.min.css" />
	</Fragment>
)
