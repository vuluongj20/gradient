import gsap from 'gsap'
import { Timeline } from 'gsap/core'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

import { reducedMotion, paddingHorizontal } from '@utils/styling'

type TargetProps = {
	left?: boolean
	right?: boolean
}

type BinderProps = {
	toggleMenu: Dispatch<SetStateAction<boolean>>
	menuOpen: boolean
}

const Target = (props: TargetProps): JSX.Element => (
	<TargetWrap to="/" tabIndex="-1" {...props}>
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
				<StampText to="/">GRDNT</StampText>
			</StampSection>
			<StampSection>
				<StampText to="/" tabIndex="-1">
					{dateString}
				</StampText>
			</StampSection>
		</StampWrap>
	)
}

const userReducedMotion = reducedMotion()

const hamOutAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.3, ease: 'power4.in', stagger: 0.05 }

const crossInAnimation = userReducedMotion
	? { duration: 0 }
	: { duration: 0.3, ease: 'power4.out', stagger: 0.075 }

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
		<HamWrap onClick={() => toggleMenu(!menuOpen)} aria-label="Menu">
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
		<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
		<Stamp />
		<Target left />
		<Logo to="/">Gradient\</Logo>
	</Wrap>
)

export default Binder

const Wrap = styled.div`
	width: 100%;
	height: 100%;
	border-right: solid 1px ${(p) => p.theme.c.line};
	box-sizing: content-box;
	background: ${(p) => p.theme.c.insetFill};

	${(p) => p.theme.u.media.xs} {
		background: ${(p) => p.theme.c.background};
		border-right: none;
	}
`

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: ${(p) => p.theme.c.heading};
	opacity: 40%;
`

const TargetWrap = styled(TransitionLink)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1.5em;
	height: 1.5em;
	z-index: 1;

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
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
	width: 56.25%;
	height: 56.25%;
	border: solid 2px ${(p) => p.theme.c.heading};
	border-radius: 50%;
	opacity: 40%;
`

const StampWrap = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	${(p) => p.theme.u.media.xs} {
		display: none;
	}
`

const StampSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const StampText = styled(TransitionLink)`
	${(p) => p.theme.t.ui.label};
	opacity: 60%;
	line-height: 1.4;
	white-space: nowrap;
	transform: rotate(-90deg);
`

export const HamWrap = styled.button`
	position: absolute;
	top: 0.3125em;
	left: 0.3125em;
	width: 2.375em;
	height: 2.375em;
	padding: 0;
	font-size: 1em;
	cursor: pointer;
	z-index: 1;

	${(p) => p.theme.u.media.l} {
		top: 0.25em;
		left: 0.25em;
		width: 2em;
		height: 2em;
	}

	${(p) => p.theme.u.media.xs} {
		top: 50%;
		left: ${paddingHorizontal * 0.75}em;
		transform: translate(-15%, -50%);
		padding: 0;
	}
`

const HamInnerWrap = styled.div`
	${(p) => p.theme.u.absCenter};
	width: 70%;
	padding-top: 75%;
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

const Logo = styled(TransitionLink)`
	${(p) => p.theme.t.content.h3};
	${(p) => p.theme.u.absCenter};
	font-weight: 700;
	display: none;

	${(p) => p.theme.u.media.xs} {
		display: initial;
	}
`
