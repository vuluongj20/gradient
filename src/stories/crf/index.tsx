import Hero from './hero'
import PartI from './partI'

import Page from '@components/page'

import MDXStoryProvider from '@utils/mdxStoryProvider'

const Component = () => {
	return (
		<Page>
			<script>
				{`MathJax = {
			  tex: {
			    inlineMath: [['$', '$'], ['\\(', '\\)']]
			  },
			  svg: {
			    fontCache: 'global'
			  }
			};`}
			</script>
			<script
				type="text/javascript"
				id="MathJax-script"
				async
				src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
			></script>
			<MDXStoryProvider>
				<Hero />
				<PartI />
			</MDXStoryProvider>
		</Page>
	)
}

export default Component
