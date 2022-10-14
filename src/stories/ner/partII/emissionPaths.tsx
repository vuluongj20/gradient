import { Fragment, useMemo, useRef } from 'react'
import styled from 'styled-components'

import { emissionProbabilities, states, words } from './constants'

import BalancedText from '@components/balancedText'
import Grid from '@components/grid'

import useSize from '@utils/useSize'

function probabilityToOpacity(probability: number) {
	return probability / (1.2 * probability + 0.001)
}

const EmissionPaths = () => {
	const innerWrapRef = useRef<HTMLDivElement>(null)
	const { width, height } = useSize(innerWrapRef)

	const yTop = useMemo(() => (height ? -height / 2 + 20 : -100), [height])
	const yBottom = useMemo(() => (height ? height / 2 - 20 : 100), [height])
	const xDelta = useMemo(
		() => (width ? Math.min(60, width / (states.length - 1) - 10) : 60),
		[width],
	)
	return (
		<Grid>
			<Wrap>
				<InnerWrap ref={innerWrapRef}>
					{width && height && (
						<SVG viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
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
														emissionProbabilities[state]?.[word],
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

				<Legend>
					<BalancedText>
						<strong>Emission paths from states to observations.</strong>
						&nbsp;Higher opacity indicates higher relative probability.
					</BalancedText>
				</Legend>
			</Wrap>
		</Grid>
	)
}

export default EmissionPaths

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
		stroke-linecap: round;
		stroke-width: 2;
	}
`

const Legend = styled.small`
	${(p) => p.theme.text.system.small};
	color: ${(p) => p.theme.label};

	display: block;
	max-width: 28rem;
	margin: 0 auto;
	text-align: center;
	margin-bottom: ${(p) => p.theme.space[0]};

	strong {
		font-weight: 500;
		color: ${(p) => p.theme.label};
	}
`
