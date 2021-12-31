import { FocusScope } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { ReactNode, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

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
      <Wrap {...overlayProps} ref={ref}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrap>
    </FocusScope>
  )
}

export default Popover

const slideDownAnimation = (p) => keyframes`
 0% { 
   opacity: 0%; 
   transform: translate(-${p.theme.space[2]}, -2em); 
   pointer-events: none; 
 }
 100% { 
   opacity: 100%; 
   transform: translate(-${p.theme.space[2]}, 0); 
   pointer-events: all; 
 }
`

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  background: ${(p) => p.theme.colors.oBackground};
  border-radius: ${(p) => p.theme.radii.m};
  padding: ${(p) => p.theme.space[0]};
  box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
  animation: ${slideDownAnimation} 0.2s ${(p) => p.theme.animation.easeOutExpo} forwards;
`
