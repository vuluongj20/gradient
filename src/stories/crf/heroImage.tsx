import { Fragment, useMemo, useRef } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'

import useSize from '@utils/useSize'

type Position = { x: number; y: number }
const getPositions = ({ width, height }: { width: number; height: number }) => {
	const getRandomPosition = (prevPos?: Position) => {
		if (!prevPos) {
			return {
				x: Math.max(0, Math.min(width, Math.random() * width)),
				y: Math.max(0, Math.min(height, Math.random() * height)),
			}
		}

		return {
			x: Math.max(0, Math.min(width, prevPos.x + (Math.random() * 0.2 - 0.1) * width)),
			y: Math.max(0, Math.min(height, prevPos.y + (Math.random() * 0.2 - 0.1) * height)),
		}
	}

	const result: Position[][] = []
	new Array<number[]>(50).fill(new Array<number>(25).fill(0)).forEach((sentence) => {
		const returnSentence: Position[] = []
		sentence.forEach((_, i) => {
			returnSentence.push({
				...getRandomPosition(returnSentence[i - 1]),
			})
		})

		result.push(returnSentence)
	})

	return result
}

const HeroImage = () => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(wrapRef)

	const parsedSentences = useMemo(() => {
		if (!width || !height) return [[]]
		return getPositions({ width, height })
	}, [width, height])

	return (
		<Grid>
			<Wrap ref={wrapRef}>
				<SVG viewBox={`0 0 ${width ?? 0} ${height ?? 0}`}>
					{parsedSentences.map((sentence, sentenceIndex) => (
						<g
							key={sentenceIndex}
							opacity={(parsedSentences.length - sentenceIndex) / parsedSentences.length}
						>
							{sentence.map((word, wordIndex) => (
								<Fragment key={wordIndex}>
									{wordIndex > 1 && (
										<path
											d={`M ${sentence[wordIndex - 1].x} ${sentence[wordIndex - 1].y} L ${
												word.x
											} ${word.y}`}
										/>
									)}
								</Fragment>
							))}
						</g>
					))}
				</SVG>
			</Wrap>
		</Grid>
	)
}

export default HeroImage

const Wrap = styled.div`
	height: 32rem;
	${(p) => p.theme.utils.gridColumn.wide};
	${(p) => p.theme.utils.space.marginBottom[5]};
`

const SVG = styled.svg`
	width: 100%;

	path {
		stroke: ${(p) => p.theme.heading};
	}
`
