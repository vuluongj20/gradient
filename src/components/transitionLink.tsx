import TransitionLink from 'gatsby-plugin-transition-link'
import { ReactNode } from 'react'

type Props = {
	to: string
	children: ReactNode
	onExit: () => void
	className: string
}

const Link = ({ to, children, onExit, className }: Props): JSX.Element => (
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
	>
		{children}
	</TransitionLink>
)

export default Link
