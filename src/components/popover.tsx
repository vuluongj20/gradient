import { FocusScope, FocusScopeProps } from '@react-aria/focus'
import {
  AriaPositionProps,
  DismissButton,
  OverlayProps,
  useOverlay,
  useOverlayPosition,
} from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { Placement, PlacementAxis } from '@react-types/overlays'
import { CSSProperties, ReactNode, RefObject, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'
import styled from 'styled-components'

import { Theme } from '@theme'

import PopoverArrow from '@components/popoverArrow'

import LocalThemeProvider from '@utils/localThemeProvider'

type WrapProps = {
  placement: Placement | PlacementAxis
  showArrow: boolean
  arrowStyles?: CSSProperties
}

type Props = Partial<OverlayProps> &
  Partial<AriaPositionProps> &
  FocusScopeProps & {
    children: ReactNode
    triggerRef: RefObject<HTMLButtonElement>
    showArrow?: boolean
    className?: string
  }

const Popover = ({
  isOpen,
  onClose,
  children,
  triggerRef,
  offset = 4,
  placement = 'bottom left',
  containerPadding = 16,
  shouldCloseOnBlur = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showArrow = false,
  autoFocus = true,
  restoreFocus = true,
  contain = true,
  animationState,
  className,
}: Props & { animationState: TransitionStatus }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
    },
    ref,
  )
  const {
    arrowProps,
    overlayProps: positionProps,
    placement: calculatedPlacement,
  } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: ref,
    placement,
    isOpen,
    offset: showArrow ? offset + 8 : offset,
    containerPadding,
  })

  return (
    <FocusScope autoFocus={autoFocus} restoreFocus={restoreFocus} contain={contain}>
      <LocalThemeProvider overlay>
        <Wrap
          {...mergeProps(overlayProps, positionProps)}
          placement={calculatedPlacement ?? placement}
          showArrow={showArrow}
          arrowStyles={arrowProps.style}
          className={`${animationState} ${className ?? ''}`}
          ref={ref}
        >
          {showArrow && <PopoverArrow placement={calculatedPlacement} {...arrowProps} />}

          {children}
          <DismissButton onDismiss={onClose} />
        </Wrap>
      </LocalThemeProvider>
    </FocusScope>
  )
}

// Only render Popover when it becomes visible (props.isOpen is true and Transition is
// in `in` state). Otherwise Popover could position itself against a stale trigger ref,
// resulting in flickery entry animation.
const PopoverWithTransition = (props: Props) => (
  <Transition in={props.isOpen} timeout={200} unmountOnExit mountOnEnter>
    {(animationState) => <Popover {...props} animationState={animationState} />}
  </Transition>
)

export default PopoverWithTransition

const getTransform = ({
  placement,
  theme,
  showArrow,
  arrowStyles = {},
}: WrapProps & { theme: Theme }) => {
  const scaleTerm = showArrow ? 'scale(0.8)' : ''
  switch (placement.split(' ')[0]) {
    case 'top':
      return `
        transform-origin: ${arrowStyles.left ?? 0}px 100%;
        transform: translate3d(0, ${theme.space[2]}, 0) ${scaleTerm};
      `
    case 'bottom':
      return `
        transform-origin: ${arrowStyles.left ?? 0}px 0%;
        transform: translate3d(0, -${theme.space[2]}, 0) ${scaleTerm};
      `
    case 'left':
      return `
        transform-origin: 100% ${arrowStyles.top ?? 0}px;
        transform: translate3d(${theme.space[2]}, 0, 0) ${scaleTerm};
      `
    case 'right':
      return `
        transform-origin: 0% ${arrowStyles.top ?? 0}px;
        transform: translate3d(-${theme.space[2]}, 0, 0) ${scaleTerm};
      `
    default:
      return ''
  }
}

const Wrap = styled.div<WrapProps>`
  position: absolute;
  background: ${(p) => p.theme.oBackground};
  border-radius: ${(p) => p.theme.radii.m};
  padding: ${(p) => p.theme.space[0]};
  box-shadow: 0 0 0 1px ${(p) => p.theme.oLine}, ${(p) => p.theme.shadows.l};
  transition: ${(p) => p.theme.animation.fastOut};
  opacity: 0;
  will-change: opacity, transform;
  z-index: ${(p) => p.theme.zIndices.popover};

  ${getTransform}

  &.entering,
  &.entered {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  &.exiting {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1);
  }

  @media (prefers-reduced-motion) {
    transition: opacity ${(p) => p.theme.animation.fastOut};
  }
`
