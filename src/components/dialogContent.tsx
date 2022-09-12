import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { AriaDialogProps } from '@react-types/dialog'
import { ButtonHTMLAttributes, ReactNode, useRef } from 'react'
import styled from 'styled-components'

import IconClose from '@icons/close'

import { Breakpoint } from '@utils/style'

export type DialogContentProps = AriaDialogProps & {
	title?: string
	isOpen: boolean
	onClose: () => void
	animationState?: string
	renderContent?: () => ReactNode
	isDismissable?: boolean
	showCloseButton: boolean
	closeButtonProps: ButtonHTMLAttributes<HTMLButtonElement>
	compact?: boolean
	size?: Breakpoint
}

const DialogContent = ({
	animationState,
	isDismissable = true,
	showCloseButton,
	closeButtonProps,
	renderContent,
	compact = false,
	size = 's',
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
						size={size}
					>
						<TitleWrap compact={compact}>
							<Title compact={compact} {...titleProps}>
								{title}
							</Title>
							{showCloseButton && (
								<CloseButton compact={compact} aria-label="Dismiss" {...closeButtonProps}>
									<StyledIconClose useAlt />
								</CloseButton>
							)}
						</TitleWrap>
						{renderContent?.()}
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
	transition: opacity ${(p) => p.theme.animation.fastOut};
	transform: translateZ(0);
	opacity: 0;
	will-change: opacity;
	z-index: ${(p) => p.theme.zIndices.dialog};

	&.entering,
	&.entered {
		opacity: 1;
	}

	&.exiting {
		opacity: 0;
	}
`

const Backdrop = styled.div`
	${(p) => p.theme.spread};
	${(p) => p.theme.flexCenter};
	${(p) => p.theme.paddingHorizontal};

	background: ${(p) => p.theme.line};
`

const Wrap = styled.div<{ compact: boolean; size: Breakpoint }>`
	width: ${(p) => p.theme.breakpoints[p.size]};
	max-width: 100%;
	background: ${(p) => p.theme.oBackground};
	border-radius: ${(p) => p.theme.radii.l};
	box-shadow: 0 0 0 1px ${(p) => p.theme.oLine}, ${(p) => p.theme.shadows.l};
	transform: translate3d(0, 4rem, 0);
	transition: transform ${(p) => p.theme.animation.mediumOut};
	will-change: transform;
	text-align: left;
	align-items: flex-start;
	padding: ${(p) =>
		p.compact
			? `${p.theme.space[0]} ${p.theme.space[0]}`
			: `${p.theme.space[3]} ${p.theme.space[4]}`};

	${/* sc-selector */ OuterWrap}.entering &,
		${/* sc-selector */ OuterWrap}.entered & {
		transform: translate3d(0, 0, 0);
	}

	${/* sc-selector */ OuterWrap}.exiting & {
		transform: translate3d(0, 0, 0);
	}

	${(p) => p.theme.media.xs} {
		padding: ${(p) =>
			p.compact
				? `${p.theme.space[0]} ${p.theme.space[0]}`
				: `${p.theme.space[2]} ${p.theme.space[3]}`};
	}

	@media (prefers-reduced-motion) {
		transition: none;
	}
`

const TitleWrap = styled.div<{ compact: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${(p) => p.theme.space[2]};
	padding-bottom: ${(p) => p.theme.space[1]};
	border-bottom: solid 1px ${(p) => p.theme.line};

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
	color: ${(p) => p.theme.label};

	${(p) => (p.compact ? p.theme.text.system.label : p.theme.text.system.h4)};

	&:hover {
		color: ${(p) => p.theme.heading};
	}
`

const StyledIconClose = styled(IconClose)`
	width: 1em;
	height: 1em;

	min-width: 1.25rem;
	min-height: 1.25rem;
`

const Title = styled.h2<{ compact: boolean }>`
	${(p) => (p.compact ? p.theme.text.system.label : p.theme.text.system.h5)};
`
