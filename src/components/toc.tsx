import { useEffect } from 'react'
import styled from 'styled-components'
import * as tocbot from 'tocbot'

type Props = {
	label: string
	contentSelector: string
	headingOffset?: number
	className: string
}

const TOC = ({
	label,
	contentSelector,
	headingOffset = 40,
	className,
}: Props): JSX.Element => {
	const attachIdToHeadings = () => {
		document
			.querySelectorAll(`${contentSelector} h2, ${contentSelector} h3`)
			.forEach((heading: HTMLElement) => {
				const id = heading?.innerText?.toLowerCase?.().replace(/\s/g, '-')
				if (!id) return
				heading.id = id
			})
	}

	useEffect(() => {
		attachIdToHeadings()
		tocbot.init({
			contentSelector,
			tocSelector: `${TocContent}`,
			scrollSmoothOffset: -headingOffset,
			headingsOffset: headingOffset,
			headingSelector: 'h2, h3',
			activeListItemClass: 'active',
		})

		return () => tocbot.destroy()
	})

	return (
		<TocWrap className={className}>
			<TocLabel>{label}</TocLabel>
			<TocContent />
		</TocWrap>
	)
}

export default TOC

const TocWrap = styled.div``

const TocLabel = styled.p`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.label};
	text-transform: uppercase;
`

const TocContent = styled.div`
	> ol {
		padding-left: ${(p) => p.theme.s[3]};
		margin-top: ${(p) => p.theme.s[2]};
		ol {
			margin-top: ${(p) => p.theme.s[1]};
			padding-left: ${(p) => p.theme.s[3]};
		}
	}

	li,
	li > a {
		color: ${(p) => p.theme.c.label};
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
