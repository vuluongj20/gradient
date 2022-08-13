import styled from 'styled-components'

import HeroMDX from './hero.mdx'
import PartIMDX from './partI/index.mdx'

import GuideArrow from '@components/guideArrow'
import Page from '@components/page'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<MDXStoryProvider>
				<StyledGuideArrow from="top" to="left" />
				<HeroMDX />
				<PartIMDX />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component

const StyledGuideArrow = styled(GuideArrow)`
	margin: 2rem auto;
	width: 8rem;
	height: 4rem;
`
