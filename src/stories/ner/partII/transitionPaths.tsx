import { Fragment, useRef } from 'react'
import styled from 'styled-components'

import { states, transitionProbabilities } from './constants'

import Grid from '@components/grid'

import { tl } from '@utils/text'
import useSize from '@utils/useSize'

function probabilityToOpacity(probability: number) {
	return probability / (1.2 * probability + 0.75)
}

const title = 'Transition paths between hidden states'

const HMMTransitionPaths = ({ nStates, label }: { nStates: number; label?: string }) => {
	const innerWrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(innerWrapRef)

	return (
		<Grid>
			<Wrap>
				<InnerWrap ref={innerWrapRef}>
					{width && height && (
						<SVG
							viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
							aria-label={tl(
								`Visualization of potential transition paths between ${nStates} consecutive hidden states. Each state's potential values include $1. There are lines connecting each state's potential values to the next state's potential values. Each line has a different opacity indicating the transition path's probability.`,
								states,
							).join('')}
						>
							{new Array(nStates).fill(0).map((_, layerIndex) => {
								const xDelta = Math.min(160, width / (nStates - 1) - 25)
								const xStart = (-(nStates - 1) / 2 + layerIndex) * xDelta
								const xEnd = (-(nStates - 1) / 2 + layerIndex + 1) * xDelta

								const yDelta = height / states.length

								return (
									<Fragment key={layerIndex}>
										<g>
											{states.map((state, stateIndex) => {
												const y = (-(states.length - 1) / 2 + stateIndex) * yDelta

												return (
													<text key={stateIndex} x={xStart} y={y}>
														{state}
													</text>
												)
											})}
										</g>
										{layerIndex < nStates - 1 && (
											<g>
												{states.map((sourceState, sourceStateIndex) => {
													const ySource =
														(-(states.length - 1) / 2 + sourceStateIndex) * yDelta

													return (
														<g key={sourceStateIndex}>
															{states.map((targetState, targetStateIndex) => {
																const yTarget =
																	(-(states.length - 1) / 2 + targetStateIndex) * yDelta

																const opacity = probabilityToOpacity(
																	transitionProbabilities[sourceStateIndex][
																		targetStateIndex
																	],
																)

																return (
																	<path
																		key={targetStateIndex}
																		d={`M ${xStart + 30} ${ySource} L ${
																			xEnd - 30
																		} ${yTarget}`}
																		strokeOpacity={opacity}
																	/>
																)
															})}
														</g>
													)
												})}
											</g>
										)}
									</Fragment>
								)
							})}
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

export default HMMTransitionPaths

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	margin-bottom: var(--adaptive-space-3);
`

const InnerWrap = styled.div`
	position: relative;
	height: 14rem;
	margin-bottom: var(--space-1);
`

const SVG = styled.svg`
	width: 100%;
	height: 100%;

	text {
		fill: var(--color-body);
		text-anchor: middle;
		transform: translateY(0.35em);
	}

	path {
		stroke: var(--color-body);
		stroke-width: 2;
		stroke-linecap: round;
	}
`

const Legend = styled.small`
	${(p) => p.theme.text.small};
	color: var(--color-label);

	display: block;
	max-width: 22rem;
	margin: 0 auto;
	text-align: center;
	margin-bottom: var(--space-0);

	strong {
		font-weight: 500;
		color: var(--color-label);
	}
`
