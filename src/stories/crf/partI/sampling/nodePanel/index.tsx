import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import SamplingNode from '../model/node'
import Fields from './fields'
import Viz from './viz'

type Props = {
	node: SamplingNode
	overlayProps: HTMLAttributes<HTMLDivElement>
}

const SamplingNodePanel = ({ node, overlayProps }: Props) => {
	return (
		<Wrap {...overlayProps}>
			<NodeLabel>{node.label}</NodeLabel>
			<NodeDesciption>
				This is a root node. Its value will be sampled from the distribution below.
			</NodeDesciption>
			<Viz node={node} />
			<Fields node={node} />
		</Wrap>
	)
}

export default SamplingNodePanel

const Wrap = styled.div`
	width: 18rem;
`

const NodeLabel = styled.h2`
	${(p) => p.theme.text.system.h5};
	border-bottom: solid 1px ${(p) => p.theme.line};
	padding-bottom: ${(p) => p.theme.space[0]};
	margin-top: ${(p) => p.theme.space[0]};
	margin-bottom: ${(p) => p.theme.space[2]};
`

const NodeDesciption = styled.p`
	color: ${(p) => p.theme.label};
	margin-bottom: ${(p) => p.theme.space[2]};
`
