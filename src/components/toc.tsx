import * as Color from 'color'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as tocbot from 'tocbot'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = {
	label: string
	contentSelector: string
	headingOffset?: number
	overlay?: boolean
	className: string
}

const TOC = ({
	label,
	contentSelector,
	headingOffset = 40,
	overlay = false,
	className,
}: Props): JSX.Element => {
	const [showUpperFade, setUpperFade] = useState<boolean>(false)
	const [showLowerFade, setLowerFade] = useState<boolean>(false)
	const options = {
		root: document.querySelector(`${TocWrap}`),
		rootMargin: '0px',
		threshold: 1,
	}
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
	const upperObserver = new IntersectionObserver(upperCallback, options)
	const lowerObserver = new IntersectionObserver(lowerCallback, options)

	useEffect(() => {
		tocbot.init({
			contentSelector,
			tocSelector: `${TocContent}`,
			scrollSmoothOffset: -headingOffset,
			headingsOffset: headingOffset,
			headingSelector: 'h2, h3',
			activeListItemClass: 'active',
		})
		upperObserver.observe(document.querySelector(`${UpperIntersectionTarget}`))
		lowerObserver.observe(document.querySelector(`${LowerIntersectionTarget}`))
	})

	return (
		<LocalThemeProvider overlay={overlay}>
			<TocWrap className={className}>
				<TocLabel>{label}</TocLabel>
				<TocInnerWrap>
					<UpperScrollFade visible={showUpperFade} overlay={overlay} />
					<TocInnerContentWrap>
						<UpperIntersectionTarget />
						<TocContent />
						<LowerIntersectionTarget />
					</TocInnerContentWrap>
					<LowerScrollFade visible={showLowerFade} overlay={overlay} />
				</TocInnerWrap>
			</TocWrap>
		</LocalThemeProvider>
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
	padding-top: ${(p) => p.theme.s[2]};
`

const TocInnerContentWrap = styled.div`
	position: relative;
	height: 100%;
	overflow-y: scroll;
	overscroll-behavior: contain;
	padding-right: 0.5em;
`

const TocLabel = styled.p`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.label};
	text-transform: uppercase;
`

const TocContent = styled.div`
	> ol {
		padding-left: ${(p) => p.theme.s[3]};
		margin-top: 0;
		ol {
			margin-top: ${(p) => p.theme.s[1]};
			padding-left: ${(p) => p.theme.s[3]};
			li {
				list-style-type: lower-alpha;
			}
		}
	}

	li,
	li > a {
		color: ${(p) => p.theme.c.label};
		font-weight: 400;
	}
	li > a:hover {
		text-decoration: underline;
		text-decoration-color: ${(p) => p.theme.c.gray7};
	}
	li.active,
	li.active > a {
		font-weight: 500;
		color: ${(p) => p.theme.c.heading};
	}
`

const IntersectionTarget = styled.div`
	width: 100%;
	height: 1px;
	margin: 0.125em 0;
`

const UpperIntersectionTarget = styled(IntersectionTarget)``
const LowerIntersectionTarget = styled(IntersectionTarget)``

const ScrollFade = styled.div<{ visible: boolean; overlay: boolean }>`
	position: absolute;
	width: 100%;
	height: ${(p) => p.theme.s[6]};
	z-index: 1;
	transition: opacity 0.25s ${(p) => p.theme.a.easeOutQuad};
	${(p) => (p.visible ? 'opacity: 1;' : 'opacity: 0;')}
`

const UpperScrollFade = styled(ScrollFade)`
	top: 0px;
	background: linear-gradient(
			180deg,
			${(p) => p.theme.c.background} 0%,
			${(p) => Color(p.theme.c.background).fade(1)} 100%
		),
		linear-gradient(
			180deg,
			${(p) => p.theme.c.background} 0%,
			${(p) => Color(p.theme.c.background).fade(1)} 100%
		);
`
const LowerScrollFade = styled(ScrollFade)`
	bottom: -1px;
	background: linear-gradient(
			0deg,
			${(p) => p.theme.c.background} 0%,
			${(p) => Color(p.theme.c.background).fade(1)} 100%
		),
		linear-gradient(
			0deg,
			${(p) => p.theme.c.background} 0%,
			${(p) => Color(p.theme.c.background).fade(1)} 100%
		);
`
