import { useHover, usePress } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { GatsbyImage, GatsbyImageProps, getImage } from 'gatsby-plugin-image'
import { memo, useState } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import TransitionLink from '@components/transitionLink'

import { AdaptiveGridColumns, Story } from '@types'

import useSections from '@utils/data/sections'
import { Breakpoint, fadeIn, gridColCounts, numericBreakpoints } from '@utils/style'

type Props = Story & {
	path: string
	imageLoading?: GatsbyImageProps['loading']
	rowLayout?: boolean
	gridCols?: AdaptiveGridColumns
}

/**
 * Returns custom value for the "sizes" image prop, based on width
 * information from gridCols
 */
const getImageSizesProp = (
	gridCols: AdaptiveGridColumns | undefined,
	rowLayout: boolean,
): string => {
	if (rowLayout) return `(max-width: ${numericBreakpoints.s}px) 100vw, 40vw`
	if (!gridCols) return '90vw'

	return (
		// Using a raw array to ensure that the breakpoint values are
		// organized from smallest to largest
		(['xs', 's', 'm', 'l', 'xl'] as Breakpoint[])
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
	cover,
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

	const imageData = getImage(cover?.image)

	return (
		<Wrap
			to={path}
			{...(rowLayout
				? { $rowLayout: true, $gridCols: undefined }
				: { $rowLayout: false, $gridCols: gridCols as AdaptiveGridColumns })}
			{...mergeProps(hoverProps, pressProps)}
		>
			<StyledInnerGrid rowLayout={rowLayout}>
				{imageData && (
					<ImageWrap rowLayout={rowLayout} aria-hidden="true">
						<StyledGatsbyImage
							image={imageData}
							alt={cover.alt}
							sizes={getImageSizesProp(gridCols, rowLayout)}
							backgroundColor={imageData.backgroundColor}
							loading={imageLoading}
						/>
					</ImageWrap>
				)}

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

const Wrap = styled(TransitionLink)<
	| { $rowLayout: true; $gridCols: undefined }
	| { $rowLayout: false; $gridCols: AdaptiveGridColumns }
>`
	display: block;
	position: relative;
	width: 100%;
	text-decoration: none;
	opacity: 0;
	animation: ${fadeIn} ${(p) => p.theme.animation.mediumOut} forwards;

	align-self: start;
	border-radius: ${(p) => p.theme.radii.m};

	&.focus-visible {
		${(p) => p.theme.focusVisible};
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
				grid-column: ${p.$gridCols.xxl.start} / ${p.$gridCols.xxl.end};

				${p.theme.media.xl} {
					grid-column: ${p.$gridCols.xl.start} / ${p.$gridCols.xl.end};
				}

				${p.theme.media.l} {
					grid-column: ${p.$gridCols.l.start} / ${p.$gridCols.l.end};
				}
				${p.theme.media.m} {
					grid-column: ${p.$gridCols.m.start} / ${p.$gridCols.m.end};
				}
				${p.theme.media.s} {
					grid-column: ${p.$gridCols.s.start} / ${p.$gridCols.s.end};
				}
				${p.theme.media.xs} {
					grid-column: 1 / -1;
				}
	`}
`

const StyledInnerGrid = styled(Grid)<{ rowLayout: boolean }>`
	padding: 0;
	${(p) => !p.rowLayout && `grid-template-columns: 1fr;`}
`

const ImageWrap = styled.div<{ rowLayout: boolean }>`
	${(p) => p.theme.flexCenter};
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

	${(p) => p.theme.media.m} {
		max-height: 32rem;
	}
	${(p) => p.theme.media.s} {
		max-height: 24rem;
		${(p) => p.rowLayout && `grid-column: 1 / -1;`}
	}
	${(p) => p.theme.media.xs} {
		max-height: 16rem;
	}
`

const StyledGatsbyImage = styled(GatsbyImage)`
	width: 100%;
`

const TitleWrap = styled.div<{ rowLayout: boolean }>`
	${(p) =>
		p.rowLayout ? `grid-column-end: span 4;` : `margin-top: ${p.theme.space[1]};`}

	${(p) => p.theme.media.s} {
		margin: ${(p) => p.theme.space[1]} 0;
	}
`

const Title = styled.p<{ active: boolean }>`
	${(p) => p.theme.text.content.h5};

	position: relative;

	color: ${(p) => p.theme.heading};
	transition: color ${(p) => p.theme.animation.vFastOut};

	${(p) => p.active && `color: ${p.theme.primaryLinkText};`}
`

const DummyTitle = styled.span<{ active: boolean }>`
	${(p) => p.theme.spread};

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

	${(p) => p.active && `color: ${p.theme.primaryLinkText};`}
`
