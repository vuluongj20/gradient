import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

import { isDefined } from '@utils/functions'

export type FieldProps = {
	label?: string
	rowLayout?: boolean
	small?: boolean
}

type Props = FieldProps & {
	labelProps?: HTMLAttributes<HTMLLabelElement>
	className?: string
	children?: ReactNode
}

const Field = ({
	label,
	labelProps = {},
	rowLayout = false,
	small = false,
	className,
	children,
}: Props) => {
	return (
		<Wrap className={className} rowLayout={rowLayout} small={small}>
			{isDefined(label) && (
				<Label rowLayout={rowLayout} {...labelProps}>
					{label}
				</Label>
			)}
			{children}
		</Wrap>
	)
}

export default Field

const Wrap = styled.div<{ rowLayout: boolean; small: boolean }>`
	${(p) =>
		p.rowLayout
			? `
					display: flex;
					justify-content: space-between;
					align-items: center;
					:not(:last-child) {
						border-bottom: solid 1px ${p.theme.line};
					}
			`
			: `display: inline-block;`}
`

const Label = styled.label<{ rowLayout: boolean }>`
	${(p) => !p.rowLayout && p.theme.text.system.label}
	${(p) =>
		!p.rowLayout &&
		`
		display: block; 
		margin-bottom: ${p.theme.space[0]};
	`}
`
