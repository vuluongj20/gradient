import { Fragment, useMemo, useRef } from 'react'
import styled from 'styled-components'

import { emissionProbabilities, states, words } from './constants'

import Grid from '@components/grid'

import { tl } from '@utils/text'
import useSize from '@utils/useSize'

function probabilityToOpacity(probability: number) {
	return probability / (1.2 * probability + 0.001)
}

const title = 'Emission paths from hidden states to observations'

const HMMEmissionPaths = ({ label }: { label: string }) => {
	const innerWrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(innerWrapRef)

	const yTop = useMemo(() => (height ? -height / 2 + 20 : -100), [height])
	const yBottom = useMemo(() => (height ? height / 2 - 20 : 100), [height])
	const xDelta = useMemo(
		() => (width ? Math.min(60, width / (states.length - 1) - 5) : 60),
		[width],
	)

	return (
		<Grid>
			<Wrap>
				<InnerWrap ref={innerWrapRef}>
					{width && height && (
						<SVG
							viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
							aria-label={tl(
								`Visualization of potential emission paths from a hidden state to its corresponding observation. The hidden state's potential values include $1. The observation's potential values include $2. There are lines connecting each potential hidden state value to each potential observation value. Each line has a different opacity indicating the emission path's probability.`,
								states,
								words.slice(1, -1).concat(['other words in the vocabulary']),
							).join('')}
						>
							<Fragment>
								<g>
									{states.map((state, stateIndex) => {
										const x = (-(states.length - 1) / 2 + stateIndex) * xDelta

										return (
											<text key={stateIndex} x={x} y={yTop}>
												{state}
											</text>
										)
									})}
								</g>
								<g>
									{words.map((word, wordIndex) => {
										const x = (-(words.length - 1) / 2 + wordIndex) * xDelta

										const isMock = wordIndex === 0 || wordIndex === words.length - 1

										return (
											<text key={wordIndex} x={x} y={yBottom}>
												{isMock ? '…' : word}
											</text>
										)
									})}
								</g>
								<g>
									{states.map((state, stateIndex) => {
										const xSource = (-(states.length - 1) / 2 + stateIndex) * xDelta

										return (
											<g key={stateIndex}>
												{words.map((word, wordIndex) => {
													const xTarget = (-(words.length - 1) / 2 + wordIndex) * xDelta

													const isMock = wordIndex === 0 || wordIndex === words.length - 1
													const opacity = probabilityToOpacity(
														emissionProbabilities[stateIndex][wordIndex],
													)

													return (
														<path
															key={wordIndex}
															d={`M ${xSource} ${yTop + 15} L ${xTarget} ${yBottom - 10}`}
															strokeOpacity={opacity}
															strokeDasharray={isMock ? '1 4' : 0}
														/>
													)
												})}
											</g>
										)
									})}
								</g>
							</Fragment>
						</SVG>
					)}
				</InnerWrap>

				<Legend aria-hidden="true">
					<strong>
						{title}
						{label && '.'}
					</strong>
					<br />
					{label}
				</Legend>
			</Wrap>
		</Grid>
	)
}

export default HMMEmissionPaths

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	margin-bottom: var(--adaptive-space-3);
`

const InnerWrap = styled.div`
	position: relative;
	height: 12rem;
	margin-bottom: var(--space-1);
`

const SVG = styled.svg`
	width: 100%;
	height: 100%;

	text {
		fill: var(--color-body);
		text-anchor: middle;
		transform: translateY(0.5em);
	}

	path {
		stroke: var(--color-body);
		stroke-linecap: round;
		stroke-width: 2;
	}
`

const Legend = styled.small`
	${(p) => p.theme.text.small};
	color: var(--color-label);

	display: block;
	max-width: 24rem;
	margin: 0 auto;
	text-align: center;
	margin-bottom: var(--space-0);

	strong {
		font-weight: 500;
		color: var(--color-label);
	}
`
