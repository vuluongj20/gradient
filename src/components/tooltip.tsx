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

export type TooltipProps = UsePopoverProps &
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
    ariaHidden?: boolean
    renderWrapperAsSpan?: boolean
    renderOverlayAsSpan?: boolean
    className?: string
  }

const TooltipTrigger: ForwardRefRenderFunction<HTMLElement, TooltipProps> = (
  {
    content,
    spread = false,
    placement = 'bottom',
    offset = 8,
    delay = 1000,
    maxWidth = '10rem',
    renderWrapperAsSpan = false,
    renderOverlayAsSpan = false,
    ariaHidden = false,
    className,
    ...props
  }: TooltipProps,
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
      // Prevent useOverlay from intercepting click events
      isDismissable: false,
    })

  // If no tooltip content is provided, then simply return
  // the trigger element without any tooltip associated with it
  if (!content) return props.children({})

  const TriggerWrap = renderWrapperAsSpan ? TriggerSpanWrap : TriggerDivWrap

  return (
    <TriggerWrap className={className} spread={spread} {...props}>
      {props.children(mergeProps(popoverTriggerProps, triggerProps))}
      <StyledPopover
        aria-hidden={ariaHidden}
        isOpen={state.isOpen}
        maxWidth={maxWidth}
        renderWrapperAsSpan={renderOverlayAsSpan}
        {...mergeProps(tooltipProps, popoverProps)}
      >
        {typeof content === 'string' ? <BalancedText>{content}</BalancedText> : content}
      </StyledPopover>
    </TriggerWrap>
  )
}

export default forwardRef(TooltipTrigger)

const getTextAlign = ({ placement }: { placement?: UsePopoverProps['placement'] }) => {
  switch (placement) {
    case 'top-start':
    case 'bottom-start':
    case 'right':
    case 'right-start':
    case 'right-end':
      return 'text-align: left;'
    case 'top-end':
    case 'bottom-end':
    case 'left':
    case 'left-start':
    case 'left-end':
      return 'text-align: right;'
    case 'top':
    case 'bottom':
    default:
      return 'text-align: center;'
  }
}

const StyledPopover = styled(Popover)<{ maxWidth: string }>`
  width: max-content;
  padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1]};
  border-radius: ${(p) => p.theme.radii.s};
  z-index: ${(p) => p.theme.zIndices.tooltip};

  color: ${(p) => p.theme.label};
  ${(p) => p.theme.text.system.small};
  ${getTextAlign}
`

const TriggerDivWrap = styled.div<{ spread: boolean }>`
  ${(p) => (p.spread ? p.theme.spread : `position: relative`)};
`

const TriggerSpanWrap = styled.span<{ spread: boolean }>`
  ${(p) => (p.spread ? p.theme.spread : `position: relative`)};
`
