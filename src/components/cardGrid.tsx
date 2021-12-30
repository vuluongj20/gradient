import styled from 'styled-components'

import CardArea from './cardArea'

import Grid from '@components/grid'

import { Story } from '@types'

type Props = {
	stories: Story[]
}

const CardGrid = ({ stories }: Props): JSX.Element => (
	<Wrap>
		<CardArea stories={stories} />
	</Wrap>
)

export default CardGrid

const Wrap = styled(Grid)`
	row-gap: ${(p) => p.theme.space[4]};
`
