import { Fragment, useRef } from 'react'
import styled from 'styled-components'

import { states, transitionProbabilities } from './constants'

import BalancedText from '@components/balancedText'
import Grid from '@components/grid'

import useSize from '@utils/useSize'

function probabilityToOpacity(probability: number) {
	return probability / (1.2 * probability + 0.75)
}

const TransitionPaths = ({ nStates }: { nStates: number }) => {
	const innerWrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(innerWrapRef)

	return (
		<Grid>
			<Wrap>
				<InnerWrap ref={innerWrapRef}>
					{width && height && (
						<SVG viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
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
																	transitionProbabilities[sourceState][targetState],
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

				<Legend>
					<BalancedText>
						<strong>Transition paths between states.</strong>&nbsp;Higher opacity
						indicates higher relative probability.
					</BalancedText>
				</Legend>
			</Wrap>
		</Grid>
	)
}

export default TransitionPaths

const Wrap = styled.div`
	position: relative;
	${(p) => p.theme.gridColumn.text};
	${(p) => p.theme.marginBottom[3]}
`

const InnerWrap = styled.div`
	position: relative;
	height: 12rem;
	margin-bottom: ${(p) => p.theme.space[1]};
`

const SVG = styled.svg`
	width: 100%;
	height: 100%;

	text {
		fill: ${(p) => p.theme.body};
		text-anchor: middle;
		transform: translateY(0.5em);
	}

	path {
		stroke: ${(p) => p.theme.body};
		stroke-width: 2;
		stroke-linecap: round;
	}
`

const Legend = styled.small`
	${(p) => p.theme.text.system.small};
	color: ${(p) => p.theme.label};

	display: block;
	max-width: 22rem;
	margin: 0 auto;
	text-align: center;
	margin-bottom: ${(p) => p.theme.space[0]};

	strong {
		font-weight: 500;
		color: ${(p) => p.theme.label};
	}
`
