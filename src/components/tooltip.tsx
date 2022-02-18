import { useOverlayPosition } from '@react-aria/overlays'
import { TooltipTriggerAria, useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { TooltipTriggerState, useTooltipTriggerState } from '@react-stately/tooltip'
import { Placement, PlacementAxis } from '@react-types/overlays'
import { AriaTooltipProps, TooltipTriggerProps } from '@react-types/tooltip'
import { ReactNode, RefObject, forwardRef, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

export type TooltipPlacement = Placement

type Props = AriaTooltipProps & {
  state: TooltipTriggerState
  children: ReactNode
  triggerRef: RefObject<HTMLElement>
  placement: Placement
  offset: number
  ariaHidden?: boolean
}

const Tooltip = ({
  triggerRef,
  placement,
  offset,
  ariaHidden,
  state,
  ...props
}: Props) => {
  const ref = useRef()
  const { tooltipProps } = useTooltip(props, state)

  const { overlayProps: positionProps, placement: calculatedPlacement } =
    useOverlayPosition({
      targetRef: triggerRef,
      overlayRef: ref,
      placement,
      offset,
      isOpen: state.isOpen,
      containerPadding: 0,
    })

  return (
    <CSSTransition in={state.isOpen} timeout={250} unmountOnExit>
      <TooltipWrap
        ref={ref}
        placement={calculatedPlacement || placement}
        aria-hidden={ariaHidden}
        {...mergeProps(props, tooltipProps, positionProps)}
      >
        {props.children}
      </TooltipWrap>
    </CSSTransition>
  )
}

type TriggerChildrenProps = {
  props: TooltipTriggerAria['triggerProps']
  ref: RefObject<HTMLElement>
}

type TriggerProps = TooltipTriggerProps & {
  /**
   * Contents of the tooltip
   */
  content: ReactNode
  /**
   * Tooltip trigger. The props and ref are provided
   * (p: TriggerChildrenProps). Should return a trigger
   * element with the props and ref attached.
   */
  children: (p: TriggerChildrenProps) => JSX.Element
  /**
   * Whether to stretch (via theme.utils.spread) the
   * tooltip container to match its parent's bounds
   */
  spread?: boolean
  placement?: Placement
  offset?: number
  ariaHidden?: boolean
  className?: string
}

const TooltipTrigger = (
  {
    spread = false,
    placement = 'bottom',
    offset = 8,
    delay = 1000,
    ariaHidden = false,
    className,
    content,
    ...props
  }: TriggerProps,
  refProp,
) => {
  const internalRef = useRef()
  const ref = refProp ?? internalRef
  const state = useTooltipTriggerState({ delay, ...props })
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    { delay, ...props },
    state,
    ref,
  )

  // If no tooltip content is provided, then simply return
  // the trigger element without any tooltip associated with it
  if (!content) return props.children({ props: {}, ref })

  return (
    <TriggerWrap className={className} spread={spread} {...props}>
      {props.children({ props: triggerProps, ref })}
      <Tooltip
        state={state}
        triggerRef={ref}
        placement={placement}
        offset={offset}
        ariaHidden={ariaHidden}
        {...tooltipProps}
      >
        {content}
      </Tooltip>
    </TriggerWrap>
  )
}

export default forwardRef(TooltipTrigger)

const TooltipWrap = styled.div<{ placement: PlacementAxis | Placement }>`
  padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1]};
  background: ${(p) => p.theme.oBackground};
  border: solid 1px ${(p) => p.theme.oLine};
  border-radius: ${(p) => p.theme.radii.s};
  box-shadow: ${(p) => p.theme.shadows.l};
  z-index: ${(p) => p.theme.zIndices.tooltip};
  opacity: 0%;
  transition: ${(p) => p.theme.utils.defaultTransitions},
    opacity ${(p) => p.theme.animation.fastOut},
    transform ${(p) => p.theme.animation.fastOut};
  will-change: opacity, transform;

  color: ${(p) => p.theme.label};
  line-height: 1.2;
  letter-spacing: +0.01em;
  font-size: 0.75rem;
  font-weight: 500;

  ${(p) => p.placement === 'top' && `transform: translate3d(0, ${p.theme.space[1]}, 0)`};
  ${(p) =>
    p.placement === 'bottom' && `transform: translate3d(0, -${p.theme.space[1]}, 0)`};
  ${(p) => p.placement === 'left' && `transform: translate3d(${p.theme.space[1]}, 0, 0)`};
  ${(p) =>
    p.placement === 'right' && `transform: translate3d(-${p.theme.space[1]}, 0, 0)`};

  &.enter-active,
  &.enter-done {
    opacity: 100%;
    transform: translate3d(0, 0, 0);
  }

  &.exit-active {
    opacity: 0%;
  }
`

const TriggerWrap = styled.div<{ spread: boolean }>`
  ${(p) => (p.spread ? p.theme.utils.spread : `position: relative`)};
`
