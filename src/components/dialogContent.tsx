import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useOverlay, useModal, usePreventScroll } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { ButtonProps } from '@react-types/button'
import { AriaDialogProps } from '@react-types/dialog'
import { ReactNode, useRef } from 'react'
import styled from 'styled-components'

import IconClose from '@icons/close'

export type DialogContentProps = AriaDialogProps & {
	title?: string
	isOpen: boolean
	onClose: () => void
	animationState?: string
	renderContent?: () => ReactNode
	isDismissable?: boolean
	showCloseButton: boolean
	closeButtonProps: ButtonProps
}

const DialogContent = ({
	animationState,
	isDismissable = true,
	showCloseButton,
	closeButtonProps,
	renderContent,
	...props
}: DialogContentProps) => {
	const { title } = props
	const ref = useRef(null)
	const { overlayProps, underlayProps } = useOverlay({ ...props, isDismissable }, ref)
	const { dialogProps, titleProps } = useDialog(props, ref)

	usePreventScroll()
	const { modalProps } = useModal()

	return (
		<OuterWrap className={animationState}>
			<Backdrop {...underlayProps}>
				<FocusScope contain restoreFocus autoFocus>
					<Wrap ref={ref} {...mergeProps(overlayProps, dialogProps, modalProps)}>
						<TitleWrap>
							<Title {...titleProps}>{title}</Title>
							{showCloseButton && (
								<CloseButton {...closeButtonProps} aria-label="Dismiss">
									<StyledIconClose />
								</CloseButton>
							)}
						</TitleWrap>
						{renderContent()}
					</Wrap>
				</FocusScope>
			</Backdrop>
		</OuterWrap>
	)
}

export default DialogContent

const OuterWrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	transition: ${(p) => p.theme.animation.mediumOut};
	opacity: 0%;
	z-index: ${(p) => p.theme.zIndices.dialog};

	&.entering,
	&.entered {
		opacity: 100%;
	}

	&.exiting {
		opacity: 0%;
	}
`

const Backdrop = styled.div`
	${(p) => p.theme.utils.spread};
	${(p) => p.theme.utils.flexCenter};
	${(p) => p.theme.utils.space.paddingHorizontal};

	background: ${(p) => p.theme.colors.line};
`

const Wrap = styled.div`
	${(p) => p.theme.utils.space.paddingVertical[3]};
	padding-left: ${(p) => p.theme.space[3]};
	padding-right: ${(p) => p.theme.space[3]};
	background: ${(p) => p.theme.colors.oBackground};
	border-radius: ${(p) => p.theme.radii.l};
	box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
	transform: translateY(4em);
	transition: ${(p) => p.theme.animation.mediumOut};
	text-align: left;
	align-items: flex-start;

	${/* sc-selector */ OuterWrap}.entering &,
	${/* sc-selector */ OuterWrap}.entered & {
		transform: translateY(0);
	}

	${/* sc-selector */ OuterWrap}.exiting & {
		transform: translateY(0);
	}

	${(p) => p.theme.utils.media.m} {
		padding-left: ${(p) => p.theme.space[4]};
		padding-right: ${(p) => p.theme.space[4]};
	}

	${(p) => p.theme.utils.media.xs} {
		padding-left: ${(p) => p.theme.space[3]};
		padding-right: ${(p) => p.theme.space[3]};
	}
`

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${(p) => p.theme.space[2]};
	padding-bottom: ${(p) => p.theme.space[1]};
	border-bottom: solid 1px ${(p) => p.theme.colors.line};
`

const CloseButton = styled.button`
	${(p) => p.theme.text.ui.h3};
	display: flex;
	color: ${(p) => p.theme.colors.label};
	transform: translateX(${(p) => p.theme.space[0]});

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`

const StyledIconClose = styled(IconClose)`
	width: 0.875em;
	height: 0.875em;
`

const Title = styled.h2`
	${(p) => p.theme.text.ui.h3};
`
