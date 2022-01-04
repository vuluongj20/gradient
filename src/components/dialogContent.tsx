import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useOverlay, useModal } from '@react-aria/overlays'
import { ButtonProps } from '@react-types/button'
import { AriaDialogProps } from '@react-types/dialog'
import { OverlayProps } from '@react-types/overlays'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { ReactNode, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import IconClose from '@icons/close'

export type DialogContentProps = AriaDialogProps &
	OverlayProps & {
		title?: string
		isOpen: boolean
		onClose: () => void
		children?: ReactNode
		isDismissable?: boolean
		showCloseButton: boolean
		closeButtonProps: ButtonProps
	}

const DialogContent = ({
	isDismissable = true,
	showCloseButton,
	closeButtonProps,
	...props
}: DialogContentProps) => {
	const { title, children } = props
	const ref = useRef()
	const { modalProps } = useModal()
	const { overlayProps, underlayProps } = useOverlay({ ...props, isDismissable }, ref)
	const { dialogProps, titleProps } = useDialog(props, ref)

	useEffect(() => {
		if (!ref.current) return null
		if (props.isOpen) {
			disableBodyScroll(ref.current)
		} else {
			enableBodyScroll(ref.current)
		}
	}, [props.isOpen])

	return (
		<CSSTransition in={props.isOpen} timeout={500} mountOnEnter unmountOnExit>
			<OuterWrap>
				<Backdrop {...underlayProps}>
					<FocusScope contain restoreFocus autoFocus>
						<Wrap {...overlayProps} {...dialogProps} {...modalProps} ref={ref}>
							{showCloseButton && (
								<CloseButton {...closeButtonProps} aria-label="Dismiss">
									<StyledIconClose />
								</CloseButton>
							)}
							{title && (
								<TitleWrap>
									<Title {...titleProps}>{title}</Title>
								</TitleWrap>
							)}
							{children}
						</Wrap>
					</FocusScope>
				</Backdrop>
			</OuterWrap>
		</CSSTransition>
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

	&.enter-active,
	&.enter-done {
		opacity: 100%;
	}

	&.exit-active {
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
	${(p) => p.theme.utils.space.paddingVertical[4]};
	padding-left: ${(p) => p.theme.space[5]};
	padding-right: ${(p) => p.theme.space[5]};
	background: ${(p) => p.theme.colors.oBackground};
	border-radius: ${(p) => p.theme.radii.l};
	box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
	transform: translateY(4em);
	transition: ${(p) => p.theme.animation.mediumOut};
	text-align: left;
	align-items: flex-start;

	${/* sc-selector */ OuterWrap}.enter-active &,
	${/* sc-selector */ OuterWrap}.enter-done & {
		transform: translateY(0);
	}

	${/* sc-selector */ OuterWrap}.exit-active & {
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
	padding-right: ${(p) => p.theme.space[2]};
	margin-bottom: ${(p) => p.theme.space[1]};
`

const CloseButton = styled.button`
	display: flex;
	position: absolute;
	top: ${(p) => p.theme.space[1]};
	right: ${(p) => p.theme.space[1]};
	padding: ${(p) => p.theme.space[0]};
	color: ${(p) => p.theme.colors.label};

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`

const StyledIconClose = styled(IconClose)`
	width: 1.75em;
	height: 1.75em;
`

const Title = styled.h2`
	${(p) => p.theme.text.ui.h3};
`
