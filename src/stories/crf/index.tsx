import Hero from './hero'
import PartI from './partI'

import Page from '@components/page'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider>
				<Hero />
				<PartI />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component
