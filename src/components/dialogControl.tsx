import { useButton } from '@react-aria/button'
import { OverlayContainer } from '@react-aria/overlays'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { Fragment, ReactNode, useRef } from 'react'

import Dialog, { DialogProps } from './dialog'

type Props = {
	/**
	 * Inside trigger button
	 */
	trigger?: (p) => ReactNode
	buttonLabel?: ReactNode
	dialogTitle?: string
	dialogProps?: Partial<DialogProps>
	/**
	 * Inside dialog
	 */
	dialogContent?: ReactNode | ((p) => ReactNode)
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
					isOpen={state.isOpen}
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
