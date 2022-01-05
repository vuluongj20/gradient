import { DismissButton, useOverlay, useOverlayPosition } from '@react-aria/overlays'
import { mergeProps } from '@react-aria/utils'
import { Placement, PlacementAxis } from '@react-types/overlays'
import { RefObject, ReactNode, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  triggerRef: RefObject<HTMLElement>
  placement?: Placement
  offset?: number
  animationState: string
}

const Popover = ({
  isOpen,
  onClose,
  children,
  triggerRef,
  placement = 'bottom',
  offset = 8,
  animationState,
}: Props) => {
  const ref = useRef()
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    ref,
  )
  const { overlayProps: positionProps, placement: calculatedPlacement } =
    useOverlayPosition({
      targetRef: triggerRef,
      overlayRef: ref,
      placement,
      isOpen,
      offset,
      containerPadding: 0,
    })

  return (
    <Wrap
      {...mergeProps(overlayProps, positionProps)}
      placement={calculatedPlacement || placement}
      className={animationState}
      ref={ref}
    >
      {children}
      <DismissButton onDismiss={onClose} />
    </Wrap>
  )
}

export default Popover

const Wrap = styled.div<{ placement: Placement | PlacementAxis }>`
  position: absolute;
  background: ${(p) => p.theme.colors.oBackground};
  border-radius: ${(p) => p.theme.radii.m};
  padding: ${(p) => p.theme.space[0]};
  box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
  transition: ${(p) => p.theme.animation.fastOut};
  opacity: 0%;
  z-index: ${(p) => p.theme.zIndices.popover};

  ${(p) =>
    p.placement === 'top' &&
    `transform: translate(-${p.theme.space[2]}, ${p.theme.space[2]})`};
  ${(p) =>
    p.placement === 'bottom' &&
    `transform: translate(-${p.theme.space[2]}, -${p.theme.space[2]})`};
  ${(p) => p.placement === 'left' && `transform: translateX(${p.theme.space[2]})`};
  ${(p) => p.placement === 'right' && `transform: translateX(-${p.theme.space[2]})`};

  &.entering,
  &.entered {
    opacity: 100%;
    transform: translate(-${(p) => p.theme.space[2]}, 0);

    ${(p) => p.placement === 'top' && `transform: translate(-${p.theme.space[2]}, 0)`};
    ${(p) => p.placement === 'bottom' && `transform: translate(-${p.theme.space[2]}, 0)`};
    ${(p) => p.placement === 'left' && `transform: translateX(0)`};
    ${(p) => p.placement === 'right' && `transform: translateX(0)`};
  }

  &.exiting {
    opacity: 0%;
    transform: translate(-${(p) => p.theme.space[2]}, 0);
  }
`
