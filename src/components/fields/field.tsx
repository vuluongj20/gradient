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
			<InputWrap>{children}</InputWrap>
		</Wrap>
	)
}

export default Field

const Wrap = styled.div<{ rowLayout: boolean; small: boolean }>`
	${(p) =>
		p.rowLayout
			? `
					display: grid;
					grid-column-gap: ${p.theme.space[2]};
					grid-row-gap: ${p.theme.space[0]};
					grid-template-columns: 1fr max-content;
					align-items: center;
					justify-items: end;
					padding: ${p.theme.space[2]} 0;

					:not(:last-child) {
						border-bottom: solid 1px ${p.theme.line};
					}
			`
			: `
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: ${p.theme.space[1]} 0;
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

const InputWrap = styled.div`
	height: 0;
	display: flex;
	align-items: center;
`
