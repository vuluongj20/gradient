import { useLocation } from '@reach/router'
import { Fragment } from 'react'
import styled from 'styled-components'

import Target from './target'

import TransitionLink from '@components/transitionLink'

const Decorations = (): JSX.Element => {
	const location = useLocation()
	const disabled = location.pathname === '/'
	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	const dateString = new Date(Date.now()).toLocaleString('en-US', dateFormat)

	return (
		<Fragment>
			<Section aria-hidden={disabled ? true : false}>
				<Link
					to="/"
					tooltip={!disabled && 'Home'}
					tooltipPlacement="right"
					tooltipAriaHidden
					height={4}
					tabIndex={disabled ? -1 : 0}
					aria-label="Return to home page"
				>
					<Text>GRDNT</Text>
				</Link>
			</Section>
			<Target />
			<Section aria-hidden="true">
				<Link
					to="/"
					tooltip={!disabled && 'Home'}
					tooltipPlacement="right"
					height={6}
					tabIndex={-1}
				>
					<Text>{dateString}</Text>
				</Link>
			</Section>
		</Fragment>
	)
}

export default Decorations

const Section = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const Link = styled(TransitionLink)<{ height: number }>`
	${(p) => p.theme.text.ui.label};
	${(p) => p.theme.utils.flexCenter};
	display: inline-flex;
	position: relative;
	width: 1.4rem;
	height: ${(p) => p.height}rem;
	line-height: 1.4;
	white-space: nowrap;
`

const Text = styled.span`
	transform: rotate(-90deg);
	opacity: 60%;
`
