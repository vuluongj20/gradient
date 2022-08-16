import HeroMDX from './hero.mdx'
import PartIMDX from './partI/content.mdx'
import PartIIMDX from './partII/content.mdx'

import Head from '@components/head'
import Page from '@components/page'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider>
				<HeroMDX />
				<PartIMDX />
				<PartIIMDX />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component

export { Head }
