import { useLocation } from '@reach/router'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import useMenuLinks from './useMenuLinks'

import TransitionLink from '@components/transitionLink'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints, paddingHorizontal } from '@utils/styling'

type MenuProps = {
	isOpen: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
	animation: {
		duration: number
		ease?: string
	}
}

type LinkProps = {
	path: string
	title: string
	type: string
	focusable: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
}

const Link = ({ path, title, type, focusable, toggleMenu }: LinkProps): JSX.Element => {
	const location = useLocation()
	const disabled = location.pathname.startsWith(path)

	return (
		<LinkWrap
			to={path}
			onClick={() => disabled && toggleMenu(false)}
			onExit={() => toggleMenu(false)}
			className="nav-link-wrap"
			tabIndex={focusable ? 0 : -1}
		>
			<LinkInnerWrap>
				<LinkContentBox>
					{type && (
						<LinkTypeWrap>
							<LinkTypeText>{type}</LinkTypeText>
							<LinkTypeLine />
						</LinkTypeWrap>
					)}
					<LinkTitle>{title}</LinkTitle>
				</LinkContentBox>
			</LinkInnerWrap>
		</LinkWrap>
	)
}

const Menu = ({ isOpen, animation, toggleMenu }: MenuProps): JSX.Element => {
	const windowWidth = useWindowWidth()
	const links = useMenuLinks()

	useEffect(() => {
		const scrollLockTarget = document.querySelector(`${MenuWrap}`)

		if (isOpen) {
			disableBodyScroll(scrollLockTarget)

			if (windowWidth > numericBreakpoints.xs) {
				gsap.to(`${LinkWrap}`, {
					opacity: 1,
					x: (i) => `+${(i + 1) * (windowWidth > numericBreakpoints.s ? 6 : 5)}em`,
					pointerEvents: 'none',
					onComplete: () => gsap.set(`${LinkWrap}`, { pointerEvents: 'initial' }),
					...animation,
				})
			} else {
				gsap.set(`${MenuWrap}`, { x: 0, width: '100%' })
				gsap.to(`${MenuWrap}`, {
					y: 0,
					...animation,
				})
				gsap.fromTo(
					`${LinkWrap}`,
					{ opacity: 0, scaleX: 0.75 },
					{
						opacity: 1,
						scaleX: 1,
						stagger: 0.025,
						...animation,
					},
				)
			}
		} else {
			enableBodyScroll(scrollLockTarget)

			if (windowWidth > numericBreakpoints.xs) {
				gsap.to(`${LinkWrap}`, {
					opacity: 0,
					x: 0,
					pointerEvents: 'none',
					onComplete: () => gsap.set(`${LinkWrap}`, { pointerEvents: 'initial' }),
					...animation,
				})
			} else {
				gsap.to(`${MenuWrap}`, {
					y: '-100%',
					...animation,
				})
				gsap.to(`${LinkWrap}`, {
					opacity: 0,
					...animation,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, animation])

	/** Close meny on resize */
	useEffect(() => {
		toggleMenu(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowWidth])

	return (
		<MenuWrap>
			{links.map((link) => (
				<Link key={link.slug} focusable={isOpen} toggleMenu={toggleMenu} {...link} />
			))}
		</MenuWrap>
	)
}

export default Menu

const MenuWrap = styled.nav`
	display: flex;
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 100vh;
	transform: translateX(100%);
	background: ${(p) => p.theme.c.background};

	z-index: -1;

	${(p) => p.theme.u.media.xs} {
		width: 100%;
		flex-direction: column;
		border-right: none;
		padding-top: calc(2.5em + ${(p) => p.theme.s[2]});
		transform: translateY(-100%);
	}
`

const LinkWrap = styled(TransitionLink)`
	display: block;
	height: 100%;
	width: 6em;
	position: absolute;
	top: 0;
	right: 0;

	text-decoration: none;
	opacity: 0%;

	${(p) => p.theme.u.media.s} {
		width: 5em;
	}

	&.focus-visible {
		z-index: 1;
	}

	&:last-of-type {
		border-right: solid 1px ${(p) => p.theme.c.line};
	}

	${(p) => p.theme.u.media.xs} {
		position: relative;
		height: auto;
		width: calc(100% - ${(p) => p.theme.s[1]});
		padding: 0 ${paddingHorizontal * 0.75}em;
		margin: 0 auto;
		box-sizing: border-box;

		&:not(:first-of-type) {
			border-left: none;
		}
	}
`

const LinkInnerWrap = styled.div`
	${(p) => p.theme.u.spread};
	cursor: pointer;
	background: ${(p) => p.theme.c.background};
	transition: transform 0.25s ${(p) => p.theme.a.easeOutQuad};

	${LinkWrap}:not(:first-of-type) > & {
		border-left: solid 1px ${(p) => p.theme.c.line};
	}

	${(p) =>
		!p.theme.a.reduced &&
		`&:hover,
		${LinkWrap}.focus-visible > & {
		transform: translateY(0.5em);
	}`}

	${(p) => p.theme.u.media.xs} {
		position: relative;
		${LinkWrap}:not(:first-of-type) > & {
			border-left: none;
		}

		&:hover,
		${/* sc-selector */ LinkWrap}.focus-visible > & {
			transform: translateX(0.25em);
		}

		&:not(:first-of-type) {
			border-left: none;
		}
	}
`

const LinkContentBox = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	position: absolute;
	top: ${(p) => p.theme.s[3]};
	right: ${(p) => p.theme.s[2]};
	transform-origin: center right;
	transform: rotate(-90deg) translateY(-50%);
	transition: transform 0.375s ${(p) => p.theme.a.easeOutQuart};

	${(p) => p.theme.u.media.xs} {
		position: initial;
		top: auto;
		right: auto;
		transform: none;
		flex-direction: row-reverse;
		justify-content: flex-end;
		align-items: center;
		padding: ${(p) => p.theme.s[1]} 0;
	}
`

const LinkTitle = styled.p`
	${(p) => p.theme.t.ui.h3}
	color: ${(p) => p.theme.c.heading};
	margin: 0;
	transition: color 0.25s ${(p) => p.theme.a.easeOutQuad};
`

const LinkTypeWrap = styled.div`
	margin-bottom: 0.45em;
	margin-right: ${(p) => p.theme.s[0]};

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const LinkTypeText = styled.p`
	${(p) => p.theme.t.ui.label};
	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${(p) => p.theme.c.heading};
	transition: color 0.25s ${(p) => p.theme.a.easeOutQuad};
`

const LinkTypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${(p) => p.theme.c.heading};
	transform-origin: right;
	transition: 0.375s ${(p) => p.theme.a.easeOutQuart};
`
