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
	compact?: boolean
}

const DialogContent = ({
	animationState,
	isDismissable = true,
	showCloseButton,
	closeButtonProps,
	renderContent,
	compact = false,
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
					<Wrap
						ref={ref}
						{...mergeProps(overlayProps, dialogProps, modalProps)}
						compact={compact}
					>
						<TitleWrap compact={compact}>
							<Title compact={compact} {...titleProps}>
								{title}
							</Title>
							{showCloseButton && (
								<CloseButton compact={compact} aria-label="Dismiss" {...closeButtonProps}>
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

const Wrap = styled.div<{ compact: boolean }>`
	background: ${(p) => p.theme.colors.oBackground};
	border-radius: ${(p) => p.theme.radii.l};
	box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
	transform: translateY(4em);
	transition: ${(p) => p.theme.animation.mediumOut};
	text-align: left;
	align-items: flex-start;
	padding: ${(p) =>
		p.compact
			? `${p.theme.space[0]} ${p.theme.space[0]}`
			: `${p.theme.space[3]} ${p.theme.space[4]}`};

	${/* sc-selector */ OuterWrap}.entering &,
		${/* sc-selector */ OuterWrap}.entered & {
		transform: translateY(0);
	}

	${/* sc-selector */ OuterWrap}.exiting & {
		transform: translateY(0);
	}

	${(p) => p.theme.utils.media.xs} {
		padding: ${(p) =>
			p.compact
				? `${p.theme.space[0]} ${p.theme.space[0]}`
				: `${p.theme.space[2]} ${p.theme.space[3]}`};
	}
`

const TitleWrap = styled.div<{ compact: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${(p) => p.theme.space[2]};
	padding-bottom: ${(p) => p.theme.space[1]};
	border-bottom: solid 1px ${(p) => p.theme.colors.line};

	${(p) =>
		p.compact &&
		`
		padding: ${p.theme.space[1]} 0; 
		margin: 0 ${p.theme.space[1]} ${p.theme.space[0]} ${p.theme.space[2]};
		gap: ${p.theme.space[2]};
	`};
`

const CloseButton = styled.button<{ compact: boolean }>`
	display: flex;
	padding: ${(p) => p.theme.space[1]};
	margin: -${(p) => p.theme.space[1]};
	color: ${(p) => p.theme.colors.label};

	${(p) => (p.compact ? p.theme.text.ui.label : p.theme.text.ui.h4)};

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`

const StyledIconClose = styled(IconClose)`
	width: 1em;
	height: 1em;

	min-width: 1.25rem;
	min-height: 1.25rem;
`

const Title = styled.h2<{ compact: boolean }>`
	${(p) => (p.compact ? p.theme.text.ui.label : p.theme.text.ui.h4)};
`
