import { useMemo } from 'react'
import styled from 'styled-components'

import Card from './card'

import Grid from '@components/grid'

import { AdaptiveGridColumns, GridColumns, Story } from '@types'

import { sum } from '@utils/functions'
import { gridColCounts } from '@utils/style'

type Props = {
	stories: Story[]
	imageLoading?: Story['cover']['loading']
}

type SpanRange = {
	mid: number
	lowerLimit: number
	upperLimit: number
}

type SizeMap = Record<'s' | 'm' | 'l' | 'xl', SpanRange>

/** Maps a size shortname (s/m/l/xl) to a full size range object */
const sizeMap: SizeMap = {
	s: { mid: 3, lowerLimit: 3, upperLimit: 3 },
	m: { mid: 4, lowerLimit: 3, upperLimit: 4 },
	l: { mid: 5, lowerLimit: 3, upperLimit: 6 },
	xl: { mid: 7, lowerLimit: 3, upperLimit: 8 },
}

const getGridColumns = (stories: Story[]): AdaptiveGridColumns[] => {
	const spanRanges: SpanRange[] = stories.map((card) => sizeMap[card.featuredSize])

	/**
	 * Returns CardRanges organized into rows,
	 * based on how many columns are available
	 */
	const getRows = (spanRanges: SpanRange[], nCols: number): SpanRange[][] => {
		const rows: SpanRange[][] = [...(spanRanges[0] ? [[spanRanges[0]]] : [])]
		const remainingSpanRanges: SpanRange[] = [...spanRanges.slice(1)]
		let potentialNewRowConfig: SpanRange[] = [spanRanges[0], remainingSpanRanges[0]]
		let currentRowIndex = 0

		const needToWrap = (spanRanges: SpanRange[], nCols: number): boolean => {
			return sum(spanRanges.map((spanRange) => spanRange.mid)) > nCols
		}

		while (remainingSpanRanges.length > 0) {
			// If there is more space in the row --> add next card to current row
			if (!needToWrap(potentialNewRowConfig, nCols)) {
				rows[currentRowIndex].push(remainingSpanRanges[0])
				// If there is no more space
				// --> add next card to a new row
			} else {
				rows.push([])
				currentRowIndex += 1
				rows[currentRowIndex].push(remainingSpanRanges[0])
			}

			remainingSpanRanges.shift()
			potentialNewRowConfig = [...rows[currentRowIndex], remainingSpanRanges[0]]
		}

		return rows
	}

	/**
	 * Make cards wider/more narrow so they all
	 * span entire rows, except for the last row
	 */
	const calibrateRows = (rows: SpanRange[][], nCols: number): GridColumns[] =>
		rows
			.map((row, rowIndex) => {
				/**
				 * Array of sizes of cards in the row,
				 * starting out with the 'mid' values
				 */
				const spans = row.map((spanRange) => spanRange.mid)
				/**
				 * For checking when the very upper limit is hit,
				 * i.e. when no more card can be widened
				 */
				const upperLimit = sum(row.map((spanRange) => spanRange.upperLimit))
				/**
				 * To see if we need to make cards wider
				 * or more narrow, and by how much
				 */
				let difference = nCols - sum(spans)
				let nextIndex = 0

				// Progressively make cards wider/more narrow
				// until either the cards span the entire row or no more
				// card can be widened (usually the case in the last row)
				const isLastRow = rowIndex === rows.length - 1

				while (difference !== 0 && !(isLastRow && sum(spans) > upperLimit)) {
					if (difference > 0) {
						spans[nextIndex] += 1
						difference -= 1
					} else if (spans[nextIndex] - 1 >= row[nextIndex].lowerLimit) {
						spans[nextIndex] -= 1
						difference += 1
					}
					// Move to next card in the row
					if (nextIndex < row.length - 1) {
						nextIndex += 1
					} else {
						nextIndex = 0
					}
				}

				// Translate card spans [number] to grid-column
				// positions [start: number, end: number]
				let currentStartLocation = 1
				const gridColsCollection: GridColumns[] = spans.map((span) => {
					const gridCols: GridColumns = {
						start: currentStartLocation,
						end: currentStartLocation + span,
					}
					currentStartLocation += span

					return gridCols
				})

				return gridColsCollection
			})
			.flat(1)

	/** The final card sizes for each breakpoint */
	const results = [...Array(stories.length)].map(() => ({}))
	Object.entries(gridColCounts).forEach(([key, val]) => {
		const availableRows = val
		const uncalibratedRows = getRows(spanRanges, availableRows)
		const calibratedRows = calibrateRows(uncalibratedRows, availableRows)

		calibratedRows.forEach((span, i) => (results[i][key] = span))
	})

	return results as AdaptiveGridColumns[]
}

const CardGroup = ({ stories, imageLoading }: Props): JSX.Element => {
	const gridColumns = useMemo(() => getGridColumns(stories), [stories])

	return (
		<Wrap>
			{stories.map((story, i) => (
				<Card
					key={story.slug}
					{...story}
					gridCols={gridColumns[i]}
					imageLoading={imageLoading}
				/>
			))}
		</Wrap>
	)
}

export default CardGroup

const Wrap = styled(Grid)`
	row-gap: ${(p) => p.theme.space[4]};
`
