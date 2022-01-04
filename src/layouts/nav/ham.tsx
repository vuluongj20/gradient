import { useButton } from '@react-aria/button'
import { mergeProps } from '@react-aria/utils'
import gsap from 'gsap'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Tooltip from '@components/tooltip'

import { reducedMotion, paddingHorizontal } from '@utils/styling'

export type HamProps = {
	toggleMenu: Dispatch<SetStateAction<boolean>>
	menuOpen: boolean
}

const userReducedMotion = reducedMotion()

const hamOutAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.3, ease: 'power4.in', stagger: 0.05 }

const crossInAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.3, ease: 'power4.out', stagger: 0.075 }

const Hamburger = ({ toggleMenu, menuOpen }: HamProps) => {
	const ref = useRef()
	const { buttonProps } = useButton({ onPress: () => toggleMenu(!menuOpen) }, ref)

	/** Initialize hamburger animation */
	const hamTimeline = useRef<gsap.core.Timeline>()
	useEffect(() => {
		hamTimeline.current = gsap
			.timeline()
			.add(
				gsap.fromTo(
					[`${HamLineTop}`, `${HamLineBottom}`],
					{ scaleX: 1 },
					{ scaleX: 0, ...hamOutAnimation },
				),
				0,
			)
			.add(
				gsap.fromTo(
					[`${HamLineMiddle}`, `${HamLineMiddle}`],
					{ scaleX: 1 },
					{ scaleX: 0, ...hamOutAnimation },
				),
				0,
			)
			.add(
				gsap.fromTo(
					`${HamCrossLineInner}`,
					{ transformOrigin: 'right', scaleX: 0 },
					{
						transformOrigin: 'left',
						scaleX: 1,
						...crossInAnimation,
					},
				),
				0.3,
			)
	}, [])

	useEffect(() => {
		if (menuOpen) {
			hamTimeline.current.play()
		} else {
			hamTimeline.current.reverse()
		}
	}, [menuOpen])

	return (
		<HamOuterWrap>
			<Tooltip content={menuOpen ? 'Close menu' : 'Menu'} placement="right" spread>
				{({ props, ref }) => (
					<HamWrap aria-label="Menu" ref={ref} {...mergeProps(props, buttonProps)}>
						<HamInnerWrap>
							<HamLineTop />
							<HamLineMiddle />
							<HamLineBottom />
							<HamCrossLinePosWrap>
								<HamCrossLineInner />
							</HamCrossLinePosWrap>
							<HamCrossLineNegWrap>
								<HamCrossLineInner />
							</HamCrossLineNegWrap>
						</HamInnerWrap>
					</HamWrap>
				)}
			</Tooltip>
		</HamOuterWrap>
	)
}

export default Hamburger

const HamOuterWrap = styled.div`
	position: absolute;
	top: 0.3125em;
	left: 0.3125em;
	width: 2.375em;
	height: 2.375em;
	padding: 0;
	font-size: 1em;
	cursor: pointer;
	z-index: 1;

	${(p) => p.theme.utils.media.l} {
		top: 0.25em;
		left: 0.25em;
		width: 2em;
		height: 2em;
	}

	${(p) => p.theme.utils.media.xs} {
		top: 50%;
		left: ${paddingHorizontal * 0.75}em;
		transform: translate(-15%, -50%);
		padding: 0;
	}
`

const HamWrap = styled.button`
	${(p) => p.theme.utils.spread};
	box-sizing: border-box;
`

const HamInnerWrap = styled.div`
	${(p) => p.theme.utils.absCenter};
	width: 70%;
	padding-top: 75%;
`

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: ${(p) => p.theme.colors.heading};
	opacity: 40%;
`

const HamLine = styled(Line)`
	opacity: 100%;
	transform-origin: right;
`

const HamLineTop = styled(HamLine)`
	top: 25%;
`

const HamLineBottom = styled(HamLine)`
	bottom: 25%;
`

const HamLineMiddle = styled(HamLine)`
	top: calc(50% - 1px);
	width: 85%;
`

const HamCrossLineWrap = styled.div`
	position: absolute;
	width: 85%;
	height: 2px;
	left: 7.5%;
	top: calc(50% - 1px);
`

const HamCrossLinePosWrap = styled(HamCrossLineWrap)`
	transform: rotate(45deg);
`

const HamCrossLineNegWrap = styled(HamCrossLineWrap)`
	transform: rotate(-45deg);
`

const HamCrossLineInner = styled(Line)`
	opacity: 100%;
	transform-origin: left;
	transform: scaleX(0);
`
