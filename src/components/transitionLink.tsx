import TransitionLink from 'gatsby-plugin-transition-link'
import { ReactNode } from 'react'

type Props = {
	to: string
	children: ReactNode
	onExit: () => void
	className: string
	tabIndex: number
}

const Link = ({ to, children, onExit, className, tabIndex = 0 }: Props): JSX.Element => (
	<TransitionLink
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
		tabIndex={tabIndex}
	>
		{children}
	</TransitionLink>
)

export default Link
