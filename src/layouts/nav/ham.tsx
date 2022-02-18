import { useButton } from '@react-aria/button'
import gsap from 'gsap'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { paddingHorizontal } from '@utils/style'

export type HamProps = {
	toggleMenu: Dispatch<SetStateAction<boolean>>
	menuOpen: boolean
}

const Hamburger = ({ toggleMenu, menuOpen }: HamProps) => {
	const ref = useRef()
	const { buttonProps } = useButton({ onPress: () => toggleMenu(!menuOpen) }, ref)

	/** Initialize hamburger animation */
	const hamOutAnimation = { duration: 0.3, ease: 'power4.in', stagger: 0.05 }
	const crossInAnimation = { duration: 0.3, ease: 'power4.out', stagger: 0.075 }
	const hamTimeline = useRef<gsap.core.Timeline>()

	useEffect(() => {
		hamTimeline.current = gsap
			.timeline()
			.add(
				gsap.fromTo(
					[`${LineTop}`, `${LineBottom}`],
					{ scaleX: 1 },
					{ scaleX: 0, ...hamOutAnimation },
				),
				0,
			)
			.add(
				gsap.fromTo(
					[`${LineMiddle}`, `${LineMiddle}`],
					{ scaleX: 1 },
					{ scaleX: 0, ...hamOutAnimation },
				),
				0,
			)
			.add(
				gsap.fromTo(
					`${CrossLineInner}`,
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
		<Wrap>
			<Button
				ref={ref}
				aria-label={menuOpen ? 'Close menu' : 'Open nav menu'}
				{...buttonProps}
			>
				<InnerWrap>
					<LineTop />
					<LineMiddle />
					<LineBottom />
					<CrossLinePosWrap>
						<CrossLineInner />
					</CrossLinePosWrap>
					<CrossLineNegWrap>
						<CrossLineInner />
					</CrossLineNegWrap>
				</InnerWrap>
			</Button>
		</Wrap>
	)
}

export default Hamburger

const Wrap = styled.li`
	${(p) => p.theme.utils.flexCenter};
	width: 100%;
	position: relative;

	${(p) => p.theme.utils.media.xs} {
		position: absolute;
		top: 50%;
		left: ${paddingHorizontal * 0.5}rem;
		transform: translateY(-50%);
		width: auto;
	}
`

const Button = styled.button`
	${(p) => p.theme.utils.flexCenter};
	box-sizing: border-box;
	width: calc(100% - ${(p) => p.theme.space[1]});
	padding: ${(p) => p.theme.space[0]};

	${(p) => p.theme.utils.media.xs} {
		width: auto;
		transform: translateX(-${(p) => p.theme.space[0]});
	}
`

const InnerWrap = styled.div`
	position: relative;
	width: 1.75rem;
	height: 1.75rem;

	${(p) => p.theme.utils.media.l} {
		width: 1.625rem;
		height: 1.625rem;
	}

	${(p) => p.theme.utils.media.xs} {
		width: 1.75rem;
		height: 1.75rem;
	}
`

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 4px;
	background: ${(p) => p.theme.heading};
`

const LineTop = styled(Line)`
	top: calc(50% - 0.25rem - 2px);
`

const LineBottom = styled(Line)`
	top: calc(50% + 0.25rem);
`

const LineMiddle = styled(Line)`
	top: calc(50% - 1px);
	width: 80%;
`

const CrossLineWrap = styled.div`
	position: absolute;
	width: 90%;
	height: 2px;
	left: 7.5%;
	top: calc(50% - 1px);
`

const CrossLinePosWrap = styled(CrossLineWrap)`
	transform: rotate(45deg);
`

const CrossLineNegWrap = styled(CrossLineWrap)`
	transform: rotate(-45deg);
`

const CrossLineInner = styled(Line)`
	opacity: 100%;
	transform-origin: left;
	transform: scaleX(0);
`
