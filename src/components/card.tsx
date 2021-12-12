import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ReactNode, memo } from 'react'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import Grid from '@components/grid'

import { AdaptiveGridColumns, Image } from '@types'

import useSections from '@utils/dataHooks/sections'

export type CardContent = {
	slug: string
	path: string
	title: string
	sections: string[]
	img: Image
}

type Props = CardContent & {
	gridCols?: AdaptiveGridColumns
	rowLayout?: boolean
}

type InnerWrapProps = {
	children: ReactNode
}

const Card = ({
	gridCols,
	path,
	title,
	sections,
	img,
	rowLayout,
}: Props): JSX.Element => {
	const sectionData = useSections()
	const sectionNames = sections
		.map((slug) => sectionData.find((s) => s.slug === slug)?.slug)
		.join(' | ')

	const InnerWrap = ({ children }: InnerWrapProps) =>
		rowLayout ? <StyledInnerGrid>{children}</StyledInnerGrid> : <div>{children}</div>

	const image = getImage(img.src)

	return (
		<Wrap to={path} rowLayout={rowLayout} gridCols={gridCols}>
			<InnerWrap>
				<ImageWrap rowLayout={rowLayout}>
					<StyledGatsbyImage image={image} alt={img.alt} loading="eager" />
				</ImageWrap>

				<TitleWrap rowLayout={rowLayout}>
					<Title>
						<DummyTitle>{title}</DummyTitle>
						{title}
					</Title>
					<Tags>{sectionNames}</Tags>
				</TitleWrap>
			</InnerWrap>
		</Wrap>
	)
}

export default memo(Card)

const Wrap = styled(TransitionLink)<{
	gridCols: AdaptiveGridColumns
	rowLayout: boolean
}>`
	display: block;
	position: relative;
	width: 100%;
	text-decoration: none;

	align-self: start;

	&.focus-visible {
		${(p) => p.theme.u.focusVisible};
	}

	&:hover {
		text-decoration: none;
	}

	${(p) =>
		p.rowLayout
			? `
				grid-column: 1 / -1;
			`
			: `
				padding-bottom: ${p.theme.s[1]};
				grid-column: ${p.gridCols.xl.start} / ${p.gridCols.xl.end};

				${p.theme.u.media.l} {
					grid-column: ${p.gridCols.l.start} / ${p.gridCols.l.end};
				}
				${p.theme.u.media.m} {
					grid-column: ${p.gridCols.m.start} / ${p.gridCols.m.end};
				}
				${p.theme.u.media.s} {
					grid-column: ${p.gridCols.s.start} / ${p.gridCols.s.end};
				}
				${p.theme.u.media.xs} {
					grid-column: 1 / -1;
				}
	`}
`

const StyledInnerGrid = styled(Grid)`
	padding: 0;
`

const ImageWrap = styled.div<{ rowLayout: boolean }>`
	${(p) => p.theme.u.flexCenter};
	width: 100%;
	max-height: 48em;
	overflow: hidden;

	${(p) => p.rowLayout && `grid-column: 1 / 5;`}

	${(p) => p.theme.u.media.m} {
		max-height: 32em;
	}
	${(p) => p.theme.u.media.s} {
		max-height: 24em;
		${(p) => p.rowLayout && `grid-column: 1 / -1;`}
	}
	${(p) => p.theme.u.media.xs} {
		max-height: 16em;
	}
`

const StyledGatsbyImage = styled(GatsbyImage)`
	width: 100%;
`

const TitleWrap = styled.div<{ rowLayout: boolean }>`
	${(p) => (p.rowLayout ? `grid-column-end: span 4;` : `margin-top: ${p.theme.s[1]};`)}

	${(p) => p.theme.u.media.s} {
		margin-top: ${(p) => p.theme.s[1]};
	}
`

const Title = styled.p`
	${(p) => p.theme.t.content.h4};

	position: relative;

	color: ${(p) => p.theme.c.heading};
	transition: color 0.1s ${(p) => p.theme.a.easeOutQuad};

	${Wrap}:hover & {
		color: ${(p) => p.theme.c.linkHover};
	}
`

const DummyTitle = styled.span`
	${(p) => p.theme.u.spread};

	color: transparent;
	text-decoration: underline;
	text-decoration-color: ${(p) => p.theme.c.linkUnderlineHover};
	z-index: 0;
	opacity: 0%;
	transition: opacity 0.125s ${(p) => p.theme.a.easeOutQuad};

	${Wrap}:hover & {
		opacity: 100%;
	}
`

const Tags = styled.div`
	${(p) => p.theme.t.ui.label};
	color: ${(p) => p.theme.c.label};
	margin-top: ${(p) => p.theme.s[0]};
	transition: color 0.125s ${(p) => p.theme.a.easeOutQuad};
	text-transform: capitalize;

	${Wrap}:hover & {
		color: ${(p) => p.theme.c.linkHover};
	}
`
