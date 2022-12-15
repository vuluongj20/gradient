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

import { usePointerAction } from '@utils/text'
import useSize from '@utils/useSize'

interface PairGridProps {
	graph: SamplingGraph
	title?: string
	className?: string
}

const PairGrid = ({ graph, title, className }: PairGridProps) => {
	const gridWrapRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const { width, height } = useSize(gridWrapRef)
	const [samples, setSamples] = useState(() => graph.sample(50))

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
				if (!svgRef.current || !samples || !width || !height) return

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
		setSamples(graph.sample(50))
		setIsStale(false)
	}

	const pointerAction = usePointerAction(true)

	return (
		<Wrap className={className}>
			<Header>
				<Title>Sampled Population</Title>
				<Button filled primary small onPress={resample}>
					Resample
				</Button>
			</Header>
			<GridWrap ref={gridWrapRef}>
				<CSSTransition in={!isStale} timeout={500} unmountOnExit mountOnEnter appear>
					<SVG ref={svgRef} aria-label={title} />
				</CSSTransition>
				<CSSTransition in={isStale} timeout={500} unmountOnExit mountOnEnter appear>
					<EmptyWrap>
						<EmptyText>
							<BalancedText>
								{`Certain sampling parameters have changed. ${pointerAction} "Resample" to
								draw a new set of samples.`}
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
	display: grid;
	grid-template-rows: max-content minmax(0, 1fr);
	gap: var(--space-2);
`

const Header = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Title = styled.p`
	${(p) => p.theme.text.system.h6}
	margin-right: var(--space-1);
`

const GridWrap = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
`

const EmptyWrap = styled.div`
	${(p) => p.theme.spread}
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: var(--border-radius-m);
	background: var(--color-background);
	border: dashed 1px var(--color-line);

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-medium-out);
`

const EmptyText = styled.p`
	${(p) => p.theme.text.system.small};
	color: var(--color-label);
	margin-left: var(--page-margin-left);
	margin-right: var(--page-margin-right);
	max-width: 20rem;
	text-align: center;
`

const SVG = styled.svg`
	${(p) => p.theme.text.viz.body};
	width: 100%;

	/*
	Axes
	*/
	g.axis {
		path.domain {
			stroke: var(--color-label);
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
				stroke: var(--color-label);
				stroke-opacity: 0.5;
				stroke-width: 1.5;
				stroke-linecap: round;
			}
			text {
				${(p) => p.theme.text.viz.small};
				fill: var(--color-label);
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
		fill: var(--color-body);
		fill-opacity: 0.75;
	}
	g.data rect {
		fill: var(--color-label);
		fill-opacity: 0.25;
	}

	g.row-label,
	g.column-label {
		text {
			fill: var(--color-label);
			transition: fill var(--animation-fast-out);
		}
		&.highlighted text {
			fill: currentcolor;
		}

		path.underline {
			stroke: var(--color-bar);
			stroke-dasharray: 4 3;
			stroke-linecap: round;
			opacity: 0;
			transition: var(--animation-fast-out);
		}
		&.highlighted path.underline {
			opacity: 1;
			stroke-dashoffset: -4;
		}
	}

	/* 
	Animations 
	*/
	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-medium-out);

	g.x-axis path.domain {
		transform: scaleX(0);
		transform-box: fill-box;
		transform-origin: left;
		transition: transform var(--animation-medium-out), opacity var(--animation-medium-out);
	}
	g.y-axis path.domain,
	g.data rect {
		transform: scaleY(0);
		transform-box: fill-box;
		transform-origin: bottom;
		transition: transform var(--animation-medium-out), opacity var(--animation-medium-out);
	}

	&.enter-active,
	&.enter-done {
		g.x-axis path.domain {
			transform: scaleX(1);
		}
		g.y-axis path.domain,
		g.data rect {
			transform: scaleY(1);
		}
	}
	&.exit-active {
		g.x-axis path.domain {
			transform: scaleX(1);
		}
		g.y-axis path.domain,
		g.data rect {
			transform: scaleY(1);
		}
	}
`
