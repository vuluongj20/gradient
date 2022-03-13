import { useHover, usePress } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { memo, useState } from 'react'
import styled from 'styled-components'

import TransitionLink from './transitionLink'

import Grid from '@components/grid'

import { AdaptiveGridColumns, Image, Story } from '@types'

import useSections from '@utils/dataHooks/sections'
import { gridColCounts, numericBreakpoints } from '@utils/style'

type Props = Story & {
	path: string
	gridCols?: AdaptiveGridColumns
	rowLayout?: boolean
	imageLoading?: Image['loading']
}

/**
 * Returns custom value for the "sizes" image prop, based on width
 * information from gridCols
 */
const getImageSizesProp = (gridCols: AdaptiveGridColumns, rowLayout: boolean): string => {
	if (rowLayout) return `(max-width: ${numericBreakpoints.s}px) 100vw, 40vw`
	if (!gridCols) return '90vw'

	return (
		// Using a raw array to ensure that the breakpoint values are
		// organized from smallest to largest
		['xs', 's', 'm', 'l', 'xl']
			.map((breakpoint) => {
				const gridColumns = gridCols[breakpoint]
				const maxWidth = numericBreakpoints[breakpoint]
				const slotWidth = Math.round(
					((gridColumns.end - gridColumns.start) / gridColCounts[breakpoint]) * 100,
				)

				return `(max-width: ${maxWidth}px) ${slotWidth}vw`
			})
			.join(', ') +
		// default slot width, for screens larger than the XL breakpoint
		`, ${Math.round(((gridCols.xl.end - gridCols.xl.start) / 12) * 100)}vw`
	)
}

const Card = ({
	gridCols,
	path,
	title,
	sections,
	image,
	imageLoading = 'lazy',
	rowLayout = false,
}: Props): JSX.Element => {
	const sectionData = useSections()
	const sectionNames = sections
		.map((slug) => sectionData.find((s) => s.slug === slug)?.name)
		.join(' | ')

	const { hoverProps, isHovered } = useHover({})

	const [pressed, setPressed] = useState(false)
	const { pressProps } = usePress({ onPress: () => setPressed(true) })
	const active = isHovered || pressed

	const imageData = getImage(image.src)

	return (
		<Wrap
			to={path}
			$rowLayout={rowLayout}
			$gridCols={gridCols}
			{...mergeProps(hoverProps, pressProps)}
		>
			<StyledInnerGrid rowLayout={rowLayout}>
				<ImageWrap rowLayout={rowLayout} aria-hidden="true">
					<StyledGatsbyImage
						image={imageData}
						alt={image.alt}
						sizes={getImageSizesProp(gridCols, rowLayout)}
						backgroundColor={imageData.backgroundColor}
						loading={imageLoading}
					/>
				</ImageWrap>

				<TitleWrap rowLayout={rowLayout}>
					<Title active={active}>
						<DummyTitle active={active} aria-hidden="true">
							{title}
						</DummyTitle>
						{title}
					</Title>
					<Tags active={active}>
						<VisuallyHidden elementType="span">{`In:`}</VisuallyHidden>
						{sectionNames}
					</Tags>
				</TitleWrap>
			</StyledInnerGrid>
		</Wrap>
	)
}

export default memo(Card)

const Wrap = styled(TransitionLink)<{
	$gridCols: AdaptiveGridColumns
	$rowLayout: boolean
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
		p.$rowLayout
			? `
				grid-column: 1 / -1;
			`
			: `
				padding-bottom: ${p.theme.space[1]};
				grid-column: ${p.$gridCols.xl.start} / ${p.$gridCols.xl.end};

				${p.theme.utils.media.l} {
					grid-column: ${p.$gridCols.l.start} / ${p.$gridCols.l.end};
				}
				${p.theme.utils.media.m} {
					grid-column: ${p.$gridCols.m.start} / ${p.$gridCols.m.end};
				}
				${p.theme.utils.media.s} {
					grid-column: ${p.$gridCols.s.start} / ${p.$gridCols.s.end};
				}
				${p.theme.utils.media.xs} {
					grid-column: 1 / -1;
				}
	`}
`

const StyledInnerGrid = styled(Grid)<{ rowLayout: boolean }>`
	padding: 0;
	${(p) => !p.rowLayout && `grid-template-columns: 1fr;`}
`

const ImageWrap = styled.div<{ rowLayout: boolean }>`
	${(p) => p.theme.utils.flexCenter};
	position: relative;
	width: 100%;
	max-height: 48rem;
	overflow: hidden;
	border-radius: ${(p) => p.theme.radii.m};
	mask-image: radial-gradient(white, black);
	background: ${(p) => p.theme.iBackground};

	::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: ${(p) => p.theme.radii.m};
		box-shadow: inset 0 0 0 1px ${(p) => p.theme.line};
	}

	${(p) => p.rowLayout && `grid-column: 1 / 5;`}

	${(p) => p.theme.utils.media.m} {
		max-height: 32rem;
	}
	${(p) => p.theme.utils.media.s} {
		max-height: 24rem;
		${(p) => p.rowLayout && `grid-column: 1 / -1;`}
	}
	${(p) => p.theme.utils.media.xs} {
		max-height: 16rem;
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

const Title = styled.p<{ active: boolean }>`
	${(p) => p.theme.text.content.h5};

	position: relative;

	color: ${(p) => p.theme.heading};
	transition: color ${(p) => p.theme.animation.vFastOut};

	${(p) => p.active && `color: ${p.theme.primaryLink};`}
`

const DummyTitle = styled.span<{ active: boolean }>`
	${(p) => p.theme.utils.spread};

	color: transparent;
	text-decoration-line: underline;
	text-decoration-color: ${(p) => p.theme.primaryLinkUnderline};
	z-index: 0;
	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.vFastOut};

	${(p) => p.active && `opacity: 1;`}
`

const Tags = styled.div<{ active: boolean }>`
	${(p) => p.theme.text.system.label};
	color: ${(p) => p.theme.label};
	margin-top: ${(p) => p.theme.space[0]};
	transition: color ${(p) => p.theme.animation.vFastOut};
	text-transform: capitalize;

	${(p) => p.active && `color: ${p.theme.primaryLink};`}
`
