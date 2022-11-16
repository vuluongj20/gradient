import { usePreventScroll } from '@react-aria/overlays'
import gsap from 'gsap'
import { useEffect } from 'react'
import styled from 'styled-components'

import MenuLink, { Wrap as MenuLinkWrap } from './menuLink'
// import Settings from './settings'
import useMenuLinks from './useMenuLinks'

import useMobile from '@utils/useMobile'
import usePrevious from '@utils/usePrevious'

interface MenuProps {
	isOpen: boolean
	toggleMenu: (nextState: boolean) => void
	animations: Record<
		'exit' | 'entry',
		{
			duration: number
			ease?: string
		}
	>
	reducedMotion: boolean
	beforeSettingsDialogOpen?: () => void
	afterSettingsDialogClose?: () => void
}

const Menu = ({
	isOpen,
	animations,
	reducedMotion,
	toggleMenu,
}: // beforeSettingsDialogOpen,
// afterSettingsDialogClose,
MenuProps) => {
	const isMobile = useMobile()
	const links = useMenuLinks()

	const prevIsOpen = usePrevious(isOpen)
	const prevIsMobile = usePrevious(isMobile)

	usePreventScroll({ isDisabled: !isOpen })

	useEffect(() => {
		// Only open the menu when the isOpen has just changed
		if (prevIsOpen === isOpen || reducedMotion) {
			return
		}

		// Open menu
		if (isOpen) {
			if (isMobile) {
				gsap.set([`${MenuWrap}`, `${MenuLinkWrap}`], { x: 0 })
				gsap.to(`${MenuWrap}`, {
					y: 0,
					...animations.entry,
				})
				// gsap.to(`${UtilsWrap}`, {
				// 	opacity: 1,
				// 	...animations.entry,
				// })
				gsap.fromTo(
					`${MenuLinkWrap}`,
					{ opacity: 0, scaleX: 0.75 },
					{
						opacity: 1,
						scaleX: 1,
						stagger: 0.025,
						...animations.entry,
					},
				)
				return
			}

			gsap.to(`${MenuLinkWrap}`, {
				opacity: 1,
				x: (i) => `+${(i + 1) * 6}rem`,
				pointerEvents: 'none',
				onComplete: () => {
					gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' })
				},
				...animations.entry,
			})
			return
		}

		// Close menu
		if (isMobile) {
			gsap.to(`${MenuWrap}`, {
				y: '-100%',
				clearProps: 'y',
				...animations.exit,
			})
			// gsap.to(`${UtilsWrap}`, {
			// 	opacity: 0,
			// 	clearProps: 'opacity',
			// 	...animations.exit,
			// })
			gsap.to(`${MenuLinkWrap}`, {
				opacity: 0,
				clearProps: 'opacity',
				...animations.exit,
			})
			return
		}

		gsap.to(`${MenuWrap}`, {
			clearProps: 'y',
			duration: 0,
		})
		gsap.to(`${MenuLinkWrap}`, {
			opacity: 0,
			x: 0,
			pointerEvents: 'none',
			clearProps: 'opacity',
			onComplete: () => {
				gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' })
			},
			...animations.exit,
		})
	}, [prevIsOpen, isOpen, animations, isMobile, reducedMotion])

	// Close menu on resize
	useEffect(() => {
		if (isMobile !== prevIsMobile && prevIsMobile !== undefined) {
			toggleMenu(false)
		}
	}, [isMobile, prevIsMobile, toggleMenu])

	return (
		<MenuWrap aria-hidden={!isOpen} isOpen={isOpen}>
			<InnerWrap>
				<LinksWrap>
					{links.map((link) => (
						<MenuLink
							key={link.slug}
							focusable={isOpen}
							toggleMenu={toggleMenu}
							{...link}
						/>
					))}
				</LinksWrap>
				{/*<UtilsWrap>
					<UtilsInnerWrap>
						<StyledSettings
							withLabel
							beforeDialogOpen={beforeSettingsDialogOpen}
							afterDialogClose={afterSettingsDialogClose}
							dialogTriggerDisabled={!isOpen}
						/>
					</UtilsInnerWrap>
				</UtilsWrap>*/}
			</InnerWrap>
		</MenuWrap>
	)
}

export default Menu

const MenuWrap = styled.div<{ isOpen: boolean }>`
	display: flex;
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 100%;
	max-height: 100vh;
	transform: translateX(100%);
	background: ${(p) => p.theme.background};

	z-index: -1;

	${(p) => p.theme.media.mobile} {
		position: fixed;
		width: 100%;
		border-right: none;
		padding-top: calc(2.5rem + ${(p) => p.theme.space[2]});
		transform: translateY(-100%);
	}

	${(p) => p.theme.paddingHorizontalMobile};

	@media (prefers-reduced-motion) {
		width: auto;
		pointer-events: none;
		opacity: 0;
		transition: opacity ${(p) => p.theme.animation.mediumOut};
		box-shadow: ${(p) => p.theme.shadows.l};

		${(p) => p.isOpen && `opacity: 1; pointer-events: initial;`}

		${(p) => p.theme.media.mobile} {
			width: 100%;
			transform: none;
		}
	}
`

const InnerWrap = styled.div`
	${(p) => p.theme.media.mobile} {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: scroll;
		flex-direction: column;
		justify-content: space-between;
	}
`

const LinksWrap = styled.ul`
	padding: 0;
	margin: 0;

	@media (prefers-reduced-motion) {
		display: flex;
	}

	${(p) => p.theme.media.mobile} {
		display: initial;
	}
`
// const UtilsWrap = styled.div`
// 	display: none;
// 	width: 100%;
// 	opacity: 0;
// 	padding-top: ${(p) => p.theme.space[2]};

// 	${(p) => p.theme.media.mobile} {
// 		display: block;

// 		@media (prefers-reduced-motion) {
// 			opacity: 1;
// 		}
// 	}
// `

// const UtilsInnerWrap = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: stretch;
// 	gap: ${(p) => p.theme.space[1]};
// 	padding: ${(p) => p.theme.space[2]} 0;
// 	border-top: solid 1px ${(p) => p.theme.line};
// `

// const StyledSettings = styled(Settings)`
// 	transform: translateX(-${(p) => p.theme.space[0]});
// `
