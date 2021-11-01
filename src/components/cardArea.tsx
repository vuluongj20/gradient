import { Fragment } from 'react'

import Card, { CardContent } from './card'

import { AdaptiveGridColumns, Breakpoint, GridColumns } from '@types'

import { sum } from '@utils/functions'
import { gridColCounts } from '@utils/styling'

export type Offsets = Record<Breakpoint, [number, number]>

type Props = {
	cards: CardContent[]
	offsets: Offsets
}

type SpanRange = {
	mid: number
	lowerLimit: number
	upperLimit: number
}

type SizeMap = Record<'s' | 'm' | 'l' | 'xl', SpanRange>

/** Maps a size shortname (s/m/l/xl) to a full size range object */
const sizeMap: SizeMap = {
	s: { mid: 3, lowerLimit: 4, upperLimit: 3 },
	m: { mid: 4, lowerLimit: 4, upperLimit: 6 },
	l: { mid: 6, lowerLimit: 4, upperLimit: 10 },
	xl: { mid: 7, lowerLimit: 4, upperLimit: 12 },
}

const getGridColumns = (
	cards: CardContent[],
	offsets: Offsets,
): AdaptiveGridColumns[] => {
	const spanRanges: SpanRange[] = cards.map((card) => sizeMap[card.size])

	/**
	 * Returns CardRanges organized into rows,
	 * based on how many columns are available
	 */
	const getRows = (spanRanges: SpanRange[], nCols: number): SpanRange[][] => {
		const rows: SpanRange[][] = [[spanRanges[0]]]
		const remainingSpanRanges: SpanRange[] = [...spanRanges.slice(1)]
		let potentialNewRowConfig: SpanRange[] = [spanRanges[0], remainingSpanRanges[0]]
		let currentRowIndex = 0

		const needToWrap = (spanRanges: SpanRange[], nCols: number): boolean => {
			return sum(spanRanges.map((spanRange) => spanRange.mid)) > nCols
		}

		while (remainingSpanRanges.length > 0) {
			/**
			 * If there is more space in the row
			 * --> add next card to current row
			 */
			if (!needToWrap(potentialNewRowConfig, nCols)) {
				rows[currentRowIndex].push(remainingSpanRanges[0])
				/**
				 * If there is no more space
				 * --> add next card to a new row
				 */
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
	const calibrateRows = (
		rows: SpanRange[][],
		nCols: number,
		offset: number,
	): GridColumns[] =>
		rows
			.map((row) => {
				/** Array of sizes of cards in the row,
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
				let count = 0
				let nextIndex = 0

				/**
				 * Progressively and randomly make cards wider/more narrow
				 * until either the cards span the entire row or no more
				 * card can be widened (usually the case in the last row)
				 */
				while (difference !== 0 && sum(spans) < upperLimit && count < 20) {
					if (difference > 0) {
						spans[nextIndex] += 1
						difference -= 1
					} else if (spans[nextIndex] - 1 >= row[nextIndex].lowerLimit) {
						spans[nextIndex] -= 1
						difference += 1
					}
					count += 1
					if (nextIndex < row.length - 1) {
						nextIndex += 1
					} else {
						nextIndex = 0
					}
				}
				let currentStartLocation = 1 + offset

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

	/** Generate the final card sizes for each breakpoint */
	const results = [...Array(cards.length)].map(() => ({}))
	Object.entries(gridColCounts).forEach(([key, val]) => {
		const availableRows = val - offsets[key][0] - offsets[key][1]
		const uncalibratedRows = getRows(spanRanges, availableRows)
		const calibratedRows = calibrateRows(uncalibratedRows, availableRows, offsets[key][0])

		calibratedRows.forEach((span, i) => (results[i][key] = span))
	})

	return results as AdaptiveGridColumns[]
}

const CardGrid = ({ cards, offsets }: Props): JSX.Element => {
	const gridColumns = getGridColumns(cards, offsets)

	return (
		<Fragment>
			{cards.map((card, i) => (
				<Card key={card.slug} {...card} gridCols={gridColumns[i]} />
			))}
		</Fragment>
	)
}

export default CardGrid
