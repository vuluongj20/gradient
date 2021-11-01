import styled from 'styled-components'

import { CardContent } from './card'
import CardArea from './cardArea'

import Grid from '@components/grid'

type Props = {
	cards: CardContent[]
}

const CardGrid = ({ cards }: Props): JSX.Element => (
	<Wrap>
		<CardArea cards={cards} />
	</Wrap>
)

export default CardGrid

const Wrap = styled(Grid)`
	row-gap: ${(p) => p.theme.s[4]};
`
