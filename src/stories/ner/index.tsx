import HeroMDX from './hero/content.mdx'
import PartIMDX from './partI/content.mdx'
import PartIIMDX from './partII/content.mdx'

import Head from '@components/head'
import Page from '@components/page'
import { Reference } from '@components/references'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const references: Reference[] = [
	{
		id: 'test_1',
		title: 'Test 1',
		author: [{ family: 'Luong', given: 'Vu' }],
		year: 2022,
	},
	{
		id: 'test_2',
		title: 'Test 2',
		author: [{ family: 'Luong', given: 'Vu2' }],
		year: 2022,
	},
]

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider references={references}>
				<HeroMDX />
				<PartIMDX />
				<PartIIMDX />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component

export { Head }
