import { usePreventScroll } from '@react-aria/overlays'
import gsap from 'gsap'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'

import MenuLink, { Wrap as MenuLinkWrap } from './menuLink'
import Settings from './settings'
import useMenuLinks from './useMenuLinks'

import useBreakpoint from '@utils/hooks/useBreakpoint'
import useMobile from '@utils/hooks/useMobile'

type Props = {
	isOpen: boolean
	toggleMenu: Dispatch<SetStateAction<boolean>>
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
	beforeSettingsDialogOpen,
	afterSettingsDialogClose,
}: Props): JSX.Element => {
	const isMobile = useMobile()
	const isS = useBreakpoint('s')
	const links = useMenuLinks()

	usePreventScroll({ isDisabled: !isOpen })

	useEffect(() => {
		if (reducedMotion) {
			return
		}

		// On menu OPEN
		if (isOpen) {
			if (isMobile) {
				gsap.set([`${MenuWrap}`, `${MenuLinkWrap}`], { x: 0 })
				gsap.to(`${MenuWrap}`, {
					y: 0,
					...animations.entry,
				})
				gsap.to(`${UtilsWrap}`, {
					opacity: 1,
					...animations.entry,
				})
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
				x: (i) => `+${(i + 1) * (isS ? 5 : 6)}rem`,
				pointerEvents: 'none',
				onComplete: () => gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' }),
				...animations.entry,
			})
			return
		}

		// On menu CLOSE
		if (isMobile) {
			gsap.to(`${MenuWrap}`, {
				y: '-100%',
				clearProps: 'y',
				...animations.exit,
			})
			gsap.to(`${UtilsWrap}`, {
				opacity: 0,
				clearProps: 'opacity',
				...animations.exit,
			})
			gsap.to(`${MenuLinkWrap}`, {
				opacity: 0,
				clearProps: 'opacity',
				...animations.exit,
			})
			return
		}

		gsap.to(`${MenuLinkWrap}`, {
			opacity: 0,
			x: 0,
			pointerEvents: 'none',
			clearProps: 'opacity',
			onComplete: () => gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' }),
			...animations.exit,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, animations])

	// Close menu on resize
	useEffect(() => {
		toggleMenu(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile, isS])

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
				<UtilsWrap>
					<UtilsInnerWrap>
						<StyledSettings
							withLabel
							beforeDialogOpen={beforeSettingsDialogOpen}
							afterDialogClose={afterSettingsDialogClose}
							dialogTriggerDisabled={!isOpen}
						/>
					</UtilsInnerWrap>
				</UtilsWrap>
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

	${(p) => p.theme.utils.media.mobile} {
		${(p) => p.theme.utils.space.paddingHorizontal[p.theme.utils.media.xs]}
		position: fixed;
		width: 100%;
		border-right: none;
		padding-top: calc(2.5rem + ${(p) => p.theme.space[2]});
		transform: translateY(-100%);
	}

	@media (prefers-reduced-motion) {
		width: auto;
		pointer-events: none;
		opacity: 0%;
		transition: opacity ${(p) => p.theme.animation.mediumOut};
		box-shadow: ${(p) => p.theme.shadows.l};

		${(p) => p.isOpen && `opacity: 100%; pointer-events: initial;`}

		${(p) => p.theme.utils.media.mobile} {
			width: 100%;
			transform: none;
		}
	}
`

const InnerWrap = styled.div`
	${(p) => p.theme.utils.media.mobile} {
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

	${(p) => p.theme.utils.media.mobile} {
		display: initial;
	}
`
const UtilsWrap = styled.div`
	display: none;
	width: 100%;
	opacity: 0%;
	padding-top: ${(p) => p.theme.space[2]};

	${(p) => p.theme.utils.media.mobile} {
		display: block;

		@media (prefers-reduced-motion) {
			opacity: 100%;
		}
	}
`

const UtilsInnerWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: stretch;
	gap: ${(p) => p.theme.space[1]};
	padding: ${(p) => p.theme.space[2]} 0;
	border-top: solid 1px ${(p) => p.theme.line};
`

const StyledSettings = styled(Settings)`
	transform: translateX(-${(p) => p.theme.space[0]});
`
