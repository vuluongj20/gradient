import { useFocusRing } from '@react-aria/focus'
import { useOverlayTrigger } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { observer } from 'mobx-react-lite'
import {
	Dispatch,
	Fragment,
	HTMLAttributes,
	ReactNode,
	SetStateAction,
	useEffect,
	useRef,
} from 'react'
import styled from 'styled-components'

import Graph from '../model/graph'
import BaseNode from '../model/node'

import Button from '@components/button'
import Popover, { usePopover } from '@components/popover'
import PopoverArrow, { getArrowHeight } from '@components/popoverArrow'

import useMountEffect from '@utils/useMountEffect'

type NodePanelProps<Node extends BaseNode> = {
	node: Node
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
	renderNodePanel: (node: Node, overlayProps: HTMLAttributes<HTMLDivElement>) => ReactNode
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
		const svgNodeRef = useRef<HTMLButtonElement>(
			document.querySelector(`#node-${node.id}`),
		)

		useMountEffect(() => {
			triggerProps.ref(svgNodeRef.current)
		})

		const state = useOverlayTriggerState({
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

		const { refs, triggerProps, popoverProps, arrowProps } =
			usePopover<HTMLButtonElement>({
				isOpen: state.isOpen,
				onClose: () => state.close(),
				placement: 'bottom',
				offset: getArrowHeight('l') + 4,
			})

		const { triggerProps: overlayTriggerProps, overlayProps } = useOverlayTrigger(
			{ type: 'menu' },
			state,
			refs.trigger,
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
						{...mergeProps(overlayTriggerProps, focusProps)}
						onPress={() => state.open()}
						id={`node-panel-trigger-${node.id}`}
					>
						{node.label}
					</Button>
				</VisuallyHidden>
				<StyledPopover
					isOpen={state.isOpen}
					onClose={() => state.close()}
					{...popoverProps}
				>
					<PopoverArrow size="l" {...arrowProps} />
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
