import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ReactNode, memo } from 'react'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import Grid from '@components/grid'

import { AdaptiveGridColumns, Story } from '@types'

import useSections from '@utils/dataHooks/sections'

type Props = Story & {
	path: string
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
	border-radius: ${(p) => p.theme.radii.m};

	&.focus-visible {
		${(p) => p.theme.utils.focusVisible};
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
				padding-bottom: ${p.theme.space[1]};
				grid-column: ${p.gridCols.xl.start} / ${p.gridCols.xl.end};

				${p.theme.utils.media.l} {
					grid-column: ${p.gridCols.l.start} / ${p.gridCols.l.end};
				}
				${p.theme.utils.media.m} {
					grid-column: ${p.gridCols.m.start} / ${p.gridCols.m.end};
				}
				${p.theme.utils.media.s} {
					grid-column: ${p.gridCols.s.start} / ${p.gridCols.s.end};
				}
				${p.theme.utils.media.xs} {
					grid-column: 1 / -1;
				}
	`}
`

const StyledInnerGrid = styled(Grid)`
	padding: 0;
`

const ImageWrap = styled.div<{ rowLayout: boolean }>`
	${(p) => p.theme.utils.flexCenter};
	position: relative;
	width: 100%;
	max-height: 48em;
	overflow: hidden;
	border-radius: ${(p) => p.theme.radii.m};
	mask-image: radial-gradient(white, black);

	::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: ${(p) => p.theme.radii.m};
		box-shadow: inset 0 0 0 1px ${(p) => p.theme.colors.line};
	}

	${(p) => p.rowLayout && `grid-column: 1 / 5;`}

	${(p) => p.theme.utils.media.m} {
		max-height: 32em;
	}
	${(p) => p.theme.utils.media.s} {
		max-height: 24em;
		${(p) => p.rowLayout && `grid-column: 1 / -1;`}
	}
	${(p) => p.theme.utils.media.xs} {
		max-height: 16em;
	}
`

const StyledGatsbyImage = styled(GatsbyImage)`
	width: 100%;
`

const TitleWrap = styled.div<{ rowLayout: boolean }>`
	${(p) =>
		p.rowLayout ? `grid-column-end: span 4;` : `margin-top: ${p.theme.space[1]};`}

	${(p) => p.theme.utils.media.s} {
		margin: ${(p) => p.theme.space[1]} 0;
	}
`

const Title = styled.p`
	${(p) => p.theme.text.content.h4};

	position: relative;

	color: ${(p) => p.theme.colors.heading};
	transition: color ${(p) => p.theme.animation.vFastOut};

	${Wrap}:hover & {
		color: ${(p) => p.theme.colors.linkHover};
	}
`

const DummyTitle = styled.span`
	${(p) => p.theme.utils.spread};

	color: transparent;
	text-decoration: underline;
	text-decoration-color: ${(p) => p.theme.colors.linkUnderlineHover};
	z-index: 0;
	opacity: 0%;
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${Wrap}:hover & {
		opacity: 100%;
	}
`

const Tags = styled.div`
	${(p) => p.theme.text.ui.label};
	color: ${(p) => p.theme.colors.label};
	margin-top: ${(p) => p.theme.space[0]};
	transition: color ${(p) => p.theme.animation.vFastOut};
	text-transform: capitalize;

	${Wrap}:hover & {
		color: ${(p) => p.theme.colors.linkHover};
	}
`
