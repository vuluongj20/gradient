import Content from './content.mdx'
import { references } from './references'

import Head from '@components/head'
import Page from '@components/page'

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

export { Head }
