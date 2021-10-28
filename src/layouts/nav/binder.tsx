import gsap from 'gsap'
import { Timeline } from 'gsap/core'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { reducedMotion } from '@utils/styling'

type TargetProps = {
	left?: boolean
	right?: boolean
}

type BinderProps = {
	toggleMenu: Dispatch<SetStateAction<boolean>>
	menuOpen: boolean
}

const Target = (props: TargetProps): JSX.Element => (
	<TargetWrap {...props}>
		<TargetLineHorizontal />
		<TargetLineVertical />
		<TargetCircle />
	</TargetWrap>
)

const Stamp = (): JSX.Element => {
	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	const dateString = new Date(Date.now()).toLocaleString('en-US', dateFormat)

	return (
		<StampWrap>
			<StampSection>
				<StampText>GRDNT</StampText>
			</StampSection>
			<StampSection>
				<StampText>{dateString}</StampText>
			</StampSection>
		</StampWrap>
	)
}

const userReducedMotion = reducedMotion()

const hamOutAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.4, ease: 'power4.in', stagger: 0.05 }

const crossInAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.5, ease: 'power4.out', stagger: 0.1 }

const Hamburger = ({ toggleMenu, menuOpen }: BinderProps) => {
	/** Initialize hamburger animation */
	const hamTimeline = useRef<Timeline>()
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
					{ scaleX: 0.9 },
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
				0.4,
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
		<HamWrap onClick={() => toggleMenu(!menuOpen)}>
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
	)
}

const Binder = ({ toggleMenu, menuOpen }: BinderProps): JSX.Element => (
	<Wrap>
		<Target left />
		<Stamp />
		<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
	</Wrap>
)

export default Binder

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	border-right: solid 1px ${(p) => p.theme.c.line};
	background: ${(p) => p.theme.c.surface3};
`

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: ${(p) => p.theme.c.heading};
	opacity: 0.4;
`

const TargetWrap = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1.375em;
	height: 1.375em;
`

const TargetLineHorizontal = styled(Line)`
	top: 50%;
	transform: translateY(-50%);
`

const TargetLineVertical = styled(Line)`
	top: calc(50% - 1px);
	left: 0;
	transform: rotate(90deg);
`

const TargetCircle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 68.75%;
	height: 68.75%;
	border: solid 2px ${(p) => p.theme.c.heading};
	border-radius: 50%;
	opacity: 0.4;
`

const StampWrap = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

const StampSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const StampText = styled.p`
	${(p) => p.theme.t.ui.label};
	opacity: 0.6;
	line-height: 1.4;
	white-space: nowrap;
	transform: rotate(-90deg);
`

export const HamWrap = styled.button`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 2.5em;
	height: 2.5em;
	padding: 0;
	font-size: 1em;
	cursor: pointer;
`

const HamInnerWrap = styled.div`
	${(p) => p.theme.u.absCenter};
	width: 1.25em;
	height: 1.25em;
`

const HamLine = styled(Line)`
	opacity: 1;
	transform-origin: right;
`

const HamLineTop = styled(HamLine)`
	top: 0.25em;

	${HamWrap}:hover & {
		transform: scaleX(1);
	}
`

const HamLineBottom = styled(HamLine)`
	bottom: 0.25em;

	${HamWrap}:hover & {
		transform: scaleX(1);
	}
`

const HamLineMiddle = styled(HamLine)`
	top: calc(50% - 1px);
	transform: scaleX(0.9);

	${HamWrap}:hover & {
		transform: scaleX(1);
	}
`

const HamCrossLineWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	left: 0;
	top: calc(50% - 1px);
`

const HamCrossLinePosWrap = styled(HamCrossLineWrap)`
	transform: rotate(45deg);
`

const HamCrossLineNegWrap = styled(HamCrossLineWrap)`
	transform: rotate(-45deg);
`

const HamCrossLineInner = styled(Line)`
	opacity: 1;
	transform-origin: left;
	transform: scaleX(0);
`
