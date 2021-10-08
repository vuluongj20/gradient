import * as focusTrap from 'focus-trap'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Frame from './frame'
import Menu, { links as menuLinks } from './menu'

import { theme, reducedMotion } from '@utils'

type Props = {
	frameWidth: number
}

const menuAnimation = reducedMotion()
	? { duration: 0 }
	: { duration: 1, ease: 'power4.inOut' }

const Nav = ({ frameWidth }: Props): JSX.Element => {
	const [isOpen, setOpen] = useState(false)
	const focusTrapOptions = {
		returnFocusOnDeactivate: true,
		initialFocus: `${ExitMenuButton}`,
	}
	const focusTrapInstance = focusTrap.createFocusTrap([`${Wrap}`], focusTrapOptions)

	const onKeyDown = (e) => {
		if (e.key === 'Escape') {
			setOpen(false)
		}
	}

	useEffect(() => {
		if (isOpen) {
			focusTrapInstance.activate()

			gsap
				.timeline()
				.add(
					gsap.to([`${Slidable}`, '#page-content'], {
						x: `-${menuLinks.length * 8}em`,
						...menuAnimation,
					}),
				)
				.add(
					gsap.to([`${ExitMenuButton}`], {
						opacity: 1,
						...menuAnimation,
					}),
					0,
				)
				.add(
					gsap.to([`${OpenMenuButton}`], {
						opacity: 0,
						...menuAnimation,
					}),
					0,
				)
		} else {
			focusTrapInstance.deactivate()

			gsap
				.timeline()
				.add(
					gsap.to([`${Slidable}`, '#page-content'], {
						x: '0',
						...menuAnimation,
					}),
				)
				.add(
					gsap.to([`${ExitMenuButton}`], {
						opacity: 0,
						...menuAnimation,
					}),
					0,
				)
				.add(
					gsap.to([`${OpenMenuButton}`], {
						opacity: 1,
						...menuAnimation,
					}),
					0,
				)
		}
	}, [isOpen, focusTrapInstance])

	return (
		<Wrap onKeyDown={onKeyDown}>
			<Slidable>
				<Frame width={frameWidth} />
			</Slidable>
			<Menu isOpen={isOpen} animation={menuAnimation} />
			<ExitMenuButton
				onClick={() => setOpen(false)}
				interactive={isOpen}
				tabIndex={isOpen ? '0' : '-1'}
			>
				<MenuButtonCrossWrap>
					<MenuButtonLine1 />
					<MenuButtonLine2 />
				</MenuButtonCrossWrap>
				<MenuButtonExitSpan>Exit Menu</MenuButtonExitSpan>
			</ExitMenuButton>
			<OpenMenuButton
				onClick={() => setOpen(true)}
				interactive={!isOpen}
				tabIndex={isOpen ? '-1' : '0'}
			>
				Menu
			</OpenMenuButton>
		</Wrap>
	)
}

export default Nav

const Wrap = styled.div`
	position: fixed;

	z-index: 9;
`

const MenuButton = styled.button<{ interactive: boolean }>`
	${theme('u.flexCenter')}
	position: fixed;
	top: 0.5em;
	right: 2.75em;
	padding: 0.5em 0.75em;
	white-space: pre;
	z-index: 1;

	${(p) => (p.interactive ? 'pointer-events: initial;' : 'pointer-events: none;')}
`

const OpenMenuButton = styled(MenuButton)``

const ExitMenuButton = styled(MenuButton)`
	opacity: 0;
`

const MenuButtonExitSpan = styled.span``

const Slidable = styled.div``

const MenuButtonCrossWrap = styled.div`
	position: relative;
	width: 1em;
	height: 1em;
	margin-right: 0.5em;
`

const MenuButtonLine = styled.div`
	position: absolute;
	left: -2px;
	top: 50%;
	width: 125%;
	height: 2px;
	border-radius: 2px;
	background-color: ${theme('c.gray1')};

	${MenuButton}:hover & {
		background-color: ${theme('c.gray2')};
	}
`

const MenuButtonLine1 = styled(MenuButtonLine)`
	transform: rotate(45deg);
`

const MenuButtonLine2 = styled(MenuButtonLine)`
	transform: rotate(-45deg);
`
