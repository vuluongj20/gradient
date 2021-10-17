import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'
import { useEffect } from 'react'
import styled from 'styled-components'

import { sections } from '@data/siteStructure'

import { theme } from '@utils/styling'

type Props = {
	isOpen: boolean
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

export const links: Link[] = [
	{
		id: 'index',
		path: '/index',
		title: 'Index',
	},
	...sections.map((page) => ({ ...page, type: 'section' })),
	{
		id: 'about',
		path: '/about',
		title: 'About',
	},
]

const Link = ({ path, title, type, focusable }: Link & { focusable: boolean }) => (
	<LinkWrap href={path} className="nav-link-wrap" tabIndex={focusable ? '0' : '-1'}>
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

const Menu = ({ isOpen, animation }: Props): JSX.Element => {
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
			{links.map((link) => (
				<Link key={link.id} focusable={isOpen} {...link} />
			))}
		</MenuWrap>
	)
}

export default Menu

const MenuWrap = styled.nav<{ animating: boolean }>`
	display: flex;
	position: fixed;
	top: 0;
	right: 0;
	width: 0;
	height: 100%;

	${(p) => p.animating && `pointer-events: none;`}
`

const LinkWrap = styled.a`
	display: block;
	height: 100%;
	width: 100%;
	position: relative;
	background-color: ${theme('c.surface1')};
	border-left: solid 1px ${theme('c.gray9')};
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
	top: 3em;
	right: 1em;
	transform-origin: center right;
	transform: rotate(-90deg) translateY(-50%);
	transition: transform 0.375s ${theme('a.easeOutQuart')};

	${(p) =>
		!p.theme.a.reduced &&
		`${LinkWrap}:hover &,
		${LinkWrap}:focus-visible & {
		transform: rotate(-90deg) translate(1em, -50%);
	}`}
`

const LinkTitle = styled.p`
	${theme('t.ui.h3')}
	color: ${theme('c.gray1')};
	margin: 0;
	transition: color 0.25s ${theme('a.easeOutQuad')};

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
		color: ${p.theme.c.gray3};
	}`};
`

const LinkTypeWrap = styled.div`
	margin-bottom: 0.45em;
	margin-right: 0.25em;
`

const LinkTypeText = styled.p`
	${theme('t.ui.label')}
	margin: 0;
	text-align: right;
	text-transform: uppercase;
	color: ${theme('c.gray1')};
	transition: color 0.25s ${theme('a.easeOutQuad')};

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
		color: ${p.theme.c.gray3};
	}`}
`

const LinkTypeLine = styled.div`
	width: 6em;
	height: 2px;
	background-color: ${theme('c.gray1')};
	transform-origin: right;
	transition: 0.375s ${theme('a.easeOutQuart')};

	${(p) =>
		!p.theme.a.reduced &&
		`${LinkWrap}:hover &,
		${LinkWrap}:focus-visible & {
		transform: scaleX(1.1666);
	}`}

	${(p) =>
		p.theme.a.reduced &&
		`${LinkWrap}:hover & {
			background-color: ${p.theme.c.gray3};
		}`}
`
