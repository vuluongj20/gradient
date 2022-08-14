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
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
} from 'react'
import styled from 'styled-components'

import BaseNode from '../model/node'

import Button from '@components/button'
import Popover, { usePopover } from '@components/popover'
import PopoverArrow, { getArrowHeight } from '@components/popoverArrow'

import useMountEffect from '@utils/useMountEffect'
import usePrevious from '@utils/usePrevious'
import useSize from '@utils/useSize'

type Props<Node extends BaseNode> = {
	node: Node
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
	renderNodePanel: (node: Node, overlayProps: HTMLAttributes<HTMLDivElement>) => ReactNode
	wrapRef: RefObject<HTMLDivElement>
}

const NodePanel = observer(
	<Node extends BaseNode>({
		node,
		setSimulationPlayState,
		renderNodePanel,
		wrapRef,
	}: Props<Node>) => {
		const svgNodeRef = useRef<HTMLButtonElement>(
			document.querySelector(`g#node-${node.id}`),
		)

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
				placement: 'top',
				offset: getArrowHeight('l') + 4,
			})

		const { triggerProps: overlayTriggerProps, overlayProps } = useOverlayTrigger(
			{ type: 'menu' },
			state,
			refs.trigger,
		)

		useMountEffect(() => {
			triggerProps.ref(svgNodeRef.current)
		})

		// Close node panel on resize
		const { width: wrapWidth } = useSize(wrapRef)
		const prevWrapWidth = usePrevious(wrapWidth)
		useEffect(() => {
			if (wrapWidth === prevWrapWidth || !state.isOpen) return
			state.close()
		}, [wrapWidth, prevWrapWidth, state])

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
					animateScale
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

export default NodePanel
