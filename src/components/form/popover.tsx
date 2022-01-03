import { FocusScope } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Popover = ({ isOpen, onClose, children }: Props) => {
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

  return (
    <FocusScope restoreFocus>
      <CSSTransition in={isOpen} timeout={200} unmountOnExit>
        <Wrap {...overlayProps} ref={ref}>
          {children}
          <DismissButton onDismiss={onClose} />
        </Wrap>
      </CSSTransition>
    </FocusScope>
  )
}

export default Popover

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  background: ${(p) => p.theme.colors.oBackground};
  border-radius: ${(p) => p.theme.radii.m};
  padding: ${(p) => p.theme.space[0]};
  box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
  transform: translate(-${(p) => p.theme.space[2]}, -2em);
  transition: 0.25s ${(p) => p.theme.animation.easeOutQuart};
  opacity: 0%;
  pointer-events: none;

  &.enter-active,
  &.enter-done {
    opacity: 100%;
    transform: translate(-${(p) => p.theme.space[2]}, 0);
    pointer-events: all;
  }

  &.exit-active {
    opacity: 0%;
    transform: translate(-${(p) => p.theme.space[2]}, 0);
  }
`
