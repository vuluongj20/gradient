import * as focusTrap from 'focus-trap'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import Binder from './binder'
import Menu from './menu'
import useMenuLinks from './useMenuLinks'

import useBreakpoint from '@utils/hooks/useBreakpoint'

const Nav = (): JSX.Element => {
	// Create & intialize refs
	const focusTrapRef = useRef(null)
	const pageContentRef = useRef(null)

	useEffect(() => {
		focusTrapRef.current = focusTrap.createFocusTrap(`${Wrap}`)
		pageContentRef.current = document.querySelector('#page-content')
	}, [])

	// Initialize & manage open state
	const [menuOpen, setMenuOpen] = useState<boolean>(false)

	const toggleMenu = (nextState: boolean) => {
		if (nextState) {
			setMenuOpen(nextState)
		} else {
			setMenuOpen(nextState)
		}
	}

	// Trap focus on menu open
	useEffect(() => {
		if (menuOpen) {
			focusTrapRef.current.activate()
		} else {
			focusTrapRef.current.deactivate()
		}
	}, [menuOpen])

	// Apply animations w/ gsap
	const theme = useTheme()
	const { reducedMotion } = theme
	const animations = {
		exit: reducedMotion ? { duration: 0 } : { duration: 0.75, ease: 'power3.inOut' },
		entry: reducedMotion ? { duration: 0 } : { duration: 0.75, ease: 'power3.inOut' },
	}
	const menuLinks = useMenuLinks()

	const isXS = useBreakpoint('xs')
	const isS = useBreakpoint('s')

	useEffect(() => {
		if (menuOpen) {
			pageContentRef.current?.setAttribute('aria-hidden', 'true')
			if (!isXS) {
				const animationDistance = isS
					? `+${menuLinks.length * 5}rem`
					: `+${menuLinks.length * 6}rem`

				gsap.to([`${PageShadow}`, '#page-content'], {
					x: animationDistance,
					...animations.entry,
				})
			}
			return
		}

		pageContentRef.current?.setAttribute('aria-hidden', 'false')
		gsap.to([`${PageShadow}`, '#page-content'], {
			x: 0,
			...animations.exit,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menuOpen])

	// Handle escape key press
	const onKeyDown = (e) => {
		if (e.key === 'Escape') {
			toggleMenu(false)
		}
	}

	const beforeSettingsDialogOpen = () => {
		if (!menuOpen) return
		focusTrapRef.current.pause()
	}

	const afterSettingsDialogClose = () => {
		if (!menuOpen) return
		focusTrapRef.current.unpause()
	}

	return (
		<Wrap onKeyDown={onKeyDown} aria-label="Global">
			<PageShadow
				active={menuOpen}
				onClick={() => toggleMenu(false)}
				aria-hidden={true}
			/>
			<Binder
				toggleMenu={toggleMenu}
				menuOpen={menuOpen}
				beforeSettingsDialogOpen={beforeSettingsDialogOpen}
				afterSettingsDialogClose={afterSettingsDialogClose}
			/>
			<Menu
				toggleMenu={toggleMenu}
				isOpen={menuOpen}
				animations={animations}
				beforeSettingsDialogOpen={beforeSettingsDialogOpen}
				afterSettingsDialogClose={afterSettingsDialogClose}
			/>
		</Wrap>
	)
}

export default Nav

const Wrap = styled.nav`
	position: fixed;
	width: 3rem;
	height: 100%;
	z-index: ${(p) => p.theme.zIndices.nav};

	@media print {
		display: none;
	}

	${(p) => p.theme.utils.media.l} {
		width: 2.5rem;
	}

	${(p) => p.theme.utils.media.xs} {
		width: 100%;
		height: 0;
	}
`

const PageShadow = styled.div<{ active: boolean }>`
	position: absolute;
	top: 0;
	left: 3rem;
	width: 100vw;
	height: 100vh;
	background: ${(p) => p.theme.background};
	z-index: -1;
	pointer-events: none;
	opacity: 0%;
	transition: opacity ${(p) => p.theme.animation.slowInOut};

	${(p) =>
		p.active &&
		`
		pointer-events: initial;
		opacity: 20%;
		z-index: 1;
		`}

	${(p) => p.theme.utils.media.l} {
		left: 2.5rem;
	}

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`
