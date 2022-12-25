import { PageProps } from 'gatsby'

import Content from './contentDev.mdx'
import references from './references.csl.json'

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

export const Head = ({ pageContext }: PageProps) => <SEO {...pageContext} />
