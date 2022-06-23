import { Dispatch, Fragment, SetStateAction } from 'react'
import styled from 'styled-components'

import Edge from '../../model/edge'
import Node from '../../model/node'
import NodePanel from './nodePanel'

type Props = {
	nodes: Node[]
	edges: Edge[]
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
}

const GraphOverlay = ({ nodes, edges, setSimulationPlayState }: Props) => {
	return (
		<Fragment>
			{nodes.map((node) => (
				<NodePanel
					key={node.id}
					node={node}
					setSimulationPlayState={setSimulationPlayState}
				/>
			))}
		</Fragment>
	)
}

export default GraphOverlay

// const Wrap = styled.div`
// 	pointer-events: none;
// 	${(p) => p.theme.utils.spread}
// `
