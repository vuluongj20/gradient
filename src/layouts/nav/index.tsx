import * as focusTrap from 'focus-trap'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Binder, { HamWrap } from './binder'
import Menu from './menu'
import useMenuLinks from './useMenuLinks'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints, reducedMotion } from '@utils/styling'

const menuAnimation = reducedMotion()
	? { duration: 0 }
	: { duration: 0.75, ease: 'power4.inOut' }

const Nav = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false)
	const windowWidth = useWindowWidth()
	const menuLinks = useMenuLinks()

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

			if (windowWidth > numericBreakpoints.xs) {
				const animationDistance =
					windowWidth > numericBreakpoints.s
						? `+${menuLinks.length * 6}em`
						: `+${menuLinks.length * 5}em`

				gsap.to([`${PageShadow}`, '#page-content'], {
					x: animationDistance,
					...menuAnimation,
				})
			}
		} else {
			gsap.to([`${PageShadow}`, '#page-content'], {
				x: 0,
				...menuAnimation,
			})
		}

		return () => focusTrapInstance.deactivate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				active={menuOpen}
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
	width: 3em;
	height: 100%;
	z-index: 9;

	${(p) => p.theme.utils.media.l} {
		width: 2.5em;
	}

	${(p) => p.theme.utils.media.xs} {
		width: 100%;
		height: 2.75em;
	}
`

const PageShadow = styled.div<{ active: boolean }>`
	position: absolute;
	top: 0;
	left: 3em;
	width: 100vw;
	height: 100vh;
	cursor: pointer;
	background: ${(p) => p.theme.colors.background};
	z-index: -1;
	pointer-events: none;
	opacity: 0%;
	transition: opacity 1s ${(p) => p.theme.animation.easeInOutQuint};

	${(p) =>
		p.active &&
		`
		pointerEvents: initial;
		opacity: 40%;
		z-index: 1;
		`}

	${(p) => p.theme.utils.media.l} {
		left: 2.5em;
	}

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`
