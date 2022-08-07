import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { autorun, reaction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import SamplingGraph from '../model/graph'
import { renderSVG } from './utils'

import BalancedText from '@components/balancedText'
import Button from '@components/button'

import { tl } from '@utils/text'
import useSize from '@utils/useSize'

type Props = {
	graph: SamplingGraph
}

const PairGrid = ({ graph }: Props) => {
	const gridWrapRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const { width, height } = useSize(gridWrapRef)
	const [samples, setSamples] = useState<ReturnType<typeof graph.sample>>()
	const [showOnboarding, setShowOnboarding] = useState(true)
	const domains = useMemo(() => {
		if (!samples) return

		return Object.fromEntries(
			graph.nodes.map((node) => {
				const nodeExtent = extent(samples[node.id])
				if (!nodeExtent[0]) return [node.id, [0, 0]]
				return [node.id, nodeExtent]
			}),
		)
	}, [graph.nodes, samples])
	const subplotSizeProps = useMemo(
		() => ({
			width: width ?? 0,
			height: height ?? 0,
			numNodes: graph.nodes.length ?? 0,
		}),
		[width, height, graph.nodes.length],
	)

	useEffect(
		() =>
			autorun(() => {
				if (!width || !height || !svgRef.current || !samples) return

				const svg = select(svgRef.current)
				svg.call(renderSVG, {
					nodes: graph.nodes,
					samples,
					domains,
					...subplotSizeProps,
				})
			}),
		[width, height, domains, graph.nodes, samples, subplotSizeProps],
	)

	const [isStale, setIsStale] = useState(false)
	useEffect(
		() =>
			reaction(
				() => [
					...graph.nodes.map((n) => Object.entries(n.distribution.parameterValues)),
					...graph.edges.map((e) => e.coefficient),
				],
				() => setIsStale(true),
			),
		[graph],
	)
	const resample = () => {
		setSamples(graph.sample(70))
		setShowOnboarding(false)
		setIsStale(false)
	}

	const onboardingHint = useMemo(
		() =>
			tl(
				`Click "Draw Samples" to generate new random samples from $1.`,
				graph.nodes.map((n) => n.label),
			).join(''),
		[graph.nodes],
	)

	return (
		<Wrap>
			<Header>
				<Title>Sampling</Title>
				<SampleButton filled primary small onPress={resample}>
					{showOnboarding ? 'Draw Samples' : 'Resample'}
				</SampleButton>
			</Header>

			<GridWrap ref={gridWrapRef}>
				<CSSTransition
					in={!(showOnboarding || isStale)}
					timeout={500}
					unmountOnExit
					mountOnEnter
					appear
				>
					<SVG ref={svgRef} />
				</CSSTransition>
				<CSSTransition
					in={showOnboarding || isStale}
					timeout={500}
					unmountOnExit
					mountOnEnter
					appear
				>
					<EmptyWrap>
						<EmptyText>
							<BalancedText>
								{showOnboarding
									? onboardingHint
									: "Some parameters in your graph have changed. Click 'Resample' to generate fresh samples."}
							</BalancedText>
						</EmptyText>
					</EmptyWrap>
				</CSSTransition>
			</GridWrap>
		</Wrap>
	)
}

export default observer(PairGrid)

const Wrap = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: max-content 1fr;
	gap: ${(p) => p.theme.space[2]};
`

const Header = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Title = styled.h3`
	${(p) => p.theme.text.system.h6}
	margin-right: ${(p) => p.theme.space[1]};
	grid-column: 1;
`

const SampleButton = styled(Button)`
	grid-column: 2;
`

const GridWrap = styled.div`
	position: relative;
	overflow: hidden;
`

const EmptyWrap = styled.div`
	${(p) => p.theme.utils.spread}
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: ${(p) => p.theme.radii.m};
	background: ${(p) => p.theme.background};
	border: dashed 1px ${(p) => p.theme.line};
	will-change: opacity;
	opacity: 0;

	&.enter-active,
	&.enter-done {
		transition: opacity ${(p) => p.theme.animation.mediumOut};
		opacity: 1;
	}
	&.exit-active {
		transition: opacity ${(p) => p.theme.animation.mediumIn};
		opacity: 0;
	}
`

const EmptyText = styled.p`
	${(p) => p.theme.text.system.small};
	${(p) => p.theme.utils.space.marginHorizontal};
	color: ${(p) => p.theme.label};
	max-width: 20rem;
	text-align: center;
`

const SVG = styled.svg`
	${(p) => p.theme.text.viz.body};

	/*
	Axes
	*/
	g.axis {
		path.domain {
			stroke: ${(p) => p.theme.label};
			stroke-opacity: 0.5;
			stroke-width: 1.5;
			stroke-linecap: round;
		}

		&.x-axis .tick line {
			transform: translateY(-3px);
		}
		&.y-axis .tick line {
			transform: translateX(3px);
		}

		.tick {
			line {
				stroke: ${(p) => p.theme.label};
				stroke-opacity: 0.5;
				stroke-width: 1.5;
				stroke-linecap: round;
			}
			text {
				${(p) => p.theme.text.viz.small};
				fill: ${(p) => p.theme.label};
			}
		}
	}

	/*
	Background
	*/
	rect.subplot-hover-background {
		fill-opacity: 0;
	}

	/*
	Data plots
	*/
	g.data circle {
		fill: ${(p) => p.theme.body};
	}
	g.data rect {
		fill: ${(p) => p.theme.label};
		fill-opacity: 0.25;
	}

	g.row-label,
	g.column-label {
		text {
			fill: ${(p) => p.theme.label};
			transition: fill ${(p) => p.theme.animation.fastOut};
		}
		&.highlighted text {
			fill: currentcolor;
		}

		path.underline {
			stroke: ${(p) => p.theme.bar};
			stroke-dasharray: 4 3;
			stroke-linecap: round;
			opacity: 0;
			transition: ${(p) => p.theme.animation.fastOut};
		}
		&.highlighted path.underline {
			opacity: 1;
			stroke-dashoffset: -4;
		}
	}

	/* 
	Animations 
	*/
	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.mediumOut};
	g.x-axis path.domain {
		transform: scaleX(0);
		transform-box: fill-box;
		transform-origin: left;
		transition: transform ${(p) => p.theme.animation.mediumOut},
			opacity ${(p) => p.theme.animation.mediumOut};
	}
	g.y-axis path.domain,
	g.data rect {
		transform: scaleY(0);
		transform-box: fill-box;
		transform-origin: bottom;
		transition: transform ${(p) => p.theme.animation.mediumOut},
			opacity ${(p) => p.theme.animation.mediumOut};
	}

	&.enter-active,
	&.enter-done {
		opacity: 1;
		g.x-axis path.domain {
			transform: scaleX(1);
		}
		g.y-axis path.domain,
		g.data rect {
			transform: scaleY(1);
		}
	}
	&.exit-active {
		opacity: 0;
		transition: opacity ${(p) => p.theme.animation.mediumIn};
		g.x-axis path.domain {
			transform: scaleX(1);
		}
		g.y-axis path.domain,
		g.data rect {
			transform: scaleY(1);
		}
	}
`
