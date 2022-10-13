import { Fragment, useRef } from 'react'
import styled from 'styled-components'

import { STATE, TRANSITION_PROBABILITIES } from './constants'

import BalancedText from '@components/balancedText'
import Grid from '@components/grid'

import useSize from '@utils/useSize'

type Props = { nStates: number }

const STATES = Object.values(STATE)
const TransitionPaths = ({ nStates }: Props) => {
	const innerWrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(innerWrapRef)

	return (
		<Grid>
			<Wrap>
				<InnerWrap ref={innerWrapRef}>
					{width && height && (
						<SVG viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
							{new Array(nStates).fill(0).map((_, layerIndex) => {
								const xDelta = Math.min(200, width / (nStates - 1) - 25)
								const xStart = (-(nStates - 1) / 2 + layerIndex) * xDelta
								const xEnd = (-(nStates - 1) / 2 + layerIndex + 1) * xDelta

								const yDelta = height / STATES.length

								return (
									<Fragment key={layerIndex}>
										<g>
											{STATES.map((state, stateIndex) => {
												const y = (-(STATES.length - 1) / 2 + stateIndex) * yDelta

												return (
													<text key={stateIndex} x={xStart} y={y}>
														{state}
													</text>
												)
											})}
										</g>
										{layerIndex < nStates - 1 && (
											<g>
												{STATES.map((sourceState, sourceStateIndex) => {
													const ySource =
														(-(STATES.length - 1) / 2 + sourceStateIndex) * yDelta

													return (
														<g key={sourceStateIndex}>
															{STATES.map((targetState, targetStateIndex) => {
																const yTarget =
																	(-(STATES.length - 1) / 2 + targetStateIndex) * yDelta

																return (
																	<path
																		key={targetStateIndex}
																		d={`M ${xStart + 30} ${ySource} L ${
																			xEnd - 30
																		} ${yTarget}`}
																		strokeOpacity={
																			TRANSITION_PROBABILITIES[sourceState][targetState] /
																			1.5
																		}
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
						<strong>Transition paths between states.</strong>&nbsp;Higher opacity means
						higher probability, based on train results. Some paths appear invisible due to
						low probability.
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
	height: 14rem;
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
