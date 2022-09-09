import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip'
import { mergeProps } from '@react-aria/utils'
import { useTooltipTriggerState } from '@react-stately/tooltip'
import { TooltipTriggerProps } from '@react-types/tooltip'
import {
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
  RefObject,
  forwardRef,
  useRef,
} from 'react'
import styled from 'styled-components'

import BalancedText from '@components/balancedText'
import Popover, { UsePopoverProps, usePopover } from '@components/popover'

type TriggerProps = UsePopoverProps &
  TooltipTriggerProps & {
    /**
     * Contents of the tooltip
     */
    content: ReactNode
    /**
     * Tooltip trigger. The props and ref are provided
     * (p: TriggerChildrenProps). Should return a trigger
     * element with the props and ref attached.
     */
    children: (p: Partial<HTMLAttributes<HTMLElement>>) => JSX.Element
    /**
     * Whether to stretch (via theme.utils.spread) the
     * tooltip container to match its parent's bounds
     */
    spread?: boolean
    maxWidth?: string
    className?: string
  }

const TooltipTrigger: ForwardRefRenderFunction<HTMLElement, TriggerProps> = (
  {
    spread = false,
    placement = 'bottom',
    offset = 4,
    delay = 1000,
    maxWidth = '8rem',
    className,
    content,
    ...props
  }: TriggerProps,
  forwardedRef,
) => {
  const internalRef = useRef<HTMLElement>(null)
  const ref = (forwardedRef ?? internalRef) as RefObject<HTMLElement>

  const state = useTooltipTriggerState({ delay, ...props })
  const { triggerProps, tooltipProps: tooltipTriggerProps } = useTooltipTrigger(
    { delay, ...props },
    state,
    ref,
  )

  const { tooltipProps } = useTooltip(tooltipTriggerProps, state)

  const { triggerProps: popoverTriggerProps, popoverProps } =
    usePopover<HTMLButtonElement>({
      placement,
      offset,
      isOpen: state.isOpen,
      onClose: () => state.close(),
    })

  // If no tooltip content is provided, then simply return
  // the trigger element without any tooltip associated with it
  if (!content) return props.children({})

  return (
    <TriggerWrap className={className} spread={spread} {...props}>
      {props.children(mergeProps(popoverTriggerProps, triggerProps))}
      <StyledPopover
        isOpen={state.isOpen}
        maxWidth={maxWidth}
        {...mergeProps(tooltipProps, popoverProps)}
      >
        {typeof content === 'string' ? <BalancedText>{content}</BalancedText> : content}
      </StyledPopover>
    </TriggerWrap>
  )
}

export default forwardRef(TooltipTrigger)

const StyledPopover = styled(Popover)<{ maxWidth: string }>`
  padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1]};
  background: ${(p) => p.theme.oBackground};
  border: solid 1px ${(p) => p.theme.oLine};
  border-radius: ${(p) => p.theme.radii.s};
  box-shadow: ${(p) => p.theme.shadows.l};
  z-index: ${(p) => p.theme.zIndices.tooltip};
  opacity: 0;
  transition: ${(p) => p.theme.utils.defaultTransitions},
    opacity ${(p) => p.theme.animation.fastOut},
    transform ${(p) => p.theme.animation.fastOut};

  ${(p) => p.theme.text.system.small};
  color: ${(p) => p.theme.label};

  max-width: ${(p) => p.maxWidth};
  width: max-content;

  ${(p) => p.placement === 'top' && `transform: translate3d(0, ${p.theme.space[1]}, 0)`};
  ${(p) =>
    p.placement === 'bottom' && `transform: translate3d(0, -${p.theme.space[1]}, 0)`};
  ${(p) => p.placement === 'left' && `transform: translate3d(${p.theme.space[1]}, 0, 0)`};
  ${(p) =>
    p.placement === 'right' && `transform: translate3d(-${p.theme.space[1]}, 0, 0)`};

  &.enter-active,
  &.enter-done {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &.exit-active {
    opacity: 0;
  }
`

const TriggerWrap = styled.div<{ spread: boolean }>`
  ${(p) => (p.spread ? p.theme.utils.spread : `position: relative`)};
`
