import { useFocusRing } from '@react-aria/focus'
import { useOverlayTrigger } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { observer } from 'mobx-react-lite'
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from 'react'

import Node from '../../model/node'

import Button from '@components/button'
import Popover from '@components/popover'

type Props = {
	node: Node
	setSimulationPlayState: Dispatch<SetStateAction<boolean>>
}

const NodePanel = ({ node, setSimulationPlayState }: Props) => {
	const svgNodeRef = useRef(document.querySelector<SVGGElement>(`#node-${node.id}`))
	const triggerRef = useRef<HTMLButtonElement>(null)

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
			<Popover
				// @ts-ignore: triggerRef should refer to an HTMLElement, but it
				// also works fine with an SVGGElement
				triggerRef={svgNodeRef}
				isOpen={state.isOpen}
				onClose={() => state.close()}
				showArrow
			>
				<h2>{node.label}</h2>
			</Popover>
		</Fragment>
	)
}

export default observer(NodePanel)
