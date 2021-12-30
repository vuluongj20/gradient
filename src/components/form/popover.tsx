import { FocusScope } from '@react-aria/focus'
import { DismissButton, useOverlay } from '@react-aria/overlays'
import { ReactNode, useRef } from 'react'
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
      <Wrap {...overlayProps} ref={ref}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrap>
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
  transform: translateX(-${(p) => p.theme.space[2]});
  box-shadow: 0 0 0 1px ${(p) => p.theme.colors.oLine}, ${(p) => p.theme.shadows.l};
`
