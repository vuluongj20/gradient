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
				<TBody>
					{nameTags.map((nameTag, nameTagIndex) => (
						<TR key={nameTag}>
							<TagName>{nameTag}</TagName>
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
				<THead>
					<tr>
						<TagName invisible>Name Tag</TagName>
						{groups.map((group) => (
							<GroupName key={group}>{group}</GroupName>
						))}
					</tr>
				</THead>
			</Table>
			{grouping && (
				<GroupingCaption>
					<GuideArrow from="left" to="right" width={80} height={8} strokeWidth={1.125} />
					<GroupingLabel>{grouping}</GroupingLabel>
				</GroupingCaption>
			)}
		</Wrap>
	)
}

export default Heatmap

const Wrap = styled.div``

const Table = styled.table`
	table-layout: fixed;
	width: 100%;
	border-spacing: 2px;
`

const THead = styled.tfoot``

const GroupName = styled.th`
	padding-top: ${(p) => p.theme.space[1]};
	font-weight: 400;
	text-align: center;
`

const TagName = styled.th<{ invisible?: boolean }>`
	font-weight: 400;
	text-align: right;
	padding-right: ${(p) => p.theme.space[1]};
	${(p) => p.theme.text.viz.body}

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
	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[1]};
	text-align: center;
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
	tbody > tr:last-of-type > td:first-of-type > & {
		border-bottom-left-radius: ${(p) => p.theme.radii.s};
	}

	tbody > tr:last-of-type > td:last-of-type > & {
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
