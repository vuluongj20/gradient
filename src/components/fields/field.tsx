import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

import { isDefined } from '@utils/functions'

export type FieldProps = {
	label?: string
	description?: string
	rowLayout?: boolean
	small?: boolean
}

type Props = FieldProps & {
	labelProps?: HTMLAttributes<HTMLLabelElement>
	descriptionProps?: HTMLAttributes<HTMLParagraphElement>
	className?: string
	children?: ReactNode
}

const Field = ({
	label,
	labelProps = {},
	description,
	descriptionProps = {},
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
			{isDefined(description) && (
				<Description rowLayout={rowLayout} {...descriptionProps}>
					{description}
				</Description>
			)}
			{children}
		</Wrap>
	)
}

export default Field

const Wrap = styled.div<{ rowLayout: boolean; small: boolean }>`
	padding: ${(p) => p.theme.space[1]} 0;

	${(p) =>
		p.rowLayout
			? `
					display: grid;
					grid-column-gap: ${p.theme.space[2]};
					grid-template-columns: 1fr max-content;
					align-items: center;
					justify-items: end;
					:not(:last-child) {
						border-bottom: solid 1px ${p.theme.line};
					}
			`
			: `
					display: flex;
					flex-direction: column;
					align-items:flex-start;
				`}
`

const Label = styled.label<{ rowLayout: boolean }>`
	justify-self: start;
	${(p) => !p.rowLayout && p.theme.text.system.label}
	${(p) =>
		!p.rowLayout &&
		`
		display: block; 
		margin-bottom: ${p.theme.space[0]};
	`}
`

const Description = styled.small<{ rowLayout: boolean }>`
	grid-row: 2;
	justify-self: start;

	${(p) => p.theme.text.system.small};
	color: ${(p) => p.theme.label};

	${(p) =>
		!p.rowLayout &&
		`
		display: block; 
		margin-bottom: ${p.theme.space[0]};
	`}
`
