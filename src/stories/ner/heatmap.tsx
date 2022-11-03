import { VisuallyHidden } from '@react-aria/visually-hidden'
import styled, { useTheme } from 'styled-components'

import { nameTags } from './constants'

import GuideArrow from '@components/guideArrow'

import { isDefined } from '@utils/functions'

type HeatmapProps = {
	data: (number | null)[][]
	groups: (number | string)[]
	groupLabel?: string
	rows?: (number | string)[]
	rowLabel?: string
	separateLastRow?: boolean
}
const Heatmap = ({
	data,
	groups,
	groupLabel,
	rows = nameTags,
	rowLabel,
	separateLastRow = true,
}: HeatmapProps) => {
	const { appearance } = useTheme()

	return (
		<Wrap>
			<InnerWrap>
				{rowLabel && (
					<RowCaption aria-hidden="true">
						<RowLabel>{rowLabel}</RowLabel>
						<GuideArrow
							from="top"
							to="bottom"
							width={8}
							height={80}
							strokeWidth={1.125}
						/>
					</RowCaption>
				)}
				<Table separateLastRow={separateLastRow}>
					<VisuallyHidden elementType="thead">
						<tr>
							<RowName scope="col" invisible>
								{rowLabel ?? 'Tag'}
							</RowName>
							{groups.map((group) => (
								<GroupName key={group} scope="col">
									{`${groupLabel ? `${groupLabel} ` : ''}${group}`}
								</GroupName>
							))}
						</tr>
					</VisuallyHidden>

					<TBody>
						{rows.map((row, rowIndex) => (
							<TR key={row}>
								<RowName scope="row">{row}</RowName>
								{groups.map((group, groupIndex) => {
									const value = data[rowIndex][groupIndex]

									if (!isDefined(value)) return <TD key={group} />

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
											<TDBackground opacity={0.025 + value * 0.85} aria-hidden="true" />
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
							<RowName invisible isLabel scope="col">
								{rowLabel ?? 'Tag'}
							</RowName>
							{groups.map((group) => (
								<GroupName key={group} scope="col">
									{group}
								</GroupName>
							))}
						</tr>
					</TFoot>
				</Table>
			</InnerWrap>
			{groupLabel && (
				<GroupCaption aria-hidden="true">
					<GuideArrow from="left" to="right" width={80} height={8} strokeWidth={1.125} />
					<GroupLabel>{groupLabel}</GroupLabel>
				</GroupCaption>
			)}
		</Wrap>
	)
}

export default Heatmap

const Wrap = styled.div`
	width: 100%;
`

const InnerWrap = styled.div`
	display: flex;
	width: 100%;
	overflow: scroll;

	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`

const Table = styled.table<{ separateLastRow: boolean }>`
	width: 100%;
	border-spacing: 1px;

	tbody > tr:first-of-type > td:first-of-type > div {
		border-top-left-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:first-of-type > td:last-of-type > div {
		border-top-right-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:last-of-type > td:first-of-type > div {
		border-bottom-left-radius: ${(p) => p.theme.radii.s};
	}
	tbody > tr:last-of-type > td:last-of-type > div {
		border-bottom-right-radius: ${(p) => p.theme.radii.s};
	}

	${(p) =>
		p.separateLastRow &&
		`
			tbody > tr:last-of-type > th,
			tbody > tr:last-of-type > td {
				border-top: solid ${p.theme.space[0]} transparent;
			}

			tbody > tr:nth-last-of-type(2) > th,
			tbody > tr:nth-last-of-type(2) > td {
				border-bottom: solid ${p.theme.space[0]} transparent;
			}

			tbody > tr:nth-last-of-type(2) > td:first-of-type > div {
				border-bottom-left-radius: ${p.theme.radii.s};
			}
			tbody > tr:nth-last-of-type(2) > td:last-of-type > div {
				border-bottom-right-radius: ${p.theme.radii.s};
			}
			tbody > tr:last-of-type > td:first-of-type > div {
				border-top-left-radius: ${p.theme.radii.s};
			}
			tbody > tr:last-of-type > td:last-of-type > div {
				border-top-right-radius: ${p.theme.radii.s};
			}
	`}
`

const TFoot = styled.tfoot``

const GroupName = styled.th`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
	padding-top: ${(p) => p.theme.space[1]};
	text-align: center;
`

const RowName = styled.th<{ invisible?: boolean; isLabel?: boolean }>`
	${(p) => p.theme.text.viz.small}
	color: ${(p) => p.theme.label};
	text-align: right;
	padding-right: ${(p) => p.theme.space[1]};

	overflow: hidden;

	${(p) => p.isLabel && `max-width: 0;`}

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
	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[0.5]};
	text-align: center;

	/* Ensure that the cell is always wide enough to fit 2 decimal places */
	min-width: 2.5rem;
`

const TDBackground = styled.div<{ opacity: number }>`
	${(p) => p.theme.spread};
	background-color: ${(p) => p.theme.heading};
	opacity: ${(p) => p.opacity};
	z-index: -1;

	transition: opacity ${(p) => p.theme.animation.fastOut};
`

const TDLabel = styled.span<{ whiteText: boolean; opacity: number }>`
	${(p) => p.theme.text.system.small}
	${(p) => p.whiteText && `text-shadow: ${p.theme.shadows.text};`}
	color: ${(p) => (p.whiteText ? p.theme.white : p.theme.black)};
	opacity: ${(p) => p.opacity};
`

const GroupCaption = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-left: auto;
	margin-top: ${(p) => p.theme.space[0]};
`

const GroupLabel = styled.p`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
`

const RowCaption = styled.div`
	display: flex;
	align-items: flex-end;
	margin-left: auto;
	margin-bottom: ${(p) => p.theme.space[3]};
	margin-right: ${(p) => p.theme.space[1]};
`

const RowLabel = styled.p`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};

	display: flex;
	justify-content: flex-end;
	width: 1em;
	transform: rotate(90deg);
	white-space: nowrap;
`
