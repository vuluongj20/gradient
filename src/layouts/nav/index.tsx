// import * as focusTrap from 'focus-trap'
// import gsap from 'gsap'
// import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Binder from './binder'

// import Menu from './menu'
// import useMenuLinks from './useMenuLinks'
import { navSize } from '@utils/style'

// import useMobile from '@utils/useMobile'
// import usePrevious from '@utils/usePrevious'
// import useReducedMotion from '@utils/useReducedMotion'

interface NavProps {
	pageTitle: string
}

// const animations = {
// 	exit: { duration: 0.75, ease: 'power3.inOut' },
// 	entry: { duration: 0.75, ease: 'power3.inOut' },
// }

const Nav = ({ pageTitle }: NavProps) => {
	// Create & intialize refs
	// const focusTrapRef = useRef<focusTrap.FocusTrap>()
	// const pageContentRef = useRef<HTMLDivElement | null>()

	// useEffect(() => {
	// 	focusTrapRef.current = focusTrap.createFocusTrap(`${Wrap}`)
	// 	pageContentRef.current = document.querySelector<HTMLDivElement>('#page-content')
	// }, [])

	// // Initialize & manage open state
	// const [menuOpen, setMenuOpen] = useState<boolean>(false)
	// const prevMenuOpen = usePrevious(menuOpen)

	// const toggleMenu = (nextState: boolean) => {
	// 	if (nextState !== menuOpen) {
	// 		setMenuOpen(nextState)
	// 	}
	// }

	// Trap focus on menu open
	// useEffect(() => {
	// 	if (menuOpen) {
	// 		focusTrapRef.current?.activate()
	// 	} else {
	// 		focusTrapRef.current?.deactivate()
	// 	}
	// }, [menuOpen])

	// Apply animations w/ gsap
	// const menuLinks = useMenuLinks()
	// const reducedMotion = useReducedMotion()
	// const isMobile = useMobile()

	// useEffect(() => {
	// 	if (prevMenuOpen === menuOpen) {
	// 		return
	// 	}

	// 	// Open menu
	// 	if (menuOpen) {
	// 		pageContentRef.current?.setAttribute('aria-hidden', 'true')
	// 		if (!isMobile && !reducedMotion) {
	// 			gsap.to([`${PageShadow}`, '#page-content'], {
	// 				x: `+${menuLinks.length * 6}rem`,
	// 				...animations.entry,
	// 			})
	// 		}
	// 		return
	// 	}

	// 	// Close menu
	// 	pageContentRef.current?.setAttribute('aria-hidden', 'false')
	// 	gsap.to([`${PageShadow}`, '#page-content'], {
	// 		x: 0,
	// 		...animations.exit,
	// 	})
	// }, [menuOpen, prevMenuOpen, isMobile, menuLinks, reducedMotion])

	// // Handle escape key press
	// const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
	// 	if (e.key === 'Escape') {
	// 		toggleMenu(false)
	// 	}
	// }

	// const beforeSettingsDialogOpen = () => {
	// 	if (!menuOpen) return
	// 	focusTrapRef.current?.pause()
	// }

	// const afterSettingsDialogClose = () => {
	// 	if (!menuOpen) return
	// 	focusTrapRef.current?.unpause()
	// }

	return (
		<Wrap aria-label="Global">
			{/*<PageShadow
				active={menuOpen}
				onClick={() => toggleMenu(false)}
				aria-hidden={true}
			/>*/}
			{/*<Binder
				pageTitle={pageTitle}
				toggleMenu={toggleMenu}
				menuOpen={menuOpen}
				beforeSettingsDialogOpen={beforeSettingsDialogOpen}
				afterSettingsDialogClose={afterSettingsDialogClose}
			/>*/}
			<Binder pageTitle={pageTitle} />
			{/*<Menu
				toggleMenu={toggleMenu}
				isOpen={menuOpen}
				animations={animations}
				reducedMotion={reducedMotion}
				beforeSettingsDialogOpen={beforeSettingsDialogOpen}
				afterSettingsDialogClose={afterSettingsDialogClose}
			/>*/}
		</Wrap>
	)
}

export default Nav

const Wrap = styled.nav`
	position: fixed;
	top: 0;
	width: ${navSize.width};
	height: 100%;
	z-index: ${(p) => p.theme.zIndices.nav};

	${(p) => p.theme.media.mobile} {
		width: 100%;
		height: ${navSize.mobileHeight};
	}

	@media print {
		display: none;
	}
`

// const PageShadow = styled.div<{ active: boolean }>`
// 	position: absolute;
// 	top: 0;
// 	left: ${navSize.width};
// 	width: 100vw;
// 	height: 100vh;
// 	z-index: -1;
// 	pointer-events: none;
// 	opacity: 0;
// 	transition: opacity ${(p) => p.theme.animation.slowInOut};

// 	${(p) => p.active && `pointer-events: initial;`}

// 	${(p) => p.theme.media.mobile} {
// 		display: none;
// 	}

// 	@media (prefers-reduced-motion) {
// 		transition: opacity ${(p) => p.theme.animation.mediumOut};
// 	}
// `
