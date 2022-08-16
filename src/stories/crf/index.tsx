import HeroMDX from './hero.mdx'
import PartIMDX from './partI/index.mdx'

import Head from '@components/head'
import Page from '@components/page'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider>
				<HeroMDX />
				<PartIMDX />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component

export { Head }
