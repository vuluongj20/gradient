import { useLocation } from '@reach/router'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { siteIndex, sections } from '@data/siteStructure'

import Grid from '@components/grid'
import TransitionLink from '@components/transitionLink'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints, gridMargin } from '@utils/styling'

type MenuProps = {
	isOpen: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
	animation: {
		duration: number
		ease?: string
	}
}

type Link = {
	id: string
	path: string
	title: string
	type?: string
}

type LinkProps = Link & {
	focusable: boolean
	disabled: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
}

export const links: Link[] = [
	siteIndex,
	...sections.map((page) => ({ ...page, type: 'section' })),
	{
		id: 'about',
		path: '/about',
		title: 'About',
	},
]

const Link = ({
	path,
	title,
	type,
	focusable,
	disabled,
	toggleMenu,
}: LinkProps): JSX.Element => (
	<LinkWrap
		to={path}
		onExit={() => toggleMenu(false)}
		className="nav-link-wrap"
		tabIndex={focusable ? 0 : -1}
		disabled={disabled}
	>
		<LinkShadow />
		<LinkBackground />
		<LinkContentBox>
			{type && (
				<LinkTypeWrap>
					<LinkTypeText>{type}</LinkTypeText>
					<LinkTypeLine />
				</LinkTypeWrap>
			)}
			<LinkTitle>{title}</LinkTitle>
		</LinkContentBox>
	</LinkWrap>
)

const Menu = ({ isOpen, animation, toggleMenu }: MenuProps): JSX.Element => {
	const location = useLocation()
	const windowWidth = useWindowWidth()

	useEffect(() => {
		const scrollLockTarget = document.querySelector(`${MenuWrap}`)

		if (isOpen) {
			disableBodyScroll(scrollLockTarget)

			if (windowWidth > numericBreakpoints.xs) {
				const animationDistance =
					windowWidth > numericBreakpoints.s
						? `+${links.length * 6}em`
						: `+${links.length * 5}em`

				gsap.set(`${MenuWrap}`, { x: '100%', y: 0 })
				gsap.to(`${MenuWrap}`, {
					width: animationDistance,
					borderRightWidth: 1,
					...animation,
				})
				gsap.to(`${LinkWrap}`, {
					opacity: 1,
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
				gsap.to(`${MenuWrap}`, {
					width: 0,
					borderRightWidth: 0,
					...animation,
				})
				gsap.to(`${LinkWrap}`, {
					opacity: 0,
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
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [isOpen, animation])

	/** Close meny on resize */
	useEffect(() => {
		toggleMenu(false)
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [windowWidth])

	return (
		<MenuWrap>
			{links.map((link) => {
				const disabled = location.pathname.startsWith(link.path)
				return (
					<Link
						key={link.id}
						focusable={isOpen}
						toggleMenu={toggleMenu}
						disabled={disabled}
						{...link}
					/>
				)
			})}
			<PageContentShadow />
		</MenuWrap>
	)
}

export default Menu

const MenuWrap = styled.nav<{ animating: boolean }>`
	display: flex;
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 100vh;
	border-right: solid 0px ${(p) => p.theme.c.line};
	transform: translateX(100%);
	background: ${(p) => p.theme.c.background};
	overflow: hidden;

	z-index: -1;

	${(p) => p.animating && `pointer-events: none;`}

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
	width: 100%;
	position: relative;

	text-decoration: none;
	cursor: pointer;
	opacity: 0;

	transition: transform 0.25s ${(p) => p.theme.a.easeOutQuad};

	&:not(:first-of-type) {
		border-left: solid 1px ${(p) => p.theme.c.line};
	}

	&:focus-visible {
		z-index: 1;
	}

	${(p) =>
		!p.theme.a.reduced &&
		`&:hover,
		&:focus-visible {
		transform: translateX(-0.75em);
	}`}

	${(p) => p.theme.u.media.xs} {
		height: auto;
		padding: 0 ${gridMargin * 0.75}em;
		transform-origin: left;

		&:hover,
		&:focus-visible {
			transform: translateX(0.5em) !important;
		}

		&:not(:first-of-type) {
			border-left: none;
		}
	}
`

const LinkBackground = styled.div`
	${(p) => p.theme.u.spread};
	width: calc(100% + 0.5em);
	background: ${(p) => p.theme.c.background};

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const LinkShadow = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 1em;
	height: 100%;
	box-shadow: 0 0 2em rgba(12, 12, 12, 0.04);

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const PageContentShadow = styled(LinkShadow)`
	left: auto;
	right: 0;
	transform: translateX(100%);
	z-index: 9;
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

	${(p) => p.theme.u.media.s} {
		right: 0.75em;
	}

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
	${(p) => p.theme.t.ui.label}
	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${(p) => p.theme.c.label};
	transition: color 0.25s ${(p) => p.theme.a.easeOutQuad};
`

const LinkTypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${(p) => p.theme.c.gray6};
	transform-origin: right;
	transition: 0.375s ${(p) => p.theme.a.easeOutQuart};
`
