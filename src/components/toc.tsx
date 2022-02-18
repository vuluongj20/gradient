import * as Color from 'color'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as tocbot from 'tocbot'

type Props = {
	label: string
	contentSelector: string
	className?: string
}

const TOC = ({ label, contentSelector, className }: Props): JSX.Element => {
	const [showUpperFade, setUpperFade] = useState<boolean>(false)
	const [showLowerFade, setLowerFade] = useState<boolean>(false)
	const upperCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setUpperFade(false)
			} else {
				setUpperFade(true)
			}
		})
	}
	const lowerCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setLowerFade(false)
			} else {
				setLowerFade(true)
			}
		})
	}

	useEffect(() => {
		const options = {
			root: document.querySelector(`${TocWrap}`),
			rootMargin: '0px',
			threshold: 1,
		}
		const upperObserver = new IntersectionObserver(upperCallback, options)
		const lowerObserver = new IntersectionObserver(lowerCallback, options)

		const upperTarget = document.querySelector(`${UpperIntersectionTarget}`)
		const lowerTarget = document.querySelector(`${LowerIntersectionTarget}`)
		tocbot.init({
			contentSelector,
			tocSelector: `${TocContent}`,
			scrollSmooth: false,
			headingSelector: 'h2',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			activeListItemClass: 'active',
		})

		upperObserver.observe(upperTarget)
		lowerObserver.observe(lowerTarget)

		return () => {
			tocbot.destroy()
			upperObserver.unobserve(upperTarget)
			lowerObserver.unobserve(lowerTarget)
		}
	}, [contentSelector])

	return (
		<TocWrap className={className}>
			<TocLabel>{label}</TocLabel>
			<TocInnerWrap>
				<UpperScrollFade visible={showUpperFade} />
				<TocInnerContentWrap>
					<UpperIntersectionTarget />
					<TocContent />
					<LowerIntersectionTarget />
				</TocInnerContentWrap>
				<LowerScrollFade visible={showLowerFade} />
			</TocInnerWrap>
		</TocWrap>
	)
}

export default TOC

const TocWrap = styled.div`
	box-sizing: border-box;
	height: 100vh;
`

const TocInnerWrap = styled.div`
	position: relative;
	height: 100%;
	padding-top: ${(p) => p.theme.space[2]};
`

const TocInnerContentWrap = styled.div`
	position: relative;
	height: 100%;
	overflow-y: scroll;
	overscroll-behavior: contain;
	padding-right: 1rem;
`

const TocLabel = styled.p`
	${(p) => p.theme.text.ui.label};
	color: ${(p) => p.theme.label};
	text-transform: uppercase;
`

const TocContent = styled.div`
	ol {
		margin-top: 0;
	}

	li,
	li > a {
		color: ${(p) => p.theme.label};
		font-weight: 400;
	}
	li:hover,
	li:hover > a {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.label};
	}
	li.active,
	li.active > a {
		font-weight: 500;
		color: ${(p) => p.theme.heading};
		text-decoration: none;
	}
`

const IntersectionTarget = styled.div`
	width: 100%;
	height: 1px;
	margin: 0.125rem 0;
`

const UpperIntersectionTarget = styled(IntersectionTarget)``
const LowerIntersectionTarget = styled(IntersectionTarget)``

const ScrollFade = styled.div<{ visible: boolean }>`
	position: absolute;
	width: 100%;
	height: ${(p) => p.theme.space[6]};
	z-index: 1;
	pointer-events: none;
	transition: opacity ${(p) => p.theme.animation.fastOut};
	${(p) => (p.visible ? 'opacity: 100%;' : 'opacity: 0%;')}
`

const UpperScrollFade = styled(ScrollFade)`
	top: 0;
	background: linear-gradient(
			180deg,
			${(p) => p.theme.background} 0%,
			${(p) => Color(p.theme.background).fade(1)} 100%
		),
		linear-gradient(
			180deg,
			${(p) => p.theme.background} 0%,
			${(p) => Color(p.theme.background).fade(1)} 100%
		);
`
const LowerScrollFade = styled(ScrollFade)`
	bottom: -1px;
	background: linear-gradient(
			0deg,
			${(p) => p.theme.background} 0%,
			${(p) => Color(p.theme.background).fade(1)} 100%
		),
		linear-gradient(
			0deg,
			${(p) => p.theme.background} 0%,
			${(p) => Color(p.theme.background).fade(1)} 100%
		);
`
