import { ReactNode } from 'react'
import styled from 'styled-components'

import Tooltip, { TooltipProps } from '@components/tooltip'

type Props = Omit<TooltipProps, 'children'> & {
	children: ReactNode
}

const TooltipSpan = ({ children, ...tooltipProps }: Props) => {
	return (
		<StyledTooltip {...tooltipProps}>
			{(tooltipTriggerProps) => <Span {...tooltipTriggerProps}>{children}</Span>}
		</StyledTooltip>
	)
}

export default TooltipSpan

const StyledTooltip = styled(Tooltip)`
	display: inline;
`

const Span = styled.span`
	text-decoration: underline;
	text-decoration-style: dotted;
	text-decoration-color: ${(p) => p.theme.contentLinkUnderline};
`
