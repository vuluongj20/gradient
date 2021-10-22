import * as focusTrap from 'focus-trap'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Logo from './logo'
import Menu, { links as menuLinks } from './menu'

import Grid from '@components/grid'

import { reducedMotion } from '@utils/styling'

const menuAnimation = reducedMotion()
	? { duration: 0 }
	: { duration: 1, ease: 'power4.inOut' }

const Nav = (): JSX.Element => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const toggleMenu = () => {
		if (isOpen) {
			focusTrapInstance.deactivate()
			setOpen(false)
		} else {
			setOpen(true)
		}
	}
	const focusTrapOptions = {
		returnFocusOnDeactivate: true,
		initialFocus: `${MenuButton}`,
		setReturnFocus: `${MenuButton}`,
	}
	const focusTrapInstance =
		typeof window !== 'undefined' && typeof document !== 'undefined'
			? focusTrap.createFocusTrap(`${Wrap}`, focusTrapOptions)
			: null
	useEffect(() => {
		if (isOpen) {
			focusTrapInstance.activate()
			gsap.timeline().add(
				gsap.to([`${PageShadow}`, '#page-content'], {
					x: `-${menuLinks.length * 6}em`,
					...menuAnimation,
				}),
			)
		} else {
			gsap.timeline().add(
				gsap.to([`${PageShadow}`, '#page-content'], {
					x: '0',
					...menuAnimation,
				}),
			)
		}
	}, [isOpen, focusTrapInstance])

	/** Escape key event listener */
	const onKeyDown = (e) => {
		if (e.key === 'Escape') {
			focusTrapInstance.deactivate()
			setOpen(false)
		}
	}

	/** Scroll IntersectionObserver */
	const [scrolled, setScrolled] = useState<boolean>(false)
	const ioCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setScrolled(false)
			} else {
				setScrolled(true)
			}
		})
	}
	const scrollObserver = new IntersectionObserver(ioCallback, {
		rootMargin: '0px',
		threshold: 1,
	})
	useEffect(() => {
		scrollObserver.observe(document.querySelector('#page-top-anchor'))
	})

	return (
		<Wrap onKeyDown={onKeyDown}>
			<PageShadow
				style={{ pointerEvents: isOpen ? 'initial' : 'none', opacity: isOpen ? 0.4 : 0 }}
				onClick={() => {
					focusTrapInstance.deactivate()
					setOpen(false)
				}}
			/>
			<Menu isOpen={isOpen} animation={menuAnimation} setOpen={setOpen} />
			<HeaderWrap background={scrolled || isOpen} border={isOpen}>
				<Grid>
					<HeaderInnerWrap>
						<Logo />
						<MenuButton onClick={toggleMenu}>
							<MenuButtonCrossWrap visible={isOpen}>
								<MenuButtonLine1 />
								<MenuButtonLine2 />
							</MenuButtonCrossWrap>
							<MenuButtonSpan visible={!isOpen}>Menu</MenuButtonSpan>
						</MenuButton>
					</HeaderInnerWrap>
				</Grid>
			</HeaderWrap>
		</Wrap>
	)
}

export default Nav

const Wrap = styled.div`
	position: fixed;
	width: 100%;
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
	transition: opacity 1s ${(p) => p.theme.a.easeInOutQuint};
`

const HeaderWrap = styled.div<{ background: boolean; border: boolean }>`
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 9;

	border-bottom: solid 1px transparent;
	transition: all 0.25s ${(p) => p.theme.a.easeInOutQuad};

	${(p) => p.background && `background: ${p.theme.c.background};`}
	${(p) => p.border && `border-bottom: solid 1px ${p.theme.c.line};`}
`

const HeaderInnerWrap = styled.div`
	width: 100%;
	grid-column: 1 / -1;
	height: 4.5em;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const MenuButton = styled.button<{ interactive: boolean }>`
	${(p) => p.theme.u.flexCenter};

	position: relative;
	padding: 0.5em 0.75em;
	transform: translateX(0.75em);
	text-align: right;
	white-space: pre;
	z-index: 1;

	text-transform: uppercase;
`

const MenuButtonCrossWrap = styled.div<{ visible: boolean }>`
	position: absolute;
	width: 1.2em;
	height: 1.2em;
	transition: opacity 1s ${(p) => p.theme.a.easeInOutQuint};

	${(p) => (p.visible ? 'opacity: 1;' : 'opacity: 0;')};
`

const MenuButtonSpan = styled.span<{ visible: boolean }>`
	transition: opacity 1s ${(p) => p.theme.a.easeInOutQuint};

	${(p) => (p.visible ? 'opacity: 1;' : 'opacity: 0;')};
`

const MenuButtonLine = styled.div`
	position: absolute;
	left: -2px;
	top: 50%;
	width: 125%;
	height: 2px;
	border-radius: 2px;
	background-color: ${(p) => p.theme.c.buttonLabel};

	${MenuButton}:hover & {
		background-color: ${(p) => p.theme.c.buttonLabelHover};
	}
`

const MenuButtonLine1 = styled(MenuButtonLine)`
	transform: rotate(45deg);
`

const MenuButtonLine2 = styled(MenuButtonLine)`
	transform: rotate(-45deg);
`
