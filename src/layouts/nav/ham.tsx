import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Button from '@components/button'

import { navSize } from '@utils/style'

export type HamProps = {
	toggleMenu: (nextState: boolean) => void
	menuOpen: boolean
}

const Hamburger = ({ toggleMenu, menuOpen }: HamProps) => {
	/** Initialize hamburger animation */
	const hamTimeline = useRef<gsap.core.Timeline>()

	useEffect(() => {
		const hamOutAnimation = { duration: 0.3, ease: 'power4.in', stagger: 0.05 }
		const crossInAnimation = { duration: 0.3, ease: 'power4.out', stagger: 0.075 }

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
			hamTimeline.current?.play()
		} else {
			hamTimeline.current?.reverse()
		}
	}, [menuOpen])

	return (
		<Wrap>
			<StyledButton
				aria-label={menuOpen ? 'Close menu' : 'Open nav menu'}
				onPress={() => toggleMenu(!menuOpen)}
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
			</StyledButton>
		</Wrap>
	)
}

export default Hamburger

const Wrap = styled.li`
	${(p) => p.theme.flexCenter};
	width: 100%;
	position: relative;

	${(p) => p.theme.media.mobile} {
		width: auto;
	}
`

const StyledButton = styled(Button)`
	${(p) => p.theme.flexCenter};
	box-sizing: border-box;
	width: calc(${navSize.width} - ${(p) => p.theme.space[1]});
	height: calc(${navSize.width} - ${(p) => p.theme.space[1]});
	padding: ${(p) => p.theme.space[0]};

	${(p) => p.theme.media.mobile} {
		width: auto;
		transform: translateX(-${(p) => p.theme.space[0]});
	}
`

const InnerWrap = styled.div`
	position: relative;
	width: 2rem;
	height: 1.75rem;

	${(p) => p.theme.media.mobile} {
		width: 1.5rem;
		height: 1.5rem;
	}
`

const Line = styled.div`
	position: absolute;
	left: 2.5%;
	width: 95%;
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
	left: 5%;
	top: calc(50% - 1px);
`

const CrossLinePosWrap = styled(CrossLineWrap)`
	transform: rotate(45deg);
`

const CrossLineNegWrap = styled(CrossLineWrap)`
	transform: rotate(-45deg);
`

const CrossLineInner = styled(Line)`
	opacity: 1;
	transform-origin: left;
	transform: scaleX(0);
`
