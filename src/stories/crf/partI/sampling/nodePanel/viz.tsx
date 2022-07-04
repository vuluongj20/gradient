import * as select from 'd3-selection'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import SamplingNode from '../model/node'

type Props = {
	node: SamplingNode
}

const NodeDistributionCurve = ({ node }: Props) => {
	return <Wrap />
}

export default observer(NodeDistributionCurve)

const Wrap = styled.div`
	width: 100%;
	height: 8rem;
`
