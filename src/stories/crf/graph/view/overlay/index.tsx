import { Dispatch, Fragment, SetStateAction } from 'react'

import Graph from '../../model/graph'
import NodePanel from './nodePanel'

type Props = {
	graph: Graph
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
}

const GraphOverlay = ({ graph, setSimulationPlayState }: Props) => {
	return (
		<Fragment>
			{graph.nodes.map((node) => (
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
