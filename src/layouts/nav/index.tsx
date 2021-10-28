import * as focusTrap from 'focus-trap'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Binder, { HamWrap } from './binder'
import Menu, { links as menuLinks } from './menu'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints, reducedMotion } from '@utils/styling'

const menuAnimation = reducedMotion()
	? { duration: 0 }
	: { duration: 1, ease: 'power4.inOut' }

const Nav = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false)
	const windowWidth = useWindowWidth()

	const toggleMenu = (nextState: boolean) => {
		if (nextState) {
			setMenuOpen(nextState)
		} else {
			focusTrapInstance.deactivate()
			setMenuOpen(nextState)
		}
	}

	const focusTrapOptions = {
		returnFocusOnDeactivate: true,
		initialFocus: `${HamWrap}`,
		setReturnFocus: `${HamWrap}`,
	}

	const focusTrapInstance =
		typeof window !== 'undefined' && typeof document !== 'undefined'
			? focusTrap.createFocusTrap(`${Wrap}`, focusTrapOptions)
			: null

	useEffect(() => {
		if (menuOpen) {
			focusTrapInstance.activate()
			if (windowWidth > numericBreakpoints.s) {
				gsap.timeline().add(
					gsap.to([`${PageShadow}`, '#page-content'], {
						x: `+${menuLinks.length * 6}em`,
						...menuAnimation,
					}),
				)
			}
		} else {
			gsap.timeline().add(
				gsap.to([`${PageShadow}`, '#page-content'], {
					x: '0',
					...menuAnimation,
				}),
			)
		}
	}, [menuOpen, focusTrapInstance])

	/** Escape key event listener */
	const onKeyDown = (e) => {
		if (e.key === 'Escape') {
			focusTrapInstance.deactivate()
			toggleMenu(false)
		}
	}

	return (
		<Wrap onKeyDown={onKeyDown}>
			<PageShadow
				style={{
					pointerEvents: menuOpen ? 'initial' : 'none',
					opacity: menuOpen ? 0.2 : 0,
				}}
				onClick={() => {
					focusTrapInstance.deactivate()
					toggleMenu(false)
				}}
			/>
			<Binder toggleMenu={toggleMenu} menuOpen={menuOpen} />
			<Menu toggleMenu={toggleMenu} isOpen={menuOpen} animation={menuAnimation} />
		</Wrap>
	)
}

export default Nav

const Wrap = styled.div`
	position: fixed;
	width: 2.5em;
	height: 100%;
	z-index: 9;
`

const PageShadow = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	cursor: pointer;
	background: ${(p) => p.theme.c.background};
	z-index: -1;
	transition: opacity 1s ${(p) => p.theme.a.easeInOutQuint};
`
