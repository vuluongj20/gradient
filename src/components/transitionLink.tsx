import TransitionLink from 'gatsby-plugin-transition-link'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	to: string
	children: ReactNode
	onExit?: () => void
	onClick?: () => void
	className?: string
	tabIndex?: number
	disabled?: boolean
}

const Link = ({
	to,
	children,
	onExit,
	onClick,
	className,
	tabIndex = 0,
	disabled,
}: Props): JSX.Element => (
	<StyledTransitionLink
		to={to}
		className={className}
		exit={{
			trigger: onExit,
			length: 1,
		}}
		entry={{
			delay: 1,
			duration: 1,
		}}
		onClick={onClick}
		tabIndex={tabIndex}
		disabled={disabled}
	>
		{children}
	</StyledTransitionLink>
)

export default Link

const StyledTransitionLink = styled(TransitionLink)<{ disabled: boolean }>`
	${(p) =>
		p.disabled &&
		`
		p, span {
			color: ${p.theme.c.label};
		}
		pointer-events: none;
		`}
`
