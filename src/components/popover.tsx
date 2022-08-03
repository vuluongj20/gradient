import {
  Placement,
  UseFloatingProps,
  arrow,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { FocusScope, FocusScopeProps } from '@react-aria/focus'
import { DismissButton, OverlayProps, useOverlay } from '@react-aria/overlays'
import { ForwardRefRenderFunction, ReactNode, forwardRef, useMemo, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { Theme } from '@theme'

import LocalThemeProvider from '@utils/localThemeProvider'

type UsePopoverProps = OverlayProps &
  UseFloatingProps & {
    placement?: Placement
    offset?: number
  }

export const usePopover = <TriggerType extends HTMLElement = HTMLElement>({
  isOpen,
  onClose,
  isDismissable = true,
  shouldCloseOnBlur = false,
  isKeyboardDismissDisabled = false,
  placement = 'left',
  strategy = 'absolute',
  offset: mainOffset = 4,
  ...props
}: UsePopoverProps) => {
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  const middleware = useMemo(
    () => [
      flip(),
      offset(mainOffset),
      shift({ padding: 16 }),
      ...(arrowElement ? [arrow({ element: arrowElement })] : []),
    ],
    [mainOffset, arrowElement],
  )

  const {
    x,
    y,
    refs,
    reference,
    floating,
    placement: calculatedPlacement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating<TriggerType>({
    placement,
    strategy,
    middleware,
    ...props,
  })

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
    },
    refs.floating,
  )

  return {
    refs: { trigger: refs.reference, popover: refs.floating },
    triggerProps: {
      ref: reference,
    },
    popoverProps: {
      ref: floating,
      refObject: refs.floating,
      style: { position: strategy, top: y, left: x },
      placement: calculatedPlacement,
      ...overlayProps,
    },
    arrowProps: {
      ref: setArrowElement,
      style: { top: arrowY, left: arrowX },
      placement: calculatedPlacement,
    },
  }
}

type Props = FocusScopeProps & {
  isOpen: boolean
  onClose: () => void
  placement?: Placement
  animateScale?: boolean
  className?: string
  children?: ReactNode
}

const Popover: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    isOpen,
    onClose,
    children,
    placement,
    autoFocus = true,
    restoreFocus = true,
    contain = true,
    animateScale = false,
    className,
    ...props
  },
  ref,
) => {
  return (
    <Transition in={isOpen} timeout={200} unmountOnExit mountOnEnter>
      {(animationState) => (
        <FocusScope autoFocus={autoFocus} restoreFocus={restoreFocus} contain={contain}>
          <LocalThemeProvider overlay>
            <Wrap
              {...props}
              placement={placement}
              className={`${animationState} ${className ?? ''}`}
              animateScale={animateScale}
              ref={ref}
            >
              {children}
              <DismissButton onDismiss={onClose} />
            </Wrap>
          </LocalThemeProvider>
        </FocusScope>
      )}
    </Transition>
  )
}

export default forwardRef(Popover)

type WrapProps = {
  placement?: Placement
  animateScale?: boolean
}

const getTransform = ({
  animateScale,
  placement,
  theme,
}: WrapProps & { theme: Theme }) => {
  const scaleTerm = animateScale ? 'scale(0.8)' : ''

  switch (placement?.split('-')[0]) {
    case 'top':
      return `
        transform-origin: 0% 100%;
        transform: translate3d(0, ${theme.space[2]}, 0) ${scaleTerm};
      `
    case 'bottom':
      return `
        transform-origin: 0% 0%;
        transform: translate3d(0, -${theme.space[2]}, 0) ${scaleTerm};
      `
    case 'left':
      return `
        transform-origin: 100% 0%;
        transform: translate3d(${theme.space[2]}, 0, 0) ${scaleTerm};
      `
    case 'right':
      return `
        transform-origin: 0% 0%;
        transform: translate3d(-${theme.space[2]}, 0, 0) ${scaleTerm};
      `
    default:
      return ''
  }
}

const Wrap = styled.div<WrapProps>`
  position: absolute;
  max-width: calc(100vw - 32px);
  background: ${(p) => p.theme.oBackground};
  border-radius: ${(p) => p.theme.radii.m};
  padding: ${(p) => p.theme.space[0]};
  box-shadow: 0 0 0 1px ${(p) => p.theme.oLine}, ${(p) => p.theme.shadows.l};
  transition: transform ${(p) => p.theme.animation.fastOut},
    opacity ${(p) => p.theme.animation.fastOut};
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
