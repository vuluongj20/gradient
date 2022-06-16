import TransitionLink from 'gatsby-plugin-transition-link'
import gsap from 'gsap'
import { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
	to: string
	children: ReactNode
	onExit?: () => void
}

const exitTransition = { duration: 0.75, ease: 'power3.inOut' }
const entryTransition = { duration: 1, ease: 'power3.out' }

const Link = ({ to, children, onExit, ...rest }: Props): JSX.Element => {
	const exit = {
		trigger: ({ node }: { node: HTMLElement }) => {
			document.body.dataset.transitioning = 'true'
			onExit?.()
			gsap.to(node, { opacity: 0, ...exitTransition })
		},
		length: 0.75,
	}

	const entry = {
		delay: 0.75,
		trigger: ({ node }: { node: HTMLElement }) => {
			gsap.set(node, { opacity: 0 })
			const callback = () => {
				delete document.body.dataset.transitioning
				gsap.to(node, {
					opacity: 1,
					...entryTransition,
				})
			}
			document.fonts.ready.then(callback).catch(callback)
		},
		duration: 1,
	}

	return (
		<TransitionLink to={to} exit={exit} entry={entry} {...rest}>
			{children}
		</TransitionLink>
	)
}

export default Link
