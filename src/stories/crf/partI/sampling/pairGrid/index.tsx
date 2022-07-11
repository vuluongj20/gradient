import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import SamplingGraph from '../model/graph'
import { renderSVG } from './utils'

import useSize from '@utils/useSize'

type Props = {
	graph: SamplingGraph
}

const PairGrid = ({ graph }: Props) => {
	const wrapRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const { width, height } = useSize(wrapRef)
	const [samples, setSamples] = useState(() => graph.sample(50))
	const domains = useMemo(
		() =>
			Object.fromEntries(
				graph.nodes.map((node) => {
					const nodeExtent = extent(samples[node.id])
					if (!nodeExtent[0]) return [node.id, [0, 0]]
					return [node.id, nodeExtent]
				}),
			),
		[graph.nodes, samples],
	)
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
				if (!width || !height || !svgRef.current) return

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

	return (
		<Wrap ref={wrapRef}>
			<SVG ref={svgRef} />
		</Wrap>
	)
}

export default observer(PairGrid)

const Wrap = styled.div`
	width: 100%;
	height: 28rem;
	border-top: solid 1px ${(p) => p.theme.line};
	padding-top: ${(p) => p.theme.space[2]};
`

const SVG = styled.svg`
	${(p) => p.theme.text.viz.body};

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

	g.data circle {
		fill: ${(p) => p.theme.body};
	}

	text.row-label,
	text.column-label {
		fill: ${(p) => p.theme.label};
		transform-box: fill-box;
		transform-origin: center;
	}
`
