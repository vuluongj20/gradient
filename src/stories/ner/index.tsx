import { PageProps } from 'gatsby'

import ContentFull from './content.mdx'
import ContentDev from './contentDev.mdx'
import references from './references.csl.json'

import Page from '@components/page'
import SEO from '@components/seo'

import { isDev } from '@utils/functions'
import MDXStoryProvider from '@utils/mdxStoryProvider'

const Content = isDev ? ContentDev : ContentFull

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
