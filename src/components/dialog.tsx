import { ButtonAria, useButton } from '@react-aria/button'
import { OverlayContainer } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { Fragment, ReactNode, RefObject, useRef } from 'react'
import { Transition } from 'react-transition-group'

import DialogContent, { DialogContentProps } from './dialogContent'

import Tooltip, { TooltipPlacement } from '@components/tooltip'

type TriggerChildrenProps = {
	props: ButtonAria<unknown>
	ref: RefObject<HTMLElement>
}

type Props = {
	/**
	 * For optionally replacing the trigger element.
	 * Should return an element with the props and
	 * ref (p: TriggerChildrenProps) attached
	 */
	trigger?: (p: TriggerChildrenProps) => ReactNode
	/**
	 * If the trigger prop hasn't been provided, create a basic button
	 * with the provided triggerLabel
	 */
	triggerLabel?: ReactNode
	/**
	 * Optional tooltip on trigger element
	 */
	triggerTooltip?: string
	/**
	 * Placement of optional tooltip on trigger element
	 */
	triggerTooltipPlacement?: TooltipPlacement
	/**
	 * Dialog title
	 */
	title?: string
	/**
	 * Content inside the dialog
	 */
	content?:
		| ReactNode
		| ((closeButtonProps: ButtonAria<unknown>['buttonProps']) => ReactNode)
	/**
	 * Optional pros to pass to the <DialogContent /> component
	 */
	contentProps?: Partial<DialogContentProps>
	/**
	 * Whether to show the close button (as a cross in the
	 * top right corner), defaults to true
	 */
	showCloseButton?: boolean
}

const Dialog = ({
	trigger,
	triggerLabel,
	triggerTooltip,
	triggerTooltipPlacement,
	contentProps = {},
	title,
	content,
	showCloseButton = true,
}: Props) => {
	const openButtonRef = useRef()
	const closeButtonRef = useRef()
	const state = useOverlayTriggerState({})

	const { buttonProps: openButtonProps } = useButton(
		{ onPress: () => state.open() },
		openButtonRef,
	)

	const { buttonProps: closeButtonProps } = useButton(
		{ onPress: () => state.close() },
		closeButtonRef,
	)

	const renderOpenButton = (): ReactNode => {
		if (trigger) {
			return trigger({ props: openButtonProps, ref: openButtonRef })
		}

		return (
			<Tooltip
				content={triggerTooltip}
				placement={triggerTooltipPlacement}
				ref={openButtonRef}
			>
				{({ props: tooltipTriggerProps }) => (
					<button
						ref={openButtonRef}
						{...mergeProps(tooltipTriggerProps, openButtonProps)}
					>
						{triggerLabel}
					</button>
				)}
			</Tooltip>
		)
	}

	const renderDialogContent = (): ReactNode => {
		if (typeof content === 'function') {
			return content(closeButtonProps)
		}
		return content
	}

	return (
		<Fragment>
			{renderOpenButton()}
			<Transition in={state.isOpen} timeout={500} mountOnEnter unmountOnExit>
				{(animationState) => (
					<OverlayContainer>
						<DialogContent
							{...contentProps}
							title={title}
							isOpen={state.isOpen}
							onClose={state.close}
							showCloseButton={showCloseButton}
							closeButtonProps={closeButtonProps}
							animationState={animationState}
							renderContent={renderDialogContent}
						/>
					</OverlayContainer>
				)}
			</Transition>
		</Fragment>
	)
}

export default Dialog
