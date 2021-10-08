import styled from 'styled-components'

import Card, { CardContent } from './card'

import { sum, gridColCounts } from '@utils'

export type Props = {
	cards: CardContent[]
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

const getGridColumns = (cards): AdaptiveGridColumns[] => {
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
		let availableCols = nCols

		const needToWrap = (spanRanges: SpanRange[], nCols: number): boolean => {
			return sum(spanRanges.map((spanRange) => spanRange.mid)) > nCols
		}

		while (remainingSpanRanges.length > 0) {
			availableCols = currentRowIndex === 0 || nCols <= 6 ? nCols : nCols - 2

			/**
			 * If there is more space in the row
			 * --> add next card to current row
			 */
			if (!needToWrap(potentialNewRowConfig, availableCols)) {
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
	const calibrateRows = (rows: SpanRange[][], nCols: number): GridColumns[] =>
		rows
			.map((row, i) => {
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
				const availableCols = i === 0 || nCols <= 6 ? nCols : nCols - 2
				let difference = availableCols - sum(spans)
				let count = 0

				/**
				 * Progressively and randomly make cards wider/more narrow
				 * until either the cards span the entire row or no more
				 * card can be widened (usually the case in the last row)
				 */
				while (difference !== 0 && sum(spans) < upperLimit && count < 20) {
					const randomIndex = Math.floor(Math.random() * row.length)
					if (difference > 0) {
						spans[randomIndex] += 1
						difference -= 1
					} else if (spans[randomIndex] - 1 >= row[randomIndex].lowerLimit) {
						spans[randomIndex] -= 1
						difference += 1
					}
					count += 1
				}

				const offset = i === 0 || nCols <= 6 ? 1 : 2
				let currentStartLocation = offset

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
		const uncalibratedRows = getRows(spanRanges, val)
		const calibratedRows = calibrateRows(uncalibratedRows, val)

		calibratedRows.forEach((span, i) => (results[i][key] = span))
	})

	return results as AdaptiveGridColumns[]
}

const CardArea = ({ cards }: Props): JSX.Element => {
	const gridColumns = getGridColumns(cards)

	return (
		<Wrap>
			{cards.map((card, i) => (
				<Card key={card.id} {...card} gridCols={gridColumns[i]} />
			))}
		</Wrap>
	)
}

export default CardArea

const Wrap = styled.div`
	display: contents;
`
