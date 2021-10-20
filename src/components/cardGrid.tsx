import styled from 'styled-components'

import { CardContent } from './card'
import CardArea, { Offsets } from './cardArea'

import Grid from '@components/grid'

type Props = {
	cards: CardContent[]
	offsets: Offsets
}

const CardGrid = ({ cards, offsets }: Props): JSX.Element => (
	<Wrap>
		<CardArea cards={cards} offsets={offsets} />
	</Wrap>
)

export default CardGrid

const Wrap = styled(Grid)`
	row-gap: ${(p) => p.theme.s[4]};
`
