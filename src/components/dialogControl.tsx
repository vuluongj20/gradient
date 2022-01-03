import { useButton } from '@react-aria/button'
import { OverlayContainer } from '@react-aria/overlays'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { Fragment, ReactNode, useRef } from 'react'

import Dialog, { DialogProps } from './dialog'

type Props = {
	/**
	 * For optionally replacing the trigger button.
	 * Should return a button with the props and ref (from p) attached
	 */
	trigger?: (p) => ReactNode
	/**
	 * If the trigger prop hasn't been provided, use this prop to
	 * create a basic button with the provided label
	 */
	buttonLabel?: ReactNode
	dialogTitle?: string
	/**
	 * Optionally pass props to the <Dialog /> component
	 */
	dialogProps?: Partial<DialogProps>
	/**
	 * Content inside the dialog
	 */
	dialogContent?: ReactNode | ((p) => ReactNode)
	/**
	 * Whether to show the close button (as a cross in the
	 * top right corner), defaults to true
	 */
	showCloseButton?: boolean
}

const DialogControl = ({
	trigger,
	buttonLabel,
	dialogProps = {},
	dialogTitle,
	dialogContent,
	showCloseButton = true,
}: Props) => {
	console.log('DialogControl')
	const state = useOverlayTriggerState({})
	const openButtonRef = useRef()
	const closeButtonRef = useRef()

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
			<button {...openButtonProps} ref={openButtonRef}>
				{buttonLabel}
			</button>
		)
	}

	const renderDialogContent = (): ReactNode => {
		if (typeof dialogContent === 'function') {
			return dialogContent(closeButtonProps)
		}
		return dialogContent
	}

	return (
		<Fragment>
			{renderOpenButton()}
			<OverlayContainer>
				<Dialog
					{...dialogProps}
					title={dialogTitle}
					isOpen
					/*isOpen={state.isOpen}*/
					onClose={state.close}
					showCloseButton={showCloseButton}
					closeButtonProps={closeButtonProps}
				>
					{renderDialogContent()}
				</Dialog>
			</OverlayContainer>
		</Fragment>
	)
}

export default DialogControl
