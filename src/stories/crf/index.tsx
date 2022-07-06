import styled from 'styled-components'

import Hero from './hero'
import PartI from './partI'

import Page from '@components/page'

const Component = () => {
	return (
		<Page>
			<Wrap>
				<Hero />
				<PartI />
			</Wrap>
		</Page>
	)
}

export default Component

const Wrap = styled.article`
	--theme: ${(p) => p.theme.green1};
	--warm: ${(p) => p.theme.red1};
	--cool: ${(p) => p.theme.blue1};
	min-height: 100vh;

	svg {
		margin: 0 auto;
		overflow: visible;
	}
`
