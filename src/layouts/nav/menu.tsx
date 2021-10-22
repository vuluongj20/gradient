import { useLocation } from '@reach/router'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { siteIndex, sections } from '@data/siteStructure'

import TransitionLink from '@components/transitionLink'

type MenuProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
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
	setOpen: Dispatch<SetStateAction<boolean>>
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
	setOpen,
}: LinkProps): JSX.Element => (
	<LinkWrap
		to={path}
		onExit={() => setOpen(false)}
		className="nav-link-wrap"
		tabIndex={focusable ? 0 : -1}
		disabled={disabled}
	>
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

const Menu = ({ isOpen, animation, setOpen }: MenuProps): JSX.Element => {
	const location = useLocation()
	useEffect(() => {
		const scrollLockTarget = document.querySelector(`${MenuWrap}`)

		if (isOpen) {
			disableBodyScroll(scrollLockTarget)

			gsap
				.timeline()
				.add(
					gsap.to(`${MenuWrap}`, {
						width: `${links.length * 6}em`,
						...animation,
					}),
				)
				.add(
					gsap.to(`${LinkWrap}`, {
						opacity: 1,
						...animation,
					}),
					0,
				)
		} else {
			enableBodyScroll(scrollLockTarget)

			gsap
				.timeline()
				.add(
					gsap.to(`${MenuWrap}`, {
						width: 0,
						...animation,
					}),
				)
				.add(
					gsap.to(`${LinkWrap}`, {
						opacity: 0,
						...animation,
					}),
					0,
				)
		}
	}, [isOpen, animation])

	return (
		<MenuWrap>
			{links.map((link) => {
				const disabled = location.pathname.startsWith(link.path)
				return (
					<Link
						key={link.id}
						focusable={isOpen}
						setOpen={setOpen}
						disabled={disabled}
						{...link}
					/>
				)
			})}
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

	z-index: -1;

	${(p) => p.animating && `pointer-events: none;`}
`

const LinkWrap = styled(TransitionLink)`
	display: block;
	height: 100%;
	width: 100%;
	position: relative;
	background-color: ${(p) => p.theme.c.background};
	border-left: solid 1px ${(p) => p.theme.c.line};
	overflow: hidden;

	text-decoration: none;
	cursor: pointer;
	opacity: 0;

	&:focus-visible {
		z-index: 1;
	}
`

const LinkContentBox = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	position: absolute;
	top: 8em;
	right: 1em;
	transform-origin: center right;
	transform: rotate(-90deg) translateY(-50%);
	transition: transform 0.375s ${(p) => p.theme.a.easeOutQuart};

	${(p) =>
		!p.theme.a.reduced &&
		`${LinkWrap}:hover &,
		${LinkWrap}:focus-visible & {
		transform: rotate(-90deg) translate(1em, -50%);
	}`}
`

const LinkTitle = styled.p`
	${(p) => p.theme.t.ui.h3}
	color: ${(p) => p.theme.c.heading};
	margin: 0;
	transition: color 0.25s ${(p) => p.theme.a.easeOutQuad};

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
		color: ${p.theme.c.buttonLabelHover};
	}`};
`

const LinkTypeWrap = styled.div`
	margin-bottom: 0.45em;
	margin-right: 0.25em;
`

const LinkTypeText = styled.p`
	${(p) => p.theme.t.ui.label}
	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${(p) => p.theme.c.heading};
	transition: color 0.25s ${(p) => p.theme.a.easeOutQuad};

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
		color: ${p.theme.c.buttonLabelHover};
	}`}
`

const LinkTypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${(p) => p.theme.c.heading};
	transform-origin: right;
	transition: 0.375s ${(p) => p.theme.a.easeOutQuart};

	${(p) =>
		!p.theme.a.reduced &&
		`${LinkWrap}:hover &,
		${LinkWrap}:focus-visible & {
		transform: scaleX(1.1666);
	}`}

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
			background-color: ${p.theme.c.buttonLabelHover};
		}`}
`
