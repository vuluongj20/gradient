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
import { AriaOverlayProps, useOverlay } from '@react-aria/overlays'
import {
  CSSProperties,
  ForwardRefRenderFunction,
  forwardRef,
  useMemo,
  useState,
} from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'

import { Theme } from '@theme'

import LocalThemeProvider from '@utils/localThemeProvider'
import useMobile from '@utils/useMobile'

export interface UsePopoverProps extends AriaOverlayProps, UseFloatingProps {
  placement?: Placement
  offset?: number
}

const roundPixels = {
  name: 'roundPixels',
  fn({ x, y }: { x: number; y: number }) {
    return {
      x: Math.round(x),
      y: Math.round(y),
    }
  },
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
  const isMobile = useMobile()

  const middleware = useMemo(
    () => [
      shift({
        padding: {
          // Account for the nav bar's width
          left:
            !isMobile && typeof document !== 'undefined'
              ? (document.querySelector('nav')?.offsetWidth ?? 0) + 16
              : 16,
          right: 16,
          top: 16,
          bottom: 16,
        },
      }),
      flip(),
      offset(mainOffset),
      ...(arrowElement ? [arrow({ element: arrowElement, padding: 20 })] : []),
      roundPixels,
    ],
    [mainOffset, arrowElement, isMobile],
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
      arrowStyles: { top: arrowY, left: arrowX },
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

interface PopoverProps extends FocusScopeProps {
  isOpen: boolean
  arrowStyles?: CSSProperties
  placement?: Placement
  maxWidth?: string
  animateScale?: boolean
  renderWrapperAsSpan?: boolean
  className?: string
}

const Popover: ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  {
    isOpen,
    placement,
    maxWidth,
    autoFocus = true,
    restoreFocus = true,
    contain = true,
    animateScale = false,
    arrowStyles = {},
    renderWrapperAsSpan,
    children,
    className,
    ...props
  },
  ref,
) => {
  const Wrap = renderWrapperAsSpan ? SpanWrap : DivWrap
  return (
    <Transition in={isOpen} timeout={250} unmountOnExit mountOnEnter>
      {(animationState) => (
        <FocusScope autoFocus={autoFocus} restoreFocus={restoreFocus} contain={contain}>
          <LocalThemeProvider overlay>
            <Wrap
              {...props}
              maxWidth={maxWidth}
              placement={placement}
              className={`${animationState} ${className ?? ''}`}
              animateScale={animateScale}
              arrowStyles={arrowStyles}
              ref={ref}
            >
              {children}
            </Wrap>
          </LocalThemeProvider>
        </FocusScope>
      )}
    </Transition>
  )
}

export default forwardRef(Popover)

interface PopoverWrapProps {
  maxWidth?: string
  placement?: Placement
  animateScale: boolean
  arrowStyles: CSSProperties
}

const getTransform = ({ animateScale, placement, arrowStyles }: PopoverWrapProps) => {
  const scaleTerm = animateScale ? 'scale(0.8)' : ''

  switch (placement?.split('-')[0]) {
    case 'top':
      return `
        transform-origin: ${arrowStyles.left ?? 0}px 100%;
        transform: translate3d(0, var(--space-2), 0) ${scaleTerm};
      `
    case 'bottom':
      return `
        transform-origin: ${arrowStyles.left ?? 0}px 0%;
        transform: translate3d(0, calc(var(--space-2) * -1), 0) ${scaleTerm};
      `
    case 'left':
      return `
        transform-origin: 100% ${arrowStyles.top ?? 0}px;
        transform: translate3d(var(--space-2), 0, 0) ${scaleTerm};
      `
    case 'right':
      return `
        transform-origin: 0% ${arrowStyles.top ?? 0}px;
        transform: translate3d(calc(var(--space-2) * -1), 0, 0) ${scaleTerm};
      `
    default:
      return ''
  }
}

const getStyles = (p: PopoverWrapProps & { theme: Theme }) => `
  position: absolute;
  max-width: ${
    p.maxWidth ? `min(${p.maxWidth}, calc(100vw - 32px))` : `calc(100vw - 32px)`
  };
  background: var(--color-o-background);
  border-radius: var(--border-radius-m);
  padding: var(--space-0);
  box-shadow: 0 0 0 1px var(--color-o-line), var(--box-shadow-l);
  transition: transform ${p.theme.animation.fastOut},
    opacity ${p.theme.animation.fastOut};
  opacity: 0;
  z-index: var(--z-index-popover);
  pointer-events: none;

  ${getTransform(p)}

  &.entering,
  &.entered {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  &.entered {
    pointer-events: auto;
  }

  &.exiting {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(1);
    pointer-events: none;
  }

  @media (prefers-reduced-motion) {
    transition: opacity ${p.theme.animation.fastOut};
  }
`

const DivWrap = styled.div<PopoverWrapProps>`
  ${getStyles}
`

const SpanWrap = styled.span`
  display: block;
  ${getStyles}
`
