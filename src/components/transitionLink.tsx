import TransitionLink from 'gatsby-plugin-transition-link'
import gsap from 'gsap'
import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

type Props = HTMLAttributes<HTMLAnchorElement> & {
	to: string
	children: ReactNode
	onExit?: () => void
	onClick?: () => void
}

const exitTransition = { duration: 0.75, ease: 'power3.inOut' }
const entryTransition = { duration: 1, ease: 'power3.out' }

const Link = ({ to, children, onExit, ...rest }: Props): JSX.Element => {
	const exit = {
		trigger: ({ node }) => {
			document.body.dataset.transitioning = 'true'
			onExit?.()
			gsap.to(node, { opacity: 0, ...exitTransition })
		},
		length: 0.75,
	}

	const entry = {
		delay: 0.75,
		trigger: ({ node }) => {
			gsap.set(node, { opacity: 0 })
			document.fonts.ready.then(() => {
				delete document.body.dataset.transitioning
				gsap.to(node, {
					opacity: 1,
					...entryTransition,
				})
			})
		},
		duration: 1,
	}

	return (
		<StyledTransitionLink to={to} exit={exit} entry={entry} {...rest}>
			{children}
		</StyledTransitionLink>
	)
}

export default Link

const StyledTransitionLink = styled(TransitionLink)<{ disabled: boolean }>`
	${(p) =>
		p.disabled &&
		`
		&& {
			color: ${p.theme.label};
			pointer-events: none;
			p, span {
				color: ${p.theme.label};
			}
		}
		`}
`
