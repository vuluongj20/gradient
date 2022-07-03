import { useFocusRing } from '@react-aria/focus'
import { useOverlayTrigger } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { observer } from 'mobx-react-lite'
import {
	Dispatch,
	Fragment,
	HTMLAtrributes,
	ReactNode,
	SetStateAction,
	useEffect,
	useRef,
} from 'react'
import styled from 'styled-components'

import Graph from '../model/graph'
import BaseNode from '../model/node'

import Button from '@components/button'
import Popover from '@components/popover'

type NodePanelProps<Node extends BaseNode> = {
	node: Node
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
	renderNodePanel: (node: Node, overlayProps: HTMLAtrributes<HTMLDivElement>) => ReactNode
}

type Props<Node extends BaseNode> = Omit<NodePanelProps<Node>, 'node'> & {
	graph: Graph<Node>
}

const NodePanel = observer(
	<Node extends BaseNode>({
		node,
		setSimulationPlayState,
		renderNodePanel,
	}: NodePanelProps<Node>) => {
		const svgNodeRef = useRef(document.querySelector<SVGGElement>(`#node-${node.id}`))
		const triggerRef = useRef<HTMLButtonElement>(null)

		const state = useOverlayTriggerState({
			isOpen: true,
			onOpenChange: (isOpen) => {
				if (isOpen) {
					setSimulationPlayState(false)
					if (svgNodeRef.current) {
						svgNodeRef.current.classList.add('pressed')
						svgNodeRef.current.style.pointerEvents = 'none'
					}
					return
				}

				setSimulationPlayState(true)
				if (svgNodeRef.current) {
					svgNodeRef.current.classList.remove('pressed')
					svgNodeRef.current.style.pointerEvents = 'initial'
				}
			},
		})

		const { triggerProps, overlayProps } = useOverlayTrigger(
			{ type: 'menu' },
			state,
			triggerRef,
		)

		const { isFocusVisible, focusProps } = useFocusRing({})
		useEffect(() => {
			if (!svgNodeRef.current) return

			if (isFocusVisible) {
				svgNodeRef.current.classList.add('focused')
				return
			}
			svgNodeRef.current.classList.remove('focused')
		}, [isFocusVisible])

		return (
			<Fragment>
				<VisuallyHidden>
					<Button
						{...mergeProps(triggerProps, focusProps)}
						onPress={() => state.open()}
						id={`node-panel-trigger-${node.id}`}
					>
						{node.label}
					</Button>
				</VisuallyHidden>
				<StyledPopover
					// @ts-ignore: triggerRef should refer to an HTMLElement, but it
					// also works fine with an SVGGElement
					triggerRef={svgNodeRef}
					isOpen={state.isOpen}
					onClose={() => state.close()}
					showArrow
				>
					{renderNodePanel(node, overlayProps)}
				</StyledPopover>
			</Fragment>
		)
	},
)

const StyledPopover = styled(Popover)`
	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
`

const NodePanels = <Node extends BaseNode>({
	graph,
	setSimulationPlayState,
	renderNodePanel,
}: Props<Node>) => {
	return (
		<Fragment>
			{graph.nodes.map((node) => (
				<NodePanel
					key={node.id}
					node={node}
					setSimulationPlayState={setSimulationPlayState}
					renderNodePanel={renderNodePanel}
				/>
			))}
		</Fragment>
	)
}

export default NodePanels
