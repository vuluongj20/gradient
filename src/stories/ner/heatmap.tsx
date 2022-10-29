import { VisuallyHidden } from '@react-aria/visually-hidden'
import styled, { useTheme } from 'styled-components'

import { nameTags } from './constants'

import GuideArrow from '@components/guideArrow'

type HeatmapProps = {
	data: (number | null)[][]
	groups: (number | string)[]
	grouping?: string
	support?: number[]
	showAll?: boolean
}
const Heatmap = ({ data, groups, grouping /*support*/ }: HeatmapProps) => {
	const { appearance } = useTheme()

	return (
		<Wrap>
			<Table>
				<VisuallyHidden elementType="thead">
					<tr>
						<TagName scope="col" invisible>
							Tag
						</TagName>
						{groups.map((group) => (
							<GroupName key={group} scope="col">
								{`${grouping ? `${grouping} ` : ''}${group}`}
							</GroupName>
						))}
					</tr>
				</VisuallyHidden>

				<TBody>
					{nameTags.map((nameTag, nameTagIndex) => (
						<TR key={nameTag}>
							<TagName scope="row">{nameTag}</TagName>
							{groups.map((group, groupIndex) => {
								const value = data[nameTagIndex][groupIndex]

								if (!value) return <TD key={group} />

								const whiteText =
									(appearance === 'light' && value > 0.5) ||
									(appearance === 'dark' && value < 0.5)

								const labelOpacity =
									appearance === 'light'
										? value < 0.25
											? 0.6 + value
											: 0.85 + value / 6
										: value < 0.25
										? 0.5 + value
										: 0.75 + value / 4

								return (
									<TD key={group}>
										<TDBackground opacity={value} aria-hidden="true" />
										<TDLabel whiteText={whiteText} opacity={labelOpacity}>
											{value}
										</TDLabel>
									</TD>
								)
							})}
						</TR>
					))}
				</TBody>

				<TFoot aria-hidden="true">
					<tr>
						<TagName invisible scope="col">
							Tag
						</TagName>
						{groups.map((group) => (
							<GroupName key={group} scope="col">
								{group}
							</GroupName>
						))}
					</tr>
				</TFoot>
			</Table>
			{grouping && (
				<GroupingCaption aria-hidden="true">
					<GuideArrow from="left" to="right" width={80} height={8} strokeWidth={1.125} />
					<GroupingLabel>{grouping}</GroupingLabel>
				</GroupingCaption>
			)}
		</Wrap>
	)
}

export default Heatmap

const Wrap = styled.div`
	width: 100%;
`

const Table = styled.table`
	width: 100%;
	border-spacing: 0;

	tbody > tr:last-of-type > th,
	tbody > tr:last-of-type > td {
		border-top: solid ${(p) => p.theme.space[0]} transparent;
	}

	tbody > tr:nth-last-of-type(2) > th,
	tbody > tr:nth-last-of-type(2) > td {
		border-bottom: solid ${(p) => p.theme.space[0]} transparent;
	}
`

const TFoot = styled.tfoot``

const GroupName = styled.th`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
	padding-top: ${(p) => p.theme.space[1]};
	text-align: center;
`

const TagName = styled.th<{ invisible?: boolean }>`
	${(p) => p.theme.text.viz.small}
	color: ${(p) => p.theme.label};
	text-align: right;
	padding-right: ${(p) => p.theme.space[1]};
	width: 2rem;
	overflow: hidden;

	${(p) =>
		p.invisible &&
		`
		opacity: 0; 
		white-space: nowrap;
		pointer-events: none; 
	`}
`

const TBody = styled.tbody``

const TR = styled.tr``

const TD = styled.td`
	position: relative;
	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
	text-align: center;

	/* Ensure that the cell is always wide enough to fit 2 decimal places */
	box-sizing: content-box;
	min-width: 2rem;
`

const TDBackground = styled.div<{ opacity: number }>`
	${(p) => p.theme.spread};
	background-color: ${(p) => p.theme.heading};
	opacity: ${(p) => p.opacity};
	z-index: -1;

	transition: opacity ${(p) => p.theme.animation.fastOut};

	tbody > tr:first-of-type > td:first-of-type > & {
		border-top-left-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:first-of-type > td:last-of-type > & {
		border-top-right-radius: ${(p) => p.theme.radii.s};
	}

	tbody > tr:nth-last-of-type(2) > td:first-of-type > & {
		border-bottom-left-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:nth-last-of-type(2) > td:last-of-type > & {
		border-bottom-right-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:last-of-type > td:first-of-type > & {
		border-top-left-radius: ${(p) => p.theme.radii.s};
		border-bottom-left-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:last-of-type > td:last-of-type > & {
		border-top-right-radius: ${(p) => p.theme.radii.s};
		border-bottom-right-radius: ${(p) => p.theme.radii.s};
	}
`

const TDLabel = styled.span<{ whiteText: boolean; opacity: number }>`
	${(p) => p.theme.text.system.small}
	${(p) => p.whiteText && `text-shadow: ${p.theme.shadows.text};`}
	color: ${(p) => (p.whiteText ? p.theme.white : p.theme.black)};
	opacity: ${(p) => p.opacity};
`

const GroupingCaption = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-left: auto;
	margin-top: ${(p) => p.theme.space[0]};
`

const GroupingLabel = styled.p`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
`
