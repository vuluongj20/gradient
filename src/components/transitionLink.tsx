import TransitionLink from 'gatsby-plugin-transition-link'
import gsap from 'gsap'
import { ReactNode } from 'react'
import styled from 'styled-components'

import Tooltip, { TooltipPlacement } from '@components/tooltip'

type Props = {
	to: string
	children: ReactNode
	onExit?: () => void
	onClick?: () => void
	tooltip?: string
	tooltipPlacement?: TooltipPlacement
	className?: string
	tabIndex?: number
	disabled?: boolean
}

const exitTransition = { duration: 0.75, ease: 'power3.inOut' }
const entryTransition = { duration: 1, ease: 'power3.out' }

const Link = ({
	to,
	children,
	onExit,
	onClick,
	tooltip,
	tooltipPlacement,
	className,
	tabIndex = 0,
	disabled,
}: Props): JSX.Element => (
	<Tooltip content={tooltip} placement={tooltipPlacement}>
		{({ props, ref }) => (
			<StyledTransitionLink
				ref={ref}
				to={to}
				className={className}
				exit={{
					trigger: ({ node }) => {
						onExit?.()
						gsap.to(node, { opacity: 0, ...exitTransition })
					},
					length: 0.75,
				}}
				entry={{
					delay: 0.75,
					trigger: ({ node }) => {
						gsap.set(node, { opacity: 0 })
						document.fonts.ready.then(() => {
							gsap.to(node, { opacity: 1, ...entryTransition })
						})
					},
					duration: 1,
				}}
				onClick={onClick}
				disabled={disabled}
				{...props}
				tabIndex={tabIndex}
			>
				{children}
			</StyledTransitionLink>
		)}
	</Tooltip>
)

export default Link

const StyledTransitionLink = styled(TransitionLink)<{ disabled: boolean }>`
	${(p) =>
		p.disabled &&
		`
		&& {
			color: ${p.theme.colors.label};
			pointer-events: none;
			p, span {
				color: ${p.theme.colors.label};
			}
		}
		`}
`
