import { ReactNode } from 'react'
import styled from 'styled-components'

import { Theme } from '@theme'

export interface AlertProps {
	title?: string
	leadingItem?: ReactNode
	children?: ReactNode
	marginTop?: number
	marginBottom?: number
	gridColumn?: keyof Theme['gridColumn']
}

const Alert = ({ title, leadingItem, children, ...props }: AlertProps) => {
	return (
		<Wrap {...props}>
			{leadingItem && <LeadingWrap>{leadingItem}</LeadingWrap>}
			{title && <Title column={leadingItem ? 2 : 1}>{title}</Title>}
			<Content row={title ? 2 : 1} column={leadingItem ? 2 : 1}>
				{children}
			</Content>
		</Wrap>
	)
}

export default Alert

const Wrap = styled.p<AlertProps>`
	column-gap: var(--space-0);

	border-top: solid 1px var(--color-line);
	border-bottom: solid 1px var(--color-line);
	padding: var(--space-1-5) 0;

	color: var(--color-label);

	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
	${(p) => p.marginTop && `margin-top: var(--space-${String(p.marginTop)});`}
	${(p) => p.marginBottom && `margin-bottom: var(--space-${String(p.marginBottom)});`}
`

const Content = styled.span<{ row: number; column: number }>`
	grid-row: ${(p) => p.row};
	grid-column: ${(p) => p.column};
`

const LeadingWrap = styled.span`
	grid-row: 1;
	grid-column: 1;

	height: ${(p) => p.theme.text.system.body.lineHeight}em;
	align-items: center;
`

export const Title = styled.span<{ column: number }>`
	grid-row: 1;
	grid-column: ${(p) => p.column};

	font-weight: 500;
	color: var(--color-label);
	margin-bottom: var(--space-0);
`
