import { useLocation } from '@reach/router'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

type Props = {
	path: string
	title: string
	isSection?: boolean
	focusable: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
}

const Link = ({ path, title, isSection, focusable, toggleMenu }: Props): JSX.Element => {
	const location = useLocation()
	const disabled = location.pathname.startsWith(path)

	return (
		<Wrap onClick={() => disabled && toggleMenu(false)}>
			<InnerWrap
				to={path}
				className="nav-link-wrap"
				tabIndex={focusable ? 0 : -1}
				onExit={() => toggleMenu(false)}
			>
				<ContentBox>
					<Title>{title}</Title>
					{isSection && <Line />}
				</ContentBox>
			</InnerWrap>
		</Wrap>
	)
}

export default Link

export const Wrap = styled.li`
	display: block;
	height: 100%;
	width: 6rem;
	position: absolute;
	top: 0;
	right: 0;
	background: ${(p) => p.theme.background};
	margin: 0;
	text-decoration: none;
	opacity: 0%;

	${(p) => p.theme.utils.media.s} {
		width: 5rem;
	}

	&:last-of-type {
		box-shadow: 1px 0 0 0 ${(p) => p.theme.line};
	}

	${(p) => p.theme.utils.media.mobile} {
		position: relative;
		height: auto;
		width: calc(100% - ${(p) => p.theme.space[1]});
		box-sizing: border-box;

		&:last-of-type {
			box-shadow: none;
		}

		&& {
			margin: 0 auto;
		}
	}

	@media (prefers-reduced-motion) {
		position: relative;
		opacity: 100%;
	}
`

const InnerWrap = styled(TransitionLink)`
	${(p) => p.theme.utils.spread};
	cursor: pointer;
	transition: transform ${(p) => p.theme.animation.fastOut};
	border-radius: ${(p) => p.theme.radii.m};

	&.focus-visible {
		z-index: 1;
		box-shadow: inset 0 0 0 4px ${(p) => p.theme.focus};
	}

	${/* sc-selector */ Wrap}:not(:first-of-type) > &::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-left: solid 1px ${(p) => p.theme.line};
		pointer-events: none;
	}

	${(p) => p.theme.utils.media.mobile} {
		display: block;
		position: relative;
		padding: ${(p) => p.theme.space[1]} 0;

		${/* sc-selector */ Wrap}:not(:first-of-type) > &::after {
			border-left: none;
			border-top: solid 1px ${(p) => p.theme.line};
		}

		&:not(:first-of-type) {
			border-left: none;
		}
	}
`

const ContentBox = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: flex-end;
	align-items: flex-end;
	position: absolute;
	top: ${(p) => p.theme.space[3]};
	right: ${(p) => p.theme.space[2]};
	transform-origin: center right;
	transform: rotate(-90deg) translateY(-50%);
	transition: transform 0.375s ${(p) => p.theme.animation.outQuart};

	${/* sc-selector */ InnerWrap}:hover > &,
	${/* sc-selector */ InnerWrap}.focus-visible > & {
		transform: rotate(-90deg) translate(-0.5rem, -50%);
	}

	${(p) => p.theme.utils.media.mobile} {
		position: initial;
		top: auto;
		right: auto;
		transform: none;
		flex-direction: row-reverse;
		justify-content: flex-end;
		align-items: center;
		padding: ${(p) => p.theme.space[1]} 0;

		${/* sc-selector */ InnerWrap}:hover > &,
		${/* sc-selector */ InnerWrap}.focus-visible & {
			transform: translate(0.25rem, 0);
		}
	}
`

const Title = styled.p`
	${(p) => p.theme.text.system.h3}
	color: ${(p) => p.theme.heading};
	margin: 0;
	transition: color ${(p) => p.theme.animation.fastOut};

	${(p) => p.theme.utils.media.mobile} {
		${(p) => p.theme.text.system.h5[p.theme.utils.media.xs]};
	}
`

const Line = styled.div`
	${(p) => p.theme.text.system.h3}

	${(p) => p.theme.utils.media.mobile} {
		${(p) => p.theme.text.system.h5[p.theme.utils.media.xs]};
	}
	margin-bottom: 0.275em;
	margin-right: ${(p) => p.theme.space[0]};
	width: 3rem;
	height: 4px;
	background-color: ${(p) => p.theme.heading};
	transform-origin: right;
	transition: 0.375s ${(p) => p.theme.animation.outQuart};

	${(p) => p.theme.utils.media.s} {
		height: 3px;
		width: 2rem;
	}

	${(p) => p.theme.utils.media.mobile} {
		display: none;
	}
`
