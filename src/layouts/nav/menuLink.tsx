import { useLocation } from '@reach/router'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

import { paddingHorizontal } from '@utils/style'

type Props = {
	path: string
	title: string
	type?: string
	focusable: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
}

const Link = ({ path, title, type, focusable, toggleMenu }: Props): JSX.Element => {
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
					{type && (
						<TypeWrap aria-hidden="true">
							<TypeText>{type}</TypeText>
							<TypeLine />
						</TypeWrap>
					)}
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
		border-right: solid 1px ${(p) => p.theme.line};
	}

	${(p) => p.theme.utils.media.xs} {
		position: relative;
		height: auto;
		width: calc(100% - ${(p) => p.theme.space[1]});
		padding: 0 ${paddingHorizontal * 0.5}rem;
		box-sizing: border-box;

		&:last-of-type {
			border-right: none;
		}

		&& {
			margin: 0 auto;
		}
	}
`

const InnerWrap = styled(TransitionLink)`
	${(p) => p.theme.utils.spread};
	cursor: pointer;
	transition: transform ${(p) => p.theme.animation.fastOut};

	&.focus-visible {
		z-index: 1;
		box-shadow: inset 0 0 0 4px ${(p) => p.theme.focus};
	}

	${/* sc-selector */ Wrap}:not(:first-of-type) > & {
		border-left: solid 1px ${(p) => p.theme.line};
	}

	${(p) => p.theme.utils.media.xs} {
		display: block;
		position: relative;
		padding: ${(p) => p.theme.space[1]} 0;

		${/* sc-selector */ Wrap}:not(:first-of-type) > & {
			border-left: none;
		}

		${/* sc-selector */ Wrap}:not(:first-of-type) > &::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
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

	${(p) => p.theme.utils.media.xs} {
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
`

const TypeWrap = styled.div`
	margin-bottom: 0.75rem;
	margin-right: ${(p) => p.theme.space[0]};

	${(p) => p.theme.utils.media.m} {
		margin-bottom: 0.7rem;
	}

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const TypeText = styled.p`
	font-weight: 500;
	font-size: 0.875rem;
	line-height: 1;
	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${(p) => p.theme.heading};
	transition: color ${(p) => p.theme.animation.fastOut};
`

const TypeLine = styled.div`
	width: 6rem;
	height: 2px;
	background-color: ${(p) => p.theme.heading};
	transform-origin: right;
	transition: 0.375s ${(p) => p.theme.animation.outQuart};
`
