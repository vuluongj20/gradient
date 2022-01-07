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
	 * Optional ref to use on the trigger. If not defined, <Dialog />
	 * will create and use its own internal ref.
	 */
	triggerRef?: RefObject<HTMLButtonElement>
	/**
	 * Optional tooltip on trigger element
	 */
	triggerTooltip?: string
	/**
	 * Placement of optional tooltip on trigger element
	 */
	triggerTooltipPlacement?: TooltipPlacement
	/**
	 * Whether the trigger is disabled
	 */
	triggerDisabled?: boolean
	triggerAriaLabel?: string
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
	/**
	 * Called before the dialog opens
	 */
	beforeOpen?: () => void
	/**
	 * Called before the dialog opens
	 */
	afterClose?: () => void
	/**
	 * Optionally control the open state
	 */
	isOpen?: boolean
	/**
	 * Replace dialog open function when it is controlled
	 */
	open?: () => void
	/**
	 * Replace dialog close function when it is controlled
	 */
	close?: () => void
}

const Dialog = ({
	trigger,
	triggerRef,
	triggerLabel,
	triggerTooltip,
	triggerTooltipPlacement,
	triggerDisabled,
	triggerAriaLabel,
	title,
	content,
	contentProps = {},
	showCloseButton = true,
	beforeOpen,
	afterClose,
	isOpen,
	open,
	close,
}: Props) => {
	const internalOpenButtonRef = useRef()
	const openButtonRef = triggerRef ?? internalOpenButtonRef
	const closeButtonRef = useRef()
	const isControlled = typeof isOpen !== 'undefined'
	const state = useOverlayTriggerState(isControlled ? { isOpen } : {})

	const { buttonProps: openButtonProps } = useButton(
		{
			isDisabled: triggerDisabled,
			onPress: () => {
				beforeOpen?.()
				if (isControlled) {
					open?.()
				} else {
					state.open()
				}
			},
		},
		openButtonRef,
	)

	const { buttonProps: closeButtonProps } = useButton(
		{
			onPress: () => {
				if (isControlled) {
					close?.()
				} else {
					state.close()
				}
				state.close()
				afterClose?.()
			},
		},
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
						aria-label={triggerAriaLabel}
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
