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
  background: ${(p) => p.theme.c.oBackground};
  border-radius: ${(p) => p.theme.r[1]};
  border: solid 1px ${(p) => p.theme.c.line};
  padding: ${(p) => p.theme.s[0]};
  transform: translateX(-${(p) => p.theme.s[2]});
`
