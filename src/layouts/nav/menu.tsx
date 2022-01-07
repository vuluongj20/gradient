import { usePreventScroll } from '@react-aria/overlays'
import gsap from 'gsap'
import { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'

import MenuLink, { Wrap as MenuLinkWrap } from './menuLink'
import Settings from './settings'
import useMenuLinks from './useMenuLinks'

import useWindowWidth from '@utils/hooks/useWindowWidth'
import { numericBreakpoints, paddingHorizontal } from '@utils/styling'

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
	beforeSettingsDialogOpen?: () => void
	afterSettingsDialogClose?: () => void
}

const Menu = ({
	isOpen,
	animations,
	toggleMenu,
	beforeSettingsDialogOpen,
	afterSettingsDialogClose,
}: Props): JSX.Element => {
	const windowWidth = useWindowWidth()
	const links = useMenuLinks()

	usePreventScroll({ isDisabled: !isOpen })

	useEffect(() => {
		if (isOpen) {
			if (windowWidth > numericBreakpoints.xs) {
				gsap.to(`${MenuLinkWrap}`, {
					opacity: 1,
					x: (i) => `+${(i + 1) * (windowWidth > numericBreakpoints.s ? 6 : 5)}em`,
					pointerEvents: 'none',
					onComplete: () => gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' }),
					...animations.entry,
				})
			} else {
				gsap.set(`${MenuWrap}`, { x: 0, width: '100%' })
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
			}
		} else {
			if (windowWidth > numericBreakpoints.xs) {
				gsap.to(`${MenuLinkWrap}`, {
					opacity: 0,
					x: 0,
					pointerEvents: 'none',
					onComplete: () => gsap.set(`${MenuLinkWrap}`, { pointerEvents: 'initial' }),
					...animations.exit,
				})
			} else {
				gsap.to(`${MenuWrap}`, {
					y: '-100%',
					...animations.exit,
				})
				gsap.to(`${UtilsWrap}`, {
					opacity: 0,
					...animations.exit,
				})
				gsap.to(`${MenuLinkWrap}`, {
					opacity: 0,
					...animations.exit,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	// Close menu on resize
	useEffect(() => {
		toggleMenu(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowWidth])

	return (
		<MenuWrap>
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
		</MenuWrap>
	)
}

export default Menu

const MenuWrap = styled.nav`
	display: flex;
	position: absolute;
	top: 0;
	right: 0;
	width: 0;
	height: 100%;
	max-height: 100vh;
	transform: translateX(100%);
	background: ${(p) => p.theme.colors.background};

	z-index: -1;

	${(p) => p.theme.utils.media.xs} {
		position: fixed;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
		border-right: none;
		padding-top: calc(2.5em + ${(p) => p.theme.space[2]});
		transform: translateY(-100%);
	}
`

const LinksWrap = styled.ul`
	padding: 0;
	margin: 0;
`
const UtilsWrap = styled.div`
	display: none;
	padding: 0 ${paddingHorizontal * 0.5}em;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	opacity: 0%;

	${(p) => p.theme.utils.media.xs} {
		display: block;
	}
`

const UtilsInnerWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: stretch;
	gap: ${(p) => p.theme.space[1]};
	padding: ${(p) => p.theme.space[2]} 0;
	border-top: solid 1px ${(p) => p.theme.colors.line};
`

const StyledSettings = styled(Settings)`
	transform: translateX(-${(p) => p.theme.space[0]});
`
