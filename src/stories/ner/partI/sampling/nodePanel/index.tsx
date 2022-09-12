import { observer } from 'mobx-react-lite'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import SamplingEdge from '../model/edge'
import SamplingNode from '../model/node'
import ChildNode from './child'
import RootNode from './root'

type Props = {
	node: SamplingNode
	incomingEdges: SamplingEdge[]
	parentNodes: SamplingNode[]
	overlayProps: HTMLAttributes<HTMLDivElement>
}

const SamplingNodePanel = ({ node, incomingEdges, parentNodes, overlayProps }: Props) => {
	return (
		<Wrap {...overlayProps}>
			<NodeLabel>{node.label}</NodeLabel>
			{node.isRoot ? (
				<RootNode node={node} overlayOnKeyDown={overlayProps.onKeyDown} />
			) : (
				<ChildNode node={node} incomingEdges={incomingEdges} parentNodes={parentNodes} />
			)}
		</Wrap>
	)
}

export default observer(SamplingNodePanel)

const Wrap = styled.div`
	width: 100vw;
	max-width: 20rem;
`

const NodeLabel = styled.h2`
	${(p) => p.theme.text.system.h5};
	border-bottom: solid 1px ${(p) => p.theme.line};
	padding-bottom: ${(p) => p.theme.space[0]};
	margin-top: ${(p) => p.theme.space[0]};
	margin-bottom: ${(p) => p.theme.space[1]};
`
